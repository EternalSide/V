import { IUser } from "@/database/models/user.model";

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
