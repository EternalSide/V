"use server";
import Comment from "@/server_actions/models/comment.model";
import {connectToDatabase} from "../lib/mongoose";
import {CreateCommentParams, GetCommentsParams} from "./types/index.shared";
import {revalidatePath} from "next/cache";
import Post from "@/server_actions/models/post.model";

export const createComment = async (params: CreateCommentParams) => {
	try {
		connectToDatabase();

		const {author, path, post, text} = params;

		const newComment = await Comment.create({
			author,
			post,
			text,
		});

		await Post.findByIdAndUpdate(post, {
			$push: {comments: newComment._id},
		});

		return revalidatePath(path);
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const getComments = async (params: GetCommentsParams) => {
	try {
		connectToDatabase();

		const {postId} = params;

		const post = await Post.findById(postId).populate({
			path: "comments",
			options: {
				sort: {createdAt: -1},
				populate: {
					path: "author",
					select: "_id username picture name",
				},
			},
		});

		return {comments: post.comments};
	} catch (e) {
		console.log(e);
		throw e;
	}
};
