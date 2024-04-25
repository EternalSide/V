"use client";
import {cn} from "@/lib/utils";
import {Star} from "lucide-react";
import {toast} from "../ui/use-toast";
import {savePost} from "@/server_actions/user.action";
import {usePathname} from "next/navigation";

interface StarActionProps {
	isPostSaved: boolean;
	userId: string | null;
	postId: string;
}

const StarAction = ({isPostSaved, userId, postId}: StarActionProps) => {
	const path = usePathname();

	const handleAddPostToFavourites = async (e: any) => {
		e.preventDefault();

		if (!userId)
			return toast({
				duration: 2000,
				title: "Вы не авторизованы ❌",
				description: `Войдите в аккаунт, чтобы добавить пост в избранное.`,
			});
		try {
			toast({
				duration: 1000,
				title: !isPostSaved
					? `Пост добавлен в избранное ⭐`
					: "Пост удален из избранного ❌",
			});

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

	return (
		<button onClick={handleAddPostToFavourites}>
			<Star
				fill={isPostSaved ? "#6366f1" : ""}
				className={cn(
					"text-neutral-300 transition hover:opacity-90 h-6 w-6",
					isPostSaved && "text-[#6366f1] transition hover:opacity-90"
				)}
			/>
		</button>
	);
};
export default StarAction;
