"use client";
import { FileEdit, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePathname, useRouter } from "next/navigation";
import { deletePost } from "@/lib/actions/post.action";
import { useToast } from "../ui/use-toast";
import React from "react";

interface Props {
  type?: string;
  itemId: string;
  authorId?: string;
}

const EditDeletePost = ({ type, itemId, authorId }: Props) => {
  const path = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  async function handleDeletePost(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    if (type === "Post") {
      await deletePost({ postId: itemId, authorId: authorId!, path });
      return toast({
        title: "Пост удален.",
        duration: 2000,
        className: "toast-black",
      });
    }
  }

  async function handleEdit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    router.push(`/edit/${itemId}`);
  }

  return (
    <>
      <button onClick={handleEdit}>
        <FileEdit className="h-5 w-5 cursor-pointer text-indigo-500 transition hover:opacity-90" />
      </button>
      <button onClick={handleDeletePost}>
        <Trash className="h-5 w-5 cursor-pointer text-red-500 transition hover:opacity-90" />
      </button>
      {/* <AlertDialog>
        <AlertDialogTrigger>
          <Trash className="h-5 w-5 cursor-pointer text-red-500 transition hover:opacity-90" />
        </AlertDialogTrigger>
        <AlertDialogContent className="border-neutral-800 bg-[#0a0a0a] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Это приведет к безвозвратному удалению поста и связанных с ним
              данных.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отменить</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePost}
              className="bg-red-600"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
};
export default EditDeletePost;
