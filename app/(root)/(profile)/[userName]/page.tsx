import PostCard from "@/components/cards/PostCard";
import { Button } from "@/components/ui/button";

import { getUserByUserName } from "@/lib/actions/user.action";
import { formatDate } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { Cake, FileEdit, Locate, MessageCircle } from "lucide-react";
import { ResolvingMetadata, Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
type Props = {
  params: { userName: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const user = await getUserByUserName({ username: params.userName });

  return {
    title: `${user.name} (@${user.username}) / V`,
  };
}
const ProfilePage = async ({ params }: { params: { userName: string } }) => {
  const { userId } = auth();
  const user = await getUserByUserName({ username: params.userName });
  const isOwnProfile = user?.clerkId === userId;

  return (
    <div className="mx-auto w-full max-w-5xl  max-md:px-3">
      <div className="bg-main mt-12 w-full rounded-md border-neutral-900 pb-8">
        <div className="relative flex flex-col items-center max-md:items-start max-md:px-3">
          {isOwnProfile && (
            <Link href={`/`}>
              <Button className="button-main absolute right-7 top-4">
                Редактировать
              </Button>
            </Link>
          )}
          <div className="relative -mt-12 h-32 w-32">
            <Image
              fill
              className="aspect-auto rounded-full object-cover object-top border-[8px] border-black"
              alt="Test alt"
              src={user.picture}
            />
          </div>
          <div className="mt-6 flex flex-col items-center gap-3 text-center max-md:items-start max-md:px-3 max-md:text-left">
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-neutral-400">@{user.username}</p>
            </div>
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

      <div className="mt-1.5 flex items-start gap-3 pb-4">
        <div className="bg-main flex w-[330px] flex-col gap-5 p-5  max-md:hidden">
          <div className="flex items-center gap-2.5">
            <FileEdit color="#969696" />
            <p className="text-neutral-200">Публикаций: {user.posts.length}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <MessageCircle color="#969696" />
            <p className="text-neutral-200">Комментариев: 0</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-1.5">
          {user.posts.map((post: any) => (
            <PostCard
              key={post._id}
              page="Profile"
              isOwnProfile={isOwnProfile}
              titleClassnames="text-2xl"
              author={{
                name: user.name,
                picture: user.picture,
                username: user.username,
                _id: user._id.toString(),
              }}
              post={{
                title: post.title,
                comments: post.comments.length,
                tags: post.tags,
                likes: post.upvotes.length,
                views: post.views,
                createdAt: post.createdAt,
                id: post._id.toString(),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
