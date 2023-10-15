import { Eye, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn, getTimestamp } from "@/lib/utils";
import { UserAvatar } from "../shared/UserAvatar";
import EditDeletePost from "../shared/EditDeletePost";
import StarAction from "../shared/StarAction";
import TagLink from "../shared/TagLink";
import Metric from "../shared/Metric";

interface PostCardProps {
  userId: string;
  isPostSaved: boolean;

  banner?: string;
  index?: number;
  isOwnProfile?: any;
  page?: string;
  firstPost?: boolean;
  titleClassnames?: string;

  author: { _id: string; name: string; picture: string; username: string };

  post: {
    id: string;
    title: string;
    comments: number;
    tags: {
      _id: string;
      name: string;
    }[];
    likes: number;
    views: number;
    createdAt: Date;
  };
}

const PostCard = ({
  author,
  userId,
  firstPost,
  isOwnProfile,
  isPostSaved,
  page,
  post,
  banner,
  titleClassnames,
}: PostCardProps) => {
  return (
    <Link href={`/post/${post.id}`} className="card-main">
      {firstPost && banner && (
        <div className="relative h-64 w-full">
          <Image
            fill
            className="object-cover object-top"
            alt="Изображение к посту"
            src={banner}
          />
        </div>
      )}
      <div className="relative w-full py-4 pl-5 pr-7">
        <div className="absolute right-7 top-4 flex items-center gap-x-2">
          {page !== "Profile" && (
            <StarAction
              authorName={author.name}
              userId={userId}
              postId={post.id}
              isPostSaved={isPostSaved}
            />
          )}
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
            <h3 className="first-letter:uppercase">{author.name}</h3>
            <p className="-mt-1 text-sm text-neutral-400">@{author.username}</p>
            <p className="mt-1 text-xs text-neutral-400">
              {getTimestamp(post.createdAt)}
            </p>
            <h3
              className={cn(
                "mt-3 font-bold transition hover:text-indigo-400",
                titleClassnames ? `${titleClassnames}` : "text-3xl",
              )}
            >
              {post.title}
            </h3>

            <div className="mt-1.5 flex items-center gap-0.5">
              {post.tags.map((tag: any) => (
                <TagLink key={tag._id} tagName={tag.name} />
              ))}
            </div>

            <div className="mt-3 flex items-center gap-6">
              <div className="flex items-center gap-6">
                <Metric icon={Heart} number={post.likes} />
                <Metric icon={MessageCircle} number={post.comments} />
              </div>
              <Metric icon={Eye} number={post.views} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default PostCard;
