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
  banner: string;
}

export interface CreateCommentParams {
  text: string;
  author: string;
  post: string;
  path: string;
}
export interface GetPostByIdParams {
  id: string;
}

export interface DeletePostParams {
  postId: string;
  path: string;
  authorId: string;
}
export interface EditPostParams {
  postId: string;
  title: string;
  text: string;
  banner: string;
  path: string;
}

export interface setLikeParams {
  postId: string;
  userId: string;
  path: string;
  hasUpVoted: boolean;
}

export interface GetCommentsParams {
  postId: string;
}

export interface SavePostParams {
  postId: string;
  userId: string;
  path: string;
  isPostSaved: boolean;
}

export interface GetTagInfoParams {
  tagName: string;
  search?: any;
}
export interface FollowTagParams {
  path: string;
  tagId: string;
  userId: string;
  isFollowing: boolean;
}

export interface GetAllPostsParams {
  filterValue?: string;
}

export interface EditTagParams {
  path: string;
  tagId: string;
  userId: string;
  authorId: string;
  updatedData: {
    name: string;
    info: string;
    description: string;
    picture: string;
  };
}
