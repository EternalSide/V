"use client";

import Image from "next/image";
import TagActions from "./TagActions";
import { Button } from "../ui/button";

interface TagHeaderProps {
  tagTitle: string;
  isFollowing: boolean;
  tagId: string;
  userId: string;
  isCreator?: boolean;
}

const TagHeader = ({
  tagTitle,
  isFollowing,
  tagId,
  userId,
  isCreator,
}: TagHeaderProps) => {
  return (
    <div className="mt-3 w-full bg-main p-2 rounded-md">
      <div className="px-6 py-5  flex justify-between items-start max-md:flex-col max-md:gap-2">
        <div className="flex items-center gap-4">
          <div>
            {true && (
              <div className="relative h-28 w-28">
                <Image
                  fill
                  src="https://i.pinimg.com/564x/20/99/d0/2099d09e51ba023c7b66546f99613329.jpg"
                  alt="Лого Тега"
                  className="rounded-full object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-3xl first-letter:uppercase">
              {tagTitle}
            </h3>
            {true && <p className="mt-3">Описание к тегу отсутствует.</p>}
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
            <Button className="bg-indigo-600 text-white">Редактировать</Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default TagHeader;
