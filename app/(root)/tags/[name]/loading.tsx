import { Skeleton } from "@/components/ui/skeleton";
import { homeFilters } from "@/constants";
import { Loader2Icon, Menu } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Loading = () => {
  return (
    <div className="mx-auto w-full max-w-7xl pb-6 pt-[85px]  max-[1280px]:px-4">
      <Skeleton className="h-[40px] w-full" />
      <Skeleton className="mt-4 h-[168px] w-full" />
      <section className="mt-8 flex w-full justify-start gap-10 max-lg:mt-6">
        <div className="w-[285px] max-lg:hidden">
          <div className="flex items-center justify-between">
            <button className="button bg-indigo-600 text-white">
              Новый пост
            </button>
          </div>
          <div className="mt-4 border-y border-neutral-800 p-5">
            <h3 className="font-semibold">Информация</h3>
            <Loader2Icon className="mx-auto my-10 h-10 w-10 animate-spin text-indigo-500" />
          </div>
          <div className="w-full border-neutral-800" />
          <div className="border-b border-neutral-800 p-5">
            <h3 className="font-semibold">Участники</h3>
            <Loader2Icon className="mx-auto my-10 h-10 w-10 animate-spin text-indigo-500" />
          </div>
          <div className="mt-5 text-center">
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>

        <div className="flex flex-1 flex-col pt-3">
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <Menu className="mt-1.5 h-7 w-7" />
            </div>
            <div className="flex items-center gap-3 max-sm:hidden">
              {homeFilters.map((item: any) => (
                <h3
                  key={item.value}
                  className="cursor-pointer text-lg text-white transition hover:text-indigo-500"
                >
                  {item.label}
                </h3>
              ))}
            </div>
            <div className="flex-1 sm:hidden" />
            <div className="w-full sm:hidden">
              <Select>
                <SelectTrigger className="bg-main w-full border-neutral-800">
                  <SelectValue placeholder="Новое" />
                </SelectTrigger>
                <SelectContent className="border-neutral-800 bg-black text-white">
                  {homeFilters.map((item: any) => (
                    <SelectItem
                      className="hover:bg-main cursor-pointer"
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-2.5 flex flex-col gap-1.5">
            <Skeleton className="h-[700px] w-full" />
            <Skeleton className="h-[700px] w-full" />
          </div>
        </div>
      </section>
    </div>
  );
};
export default Loading;
