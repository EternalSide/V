"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";

interface PaginationProps {
  pageValue: number;
  isNext: boolean;
}

const Pagination = ({ pageValue, isNext }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber = direction === "Prev" ? pageValue - 1 : pageValue + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };
  if (!isNext && pageValue === 1) return null;
  return (
    <div className="mt-6 flex w-full items-center justify-center gap-3">
      <Button
        className="bg-indigo-600 text-white"
        onClick={() => handleNavigation("Prev")}
        disabled={pageValue === 1}
      >
        Пред
      </Button>
      <p className="text-lg font-semibold">{pageValue}</p>
      <Button
        className="bg-indigo-600 text-white"
        onClick={() => handleNavigation("Next")}
        disabled={!isNext}
      >
        След
      </Button>
    </div>
  );
};
export default Pagination;
