"use server";

import User from "@/database/models/user.model";
import { connectToDatabase } from "../mongoose";
import { CreatePostParams, GetPostByIdParams } from "./shared";
import Post from "@/database/models/post.model";
import { revalidatePath } from "next/cache";
import Tag from "@/database/models/tag.model";

export const createPost = async (params: CreatePostParams) => {
  try {
    connectToDatabase();

    const { author, path, tags, text, title } = params;
    // Добавить Пост, Пост пользователю в коллекцию. Добавить теги если есть.

    // Создадим новый Пост.
    const newPost = await Post.create({
      title,
      text,
      author,
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

export const getAllPosts = async () => {
  try {
    connectToDatabase();

    const posts = await Post.find({})
      .populate("author")
      .populate({ path: "tags", model: Tag, select: "name" })
      .sort({ createdAt: -1 });

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPopularPosts = async () => {
  try {
    connectToDatabase();

    const posts = await Post.find({}).sort({ upvotes: 1, views: 1 }).limit(5);

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
