import { Eye, Heart, MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

import { cn, getTimestamp } from "@/lib/utils";
import { UserAvatar } from "../shared/UserAvatar";
import { Badge } from "../ui/badge";
import { ITag, Tagtest } from "@/database/models/tag.model";

interface PostCardProps {
  firstPost?: boolean;
  postId: string;
  views: number;
  comments: number;
  likes: number;
  title: string;
  tags: any;

  author: {
    name: string;
    picture: string;
    username: string;
  };

  createdAt: Date;
  titleClassnames?: string;
}

const PostCard = ({
  author,
  firstPost,
  postId,
  views,
  comments,
  likes,
  tags,
  title,
  createdAt,
  titleClassnames,
}: PostCardProps) => {
  return (
    <div className="bg-main flex w-full flex-col items-start rounded-md border border-neutral-800/40">
      {firstPost && (
        <div className="relative h-64 w-full">
          <Image
            fill
            className="aspect-auto object-cover object-top"
            alt="Test alt"
            src="https://i.pinimg.com/736x/cf/e8/6a/cfe86a06289fece50de884fe8ac059c6.jpg"
          />
        </div>
      )}

      <div className="relative w-full py-4 pl-5 pr-7">
        <div className="absolute right-7 top-4">
          <Star className="h-5 w-5 text-neutral-300" />
        </div>
        <div className="flex gap-1.5">
          <UserAvatar
            imgUrl={author.picture}
            alt={author.name}
            classNames="h-10 w-10"
          />
          <div className="flex flex-col gap-3">
            <div>
              <Link href={`/${author.username}`}>{author.name}</Link>
              <p className="text-xs text-neutral-400">
                {getTimestamp(createdAt)}
              </p>
            </div>

            <Link
              href={`/post/${postId}`}
              className={cn(
                "font-bold transition hover:text-indigo-400",
                titleClassnames ? `${titleClassnames}` : "text-3xl",
              )}
            >
              {title}
            </Link>

            {/* Теги */}
            <div className="flex items-center gap-3">
              {tags.map((tag: Tagtest) => (
                <Badge
                  className="cursor-pointer border border-transparent bg-transparent !py-2 px-4 text-sm text-neutral-300 first-letter:uppercase hover:border hover:border-neutral-700 hover:bg-neutral-800"
                  key={tag._id}
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1">
                <Link
                  className="flex items-center gap-1 rounded-md px-2.5 py-2 hover:bg-neutral-800"
                  href="/"
                >
                  <Heart className="text-neutral-300" />
                  <p className="text-sm text-neutral-300">
                    Мне нравится: {likes}
                  </p>
                </Link>
                <Link
                  className="flex items-center gap-1 rounded-md px-3.5 py-2 hover:bg-neutral-800"
                  href="/"
                >
                  <MessageCircle className="text-neutral-300" />
                  <p className="text-sm text-neutral-300">
                    Комментариев: {comments}
                  </p>
                </Link>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="text-neutral-300" />
                <p className="text-sm text-neutral-300">Просмотров: {views}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
