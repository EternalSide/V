"use client";

import { useState } from "react";
import { toast } from "../ui/use-toast";
import { usePathname } from "next/navigation";
import { followTag } from "@/lib/actions/tag.action";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  tagTitle: string;
  tagId: string;
  isFollowing: boolean;
  userId: string | null;
  page?: string;
}

const TagActions = ({ tagId, isFollowing, userId, tagTitle, page }: Props) => {
  const path = usePathname();
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      if (isFollowing) {
        toast({
          duration: 2000,
          title: "Подписка отменена ❌",
          description: `Вы отписались от тега - ${tagTitle}`,
        });
      } else {
        toast({
          duration: 2000,
          title: "Подписка добавлена ✅",
          description: `Вы подписались на тег - ${tagTitle}`,
        });
      }

      return await followTag({
        tagId: JSON.parse(tagId),
        userId: JSON.parse(userId),
        path,
        isFollowing,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex gap-3 items-center mt-3">
      <Button
        disabled={isLoading}
        onClick={(e) => handleFollowTag(e)}
        className={`!bg-indigo-600 !text-white ${
          isFollowing &&
          "!bg-transparent border-2 border-neutral-600 !text-neutral-300"
        }`}
      >
        {isFollowing ? "В читаемых ✓" : "Подписаться"}
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
