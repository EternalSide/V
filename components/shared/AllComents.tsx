import { getComments } from "@/lib/actions/comment.action";
import ParseHTML from "./ParseHTML";
import Link from "next/link";
import { UserAvatar } from "./UserAvatar";
import { formatDate } from "@/lib/utils";

interface AllComentsProps {
  postId: string;
}

const AllComents = async ({ postId }: AllComentsProps) => {
  const { comments } = await getComments({ postId });

  return (
    <div className="mt-7 flex flex-col gap-10">
      {comments?.map((item: any) => (
        <article key={item._id} className="flex w-full items-start gap-3">
          <Link href={`/${item.author.username}`}>
            <UserAvatar
              imgUrl={item.author.picture}
              classNames="h-10 w-10 mt-3"
            />
          </Link>
          <div className="flex-1 rounded-lg border border-neutral-800 p-5">
            <div className="mb-5 flex items-center gap-3">
              <Link
                href={`/${item.author.username}`}
                className="flex items-center gap-1 font-semibold"
              >
                <p>{item.author.name}</p>
                <p className="text-sm text-zinc-400">@{item.author.username}</p>
              </Link>
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
