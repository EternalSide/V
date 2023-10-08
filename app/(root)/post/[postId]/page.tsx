import { getPostById } from "@/lib/actions/post.action";
import { formatDate, getTimestamp } from "@/lib/utils";
import ParseHTML from "@/components/shared/ParseHTML";
import Link from "next/link";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Heart, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { auth } from "@clerk/nextjs";

const PostPage = async ({ params }: { params: { postId: string } }) => {
  const post = await getPostById({ id: params.postId });
  const { userId } = auth();

  const isOwnPost = post?.author.clerkId === userId;

  return (
    <div className="flex w-full items-start gap-3 max-md:px-3">
      <div className="fixed flex flex-col items-center gap-7 pl-6 pt-24 text-center max-md:hidden">
        <div>
          <Heart />
          <p className="mt-1.5 text-sm">0</p>
        </div>
        <div>
          <MessageCircle />
          <p className="mt-1.5 text-sm">0</p>
        </div>
        <div>
          <Star />
          <p className="mt-1.5 text-sm">0</p>
        </div>
      </div>

      <div className="bg-main ml-20 flex flex-1 flex-col rounded-md max-md:ml-0 ">
        {/* {post?.banner && (
          <div className="relative h-[320px] w-32">
            <Image
              alt="Баннер"
              fill
              src={post?.banner}
              className="rounded-t-md object-cover object-center"
            />
          </div>
        )} */}

        <div className="mt-6 flex items-start gap-1.5 px-14 max-md:px-6">
          <UserAvatar
            alt={post.author.name}
            classNames="h-10 w-10"
            imgUrl={post.author.picture}
          />

          <div className="flex w-full items-center justify-between ">
            <div>
              <Link href={`/${post.author.username}`}>
                <p className="font-semibold first-letter:uppercase">
                  {post.author.username}
                </p>
              </Link>
              <p className="mt-0.5 text-xs text-neutral-400">
                {getTimestamp(post.createdAt)}
              </p>
            </div>
            {isOwnPost && (
              <Link href={`/edit/${post._id}`}>
                <Button className="button-main">Редактировать</Button>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 px-14 max-md:px-6">
          <p className="text-sm text-neutral-400">Просмотров: {post.views}</p>
          <p className="text-sm text-neutral-400">В Избранном: 0</p>
        </div>

        <h1 className="mt-10 px-14 text-5xl font-bold max-md:px-6">
          {post.title}
        </h1>

        <ParseHTML data={post.text} />
      </div>

      {/* Часть справа */}
      <div className="bg-main  relative h-fit w-[320px] rounded-md border border-neutral-800 max-lg:hidden">
        {/* <div className="absolute left-0 top-0 h-32 w-full">
          <div className="relative h-32 w-full">
            <Image
              src="/test-gif.gif"
              fill
              alt={`gif`}
              className="object-center"
            />
          </div>
        </div> */}
        <div className="p-5">
          <div className="flex items-center gap-2">
            <UserAvatar
              alt={post.author.name}
              classNames="h-10 w-10"
              imgUrl={post.author.picture}
            />
            <h3 className="text-xl font-semibold first-letter:uppercase">
              {post.author.username}
            </h3>
          </div>
          <Link href={`/${post.author.username}`}>
            <Button className="mt-4 w-full bg-indigo-600 text-white">
              Профиль
            </Button>
          </Link>
          <p className="mt-6 text-base text-neutral-400">
            {post.author?.bio ? post.author?.bio : "Информация отсутствует."}
          </p>

          <div className="mt-6">
            <h3 className="text-base font-semibold text-neutral-400">
              Постов:
            </h3>
            <p className="text-neutral-300">{post.author.posts.length}</p>

            <h3 className="mt-4 text-base font-semibold text-neutral-400">
              Регистрация:
            </h3>
          </div>
          <p className="text-neutral-300">{formatDate(post.author.joinedAt)}</p>
        </div>
      </div>
    </div>
  );
};
export default PostPage;
