import Link from "next/link";
import { Button } from "../ui/button";

interface TagCardProps {
  tagTitle: string;
  tagPostsNumber: number;
  tagId: string;
}

const TagCard = ({ tagTitle, tagPostsNumber, tagId }: TagCardProps) => {
  return (
    <div className="bg-main rounded-md p-5 h-48 flex items-center flex-col justify-center">
      <div className="flex flex-col gap-1.5">
        <h3 className="font-semibold text-xl">#{tagTitle}</h3>
        <p className="text-base text-neutral-400">Постов: {tagPostsNumber}</p>
        <Link href={`/tags/${tagTitle}`}>
          <Button className="mt-3 button-main !bg-indigo-600 !text-white">
            Посмотреть
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default TagCard;
