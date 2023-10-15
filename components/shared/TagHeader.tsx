"use client";

import Image from "next/image";
import TagActions from "./TagActions";
import { Button } from "../ui/button";
import Link from "next/link";

interface TagHeaderProps {
  tagTitle: string;
  tagPicture: string;
  tagDescription: string;
  isFollowing: boolean;
  tagId: string;
  userId: string;
  isCreator?: boolean;
}

const TagHeader = ({
  tagTitle,
  tagPicture,
  tagDescription,
  tagId,
  isFollowing,

  userId,
  isCreator,
}: TagHeaderProps) => {
  return (
    <div className="bg-main mt-3 w-full rounded-md p-2">
      <div className="flex items-start  justify-between px-6 py-5 max-lg:flex-col max-lg:gap-10">
        <div className="flex items-center gap-4">
          <div>
            {tagPicture ? (
              <div className="relative h-28 w-28 max-md:h-20 max-md:w-20">
                <Image
                  fill
                  src={tagPicture}
                  alt="Лого Тега"
                  className="-mt-2 rounded-full object-cover max-md:mt-0"
                />
              </div>
            ) : (
              <div className="relative h-28 w-28">
                <Image
                  fill
                  src="/nouser.jfif"
                  alt="Лого Тега"
                  className="rounded-full object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <h3 className="text-3xl font-semibold first-letter:uppercase">
              {tagTitle}
            </h3>
            {tagDescription ? (
              <p className="mt-3 max-md:text-sm">{tagDescription}</p>
            ) : (
              <p className="mt-3">Описание к тегу отсутствует.</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TagActions
            isFollowing={isFollowing}
            tagId={tagId}
            tagTitle={tagTitle}
            userId={userId}
            page={"tagPage"}
          />
          {isCreator && (
            <Link href={`/tags/${tagTitle}/edit`}>
              <Button className="bg-indigo-600 text-white">
                Редактировать
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default TagHeader;
