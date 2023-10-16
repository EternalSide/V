"use server";
import User from "@/database/models/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  GetUserNotificationParams,
  SavePostParams,
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

    await User.findOneAndUpdate({ clerkId }, updatedData, {
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
    // await Post.deleteMany({});
    // await Interaction.deleteMany({});
    // await Comment.deleteMany({});

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

    const user = await User.findOne({ clerkId }).populate("followingTags");

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

    const user = await User.findOne({
      username: username.toLowerCase(),
    }).populate({
      path: "posts",
      model: Post,
      options: {
        sort: { createdAt: -1 },
        select: ["-text"],
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

export async function savePost(params: SavePostParams) {
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

export async function getUserNotifications(params: GetUserNotificationParams) {
  try {
    connectToDatabase();
    const { clerkId, page = 1, pageSize = 2 } = params;

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

    if (!user) {
      throw new Error("user не найден.");
    }

    const notifications = user.notifications.slice(
      skipAmount,
      pageSize + skipAmount,
    );

    const isNext = user.notifications.length > pageSize + skipAmount;

    return { notifications, isNext };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
