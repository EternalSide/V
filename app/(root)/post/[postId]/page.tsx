import { getPostById } from "@/lib/actions/post.action";
import { formatDate, getTimestamp } from "@/lib/utils";
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
    <div className="flex w-full items-start gap-3 max-md:px-3">
      <PostActions
        isLiked={post.upvotes.includes(user?._id.toString())}
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
          <UserAvatar
            alt={post.author.name}
            classNames="h-10 w-10"
            imgUrl={post.author.picture}
          />

          <div className="flex w-full items-start justify-between ">
            <div>
              <Link href={`/${post.author.username}`}>
                <p className="font-semibold first-letter:uppercase">
                  {post.author.name}
                </p>
                <p className="text-sm text-neutral-400">
                  @{post.author.username}
                </p>
              </Link>
            </div>
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
        <h1 className="mt-10 px-14 text-5xl font-bold max-md:px-6">
          {post.title}
        </h1>
        <ParseHTML data={post.text} post={true} />

        {/* <PostComments /> */}
        <div className="w-full p-12  border-t border-neutral-800">
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

      {/* Часть справа */}
      <div className="bg-main  relative h-fit w-[320px] rounded-md border border-neutral-800 max-lg:hidden">
        <div className="w-full h-16 bg-indigo-700"> </div>
        <div className="p-5">
          <div className="flex items-start gap-2">
            <UserAvatar
              alt={post.author.name}
              classNames="h-10 w-10"
              imgUrl={post.author.picture}
            />
            <div>
              <h3 className="text-xl font-semibold first-letter:uppercase">
                {post.author.name}
              </h3>
              <p className="text-sm text-neutral-400">
                @{post.author.username}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <div>
              <h3 className="text-base font-semibold text-neutral-400">
                О себе:
              </h3>
              <p className="text-white">
                {post.author?.bio
                  ? post.author?.bio
                  : "Информация отсутствует."}
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-neutral-400">
                Постов:
              </h3>
              <p className="text-neutral-300">{post.author.posts.length}</p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-neutral-400">
                Регистрация:
              </h3>
              <p className="text-neutral-300">
                {formatDate(post.author.joinedAt)}
              </p>
            </div>
            <Link href={`/${post.author.username}`}>
              <Button className="w-full bg-indigo-600 text-white">
                Профиль
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostPage;
