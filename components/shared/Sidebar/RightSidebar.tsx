import { getPopularPosts } from "@/lib/actions/post.action";
import { getPopularTags } from "@/lib/actions/tag.action";
import Link from "next/link";
import { UserAvatar } from "../UserAvatar";
import { Button } from "@/components/ui/button";

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
  // console.log(popularTags);
  return (
    <div
      className="sticky right-0 top-0 flex h-fit w-[330px]
    flex-col overflow-y-auto pb-5  pt-[75px] text-white dark:shadow-none max-[1330px]:pr-4 max-xl:hidden"
    >
      <div className="bg-main flex w-full flex-col rounded-md border border-neutral-800">
        <BlockTitle name="Популярное" />
        {popularPosts.map((post: any) => (
          <Link
            href={`/post/${post._id.toString()}`}
            key={post._id}
            className="group border  border-transparent px-5 py-4 hover:border-indigo-700"
          >
            <p className="text-neutral-200 transition group-hover:text-indigo-500">
              {post.title}
            </p>
            <p className="mt-2 text-sm text-neutral-400">
              Комментариев: {post.numberOfComments}
            </p>
          </Link>
        ))}
      </div>
      <div className="bg-main mt-5 flex w-full flex-col rounded-md border border-neutral-800">
        <BlockTitle name="Топ Авторов" />

        <Link
          href={`/v`}
          className="group flex items-center justify-between border border-transparent px-5 py-4 hover:border-indigo-700"
        >
          <div className="flex items-center gap-2">
            <UserAvatar
              imgUrl="https://i.pinimg.com/736x/21/be/dc/21bedc5f6a6e9a957747901d8d27f40a.jpg"
              classNames="h-12 w-12"
            />
            <div>
              <h3 className="text-lg font-semibold">Lesha</h3>
              <p className="text-sm text-zinc-400">@V</p>
            </div>
          </div>
          <Button className="rounded-xl bg-indigo-600 font-semibold">
            Профиль
          </Button>
        </Link>
        <Link
          href={`/v`}
          className="group flex items-center justify-between border border-transparent px-5 py-4 hover:border-indigo-700"
        >
          <div className="flex items-center gap-2">
            <UserAvatar
              imgUrl="https://i.pinimg.com/736x/39/2b/84/392b84f739ed6fcbd109c106fcebd26f.jpg"
              classNames="h-12 w-12"
            />
            <div className="line-clamp-1 max-w-[120px]">
              <h3 className="line-clamp-1 text-lg font-semibold">
                Илон Максим
              </h3>
              <p className="line-clamp-1 text-sm text-zinc-400">@elonmuski</p>
            </div>
          </div>
          <Button className="rounded-xl bg-indigo-600 font-semibold">
            Профиль
          </Button>
        </Link>
        <Link
          href={`/v`}
          className="group flex items-center justify-between border border-transparent px-5 py-4 hover:border-indigo-700"
        >
          <div className="flex items-center gap-2">
            <UserAvatar
              imgUrl="https://i.pinimg.com/564x/ee/5c/c0/ee5cc0f0333d510772ede311a3489c9d.jpg"
              classNames="h-12 w-12"
            />
            <div>
              <h3 className="text-lg font-semibold">Tester</h3>
              <p className="text-sm text-zinc-400">@tester</p>
            </div>
          </div>
          <Button className="rounded-xl bg-indigo-600 font-semibold">
            Профиль
          </Button>
        </Link>
      </div>

      <div className="bg-main mt-5 flex w-full flex-col rounded-md border border-neutral-800">
        <BlockTitle name="Теги" />
        {popularTags.map((tag: any) => (
          <Link
            href={`/tags/${tag.name}`}
            key={tag._id}
            className="group border border-transparent px-5 py-4 hover:border-indigo-700"
          >
            <p className="font-semibold text-neutral-200 transition first-letter:uppercase hover:text-indigo-500 group-hover:text-indigo-500">
              {tag.name}
            </p>
            <p className="mt-2 text-sm text-neutral-400">
              Постов: {tag.numberOfPosts}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default RightSidebar;
