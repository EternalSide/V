import { currentUser } from "@clerk/nextjs";
import {
  Home,
  Tag,
  HelpCircle,
  Send,
  Circle,
  Heart,
  PersonStanding,
  Plus,
  Bell,
} from "lucide-react";
import Link from "next/link";

const LeftSidebar = async () => {
  const user = await currentUser();

  const sidebarLinks = [
    {
      label: "Главная",
      route: "/",
      icon: Home,
    },
    {
      label: "Профиль",
      route: "/",
      icon: PersonStanding,
    },
    {
      label: "Избранное",
      route: "/",
      icon: Heart,
    },
    {
      label: "Новый пост",
      route: "/",
      icon: Plus,
    },

    {
      label: "Теги",
      route: "/",
      icon: Tag,
    },
    {
      label: "FAQ",
      route: "/",
      icon: HelpCircle,
    },
    {
      label: "Telegram",
      route: "/",
      icon: Send,
    },
  ];

  const tags = [
    {
      label: "React",
      route: "/",
    },
    {
      label: "Javascript",
      route: "/",
    },
    {
      label: "Next",
      route: "/",
    },
  ];
  return (
    <div className="sticky left-0 top-0 flex h-fit flex-col justify-between overflow-y-auto  text-white max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-1">
        {sidebarLinks.map((item) => {
          if (item.label === "Профиль") {
            return (
              <Link
                href={user ? user.username! : "/sign-in"}
                key={item.route}
                className="group flex cursor-pointer items-center
                  gap-x-2 rounded-md px-3 py-2 hover:bg-indigo-900"
              >
                <item.icon className="h-5 w-5" />
                <p className="text-[16px] text-neutral-200 group-hover:text-indigo-300 group-hover:underline max-lg:hidden">
                  {item.label}
                </p>
              </Link>
            );
          }
          return (
            <div
              key={item.route}
              className="group flex cursor-pointer items-center
                  gap-x-2 rounded-md px-3 py-2 hover:bg-indigo-900"
            >
              <item.icon className="h-5 w-5" />
              <p className="text-[16px] text-neutral-200 group-hover:text-indigo-300 group-hover:underline max-lg:hidden">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between px-3">
          <h3 className="text-lg font-bold max-lg:hidden">Другое</h3>
          <Bell className="h-6 w-6" />
        </div>
        <div className="mt-3 ">
          <div
            className="group flex cursor-pointer items-center
                  gap-x-2 rounded-md px-3 py-2 hover:bg-indigo-900"
          >
            <p className="text-[16px] text-neutral-200 group-hover:text-indigo-300 group-hover:underline max-lg:hidden">
              Уведомления
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between px-3">
          <h3 className="text-lg font-bold max-lg:hidden">Ваши Теги</h3>
          <Circle className="h-6 w-6" />
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {tags.map((tag) => {
            return (
              <div
                key={tag.label}
                className="cursor-pointer rounded-md px-3 py-2 hover:bg-indigo-900"
              >
                <p className="text-base">#{tag.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default LeftSidebar;
