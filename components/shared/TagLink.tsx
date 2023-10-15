"use client";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface TagLinkProps {
  tagName: string;
}

const TagLink = ({ tagName }: TagLinkProps) => {
  const router = useRouter();
  return (
    <Button
      className="!pl-0"
      onClick={(e: any) => {
        e.preventDefault();
        router.push(`/tags/${tagName}`);
      }}
    >
      <Badge className="!rounded-md border border-transparent bg-transparent !px-1.5 py-1  text-sm text-neutral-300 first-letter:uppercase hover:border hover:border-neutral-700 hover:bg-neutral-800">
        #{tagName}
      </Badge>
    </Button>
  );
};
export default TagLink;
