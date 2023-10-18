import BellPusher from "@/components/shared/BellPusher";
import FilterComponents from "@/components/shared/FilterComponents";
import HomeFilters from "@/components/shared/HomeFilters";
import { BaseLink } from "@/components/shared/Sidebar/LeftSidebar";
import { BlockTitle } from "@/components/shared/Sidebar/RightSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { homeFilters, sidebarLinks } from "@/constants";
import { Loader2Icon } from "lucide-react";

const Loading = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl gap-3 text-3xl ">
      <div className="sticky left-0 top-0 flex h-fit flex-col justify-between gap-8 overflow-y-auto pl-4 pt-[95px] max-lg:px-3 max-sm:hidden lg:w-[266px]">
        <div className="flex flex-col gap-3">
          {sidebarLinks.map((item: any) => (
            <BaseLink
              key={item.label}
              label={item.label}
              route="/"
              icon={item.icon}
            />
          ))}
          <BellPusher />
        </div>

        <div>
          <h3 className="px-3 text-xl font-bold max-lg:hidden">Подписки</h3>
          <div
            className="flex flex-col gap-3 
                    rounded-md px-3 py-2"
          >
            <div>
              <Skeleton className="h-[200px] w-full" />
            </div>
          </div>
        </div>
      </div>

      <section className="flex w-full flex-1 flex-col border-x border-neutral-700 pb-6 pt-[87px]  max-md:pb-14">
        <div className="">
          <div className="mb-3 border-b border-neutral-700 pb-4 ">
            <h1 className="px-3 text-3xl font-bold max-sm:px-4">Главная</h1>
          </div>

          <div className="px-3 max-sm:px-4">
            <HomeFilters />
            <FilterComponents
              containerClasses="sm:hidden"
              filters={homeFilters}
            />
          </div>
        </div>
        <div className="mt-2.5 flex flex-col gap-1.5">
          {Array.from({ length: 7 }, (_, key) => (
            <Skeleton className="h-64" key={key} />
          ))}
        </div>
      </section>

      <div
        className="sticky right-0 top-0 flex h-fit w-[330px]
    flex-col overflow-y-auto pb-5  pt-[75px] text-white dark:shadow-none max-[1330px]:pr-4 max-xl:hidden"
      >
        <div className="bg-main w-full rounded-md border border-neutral-800">
          <BlockTitle name="Популярное" />
          <div className="flex h-[370px] items-center  justify-center">
            <Loader2Icon className="h-10 w-10 animate-spin text-indigo-500" />
          </div>
        </div>

        <div className="bg-main mt-5 w-full rounded-md border border-neutral-800">
          <BlockTitle name="Топ Авторов" />
          <div className="flex h-[248px] items-center justify-center">
            <Loader2Icon className="h-10 w-10 animate-spin text-indigo-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Loading;
