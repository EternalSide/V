"use server";

import Post from "@/database/models/post.model";
import { connectToDatabase } from "../mongoose";
import Interaction from "@/database/models/interaction.model";
import { revalidatePath } from "next/cache";

export async function viewQuestion(params: any) {
  try {
    connectToDatabase();

    const { postId, userId, path } = params;

    // Увеличить просмотры поста.
    await Post.findByIdAndUpdate(postId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        post: postId,
      });

      if (existingInteraction) return;

      // Save User Action - для Системы Рекомендаций.
      await Interaction.create({
        user: userId,
        action: "view",
        post: postId,
      });

      revalidatePath(path);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
