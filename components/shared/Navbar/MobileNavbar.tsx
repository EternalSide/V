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

const BaseLink = ({ route, label, icon: Icon }: any) => {
  return (
    <Link
      href={route}
      className="flex items-center
                      gap-x-4 rounded-md px-3 py-2 hover:bg-indigo-900"
    >
      <Icon className="h-6 w-6 max-lg:h-7 max-lg:w-7" />
      <p className="text-[20px] !text-white  group-hover:text-indigo-300">
        {label}
      </p>
    </Link>
  );
};

const MobileNavbar = async () => {
  const { userId } = auth();
  const user = await getUserById({ clerkId: userId! });

  return (
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
            <div className="flex flex-col gap-4">
              {sidebarLinks.map((item) => {
                if (item.label === "Профиль") {
                  return (
                    <SheetClose key={item.route} asChild>
                      <BaseLink
                        route={`/${!user.username ? "sign-in" : user.username}`}
                        label={item.label}
                        icon={item.icon}
                      />
                    </SheetClose>
                  );
                }
                return (
                  <SheetClose key={item.route} asChild>
                    <BaseLink
                      route={item.route}
                      label={item.label}
                      icon={item.icon}
                    />
                  </SheetClose>
                );
              })}
            </div>

            <div className="mt-8 text-left">
              <h3 className="px-3 text-xl font-bold">Подписки</h3>
              <div className="mt-3 flex flex-col gap-3">
                {user.followingTags?.map((tag: any) => {
                  return (
                    <SheetClose key={tag._id} asChild>
                      <BaseLink
                        route={`/tags/${tag.name}`}
                        label={tag.name}
                        icon={Hash}
                      />
                    </SheetClose>
                  );
                })}
              </div>
              {!user.username && (
                <div
                  className="flex items-center
                    gap-x-2 rounded-md px-3 py-2"
                >
                  <p className="text-lg text-neutral-200 group-hover:text-indigo-300">
                    Не найдено.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 text-left">
              <h3 className="px-3 text-xl font-bold">Еще</h3>
              <div className="mt-3 flex flex-col gap-3">
                {moreLinks.map((item: any) => (
                  <SheetClose key={item.route} asChild>
                    <BaseLink
                      route={item.href}
                      label={item.label}
                      icon={item.icon}
                    />
                  </SheetClose>
                ))}
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNavbar;
