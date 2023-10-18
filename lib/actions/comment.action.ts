"use server";
import Comment from "@/database/models/comment.model";
import { connectToDatabase } from "../mongoose";
import { CreateCommentParams, GetCommentsParams } from "./shared";
import { revalidatePath } from "next/cache";
import Post from "@/database/models/post.model";
import User from "@/database/models/user.model";
import Interaction from "@/database/models/interaction.model";
import { pusherServer } from "../pusher";

export const createComment = async (params: CreateCommentParams) => {
  try {
    connectToDatabase();

    const { author, path, post, text } = params;

    const newComment = await Comment.create({
      author,
      post,
      text,
    });

    const updatedPost = await Post.findByIdAndUpdate(post, {
      $push: { comments: newComment._id },
    });

    // Для рекомендаций.
    await Interaction.create({
      action: "comment_post",
      user: author,
      tags: updatedPost.tags,
    });

    // Уведомления.
    const notification = {
      event: "comment",
      text,
      postId: updatedPost._id,
      user: updatedPost.author,
    };

    // Добавить уведомление.
    await User.findByIdAndUpdate(updatedPost.author, {
      $push: {
        notifications: notification,
      },
    });

    /* Отправляем уведомление пользователю.
    Сменить на !isOwnAction - сейчас отправляет 
    уведомление сам себе
    */
    const isOwnAction = author === updatedPost.author.toString();

    if (isOwnAction) {
      const user = await User.findById(author);

      const messageForUser = `🔔 ${user.name} прокомментировал ваш пост - ${updatedPost.title}`;

      await pusherServer.trigger(
        updatedPost.author.toString(),
        "comment",
        messageForUser,
      );
    }

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getComments = async (params: GetCommentsParams) => {
  try {
    connectToDatabase();

    const { postId } = params;

    const post = await Post.findById(postId).populate({
      path: "comments",
      options: {
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "_id username picture name",
        },
      },
    });

    return { comments: post.comments };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
