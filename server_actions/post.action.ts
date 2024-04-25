"use server";
import User from "@/server_actions/models/user.model";
import {connectToDatabase} from "../lib/mongoose";
import {
	CreatePostParams,
	DeletePostParams,
	EditPostParams,
	GetPostByIdParams,
	setLikeParams,
} from "./types/index.shared";
import Post from "@/server_actions/models/post.model";
import {revalidatePath} from "next/cache";
import Comment from "@/server_actions/models/comment.model";

export const createPost = async (params: CreatePostParams) => {
	try {
		connectToDatabase();

		const {author, path, text, title, banner} = params;

		const newPost = await Post.create({
			title,
			text,
			author,
			banner,
		});

		const postId = newPost._id.toString();

		await User.findByIdAndUpdate(author, {$push: {posts: postId}});

		revalidatePath(path);

		return postId;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getPostById = async (params: GetPostByIdParams) => {
	try {
		connectToDatabase();

		const {id} = params;

		const post = await Post.findById(id).populate({
			path: "author",
			model: User,
		});

		return post;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const getAllPosts = async () => {
	try {
		connectToDatabase();

		const posts = await Post.find()
			.select(["-text"])
			.populate({
				path: "author",
				select: "name _id picture username",
			})
			.populate({
				path: "comments",
				options: {
					populate: {
						path: "author",
					},
					sort: {
						createdAt: -1,
					},
				},
			})
			.sort({createdAt: -1});

		return JSON.parse(JSON.stringify(posts));
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const getPopularPosts = async () => {
	try {
		connectToDatabase();

		const posts = await Post.aggregate([
			{
				$match: {},
			},
			{
				$project: {
					title: true,
					numberOfComments: {
						$size: "$comments",
					},
					views: "$views",
					upvotes: "$upvotes",
				},
			},
			{
				$sort: {
					numberOfComments: -1,
					views: -1,
					upvotes: -1,
				},
			},
			{$limit: 3},
		]);

		return posts;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export async function deletePost(params: DeletePostParams) {
	try {
		connectToDatabase();
		const {postId, path, authorId} = params;

		await Post.findByIdAndDelete(postId);

		await User.findByIdAndUpdate(
			authorId,
			{$pull: {posts: postId}},
			{new: true}
		);
		await Comment.deleteMany({post: postId});

		return revalidatePath(path);
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function editPost(params: EditPostParams) {
	try {
		connectToDatabase();

		const {postId, title, text, path, banner} = params;

		const post = await Post.findById(postId);

		if (!post) {
			throw new Error("Пост не найден.");
		}

		post.title = title;
		post.text = text;
		post.banner = banner;

		await post.save();

		revalidatePath(path);
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function setLike(params: setLikeParams) {
	try {
		connectToDatabase();

		const {postId, userId, path, hasUpVoted} = params;

		let updateQuery = {};

		if (hasUpVoted) {
			updateQuery = {$pull: {upvotes: userId}};
		} else {
			updateQuery = {$addToSet: {upvotes: userId}};
		}

		await Post.findByIdAndUpdate(postId, updateQuery, {
			new: true,
		});

		revalidatePath(path);
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function viewPost(params: {postId: string}) {
	try {
		connectToDatabase();

		const {postId} = params;

		await Post.findByIdAndUpdate(postId, {
			$inc: {views: 1},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
}
