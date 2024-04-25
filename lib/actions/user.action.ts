"use server";
import User from "@/database/models/user.model";
import {connectToDatabase} from "../mongoose";
import {
	CreateUserParams,
	GetUserNotificationParams,
	SavePostParams,
	UpdateUserParams,
	deleteUserParams,
	getUserByIdParams,
	getUserByUsername,
} from "./shared";
import {revalidatePath} from "next/cache";
import Post from "@/database/models/post.model";
import Tag from "@/database/models/tag.model";
import Interaction from "@/database/models/interaction.model";
import Comment from "@/database/models/comment.model";

export const createUser = async (userData: CreateUserParams) => {
	try {
		connectToDatabase();

		const user = await User.create(userData);

		return user;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const updateUser = async (params: UpdateUserParams) => {
	try {
		connectToDatabase();

		const {clerkId, updatedData, path} = params;

		const user = await User.findOneAndUpdate({clerkId}, updatedData, {
			new: true,
			upsert: true,
		});

		revalidatePath(path);
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const deleteUser = async (params: deleteUserParams) => {
	try {
		connectToDatabase();
		const {clerkId} = params;

		const user = await User.findOne({clerkId});

		if (!user) {
			throw new Error("Пользователь не найден.");
		}

		const deletedUser = await User.findByIdAndDelete(user._id);
		await Post.deleteMany({author: deletedUser._id});
		await Interaction.deleteMany({user: deletedUser._id});
		await Comment.deleteMany({user: deletedUser._id});

		return deletedUser;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export async function getUserById(params: getUserByIdParams) {
	try {
		connectToDatabase();

		const {clerkId} = params;

		const user = await User.findOne({clerkId}).populate("followingTags");

		if (!user) return null;

		return user;
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function getUserByUserName(params: getUserByUsername) {
	try {
		connectToDatabase();

		const {username, page = 1, pageSize = 5} = params;

		const skipAmount = (page - 1) * pageSize;

		const user = await User.findOne({
			username: username.toLowerCase(),
		})
			.populate({
				path: "posts",
				model: Post,
				options: {
					sort: {createdAt: -1},
					skip: skipAmount,
					limit: 5,
					select: ["-text"],
					populate: [
						{
							path: "tags",
							model: Tag,
							select: "name",
						},

						{
							path: "author",
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
				},
			})
			.populate({
				path: "followingTags",
				options: {
					select: "name picture description",
				},
			})
			.populate({
				path: "userPinned",
				options: {
					populate: [
						{
							path: "author",
						},
						{
							path: "tags",
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
				},
			});

		return JSON.parse(JSON.stringify(user));
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function savePost(params: SavePostParams) {
	try {
		connectToDatabase();

		const {postId, userId, path, isPostSaved} = params;

		let updateQuery = {};

		if (isPostSaved) {
			updateQuery = {$pull: {savedPosts: postId}};
		} else {
			updateQuery = {$addToSet: {savedPosts: postId}};
		}

		const user = await User.findByIdAndUpdate(userId, updateQuery);

		if (!user) throw new Error("User не найден.");

		revalidatePath(path);
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function getUserNotifications(params: GetUserNotificationParams) {
	try {
		connectToDatabase();
		const {clerkId, page = 1, pageSize = 10} = params;

		const skipAmount = (page - 1) * pageSize;

		const user = await User.findOne({
			clerkId,
		})
			.select("notifications")
			.populate([
				{
					path: "notifications.user",
					select: "username picture name",
				},
				{
					path: "notifications.postId",
					select: "_id title",
				},
			])
			.limit(pageSize);

		if (!user) return null;

		const notifications = user.notifications.slice(skipAmount, pageSize + skipAmount);

		const isNext = user.notifications.length > pageSize + skipAmount;

		return {notifications, isNext};
	} catch (e) {
		console.log(e);
		throw e;
	}
}

interface GetUserFavouritesParams {
	clerkId: string;
}

export async function getUserFavourites(params: GetUserFavouritesParams) {
	try {
		const {clerkId} = params;

		const user = await User.findOne({clerkId}).populate({
			path: "savedPosts",
			options: {
				populate: [
					{
						path: "author",
						select: "picture name username",
					},
					{
						path: "tags",
					},
				],
			},
		});

		if (!user) throw new Error("Пользователь не найден.");

		return user.savedPosts;
	} catch (e) {
		console.log(e);
	}
}

interface DeletePostFromFavouritesParams {
	clerkId: string;
	postId: string;
}

export async function deletePostFromFavourites(params: DeletePostFromFavouritesParams) {
	try {
		const {clerkId, postId} = params;

		const user = await User.findOneAndUpdate(
			{clerkId},
			{
				$pull: {
					savedPosts: postId,
				},
			}
		);

		if (!user) throw new Error("Пользователь не найден.");

		return;
	} catch (e) {
		console.log(e);
	}
}
