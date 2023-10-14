import { getTagInfo } from "@/lib/actions/tag.action";

interface TagPageProps {
  params: {
    name: string;
  };
}

const TagPage = async ({ params }: TagPageProps) => {
  const tag = await getTagInfo({ tagName: params.name });
  console.log(tag);
  return (
    <div className="pt-[85px] w-full max-[1280px]:px-4">
      <h1 className="font-bold text-3xl first-letter:uppercase">{tag.name}</h1>
    </div>
  );
};
export default TagPage;
