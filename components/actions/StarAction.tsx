"use client";
import {cn} from "@/lib/utils";
import {Star} from "lucide-react";
import {toast} from "../ui/use-toast";
import {savePost} from "@/lib/actions/user.action";
import {usePathname} from "next/navigation";
import {useState} from "react";
interface StarActionProps {
	isPostSaved: boolean;
	userId: string;
	postId: string;
	authorName: string;
}

const StarAction = ({isPostSaved, userId, postId, authorName}: StarActionProps) => {
	const path = usePathname();

	const [isSaved, setIsSaved] = useState(isPostSaved || false);

	const handleAddPostToFavourites = async (e: any) => {
		e.preventDefault();

		if (!userId)
			return toast({
				duration: 2000,
				title: "Вы не авторизованы ❌",
				description: `Войдите в аккаунт, чтобы добавить пост в избранное.`,
			});
		try {
			if (!isPostSaved) {
				// setIsSaved(true);

				toast({
					duration: 1000,
					title: `Пост добавлен в избранное ⭐`,
					description: `Вы добавили пост пользователя ${authorName} в избранное.`,
				});
			} else {
				// setIsSaved(false);

				toast({
					duration: 1000,
					title: `Пост удален из избранного ❌`,
					description: `Вы удалили пост пользователя ${authorName} из избранного.`,
				});
			}
			await savePost({
				userId,
				postId,
				isPostSaved,
				path,
			});
		} catch (e) {
			console.log(e);
		}
	};
	const baseStyles = "h-5 w-5 cursor-pointer text-neutral-300 transition hover:opacity-90 h-6 w-6";
	return (
		<Star
			onClick={handleAddPostToFavourites}
			fill={isPostSaved ? "#6366f1" : ""}
			className={cn(baseStyles, isPostSaved && "text-[#6366f1] transition hover:opacity-90")}
		/>
	);
};
export default StarAction;
