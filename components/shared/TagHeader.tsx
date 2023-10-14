"use client";

import Image from "next/image";
import TagActions from "./TagActions";

interface TagHeaderProps {
  tagTitle: string;
  isFollowing: boolean;
  tagId: string;
  userId: string;
}

const TagHeader = ({
  tagTitle,
  isFollowing,
  tagId,
  userId,
}: TagHeaderProps) => {
  return (
    <div className="mt-3 w-full bg-main p-2 rounded-md ">
      <div className="px-6 py-5  flex justify-between items-start">
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
            {true && <p className="mt-3">Информация не найдена.</p>}
          </div>
        </div>
        <TagActions
          isFollowing={isFollowing}
          tagId={tagId}
          tagTitle={tagTitle}
          userId={userId}
          page={"tagPage"}
        />
      </div>
    </div>
  );
};
export default TagHeader;
