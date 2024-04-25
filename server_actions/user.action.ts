"use server";
import User from "@/server_actions/models/user.model";
import {connectToDatabase} from "../lib/mongoose";
import {
	CreateUserParams,
	DeletePostFromFavouritesParams,
	SavePostParams,
	UpdateUserParams,
	getUserByIdParams,
	getUserByUsername,
} from "./types/index.shared";
import {revalidatePath} from "next/cache";
import Post from "@/server_actions/models/post.model";

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

		await User.findOneAndUpdate({clerkId}, updatedData, {
			new: true,
			upsert: true,
		});

		revalidatePath(path);
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export async function getUserById(params: getUserByIdParams) {
	try {
		connectToDatabase();

		const {clerkId} = params;

		const user = await User.findOne({clerkId});

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

		const {username} = params;

		const user = await User.findOne({
			username: username.toLowerCase(),
		}).populate({
			path: "posts",
			model: Post,
			options: {
				sort: {createdAt: -1},
				select: ["-text"],
				populate: [
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
		});

		return user;
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

		await User.findByIdAndUpdate(userId, updateQuery);

		revalidatePath(path);
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function getUserFavourites(params: {clerkId: string}) {
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
				],
			},
		});

		if (!user) throw new Error("Пользователь не найден.");

		return user.savedPosts;
	} catch (e) {
		console.log(e);
	}
}

export async function deletePostFromFavourites(
	params: DeletePostFromFavouritesParams
) {
	try {
		const {clerkId, postId} = params;

		await User.findOneAndUpdate(
			{clerkId},
			{
				$pull: {
					savedPosts: postId,
				},
			}
		);
	} catch (e) {
		console.log(e);
	}
}
