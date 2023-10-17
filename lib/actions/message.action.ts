"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/models/tag.model";
import Message from "@/database/message.model";
import { pusherServer } from "../pusher";
import User from "@/database/models/user.model";

export const sendMessage = async (params: any) => {
  try {
    connectToDatabase();

    const { authorId, tagId, path, text } = params;

    const newMessage = await Message.create({
      text,
      author: authorId,
      tag: tagId,
    });

    await Tag.findByIdAndUpdate(tagId, {
      $push: {
        messages: newMessage._id,
      },
    });

    const message = await Message.findById(newMessage._id).populate("author");

    await pusherServer.trigger(tagId, "new-message", message);

    revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
};

export const type = async (params: any) => {
  try {
    connectToDatabase();

    const { authorId, tagId, value } = params;

    const user = await User.findById(authorId);

    const data = {
      name: user.name,
      value,
    };

    await pusherServer.trigger(tagId, "new-type", data);

    // revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
};
