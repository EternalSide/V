"use server";

import Tag from "@/database/models/tag.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import User from "@/database/models/user.model";
import Post from "@/database/models/post.model";

export const getPopularTags = async () => {
  try {
    connectToDatabase();

    const tags = await Tag.find({}).limit(3);

    return tags;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getAllTags = async () => {
  try {
    connectToDatabase();

    const tags = await Tag.find({}).limit(16);

    return tags;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const followTag = async (params: any) => {
  try {
    connectToDatabase();

    const { path, tagId, userId, isFollowing } = params;

    let updateQuery = {};
    let userUpdateQ = {};

    if (isFollowing) {
      updateQuery = { $pull: { followers: userId } };
      userUpdateQ = { $pull: { followingTags: tagId } };
    } else {
      updateQuery = { $addToSet: { followers: userId } };
      userUpdateQ = { $push: { followingTags: tagId } };
    }

    await Tag.findByIdAndUpdate(tagId, updateQuery);
    await User.findByIdAndUpdate(userId, userUpdateQ);

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getTagInfo = async (params: any) => {
  try {
    connectToDatabase();

    const { tagName } = params;

    const tag = await Tag.findOne({ name: tagName })
      .populate({
        path: "posts",
        model: Post,
        options: {
          populate: {
            path: "author",
            model: User,
          },
        },
      })
      .populate("followers");

    return tag;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
