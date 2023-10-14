"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { followTag } from "@/lib/actions/tag.action";

interface TagCardProps {
  tagTitle: string;
  tagPostsNumber: number;
  tagId: string;
  isFollowing: boolean;
  userId: string;
}

const TagCard = ({
  tagTitle,
  tagPostsNumber,
  tagId,
  isFollowing,
  userId,
}: TagCardProps) => {
  const path = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowTag = async (e: any) => {
    try {
      e.preventDefault();
      if (!userId) return;
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
    <div className="bg-main rounded-md p-5 h-48 flex items-center flex-col justify-center">
      <div className="flex flex-col gap-1.5">
        <h3 className="font-semibold text-xl">#{tagTitle}</h3>
        <p className="text-base text-neutral-400">Постов: {tagPostsNumber}</p>
        <div className="flex gap-3 items-center mt-3">
          <Link href={`/tags/${tagTitle}`}>
            <Button className="button-main !bg-indigo-600 !text-white">
              Посмотреть
            </Button>
          </Link>
          <Link href={`/tags/${tagTitle}`}>
            <Button
              disabled={isLoading}
              onClick={(e) => handleFollowTag(e)}
              className=" !bg-white !text-indigo-600 "
            >
              {isFollowing ? "Отписаться" : "Подписаться"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default TagCard;
