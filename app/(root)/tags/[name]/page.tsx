import PostCard from "@/components/cards/PostCard";
import FilterComponents from "@/components/shared/FilterComponents";
import HomeFilters from "@/components/shared/HomeFilters";
import MobileTagLeft from "@/components/shared/MobileTagLeft";
import TagHeader from "@/components/shared/TagHeader";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import { homeFilters } from "@/constants";
import { IPost } from "@/database/models/post.model";
import { getTagInfo } from "@/lib/actions/tag.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface TagPageProps {
  params: {
    name: string;
  };
  searchParams: any;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const tag = await getTagInfo({ tagName: params.name });

  if (!tag) {
    return {
      title: `Тег не найден / V`,
    };
  }

  return {
    title: `${tag.name[0].toUpperCase() + tag.name.slice(1)} / V`,
  };
}

const TagPage = async ({ params, searchParams }: TagPageProps) => {
  const tag = await getTagInfo({
    tagName: params.name,
    search: searchParams?.q ? searchParams.q : "",
  });
  const { userId } = auth();
  const user = await getUserById({ clerkId: userId! });

  const isFollowing = tag.followers.some(
    (t: any) => t._id.toString() === user?._id.toString(),
  );

  const isCreator = tag.author.toString() === user?._id.toString();

  return (
    <div className="pt-[85px] w-full max-[1280px]:px-4 h-[2000px]">
      <h1 className="font-bold text-4xl first-letter:uppercase">{tag.name}</h1>
      <TagHeader
        tagId={JSON.stringify(tag._id)}
        isFollowing={isFollowing}
        userId={JSON.stringify(user?._id)}
        tagTitle={tag.name}
        isCreator={isCreator}
      />
      <section className="flex justify-start gap-10 w-full mt-10 px-4">
        <div className="w-[285px] max-lg:hidden">
          <Link href={"/create"}>
            <Button className="text-white bg-indigo-600">Новый пост</Button>
          </Link>
          <div className="border-t px-5 py-5 mt-4 border-b border-neutral-800">
            <h3 className="font-semibold">Информация</h3>
            {tag?.info ? (
              tag.info
            ) : (
              <p className="text-sm text-zinc-300 mt-4">
                Автор не указал информацию.
              </p>
            )}
          </div>
          <div className="border-neutral-800 w-full" />
          <div className="px-5 py-5 border-b border-neutral-800">
            <h3 className="font-semibold">Участники</h3>
            {tag?.followers.length > 0 ? (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {tag.followers.map((item: any) => (
                  <Link key={item._id} href={`/${item.username}`}>
                    <UserAvatar imgUrl={item.picture} classNames="h-12 w-12" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 mt-4">
                <div className="relative h-32 w-3/4">
                  <Image
                    fill
                    src="https://i.pinimg.com/564x/50/d9/8a/50d98ab13eab211195c1ce2a41c49ef6.jpg"
                    alt="Лого Тега"
                    className="rounded-md object-cover"
                  />
                </div>
                <h3 className="text-zinc-400">Ничего не найдено...</h3>
              </div>
            )}
          </div>
          <div className="text-center mt-5">
            <p className="font-semibold text-zinc-400">
              Опубликовано постов: {tag.posts.length}
            </p>
          </div>
        </div>

        <div className="flex flex-col pt-3 flex-1">
          <div className="flex gap-3 items-center">
            <MobileTagLeft />
            <HomeFilters />
            <FilterComponents
              containerClasses="sm:hidden flex-1"
              filters={homeFilters}
            />
          </div>

          <div className="mt-2.5 flex flex-col gap-1.5">
            {tag.posts.length > 0 ? (
              tag.posts.map((post: any, index: number) => (
                <PostCard
                  key={post._id}
                  firstPost={index === 0}
                  banner={post?.banner}
                  titleClassnames="text-2xl"
                  isPostSaved={user?.savedPosts.includes(post._id)}
                  userId={user?._id.toString()}
                  author={{
                    name: post.author.name,
                    picture: post.author.picture,
                    username: post.author.username,
                    _id: post.author._id.toString(),
                  }}
                  post={{
                    title: post.title,
                    comments: post.comments.length,
                    likes: post.upvotes.length,
                    views: post.views,
                    createdAt: post.createdAt,
                    tags: post.tags,
                    id: post._id.toString(),
                  }}
                />
              ))
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-64 w-full">
                  <Image
                    fill
                    src="https://i.pinimg.com/736x/33/a5/fe/33a5fe463b06359c015cfa2ac6c21afd.jpg"
                    alt="Лого Тега"
                    className="rounded-md object-cover"
                  />
                </div>
                <h3 className="text-zinc-400">Ничего не найдено...</h3>
                <p className="text-zinc-400">
                  Станьте первым, кто напишет статью в разделе {params.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
export default TagPage;
