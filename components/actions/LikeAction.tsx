"use client";
import {usePathname} from "next/navigation";
import {toast} from "../ui/use-toast";
import {setLike} from "@/server_actions/post.action";
import {Heart} from "lucide-react";
import {Button} from "../ui/button";
import {useOptimistic, useState} from "react";
import {cn} from "@/lib/utils";

interface Props {
	postId: string;
	userId: string | null;
	isLiked: boolean;
	likesLength: number;
	page?: string;
}

const LikeAction = ({postId, userId, isLiked, likesLength, page}: Props) => {
	const path = usePathname();

	const [isLikedOptimistic, setIsLikedOptimistic] = useState(isLiked || false);
	const [optimisticLikes, addOptimisticLikes] = useOptimistic(
		likesLength || 0,
		(state, amount) => state + Number(amount)
	);

	const handleLike = async (e: any) => {
		e.preventDefault();
		if (!userId)
			return toast({
				duration: 2000,
				title: "Вы не авторизованы ❌",
				description: `Войдите в аккаунт, чтобы оценить пост.`,
			});

		try {
			setIsLikedOptimistic(isLikedOptimistic ? false : true);
			addOptimisticLikes(isLikedOptimistic ? -1 : 1);
			toast({
				duration: 2000,
				title: isLikedOptimistic ? "Оценка удалена ❌" : `Оценка добавлена ✅`,
			});

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

	if (page === "Post") {
		return (
			<div>
				<Button
					className='p-0'
					onClick={handleLike}
				>
					<Heart
						fill={isLikedOptimistic ? "#6366f1" : ""}
						className={cn(
							"hover:text-indigo-500 text-white transition h-6 w-6",
							isLikedOptimistic && "text-[#6366f1] transition hover:opacity-90"
						)}
					/>
				</Button>
				<p className='text-sm '>{optimisticLikes}</p>
			</div>
		);
	}

	return (
		<button
			onClick={handleLike}
			className='flex items-center gap-1.5 text-sm text-neutral-300'
		>
			<Heart
				fill={isLikedOptimistic ? "#6366f1" : ""}
				className={`hover:opacity-80 text-neutral-300 transition ${
					isLikedOptimistic && "!text-[#6366f1]"
				}`}
			/>
			{likesLength}
		</button>
	);
};
export default LikeAction;
