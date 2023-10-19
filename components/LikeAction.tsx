"use client";

import {usePathname, useRouter} from "next/navigation";
import {toast} from "./ui/use-toast";
import {useState} from "react";
import {setLike} from "@/lib/actions/post.action";
import {Heart} from "lucide-react";
const LikeAction = ({postId, userId, likes, likesLength}: any) => {
	const path = usePathname();

	const [isLiked, setIsLiked] = useState(likes.includes(userId));
	//   console.log(isLiked);
	//   const [optimisticLikes, addOptimisticLikes] = experimental_useOptimistic(
	//     likesLength || 0,
	//     (state, amount) => state + Number(amount),
	//   );

	const handleLike = async (e: any) => {
		e.preventDefault();
		if (!userId)
			return toast({
				duration: 2000,
				title: "Вы не авторизованы ❌",
				description: `Войдите в аккаунт, чтобы оценить пост.`,
			});

		try {
			if (isLiked) {
				setIsLiked(false);
				// addOptimisticLikes(-1);

				toast({
					duration: 2000,
					title: "Оценка удалена ❌",
					// description: `Вы отменили оценку поста пользователя ${authorName}`,
				});
			} else {
				setIsLiked(true);
				// addOptimisticLikes(1);

				toast({
					duration: 2000,
					title: `Оценка добавлена ✅`,
					// description: `Вам понравился пост пользователя ${authorName}`,
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
		<div className='flex items-center gap-1.5'>
			<Heart
				onClick={handleLike}
				className={
					isLiked
						? "text-indigo-600 transition hover:text-neutral-300 "
						: "text-neutral-300 transition hover:text-indigo-600"
				}
			/>
			<p className='text-sm text-neutral-300 '>{likesLength}</p>
		</div>
	);
};
export default LikeAction;
