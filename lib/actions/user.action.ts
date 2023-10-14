"use server";

import User from "@/database/models/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  UpdateUserParams,
  deleteUserParams,
  getUserByIdParams,
  getUserByUsername,
} from "./shared";
import { revalidatePath } from "next/cache";
import Post from "@/database/models/post.model";
import Tag from "@/database/models/tag.model";

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

    const { clerkId, updatedData, path } = params;

    const user = await User.findOneAndUpdate({ clerkId }, updatedData, {
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
    const { clerkId } = params;

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("Пользователь не найден.");
    }

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export async function getUserById(params: getUserByIdParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId });

    return user;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function getUserByUserName(params: getUserByUsername) {
  try {
    connectToDatabase();

    const { username } = params;

    const user = await User.findOne({ username }).populate({
      path: "posts",
      model: Post,
      options: {
        sort: { createdAt: -1 },
        populate: [
          {
            path: "tags",
            model: Tag,
            select: "name",
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

export async function savePost(params: any) {
  try {
    connectToDatabase();
    const { postId, userId, path, isPostSaved } = params;

    let updateQuery = {};

    if (isPostSaved) {
      updateQuery = { $pull: { savedPosts: postId } };
    } else {
      updateQuery = { $addToSet: { savedPosts: postId } };
    }

    const user = await User.findByIdAndUpdate(userId, updateQuery, {
      new: true,
    });
    if (!user) {
      throw new Error("user не найден.");
    }

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
