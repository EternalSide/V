import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mx-auto w-full max-w-5xl pb-6 pt-[85px] max-[1280px]:px-4">
      <h1 className="text-4xl font-bold">Уведомления</h1>

      <div className="mt-8 flex flex-col gap-1">
        {[0, 1, 2, 3, 4, 5, 6].map((key: number) => (
          <Skeleton key={key} className="h-64 w-full" />
        ))}
      </div>
    </div>
  );
};
export default Loading;
