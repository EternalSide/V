import PostCard from "@/components/cards/PostCard";
import FilterComponents from "@/components/shared/FilterComponents";
import HomeFilters from "@/components/shared/HomeFilters";
import LeftSidebar from "@/components/shared/Sidebar/LeftSidebar";
import RightSidebar from "@/components/shared/Sidebar/RightSidebar";
import { homeFilters } from "@/constants";
import { getAllPosts } from "@/lib/actions/post.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

export const metadata = {
  title: {
    absolute: "Главная / V",
  },
};
export default async function Home({ searchParams }: any) {
  const posts = await getAllPosts({ searchValue: searchParams.q });
  const { userId } = auth();
  const user = await getUserById({ clerkId: userId! });
  return (
    <>
      <LeftSidebar />
      <section className="pt-[75px] flex flex-1 w-full flex-col px-4 pb-6 max-md:pb-14 sm:px-4">
        <div className="flex flex-col pt-3">
          <HomeFilters />
          <FilterComponents
            containerClasses="sm:hidden"
            filters={homeFilters}
          />
          <div className="mt-2.5 flex flex-col gap-1.5">
            {posts.map((post: any, index: number) => {
              return (
                <PostCard
                  key={post._id}
                  index={index}
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
              );
            })}
          </div>
        </div>
      </section>
      <RightSidebar />
    </>
  );
}
