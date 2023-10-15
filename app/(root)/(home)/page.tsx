import PostCard from "@/components/cards/PostCard";
import FilterComponents from "@/components/shared/FilterComponents";
import HomeFilters from "@/components/shared/HomeFilters";
import LeftSidebar from "@/components/shared/Sidebar/LeftSidebar";
import RightSidebar from "@/components/shared/Sidebar/RightSidebar";
import { homeFilters } from "@/constants";
import { getAllPosts, getRecommendedPosts } from "@/lib/actions/post.action";
import { getUserById } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";

export const metadata = {
  title: {
    absolute: "Главная / V",
  },
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  const user = await getUserById({ clerkId: userId! });

  let posts: any;

  if (searchParams?.q === "recommended") {
    if (userId) {
      posts = await getRecommendedPosts({ userId });
    } else {
      posts = await getRecommendedPosts({});
    }
  } else {
    posts = await getAllPosts({ filterValue: searchParams?.q });
  }

  return (
    <>
      <LeftSidebar
        username={user?.username}
        followingTags={user?.followingTags}
      />
      <section className="flex w-full flex-1 flex-col px-4 pb-6  pt-[87px]  max-lg:pl-0 max-md:pb-14 max-sm:px-4">
        <HomeFilters />
        <FilterComponents containerClasses="sm:hidden" filters={homeFilters} />
        <div className="mt-2.5 flex flex-col gap-1.5">
          {posts?.map((post: any, index: number) => {
            return (
              <PostCard
                key={post._id}
                userId={user?._id.toString()}
                firstPost={index === 0}
                banner={post?.banner}
                titleClassnames="text-2xl"
                author={{
                  name: post.author.name,
                  picture: post.author.picture,
                  username: post.author.username,
                  _id: post.author._id.toString(),
                }}
                post={{
                  id: post._id.toString(),
                  title: post.title,
                  comments: post.comments.length,
                  likes: post.upvotes.length,
                  views: post.views,
                  createdAt: post.createdAt,
                  tags: post.tags,
                }}
                isPostSaved={user?.savedPosts.includes(post._id)}
              />
            );
          })}
        </div>
      </section>
      <RightSidebar />
    </>
  );
}
