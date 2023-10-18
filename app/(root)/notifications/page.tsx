import Pagination from "@/components/shared/Pagination";
import ParseHTML from "@/components/shared/ParseHTML";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { ViewAllNotifications } from "@/lib/actions/general.action";
import { getUserNotifications } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Loading from "./loading";
import { formatDate } from "@/lib/utils";

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
        {result?.notifications?.map((item: any) => (
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
            <div className="flex w-full max-w-[700px] flex-col items-center gap-4">
              <p>
                <Link
                  href={`/${item.user.username}`}
                  className="text-lg font-semibold"
                >
                  {item.user.name}
                </Link>
                прокомментировал ваш пост
              </p>
              <div className="">
                <Link
                  href={`/post/${item.postId._id}`}
                  className="w-full max-w-[300px] text-center text-indigo-600 hover:text-indigo-700"
                >
                  {item.postId.title}
                </Link>
                <div className="w-full max-w-xl rounded-md p-6 pb-2">
                  <article
                    key={item._id}
                    className="-mt-2 flex w-full items-start gap-3 text-left"
                  >
                    <Link href={`/${item.user.username}`}>
                      <UserAvatar
                        imgUrl={item.user.picture}
                        classNames="h-10 w-10 mt-2"
                      />
                    </Link>
                    <div className="flex-1 rounded-lg border border-neutral-800 p-5">
                      <div className="mb-5 flex items-center gap-3">
                        <Link
                          href={`/${item.user.username}`}
                          className="flex items-center gap-1 font-semibold"
                        >
                          <p>{item.user.name}</p>
                          <p className="text-sm text-zinc-400">
                            @{item.user.username}
                          </p>
                        </Link>
                        <p className="text-sm text-neutral-400">
                          {formatDate(item.createdAt)}
                        </p>
                      </div>
                      <ParseHTML data={item.text} />
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        isNext={result?.isNext!}
        pageValue={searchParams?.page ? Number(searchParams?.page) : 1}
      />
    </div>
  );
};
export default NotificationPage;
