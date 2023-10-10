"use client";
import { viewQuestion } from "@/lib/actions/interaction.action";
import { Heart, MessageCircle, Star } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface PostActionsProps {
  userId: string | null;
  postId?: string;
}

const PostActions = ({ userId, postId }: PostActionsProps) => {
  const path = usePathname();
  useEffect(() => {
    viewQuestion({
      postId: postId!,
      userId: userId ? userId : undefined,
      path,
    });
  }, [postId, path, userId]);

  return (
    <div className="fixed flex flex-col items-center gap-7 pl-6 pt-24 text-center max-md:hidden">
      <div>
        <Heart />
        <p className="mt-1.5 text-sm">0</p>
      </div>
      <div>
        <MessageCircle />
        <p className="mt-1.5 text-sm">0</p>
      </div>
      <div>
        <Star />
        <p className="mt-1.5 text-sm">0</p>
      </div>
    </div>
  );
};
export default PostActions;
