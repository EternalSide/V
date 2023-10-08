import { IUser } from "@/database/models/user.model";
import { Schema } from "mongoose";

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface deleteUserParams {
  clerkId: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updatedData: Partial<IUser>;
  path: string;
}

export interface getUserByIdParams {
  clerkId: string;
}
export interface getUserByUsername {
  username: string;
}

export interface CreatePostParams {
  title: string;
  text: string;
  tags: string[];
  author: string;
  path: string;
}
export interface GetPostByIdParams {
  id: string;
}
