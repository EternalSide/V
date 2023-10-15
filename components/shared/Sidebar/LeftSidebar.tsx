import { moreLinks, sidebarLinks } from "@/constants";

import { Hash } from "lucide-react";
import { Schema } from "mongoose";
import Link from "next/link";

interface Props {
  username: string;
  followingTags: Schema.Types.ObjectId[];
}

const LeftSidebar = async ({ username, followingTags }: Props) => {
  return (
    <div className="sticky left-0 top-0 flex h-fit flex-col justify-between gap-8 overflow-y-auto pl-4 pt-[75px]  text-white max-lg:px-3 max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-3">
        {sidebarLinks.map((item) => {
          if (item.label === "Профиль") {
            return (
              <Link
                href={`/${!username ? "sign-in" : username}`}
                key={item.route}
                className="flex items-center
                      gap-x-4 rounded-md px-3 py-2 hover:bg-indigo-900"
              >
                <item.icon className="h-6 w-6 max-lg:h-7 max-lg:w-7" />
                <p className="text-[20px] text-neutral-200 group-hover:text-indigo-300 max-lg:hidden">
                  {item.label}
                </p>
              </Link>
            );
          }
          return (
            <Link
              href={item.route}
              key={item.route}
              className="flex items-center
                      gap-x-4 rounded-md px-3 py-2 hover:bg-indigo-900"
            >
              <item.icon className="h-6 w-6 max-lg:h-7 max-lg:w-7" />
              <p className="text-[20px] text-neutral-200 group-hover:text-indigo-300 max-lg:hidden">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      <div>
        <h3 className="px-3 text-xl font-bold max-lg:hidden">Подписки</h3>
        <div className="mt-3 flex flex-col gap-2">
          {followingTags?.map((tag: any) => {
            return (
              <Link
                key={tag._id}
                href={`/tags/${tag.name}`}
                className="flex items-center
                    gap-x-2 rounded-md px-3 py-2 hover:bg-indigo-900 "
              >
                <Hash className="h-6 w-6" />
                <p className="text-[18px] text-neutral-200 group-hover:text-indigo-300 max-lg:hidden">
                  {tag.name}
                </p>
              </Link>
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
          {moreLinks.map((item: any) => (
            <Link
              target="_blank"
              key={item.label}
              href={item.href}
              className="flex items-center
                    gap-x-2 rounded-md px-3 py-2 hover:bg-indigo-900"
            >
              <item.icon className="h-6 w-6" />
              <p className="text-[18px] text-neutral-200 group-hover:text-indigo-300 max-lg:hidden">
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default LeftSidebar;
