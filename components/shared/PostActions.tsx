"use client";
import { viewQuestion } from "@/lib/actions/interaction.action";
import { setLike } from "@/lib/actions/post.action";
import { cn } from "@/lib/utils";
import { Heart, MessageCircle, Star } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "../ui/use-toast";
import StarAction from "./StarAction";

interface PostActionsProps {
  userId: string | null;
  postId: string;
  isLiked: boolean;
  isPostSaved: boolean;
  likesNumber: number;
  authorName: string;
}

const PostActions = ({
  userId,
  postId,
  isLiked,
  likesNumber,
  authorName,
  isPostSaved,
}: PostActionsProps) => {
  const path = usePathname();
  useEffect(() => {
    viewQuestion({
      postId: postId!,
      userId: userId || undefined,
      path,
    });
  }, [postId, path, userId]);

  const baseStyles = `hover:text-indigo-500 text-white transition cursor-pointer h-6 w-6`;

  const handleLike = async () => {
    if (!userId)
      return toast({
        duration: 2000,
        title: "Вы не авторизованы ❌",
        description: `Войдите в аккаунт, чтобы оценить пост.`,
      });

    if (isLiked) {
      toast({
        duration: 2000,
        title: "Оценка удалена ❌",
        description: `Вы отменили оценку поста пользователя ${authorName}`,
      });
    } else {
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
  };

  return (
    <div className="fixed flex flex-col items-center gap-7 pl-6 pt-24 text-center max-md:hidden">
      <div>
        <Heart
          fill={isLiked ? "#6366f1" : ""}
          onClick={handleLike}
          className={cn(
            baseStyles,
            isLiked && "text-[#6366f1] hover:opacity-90 transition",
          )}
        />
        <p className="mt-1.5 text-sm ">{likesNumber}</p>
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
