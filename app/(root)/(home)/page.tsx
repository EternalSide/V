import PostCard from "@/components/cards/PostCard";
import LeftSidebar from "@/components/shared/Sidebar/LeftSidebar";
import RightSidebar from "@/components/shared/Sidebar/RightSidebar";

import { getAllPosts } from "@/lib/actions/post.action";

export default async function Home() {
  // const active = "Рекомендованное";
  const posts = await getAllPosts();

  return (
    <>
      <LeftSidebar />
      <section className="flex flex-1 flex-col px-5 pb-6 max-md:pb-14 sm:px-4">
        <div className="w-full max-w-3xl text-white">
          <main className="pt-3">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold">Рекомендованное</h3>
              <h3 className="text-lg text-neutral-300">Новое</h3>
              <h3 className="text-lg text-neutral-300">Топ</h3>
            </div>
            <div className="mt-2.5 flex flex-col gap-1.5">
              {posts.map((post: any) => (
                <PostCard
                  tags={post.tags}
                  title={post.title}
                  author={{
                    name: post.author.name,
                    picture: post.author.picture,
                    username: post.author.username,
                  }}
                  comments={post.comments.length}
                  likes={post.upvotes.length}
                  views={post.views}
                  createdAt={post.createdAt}
                  key={post._id}
                  postId={post._id.toString()}
                  titleClassnames="text-2xl"
                />
              ))}
            </div>
          </main>
        </div>
      </section>
      <RightSidebar />
    </>
  );
}
