import { Eye, Heart, MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn, getTimestamp } from "@/lib/utils";
import { UserAvatar } from "../shared/UserAvatar";
import { Badge } from "../ui/badge";
import EditDeletePost from "../shared/EditDeletePost";

interface PostCardProps {
  banner?: string;
  i?: number;
  isOwnProfile?: any;
  page?: string;
  titleClassnames?: string;
  author: {
    name: string;
    picture: string;
    username: string;
    _id: string;
  };
  post: {
    title: string;
    comments: number;
    tags: {
      _id: string;
      name: string;
    }[];
    likes: number;
    views: number;
    createdAt: Date;
    id: string;
  };
}

const PostCard = ({
  author,
  i,
  isOwnProfile,
  page,
  post,
  banner,
  titleClassnames,
}: PostCardProps) => {
  const firstPost = i === 0;

  return (
    <Link
      href={`/post/${post.id}`}
      className="cursor-pointer bg-main flex w-full flex-col items-start rounded-md border-neutral-800/40 border  hover:border-indigo-700"
    >
      {firstPost && banner && (
        <div className="relative h-64 w-full">
          <Image
            fill
            className="aspect-auto object-cover object-top"
            alt="Test alt"
            src={banner}
          />
        </div>
      )}
      <div className="relative w-full py-4 pl-5 pr-7">
        <div className="absolute right-7 top-4 flex items-center gap-x-2">
          <Star className="h-5 w-5 cursor-pointer text-neutral-300 transition hover:opacity-90" />
          {isOwnProfile && page === "Profile" && (
            <EditDeletePost
              type="Post"
              itemId={post.id}
              authorId={author._id}
            />
          )}
        </div>

        <div className="flex gap-2">
          <UserAvatar
            imgUrl={author.picture}
            alt={author.name}
            classNames="h-10 w-10"
          />
          <div className="flex flex-col">
            <div>
              <h3 className="first-letter:uppercase">{author.username}</h3>
              <p className="text-xs text-neutral-400">
                {getTimestamp(post.createdAt)}
              </p>
            </div>

            <h3
              className={cn(
                "font-bold transition hover:text-indigo-400 mt-3",
                titleClassnames ? `${titleClassnames}` : "text-3xl",
              )}
            >
              {post.title}
            </h3>

            {/* Теги */}
            <div className="mt-1.5 flex items-center gap-0.5">
              {post.tags.map((tag: any) => (
                <Badge
                  className="cursor-pointer !rounded-md border border-transparent bg-transparent !px-1.5 py-1  text-sm text-neutral-300 first-letter:uppercase hover:border hover:border-neutral-700 hover:bg-neutral-800"
                  key={tag._id}
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 rounded-md">
                  <Heart className="text-neutral-300" />
                  <p className="ml-0.5 text-sm text-neutral-300">
                    {post.likes}
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-md">
                  <MessageCircle className="text-neutral-300" />
                  <p className="ml-0.5 text-sm text-neutral-300">
                    {post.comments}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Eye className="text-neutral-300" />
                <p className="ml-0.5 text-sm text-neutral-300">{post.views}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default PostCard;
