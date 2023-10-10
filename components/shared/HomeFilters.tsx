"use client";

import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const value = searchParams.get("q");
  const router = useRouter();
  const filters = [
    {
      value: "recommended",
      label: "Рекомендованное",
    },
    {
      value: "new",
      label: "Недавние",
    },
    {
      value: "popular",
      label: "Популярные",
    },
  ];

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
    <div className="flex items-center gap-3">
      {filters.map((item) => (
        <h3
          onClick={() => handleSearch(item.value)}
          key={item.value}
          className={`text-lg text-white cursor-pointer hover:opacity-90 ${
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
