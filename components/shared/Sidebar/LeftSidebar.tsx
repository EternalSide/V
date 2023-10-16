import { moreLinks, sidebarLinks } from "@/constants";

import { Bell, Hash } from "lucide-react";
import { Schema } from "mongoose";
import Link from "next/link";

interface Props {
  username: string;
  followingTags: Schema.Types.ObjectId[];
}

const BaseLink = ({ route, label, icon: Icon }: any) => {
  return (
    <Link
      href={route}
      className="flex items-center
          gap-x-4 rounded-md px-3 py-2 hover:bg-indigo-900"
    >
      <Icon className="h-6 w-6 animate-in fade-in zoom-in max-lg:h-7 max-lg:w-7" />
      <p className="text-[20px] text-neutral-200 group-hover:text-indigo-300 max-lg:hidden">
        {label}
      </p>
    </Link>
  );
};

const LeftSidebar = async ({ username, followingTags }: Props) => {
  return (
    <div className="sticky left-0 top-0 flex h-fit flex-col justify-between gap-8 overflow-y-auto pl-4 pt-[75px] text-white max-lg:px-3 max-sm:hidden lg:w-[266px]">
      <div className="flex flex-col gap-3">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            <span className="text-4xl text-indigo-600">V</span>endetta
          </h1>
          <p className="text-sm text-zinc-400">0.1.4</p>
        </div>
        {sidebarLinks.map((item) => {
          if (item.label === "Профиль") {
            return (
              <BaseLink
                key={item.label}
                label={item.label}
                route={`/${!username ? "sign-in" : username}`}
                icon={item.icon}
              />
            );
          }
          return (
            <BaseLink
              key={item.label}
              label={item.label}
              route={item.route}
              icon={item.icon}
            />
          );
        })}
      </div>

      <div>
        <h3 className="px-3 text-xl font-bold max-lg:hidden">Подписки</h3>
        <div className="mt-3 flex flex-col gap-2">
          {followingTags?.map((tag: any) => {
            return (
              <BaseLink
                key={tag._id}
                label={tag.name}
                route={`/tags/${tag.name}`}
                icon={Hash}
              />
            );
          })}
        </div>
        {!username && (
          <div
            className="flex items-center
                    gap-x-2 rounded-md px-3 py-2"
          >
            <p className="text-[18px] text-neutral-200 group-hover:text-indigo-300 max-lg:hidden">
              Не найдено.
            </p>
          </div>
        )}
      </div>

      <div>
        <h3 className="px-3 text-xl font-bold max-lg:hidden">Еще</h3>
        <div className="mt-3 flex flex-col gap-3">
          <Link
            href="/notifications"
            className="flex items-center
          gap-x-4 rounded-md px-3 py-2 hover:bg-indigo-900"
          >
            <div className="relative">
              <Bell className="h-6 w-6 animate-in fade-in zoom-in max-lg:h-7 max-lg:w-7" />
              <span className="animate-pulse absolute -right-[0.5px] -top-[3px] inline-flex h-2 w-2 rounded-full bg-sky-500" />
            </div>
            <p className="text-[20px] text-neutral-200 group-hover:text-indigo-300 max-lg:hidden">
              Уведомления
            </p>
          </Link>
          {/* {moreLinks.map((item: any) => (
            
            // <BaseLink
            //   key={item.href}
            //   route={item.href}
            //   label={item.label}
            //   icon={item.icon}
            // />
          ))} */}
        </div>
      </div>
    </div>
  );
};
export default LeftSidebar;
