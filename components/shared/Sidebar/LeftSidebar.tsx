import { sidebarLinks } from "@/constants";

import { Bell, Send, Hash } from "lucide-react";
import Link from "next/link";

const LeftSidebar = async () => {
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

  const moreLinks = [
    {
      label: "Уведомления",
      href: "/",
      icon: Bell,
    },
    {
      label: "Telegram",
      href: "/",
      icon: Send,
    },
  ];
  return (
    <div className="pl-4 pt-[75px] sticky left-0 top-0 max-lg:pl-4 flex h-fit flex-col justify-between gap-8  overflow-y-auto text-white max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-3">
        {sidebarLinks.map((item) => (
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
        ))}
      </div>

      <div>
        <h3 className="px-3 text-xl font-bold max-lg:hidden">Подписки</h3>
        <div className="mt-3 flex flex-col gap-2">
          {tags.map((tag) => {
            return (
              <Link
                key={tag.label}
                href="/tag"
                className="flex items-center
                    gap-x-2 rounded-md px-3 py-2 hover:bg-indigo-900"
              >
                <Hash className="h-6 w-6" />
                <p className="text-[18px] text-neutral-200 group-hover:text-indigo-300 max-lg:hidden">
                  {tag.label}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="px-3 text-xl font-bold max-lg:hidden">Еще</h3>
        <div className="mt-3 flex flex-col gap-3">
          {moreLinks.map((item: any) => (
            <Link
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
