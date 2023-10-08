import PostCard from "@/components/cards/PostCard";
import { IPost } from "@/database/models/post.model";
import { getUserByUserName } from "@/lib/actions/user.action";
import { formatDate } from "@/lib/utils";
import { Cake, FileEdit, Hash, Locate, MessageCircle } from "lucide-react";
import Image from "next/image";

const ProfilePage = async ({ params }: { params: { userName: string } }) => {
  const user = await getUserByUserName({ username: params.userName });

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="bg-main mt-12 w-full rounded-md border-neutral-900 pb-8">
        <div className="flex flex-col items-center max-md:items-start max-md:px-3">
          <div className="relative -mt-12 h-28 w-28">
            <Image
              fill
              className="aspect-auto rounded-full object-cover object-top"
              alt="Test alt"
              src={user.picture}
            />
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 text-center max-md:items-start max-md:px-3 max-md:text-left">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="max-w-2xl">
              {user.bio
                ? user.bio
                : "Пользователь не оставил информации о себе."}
            </p>

            <div className="mt-4 flex gap-6">
              <div className="flex items-center gap-2">
                <Locate color="#969696" className="h-5 w-5" />
                <p className="pt-1 text-sm text-neutral-400">Tokyo, Japan</p>
              </div>
              <div className="flex items-center gap-2">
                <Cake color="#969696" className="h-5 w-5" />
                <p className="pt-1 text-sm text-neutral-400">
                  Регистрация: {formatDate(user.joinedAt)}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-3">
        <div className="bg-main flex w-[330px] flex-col gap-5 p-5">
          <div className="flex items-center gap-2.5">
            <FileEdit color="#969696" />
            <p className="text-neutral-200">{user.posts.length} Публикаций</p>
          </div>
          <div className="flex items-center gap-2.5">
            <MessageCircle color="#969696" />
            <p className="text-neutral-200">{0} Комментариев</p>
          </div>
          <div className="flex items-center gap-2.5">
            <Hash color="#969696" />
            <p className="text-neutral-200">0 Подписок</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-1.5">
          {user.posts.map((post: IPost) => (
            <PostCard
              tags={post.tags}
              title={post.title}
              author={{
                name: user.name,
                picture: user.picture,
                username: user.username,
              }}
              comments={post.comments.length}
              likes={post.upvotes.length}
              views={post.views}
              createdAt={post.createdAt}
              key={post._id}
              postId={post._id.toString()}
              titleClassnames="text-2xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
