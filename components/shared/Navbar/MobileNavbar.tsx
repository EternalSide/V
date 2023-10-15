import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { moreLinks, sidebarLinks } from "@/constants";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Hash, Menu } from "lucide-react";
import Link from "next/link";

const MobileNavbar = async () => {
  const { userId } = auth();

  const user = await getUserById({ clerkId: userId! });

  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="h-7 w-7" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-main w-[300px] overflow-y-auto border-r-black  pt-16 text-white"
        >
          <SheetHeader>
            <SheetDescription>
              <div className="flex flex-1 flex-col gap-4">
                {sidebarLinks.map((item) => {
                  if (item.label === "Профиль") {
                    return (
                      <SheetClose asChild key={item.route}>
                        <Link
                          href={`/${
                            !user.username ? "sign-in" : user.username
                          }`}
                          key={item.route}
                          className="flex items-center
                      gap-x-4 rounded-md px-3 py-2 hover:bg-indigo-900"
                        >
                          <item.icon className="h-6 w-6 max-lg:h-7 max-lg:w-7" />
                          <p className="text-[20px] text-neutral-200 group-hover:text-indigo-300">
                            {item.label}
                          </p>
                        </Link>
                      </SheetClose>
                    );
                  }

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.route}
                        className="flex items-center
                      gap-x-4 rounded-md px-3 py-2 hover:bg-indigo-900"
                      >
                        <item.icon className="h-6 w-6 max-lg:h-7 max-lg:w-7" />
                        <p className="text-[20px] !text-white  group-hover:text-indigo-300">
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>

              <div className="mt-6 text-left">
                <h3 className="px-3 text-xl font-bold">Подписки</h3>
                <div className="mt-3 flex flex-col gap-2">
                  {user.followingTags?.map((tag: any) => {
                    return (
                      <SheetClose asChild key={tag._id}>
                        <Link
                          key={tag._id}
                          href={`/tags/${tag.name}`}
                          className="flex items-center
                    gap-x-2 rounded-md px-3 py-2 hover:bg-indigo-900"
                        >
                          <Hash className="h-6 w-6" />
                          <p className="text-[18px] text-neutral-200 group-hover:text-indigo-300">
                            {tag.name}
                          </p>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
                {!user.username && (
                  <div
                    className="flex items-center
                    gap-x-2 rounded-md px-3 py-2"
                  >
                    <p className="text-[18px] text-neutral-200 group-hover:text-indigo-300">
                      Не найдено.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 text-left">
                <h3 className="px-3 text-xl font-bold">Еще</h3>
                <div className="mt-3 flex flex-col gap-3">
                  {moreLinks.map((item: any) => (
                    <SheetClose asChild key={item.route}>
                      <Link
                        target="_blank"
                        key={item.label}
                        href={item.href}
                        className="flex items-center
                    gap-x-2 rounded-md px-3 py-2 hover:bg-indigo-900"
                      >
                        <item.icon className="h-6 w-6" />
                        <p className="text-[18px] text-neutral-200 group-hover:text-indigo-300">
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MobileNavbar;
