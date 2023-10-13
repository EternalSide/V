"use server";

import User from "@/database/models/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreatePostParams,
  DeletePostParams,
  EditPostParams,
  GetPostByIdParams,
  setLikeParams,
} from "./shared";
import Post from "@/database/models/post.model";
import { revalidatePath } from "next/cache";
import Tag from "@/database/models/tag.model";

export const createPost = async (params: CreatePostParams) => {
  try {
    connectToDatabase();

    const { author, path, tags, text, title, banner } = params;
    // Добавить Пост, Пост пользователю в коллекцию. Добавить теги если есть.

    // Создадим новый Пост.
    const newPost = await Post.create({
      title,
      text,
      author,
      banner,
    });

    // * Массив тегов на добавление к посту.
    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        {
          $setOnInsert: { name: tag },
          $push: { posts: newPost._id },
        },
        { upsert: true, new: true },
      );

      tagDocuments.push(existingTag._id);
    }

    const id = newPost._id.toString();

    await Post.findByIdAndUpdate(id, {
      $push: { tags: { $each: tagDocuments } },
    });

    await User.findByIdAndUpdate(author, { $push: { posts: id } });

    revalidatePath(path);
    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPostById = async (params: GetPostByIdParams) => {
  try {
    connectToDatabase();

    const { id } = params;

    const post = await Post.findById(id)
      .populate("author")
      .populate({ path: "tags", model: Tag, select: "name" });

    return post;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface getAllPostsParams {
  searchValue: string;
}

export const getAllPosts = async (params: getAllPostsParams) => {
  try {
    connectToDatabase();
    const { searchValue } = params;

    let sortOptions = {};

    switch (searchValue) {
      case "new":
        sortOptions = { createdAt: -1 };
        break;

      case "recommended":
        sortOptions = { createdAt: -1 };
        break;

      case "popular":
        sortOptions = { upvotes: -1, views: -1 };
        break;

      default:
        break;
    }

    const posts = await Post.find({})
      .populate("author")
      .populate({ path: "tags", model: Tag, select: "name _id" })
      .sort(sortOptions);

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPopularPosts = async () => {
  try {
    connectToDatabase();

    const posts = await Post.find({}).sort({ upvotes: -1, views: -1 }).limit(5);

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function deletePost(params: DeletePostParams) {
  try {
    connectToDatabase();
    const { postId, path, authorId } = params;

    await Post.findByIdAndDelete(postId);

    await Tag.updateMany({ posts: postId }, { $pull: { posts: postId } });

    await User.findByIdAndUpdate(
      authorId,
      { $pull: { posts: postId } },
      { new: true },
    );

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function editPost(params: EditPostParams) {
  try {
    connectToDatabase();
    const { postId, title, text, path, banner } = params;

    const post = await Post.findById(postId).populate("tags");
    if (!post) {
      throw new Error("post не найден.");
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
    const { postId, userId, path, hasUpVoted } = params;

    let updateQuery = {};

    if (hasUpVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const post = await Post.findByIdAndUpdate(postId, updateQuery, {
      new: true,
    });
    if (!post) {
      throw new Error("post не найден.");
    }

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
