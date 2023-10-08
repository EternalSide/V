import { getPostById } from "@/lib/actions/post.action";
import { formatDate, getTimestamp } from "@/lib/utils";
import ParseHTML from "@/components/shared/ParseHTML";
import Link from "next/link";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Heart, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const PostPage = async ({ params }: { params: { postId: string } }) => {
  const post = await getPostById({ id: params.postId });

  return (
    <div className="flex w-full gap-3">
      <div className="fixed flex flex-col items-center gap-7 pl-6 pt-24 text-center">
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

      <div className="bg-main ml-20 flex-1 rounded-md px-14 py-8">
        <div className="flex items-center gap-1.5">
          <UserAvatar
            alt={post.author.name}
            classNames="h-10 w-10"
            imgUrl={post.author.picture}
          />

          <div>
            <Link href={`/${post.author.username}`} className="font-semibold">
              {post.author.username}
            </Link>
            <p className="mt-0.5 text-xs text-neutral-400">
              {getTimestamp(post.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="mt-6 text-sm text-neutral-400">
            Просмотров: {post.views}
          </p>
          <p className="mt-6 text-sm text-neutral-400">В Избранном: 0</p>
        </div>
        <h1 className="mt-10 text-5xl font-bold">{post.title}</h1>
        <ParseHTML data={post.text} />
      </div>

      <div className="bg-main  relative w-[340px] rounded-md border border-neutral-800 max-lg:hidden">
        <div className="absolute left-0 top-0 h-32 w-full">
          <div className="relative h-32 w-full">
            <Image
              src="/test-gif.gif"
              fill
              alt={`gif`}
              className="object-center"
            />
          </div>
        </div>
        <div className="p-5 pt-[140px]">
          <div className="flex items-end gap-2">
            <UserAvatar
              alt={post.author.name}
              classNames="h-10 w-10"
              imgUrl={post.author.picture}
            />
            <h3 className="text-xl font-semibold">{post.author.username}</h3>
          </div>
          <Button className="mt-4 w-full bg-indigo-600 text-white">
            Подписаться
          </Button>
          <p className="mt-6 text-base text-neutral-400">
            I am a Passionate Frontend Web Developer, I design webpages and
            graphics uniquely and creatively. I also design the webpage layout
            in a way that is pleasing to the eye and easy on the eyes.
          </p>

          <h3 className="mt-6 text-base font-semibold text-neutral-400">
            Регистрация:
          </h3>
          <p className="text-neutral-300">{formatDate(post.author.joinedAt)}</p>
        </div>
      </div>
    </div>
  );
};
export default PostPage;
