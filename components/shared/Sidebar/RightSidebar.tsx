import { getPopularPosts } from "@/lib/actions/post.action";
import { getPopularTags } from "@/lib/actions/tag.action";
import Link from "next/link";

const BlockTitle = ({ name }: { name: string }) => {
  return (
    <div className="border-b border-black p-5">
      <h3 className="text-xl font-bold">#{name}</h3>
    </div>
  );
};

const RightSidebar = async () => {
  const popularTags = await getPopularTags();
  const popularPosts = await getPopularPosts();

  return (
    <div
      className="sticky right-0 top-0 mt-1.5 flex 
    h-fit w-[330px] flex-col  overflow-y-auto text-white dark:shadow-none max-xl:hidden"
    >
      <div className="bg-main flex w-full flex-col rounded-md border border-neutral-800">
        <BlockTitle name="Популярное" />
        {popularPosts.map((post: any) => (
          <Link
            href={`/post/${post._id.toString()}`}
            key={post._id}
            className="group border-b border-black px-5 py-4 border border-transparent hover:border-indigo-700"
          >
            <p className="text-neutral-200 transition group-hover:text-indigo-500">
              {post.title}
            </p>
            <p className="mt-2 text-sm text-neutral-400">
              Комментариев: {post.comments.length}
            </p>
          </Link>
        ))}
      </div>

      <div className="bg-main mt-5 flex w-full flex-col rounded-md border border-neutral-800">
        <BlockTitle name="Теги" />
        {popularTags.map((tag: any) => (
          <Link
            href={`/tag/${tag.name}`}
            key={tag._id}
            className="group border border-transparent hover:border-indigo-700 px-5 py-4"
          >
            <p className="group-hover:text-indigo-500 font-semibold text-neutral-200 transition hover:text-indigo-500">
              {tag.name}
            </p>
            <p className="mt-2 text-sm text-neutral-400">
              Постов: {tag.posts.length}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default RightSidebar;
