import PostCard from "@/components/cards/PostCard";
import NoProfile from "@/components/shared/NoProfile";
import { Button } from "@/components/ui/button";

import { getUserById, getUserByUserName } from "@/lib/actions/user.action";
import { formatDate, formatedLink } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import {
  Cake,
  ExternalLink,
  FileEdit,
  MapPin,
  MessageCircle,
  Verified,
} from "lucide-react";
import { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

type ProfilePageProps = {
  params: { userName: string };
};

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const user = await getUserByUserName({ username: params.userName });

  if (!user) {
    return {
      title: `Пользователь не найден / V`,
    };
  }

  return {
    title: `${user.name} (@${user.username}) / V`,
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { userId } = auth();
  const user = await getUserByUserName({ username: params.userName });
  const mongoUser = await getUserById({ clerkId: userId! });
  const isOwnProfile = userId && user?.clerkId === userId;

  if (!user) {
    return <NoProfile />;
  }

  const userInfo = [
    {
      icon: MapPin,
      text: user?.location ? user.location : "Не Известно",
    },
    {
      icon: Cake,
      text: `Регистрация: ${formatDate(user.joinedAt)}`,
    },
  ];

  return (
    <div className="pt-[75px] mx-auto w-full max-w-6xl max-md:px-0 px-4 ">
      <div className="bg-main mt-12 w-full rounded-md border-neutral-900 pb-8">
        <div className="relative flex flex-col items-center max-md:items-start max-md:px-3">
          {isOwnProfile && (
            <Link href="/settings">
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
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                {user?.role === "admin" && (
                  <Verified color="#6366f1" className="mt-1" />
                )}
              </div>
              <p className="text-neutral-400">@{user.username}</p>
            </div>
            <p className="max-w-2xl">
              {user.bio ? user.bio : "Информация отсутствует."}
            </p>

            <div className="mt-4 flex gap-6 max-md:flex-col max-md:gap-4">
              {userInfo?.map((item: any) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon color="#969696" className="h-5 w-5" />
                  <p className="pt-1 text-sm text-neutral-400">{item.text}</p>
                </div>
              ))}
              {user?.portfolioWebsite && (
                <Link
                  target="_blank"
                  href={user.portfolioWebsite}
                  className="flex items-center gap-2 group"
                >
                  <ExternalLink
                    color="#969696"
                    className="h-5 w-5 !group-hover:text-indigo-500 transition"
                  />
                  <p className="pt-1 text-sm text-neutral-400 group-hover:text-indigo-500 transition">
                    {formatedLink(user.portfolioWebsite)}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-1.5 flex items-start gap-3 pb-4">
        <div className="bg-main flex w-[330px] flex-col gap-5 p-5 max-md:hidden">
          <div className="flex items-center gap-2.5">
            <FileEdit color="#969696" className="h-5 w-5" />
            <p className="text-neutral-200">Публикаций: {user.posts.length}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <MessageCircle color="#969696" className="h-5 w-5" />
            <p className="text-neutral-200">Комментариев: 0</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-1.5">
          {user.posts.map((post: any) => (
            <PostCard
              isPostSaved={mongoUser?.savedPosts.includes(post._id)}
              userId={mongoUser?._id.toString()}
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
