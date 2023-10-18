import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mx-auto w-full max-w-7xl pt-[85px]  max-[1300px]:px-8 ">
      <h1 className="text-3xl font-bold text-white">Теги</h1>

      <div className="mt-6 grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
          (key: number) => (
            <Skeleton key={key} className="h-[192px]" />
          ),
        )}
      </div>
    </div>
  );
};
export default Loading;
