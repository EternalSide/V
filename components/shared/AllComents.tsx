import { getComments } from "@/lib/actions/comment.action";
import ParseHTML from "./ParseHTML";
import Link from "next/link";
import { UserAvatar } from "./UserAvatar";
import { formatDate } from "@/lib/utils";

interface AllComentsProps {
  postId: string;
}

const AllComents = async ({ postId }: AllComentsProps) => {
  const { comments } = await getComments({ post: postId });
  console.log(comments);
  return (
    <div className="flex flex-col gap-10 mt-7">
      {comments.map((item: any) => (
        <article className="flex items-start gap-3 w-full" key={item._id}>
          <Link href={item.author.username}>
            <UserAvatar
              imgUrl={item.author.picture}
              classNames="h-10 w-10 mt-3"
            />
          </Link>
          <div className="border border-neutral-800 rounded-lg flex-1 p-5">
            <div className="flex items-center gap-3 mb-5">
              <h3 className="font-semibold">
                {item.author.name}
                <span className="text-xs text-neutral-500">•</span>
              </h3>
              <p className="text-sm text-neutral-400">
                {formatDate(item.createdAt)}
              </p>
            </div>
            <ParseHTML data={item.text} />
          </div>
        </article>
      ))}
    </div>
  );
};
export default AllComents;
