"use client";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { toast } from "../ui/use-toast";
import { savePost } from "@/lib/actions/user.action";
import { usePathname } from "next/navigation";
import { experimental_useOptimistic as useOptimistic, useState } from "react";
interface StarActionProps {
  isPostSaved: boolean;
  userId: string;
  postId: string;
  authorName: string;
}

const StarAction = ({
  isPostSaved,
  userId,
  postId,
  authorName,
}: StarActionProps) => {
  const path = usePathname();

  const [test, testQ] = useState(isPostSaved || false);

  const [isSavedOptimistic, setIsSavedOptimistic] = useOptimistic(
    isPostSaved || false,
    (state) => (isPostSaved = state),
  );

  const handleAddPostToFavourites = async (e: any) => {
    e.preventDefault();

    if (!userId)
      return toast({
        duration: 2000,
        title: "Вы не авторизованы ❌",
        description: `Войдите в аккаунт, чтобы добавить пост в избранное.`,
      });
    try {
      if (!test) {
        testQ(true);
        // setIsSavedOptimistic(true);
        toast({
          duration: 1000,
          title: `Пост добавлен в избранное ⭐`,
          description: `Вы добавили пост пользователя ${authorName} в избранное.`,
        });
        console.log("ok");
      } else {
        testQ(false);
        // console.log("o2k");
        // setIsSavedOptimistic(false);
        toast({
          duration: 1000,
          title: `Пост удален из избранного ❌`,
          description: `Вы удалили пост пользователя ${authorName} из избранного.`,
        });
        console.log("ok");
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
  const baseStyles =
    "h-5 w-5 cursor-pointer text-neutral-300 transition hover:opacity-90 h-6 w-6";
  return (
    <Star
      onClick={handleAddPostToFavourites}
      fill={test ? "#6366f1" : ""}
      className={cn(
        baseStyles,
        test && "text-[#6366f1] hover:opacity-90 transition",
      )}
    />
  );
};
export default StarAction;
