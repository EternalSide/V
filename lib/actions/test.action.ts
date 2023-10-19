"use server";

import Post from "@/database/models/post.model";
import { connectToDatabase } from "../mongoose";
import Interaction from "@/database/models/interaction.model";
import User from "@/database/models/user.model";
import Tag from "@/database/models/tag.model";

export const sendFakeData = async () => {
  try {
    connectToDatabase();

    const newPost = await Post.create({
      title: "Тестовый пост",
      text: "Тестовый пост Тестовый пост Тестовый пост Тестовый пост",
      author: "652f799214bd058487532fcc",
      banner:
        "https://i.pinimg.com/564x/69/28/11/6928119f6ab0144e711429426e986629.jpg",
    });

    const tags = ["test1", "test2", "test3"];
    const tagDocuments = [];
    const userId = "652f799214bd058487532fcc";

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        {
          $setOnInsert: { name: tag, userId },
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

    await User.findByIdAndUpdate(userId, { $push: { posts: id } });

    await Interaction.create({
      action: "create_post",
      user: userId,
      tags: tagDocuments,
    });

    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
