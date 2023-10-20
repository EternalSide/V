"use server";
import Tag from "@/database/models/tag.model";
import {connectToDatabase} from "../mongoose";
import {revalidatePath} from "next/cache";
import User from "@/database/models/user.model";
import {EditTagParams, FollowTagParams, GetTagInfoParams} from "./shared";

export const getPopularTags = async () => {
	try {
		connectToDatabase();

		const tags = await Tag.aggregate([
			{
				$project: {
					name: true,
					numberOfPosts: {
						$size: "$posts",
					},

					upvotes: "$upvotes",
				},
			},
			{
				$sort: {
					numberOfPosts: -1,
				},
			},
			{$limit: 3},
		]);

		return tags;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const getAllTags = async () => {
	try {
		connectToDatabase();

		const tags = await Tag.find({}).limit(16);

		return tags;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const followTag = async (params: FollowTagParams) => {
	try {
		connectToDatabase();

		const {path, tagId, userId, isFollowing} = params;

		let updateQuery = {};
		let userUpdateQ = {};

		if (isFollowing) {
			updateQuery = {$pull: {followers: userId}};
			userUpdateQ = {$pull: {followingTags: tagId}};
		} else {
			updateQuery = {$addToSet: {followers: userId}};
			userUpdateQ = {$push: {followingTags: tagId}};
		}

		await Tag.findByIdAndUpdate(tagId, updateQuery);
		await User.findByIdAndUpdate(userId, userUpdateQ);

		revalidatePath(path);
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const getTagInfo = async (params: GetTagInfoParams) => {
	try {
		connectToDatabase();

		const {tagName, search, pageSize = 5, page = 1} = params;

		const skipAmount = (page - 1) * pageSize;

		let sortQuery = {};

		switch (search) {
			case "new":
				sortQuery = {createdAt: -1};
				break;

			case "recommended":
				sortQuery = {views: -1, createdAt: -1, upvotes: -1};
				break;

			case "popular":
				sortQuery = {upvotes: -1, views: -1};
				break;

			default:
				sortQuery = {createdAt: -1, views: -1, upvotes: -1};
				break;
		}

		const tag = await Tag.findOne({name: tagName})
			.populate([
				{
					path: "posts",
					options: {
						populate: [
							{
								path: "author",
								select: "_id username picture name",
							},
							{
								path: "tags",
								select: "_id name",
							},
							{
								path: "comments",
								options: {
									populate: {
										path: "author",
									},
								},
							},
						],
						sort: sortQuery,
						limit: pageSize,
						skip: skipAmount,
					},
				},
			])
			.populate("followers");

		return JSON.parse(JSON.stringify(tag));
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const editTag = async (params: EditTagParams) => {
	try {
		connectToDatabase();

		const {path, tagId, userId, authorId, updatedData} = params;

		const user = await User.findById(userId);

		if (user._id.toString() !== authorId) throw new Error("Unauthorized.");

		await Tag.findByIdAndUpdate(tagId, updatedData);

		revalidatePath(path);
	} catch (e) {
		console.log(e);
		throw e;
	}
};
