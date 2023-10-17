import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl  text-3xl text-white">
      <div className="sticky left-0 top-0 flex h-fit flex-col justify-between gap-8 overflow-y-auto pl-4 pt-[75px] text-white max-lg:px-3 max-sm:hidden lg:w-[266px]">
        <div className="flex flex-col gap-3">
          <div className="pl-3 max-lg:hidden">
            <h1 className="text-3xl font-semibold">
              <span className="text-4xl text-indigo-600">V</span>endetta
            </h1>
            <p className="text-sm text-zinc-400">0.1.4</p>
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item: any) => (
            <Skeleton key={item} className="h-10 w-full " />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Loading;
