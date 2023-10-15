"use client";

import { homeFilters } from "@/constants";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const value = searchParams.get("q");
  const router = useRouter();

  const handleSearch = (value: string) => {
    setActive(value);

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "q",
      value,
    });

    router.push(newUrl, { scroll: false });
  };
  const [active, setActive] = useState(value || "recommended");

  return (
    <div className="flex items-center gap-3 max-sm:hidden">
      {homeFilters.map((item: any) => (
        <h3
          onClick={() => handleSearch(item.value)}
          key={item.value}
          className={`cursor-pointer text-lg text-white transition hover:text-indigo-500  ${
            active === item.value && "font-bold"
          }`}
        >
          {item.label}
        </h3>
      ))}
    </div>
  );
};
export default HomeFilters;
