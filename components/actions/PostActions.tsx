"use client";
import {viewPost} from "@/server_actions/post.action";
import {cn} from "@/lib/utils";
import {MessageCircle} from "lucide-react";
import {usePathname} from "next/navigation";
import StarAction from "./StarAction";
import {useEffect} from "react";
import CommentAction from "./CommentAction";
import LikeAction from "./LikeAction";

interface PostActionsProps {
	userId: string | null;
	postId: string;
	isLiked: boolean;
	isPostSaved: boolean;
	likesLength: number;
	commentsNumber: number;
}

const PostActions = ({
	userId,
	postId,
	isLiked,
	likesLength,
	isPostSaved,
	commentsNumber,
}: PostActionsProps) => {
	const path = usePathname();

	useEffect(() => {
		viewPost({
			postId,
		});
	}, [postId, path]);

	return (
		<div className='fixed flex flex-col items-center justify-center gap-7 pl-9 pt-14 text-center max-lg:pl-7 max-md:hidden'>
			<LikeAction
				postId={postId}
				userId={userId}
				likesLength={likesLength}
				isLiked={isLiked}
			/>
			<div>
				<CommentAction>
					<MessageCircle className='hover:text-indigo-500 text-white transition cursor-pointer h-6 w-6' />
					<p className='text-sm mt-2'>{commentsNumber}</p>
				</CommentAction>
			</div>
			<div>
				<StarAction
					userId={userId}
					postId={postId}
					isPostSaved={isPostSaved}
				/>
			</div>
		</div>
	);
};
export default PostActions;
