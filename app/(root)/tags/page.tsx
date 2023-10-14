import TagCard from "@/components/cards/TagCard";
import { ITag } from "@/database/models/tag.model";
import { getAllTags } from "@/lib/actions/tag.action";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Теги / V",
};

const TagsPage = async () => {
  const tags = await getAllTags();
  return (
    <div className="pt-[85px] w-full max-[1300px]:px-8">
      <h1 className="text-white font-bold text-3xl">Теги</h1>

      <div className="grid grid-cols-4 gap-3 mt-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {tags.map((tag: ITag) => (
          <TagCard
            key={tag._id}
            tagId={tag._id.toString()}
            tagPostsNumber={tag.posts.length}
            tagTitle={tag.name}
          />
        ))}
      </div>
    </div>
  );
};
export default TagsPage;
