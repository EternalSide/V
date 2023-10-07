"use server";

import User from "@/database/models/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateUserParams, UpdateUserParams, deleteUserParams } from "./shared";
import { revalidatePath } from "next/cache";

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
    console.log(user);

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
