import BellPusher from "@/components/shared/BellPusher";
import { BaseLink } from "@/components/shared/Sidebar/LeftSidebar";
import { BlockTitle } from "@/components/shared/Sidebar/RightSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { homeFilters, sidebarLinks } from "@/constants";
import { Loader2Icon } from "lucide-react";

const Loading = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl  text-3xl">
      <div className="sticky left-0 top-0 flex h-fit flex-col justify-between gap-8 overflow-y-auto pl-4 pt-[75px] text-white max-lg:px-3 max-sm:hidden lg:w-[266px]">
        <div className="flex flex-col gap-3">
          <div className="pl-3 max-lg:hidden">
            <h1 className="text-3xl font-semibold">
              <span className="text-4xl text-indigo-600">V</span>endetta
            </h1>
            <p className="text-sm text-zinc-400">0.1.4</p>
          </div>
          {sidebarLinks.map((item: any) => {
            if (item.label === "Профиль") {
              return (
                <BaseLink
                  key={item.label}
                  label={item.label}
                  route="/"
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
          <BellPusher />
        </div>

        <div>
          <h3 className="px-3 text-xl font-bold max-lg:hidden">Подписки</h3>
          <div
            className="flex flex-col gap-3 
                    rounded-md px-3 py-2"
          >
            <div className="mt-[28px] flex items-center justify-center">
              <Loader2Icon className="animate-spin h-10 w-10 text-indigo-500" />
            </div>
          </div>
        </div>
      </div>
      <section className="flex w-full flex-1 flex-col px-4 pb-6 pt-[87px] max-lg:pl-0 max-md:pb-14 max-sm:px-4">
        <div className="flex items-center gap-3 max-sm:hidden">
          {homeFilters.map((item: any) => (
            <h3
              key={item.value}
              className={`cursor-pointer text-lg text-white transition hover:text-indigo-500`}
            >
              {item.label}
            </h3>
          ))}
        </div>

        <div className="mt-2.5 flex flex-col gap-1.5">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((post: any, i: number) => {
            return <Skeleton key={i} className="h-[200px] w-full" />;
          })}
        </div>
      </section>
      <div
        className="sticky right-0 top-0 flex h-fit w-[330px]
    flex-col overflow-y-auto pb-5  pt-[75px] text-white dark:shadow-none max-[1330px]:pr-4 max-xl:hidden"
      >
        <div className="bg-main w-full rounded-md border border-neutral-800">
          <BlockTitle name="Популярное" />
          <div className="flex h-[370px] items-center  justify-center">
            <Loader2Icon className="animate-spin h-10 w-10 text-indigo-500" />
          </div>
        </div>

        <div className="bg-main mt-5 w-full rounded-md border border-neutral-800">
          <BlockTitle name="Топ Авторов" />
          <div className="flex h-[248px] items-center justify-center">
            <Loader2Icon className="animate-spin h-10 w-10 text-indigo-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Loading;
