"use client";
import { toast } from "../ui/use-toast";
import { usePathname } from "next/navigation";
import { followTag } from "@/lib/actions/tag.action";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
interface Props {
  tagTitle: string;
  tagId: string;
  isFollowing: boolean;
  userId: string | null;
  page?: string;
}

const TagActions = ({ tagId, isFollowing, userId, tagTitle, page }: Props) => {
  const path = usePathname();
  const [isTagOptimistic, setIsTagOptimistic] = useState(isFollowing || false);

  const handleFollowTag = async (e: any) => {
    try {
      e.preventDefault();
      if (!userId) {
        return toast({
          duration: 2000,
          title: "Вы не авторизованы ❌",
          description: `Войдите в аккаунт, чтобы подписаться на тег.`,
        });
      }

      if (isTagOptimistic) {
        setIsTagOptimistic(!isTagOptimistic);
        toast({
          duration: 2000,
          title: "Подписка отменена ❌",
          description: `Вы отписались от тега - ${tagTitle}`,
        });
      } else {
        setIsTagOptimistic(!isTagOptimistic);
        toast({
          duration: 2000,
          title: "Подписка добавлена ✅",
          description: `Вы подписались на тег - ${tagTitle}`,
        });
      }
      await followTag({
        tagId: JSON.parse(tagId),
        userId: JSON.parse(userId),
        path,
        isFollowing,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={handleFollowTag}
        className={`!bg-indigo-600 !text-white ${
          isTagOptimistic &&
          "border-2 border-neutral-600 !bg-transparent !text-neutral-300"
        }`}
      >
        {isTagOptimistic ? "Отписаться" : "Подписаться"}
      </Button>
      {page !== "tagPage" && (
        <Link href={`/tags/${tagTitle}`}>
          <Button className="button-main !bg-indigo-600 !text-white">
            Перейти
          </Button>
        </Link>
      )}
    </div>
  );
};
export default TagActions;
