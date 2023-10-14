import TagActions from "../shared/TagActions";

interface TagCardProps {
  tagTitle: string;
  tagPostsNumber: number;
  tagId: string;
  isFollowing: boolean;
  userId: string | null;
}

const TagCard = ({
  tagTitle,
  tagPostsNumber,
  tagId,
  isFollowing,
  userId,
}: TagCardProps) => {
  return (
    <div className="bg-main rounded-md p-5 h-48 flex items-center flex-col justify-center">
      <div className="flex flex-col gap-1.5">
        <h3 className="font-semibold text-xl">#{tagTitle}</h3>
        <p className="text-base text-neutral-400">Постов: {tagPostsNumber}</p>
        <TagActions
          isFollowing={isFollowing}
          tagId={tagId}
          tagTitle={tagTitle}
          userId={userId}
        />
      </div>
    </div>
  );
};
export default TagCard;
