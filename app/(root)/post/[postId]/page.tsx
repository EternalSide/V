import { getPostById } from "@/lib/actions/post.action";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "@/components/shared/ParseHTML";
import Link from "next/link";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import PostActions from "@/components/shared/PostActions";
import { getUserById } from "@/lib/actions/user.action";
import CreateCommentForm from "@/components/forms/CreateCommentForm";
import AllComents from "@/components/shared/AllComents";
import { Metadata } from "next";
import UserCard from "@/components/cards/UserCard";

interface ProfilePageProps {
  params: { postId: string };
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const post = await getPostById({ id: params.postId });

  return {
    title: `${post.title} / V`,
  };
}

const PostPage = async ({ params }: ProfilePageProps) => {
  const post = await getPostById({ id: params.postId });
  const { userId } = auth();
  let user;
  if (userId) {
    user = await getUserById({ clerkId: userId });
  }
  const isOwnPost = post?.author.clerkId === userId;

  return (
    <div className="pt-[75px] flex w-full items-start gap-3 max-md:px-0 max-lg:pt-[55px] max-lg:px-0 max-[1400px]:px-3">
      <PostActions
        isLiked={post.upvotes.includes(user?._id.toString())}
        isPostSaved={user?.savedPosts.includes(post._id)}
        userId={user?._id.toString()}
        postId={post._id.toString()}
        likesNumber={post.upvotes.length}
        authorName={post.author.name}
      />

      <div className="bg-main ml-20 flex flex-1 flex-col rounded-md max-md:ml-0 ">
        {post?.banner && (
          <div className="relative h-[320px] w-full">
            <Image
              alt="Баннер"
              fill
              src={post?.banner}
              className="rounded-t-md object-cover object-center"
            />
          </div>
        )}

        <div className="mt-6 flex items-start gap-1.5 px-14 max-md:px-6">
          <div className="flex w-full items-start justify-between ">
            <Link
              href={`/${post.author.username}`}
              className="flex items-center gap-1.5"
            >
              <UserAvatar
                alt={post.author.name}
                classNames="h-10 w-10"
                imgUrl={post.author.picture}
              />
              <div>
                <h3 className="font-semibold first-letter:uppercase text-lg">
                  {post.author.name}
                </h3>
                <p className="text-sm text-neutral-400 -mt-0.5">
                  @{post.author.username}
                </p>
              </div>
            </Link>
            {isOwnPost && (
              <Link href={`/edit/${post._id}`}>
                <Button className="button-main">Редактировать</Button>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-2.5 px-14 max-md:px-6">
          <p className="text-xs text-neutral-400">
            {getTimestamp(post.createdAt)}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3 px-14 max-md:px-6">
          <p className="text-sm text-neutral-400">Просмотров: {post.views}</p>
          <p className="text-sm text-neutral-400">
            Комментариев: {post.comments.length}
          </p>
        </div>

        <div className="mt-10 px-14 max-md:px-6">
          <h1 className="text-5xl font-bold">{post.title}</h1>
          <ParseHTML data={post.text} post={true} />
        </div>

        <div className="w-full p-12 pt-8 border-t border-neutral-800 max-md:p-6">
          <h1 className="text-3xl font-semibold">
            Все Комментарии ({post.comments.length})
          </h1>

          <AllComents postId={params.postId} />
          <CreateCommentForm
            authorId={user?._id.toString()}
            postId={params.postId}
          />
        </div>
      </div>

      <UserCard author={post.author} />
    </div>
  );
};
export default PostPage;
