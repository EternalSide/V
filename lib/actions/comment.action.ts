"use server";

import Comment from "@/database/models/comment.model";
import { connectToDatabase } from "../mongoose";
import { CreateCommentParams } from "./shared";
import { revalidatePath } from "next/cache";
import Post from "@/database/models/post.model";
import User from "@/database/models/user.model";

export const createComment = async (params: CreateCommentParams) => {
  try {
    connectToDatabase();

    const { author, path, post, text } = params;

    const newComment = await Comment.create({
      author,
      post,
      text,
    });

    await Post.findByIdAndUpdate(post, { $push: { comments: newComment._id } });

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getComments = async (params: any) => {
  try {
    connectToDatabase();

    const { post } = params;

    const qpost = await Post.findById(post).populate({
      path: "comments",
      model: Comment,
      options: {
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          model: User,
          select: "_id username picture name",
        },
      },
    });

    return { comments: qpost.comments };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
