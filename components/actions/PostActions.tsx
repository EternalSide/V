"use client";
import {viewQuestion} from "@/lib/actions/interaction.action";
import {setLike} from "@/lib/actions/post.action";
import {cn} from "@/lib/utils";
import {Heart, MessageCircle} from "lucide-react";
import {usePathname} from "next/navigation";
import {toast} from "../ui/use-toast";
import StarAction from "./StarAction";
import {useOptimistic, useEffect, useState} from "react";
import {Button} from "../ui/button";
import CommentAction from "./CommentAction";

interface PostActionsProps {
	userId: string | null;
	postId: string;
	isLiked: boolean;
	isPostSaved: boolean;
	likesNumber: number;
	commentsNumber: number;
	authorName: string;
}

const PostActions = ({
	userId,
	postId,
	isLiked,
	likesNumber,
	authorName,
	isPostSaved,
	commentsNumber,
}: PostActionsProps) => {
	const path = usePathname();

	const [isLikedOptimistic, setIsLikedOptimistic] = useState(isLiked || false);
	const [optimisticLikes, addOptimisticLikes] = useOptimistic(
		likesNumber || 0,
		(state, amount) => state + Number(amount)
	);

	useEffect(() => {
		viewQuestion({
			postId: postId!,
			userId: userId || undefined,
			path,
		});
	}, [postId, userId, path]);

	const baseStyles = `hover:text-indigo-500 text-white transition cursor-pointer h-6 w-6`;

	const handleLike = async () => {
		if (!userId)
			return toast({
				duration: 2000,
				title: "Вы не авторизованы ❌",
				description: `Войдите в аккаунт, чтобы оценить пост.`,
			});

		try {
			if (isLikedOptimistic) {
				setIsLikedOptimistic(false);
				addOptimisticLikes(-1);

				toast({
					duration: 2000,
					title: "Оценка удалена ❌",
					description: `Вы отменили оценку поста пользователя ${authorName}`,
				});
			} else {
				setIsLikedOptimistic(true);
				addOptimisticLikes(1);

				toast({
					duration: 2000,
					title: `Оценка добавлена ✅`,
					description: `Вам понравился пост пользователя ${authorName}`,
				});
			}

			await setLike({
				postId,
				userId,
				path,
				hasUpVoted: isLiked,
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className='fixed flex flex-col items-center justify-center gap-7 pl-9 pt-14 text-center max-lg:pl-7 max-md:hidden'>
			<div>
				<Button
					className='p-0'
					onClick={handleLike}
				>
					<Heart
						fill={isLikedOptimistic ? "#6366f1" : ""}
						className={cn(
							baseStyles,
							isLikedOptimistic && "text-[#6366f1] transition hover:opacity-90"
						)}
					/>
				</Button>
				<p className='text-sm '>{optimisticLikes}</p>
			</div>
			<div>
				<CommentAction>
					<MessageCircle className={cn(baseStyles)} />
					<p className='text-sm mt-2'>{commentsNumber}</p>
				</CommentAction>
			</div>
			<div>
				<StarAction
					authorName={authorName}
					userId={userId!}
					postId={postId}
					isPostSaved={isPostSaved}
				/>
			</div>
		</div>
	);
};
export default PostActions;
