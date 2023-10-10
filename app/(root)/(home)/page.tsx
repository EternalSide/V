import PostCard from "@/components/cards/PostCard";
import HomeFilters from "@/components/shared/HomeFilters";
import LeftSidebar from "@/components/shared/Sidebar/LeftSidebar";
import RightSidebar from "@/components/shared/Sidebar/RightSidebar";
import { getAllPosts } from "@/lib/actions/post.action";

export const metadata = {
  title: {
    absolute: "Главная / V",
  },
};
export default async function Home({ searchParams }: any) {
  const posts = await getAllPosts({ searchValue: searchParams.q });

  return (
    <>
      <LeftSidebar />
      <section className="flex flex-1 flex-col px-5 pb-6 max-md:pb-14 sm:px-4">
        <div className="w-full max-w-3xl">
          <div className="flex flex-col pt-3">
            <HomeFilters />

            <div className="mt-2.5 flex flex-col gap-1.5">
              {posts.map((post: any, i) => {
                return (
                  <PostCard
                    key={post._id}
                    i={i}
                    banner={post?.banner}
                    titleClassnames="text-2xl"
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
        </div>
      </section>
      <RightSidebar />
    </>
  );
}
