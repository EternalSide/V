"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface FilterComponentsProps {
  filters: any;
  containerClasses?: string;
}

const FilterComponents = ({
  filters,
  containerClasses,
}: FilterComponentsProps) => {
  const searchParams = useSearchParams();
  // const value = searchParams.get("q");
  const router = useRouter();

  useEffect(() => {}, []);

  const handleFiltering = (value: string) => {
    try {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "q",
        value,
      });

      router.push(newUrl, { scroll: false });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`${containerClasses}`}>
      <Select onValueChange={handleFiltering}>
        <SelectTrigger className="w-full bg-main border-neutral-800">
          <SelectValue placeholder="Рекомендованное" />
        </SelectTrigger>
        <SelectContent className="bg-black border-neutral-800 text-white">
          {filters.map((item: any) => (
            <SelectItem
              className="cursor-pointer hover:bg-main"
              key={item.value}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export default FilterComponents;
