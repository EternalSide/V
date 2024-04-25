import {IUser} from "@/server_actions/models/user.model";

export interface CreateUserParams {
	clerkId: string;
	name: string;
	username: string;
	email: string;
	picture: string;
}

export interface DeletePostFromFavouritesParams {
	clerkId: string;
	postId: string;
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
	page?: number;
	pageSize?: number;
}

export interface CreatePostParams {
	title: string;
	text: string;

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

export interface FollowTagParams {
	path: string;
	tagId: string;
	userId: string;
	isFollowing: boolean;
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

export interface GetUserNotificationParams {
	clerkId: string;
	page?: number;
	pageSize?: number;
}
