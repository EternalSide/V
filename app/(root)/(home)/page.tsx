import PostCard from "@/components/cards/PostCard";
import FilterComponents from "@/components/shared/FilterComponents";
import HomeFilters from "@/components/shared/HomeFilters";
import Pagination from "@/components/shared/Pagination";
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

  let data: any = [];

  const pageResolver = searchParams?.page ? Number(searchParams.page) : 1;

  if (searchParams?.q === "recommended") {
    if (userId) {
      data = await getRecommendedPosts({
        userId,
        page: pageResolver,
      });
    } else {
      data = await getRecommendedPosts({
        page: pageResolver,
      });
    }
  } else {
    data = await getAllPosts({
      filterValue: searchParams?.q!,
      page: pageResolver,
    });
  }

  return (
    <div className="mx-auto flex  w-full max-w-7xl gap-3 max-lg:gap-0">
      <LeftSidebar
        username={user?.username}
        followingTags={user?.followingTags}
      />
      <section className="flex w-full flex-1 flex-col border-x border-neutral-700 pb-6 pt-[87px] max-lg:border-l-transparent  max-md:pb-14">
        <div className="">
          <div className="mb-3 border-b border-neutral-700 pb-4 ">
            <h1 className="px-4 text-3xl font-bold">Главная</h1>
          </div>

          <div className="px-4">
            <HomeFilters />
            <FilterComponents
              containerClasses="sm:hidden"
              filters={homeFilters}
            />
          </div>
        </div>
        <div className="mt-2.5 flex flex-col gap-1.5">
          {data.posts?.map((post: any) => (
            <PostCard
              key={post._id}
              userId={user?._id.toString()}
              banner={post?.banner}
              isPostSaved={user?.savedPosts.includes(post._id)}
              author={{
                name: post.author.name,
                picture: post.author.picture,
                username: post.author.username,
                _id: post.author._id.toString(),
              }}
              post={{
                id: post._id.toString(),
                title: post.title,
                comments: post.comments,
                likes: post.upvotes.length,
                views: post.views,
                createdAt: post.createdAt,
                tags: post.tags,
              }}
            />
          ))}
        </div>
        <Pagination
          pageValue={searchParams?.page ? Number(searchParams?.page) : 1}
          isNext={data.isNext}
        />
      </section>
      <RightSidebar />
    </div>
  );
}
