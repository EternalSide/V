import Pagination from "@/components/shared/Pagination";
import ParseHTML from "@/components/shared/ParseHTML";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { ViewAllNotifications } from "@/lib/actions/general.action";
import { getUserNotifications } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    absolute: "Уведомления / V",
  },
};

const NotificationPage = async ({ searchParams }: any) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const result = await getUserNotifications({
    clerkId: userId,
    page: searchParams?.page ? Number(searchParams?.page) : 1,
  });

  await ViewAllNotifications({ userId });

  return (
    <div className="mx-auto w-full max-w-5xl pb-6 pt-[85px] max-[1280px]:px-4">
      <h1 className="text-4xl font-bold">Уведомления</h1>

      <div className="mt-8 flex flex-col gap-1">
        {result.notifications?.map((item: any) => (
          <div
            key={item._id}
            className="bg-main flex w-full flex-col items-center rounded-md p-10 text-center"
          >
            <Link
              href={`/${item.user.username}`}
              className="text-lg font-semibold"
            >
              <UserAvatar imgUrl={item.user.picture} classNames="h-24 w-24" />
            </Link>
            <p className="mt-0.5 max-w-[400px]">
              <Link
                href={`/${item.user.username}`}
                className="text-lg font-semibold"
              >
                {item.user.name}
              </Link>
              прокомментировал ваш пост
            </p>
            <Link
              href={`/post/${item.postId._id}`}
              className="mt-1.5 max-w-[400px] text-indigo-500 hover:text-indigo-600"
            >
              {item.postId.title}
            </Link>
            <div className="mt-1.5 rounded-md bg-[#333232] p-6 pb-2 text-left">
              <ParseHTML data={item?.text} />
            </div>
          </div>
        ))}
      </div>

      <Pagination
        isNext={result.isNext}
        pageValue={searchParams?.page ? Number(searchParams?.page) : 1}
      />
    </div>
  );
};
export default NotificationPage;
