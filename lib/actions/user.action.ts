"use server";

import User from "@/database/models/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateUserParams } from "./shared";

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
