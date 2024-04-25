"use client";
import {FileEdit, Trash} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {deletePost} from "@/lib/actions/post.action";
import {useToast} from "../ui/use-toast";
import React from "react";

interface Props {
	type?: string;
	itemId: string;
	authorId?: string;
}

const EditDeletePost = ({type, itemId, authorId}: Props) => {
	const path = usePathname();
	const router = useRouter();
	const {toast} = useToast();

	async function handleDeletePost(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		if (type === "Post") {
			await deletePost({postId: itemId, authorId: authorId!, path});
			return toast({
				title: "Пост удален ✅",
				duration: 2000,
			});
		}
	}

	async function handleEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		router.push(`/edit/${itemId}`);
	}

	return (
		<>
			<button onClick={handleEdit}>
				<FileEdit className='h-5 w-5 cursor-pointer text-indigo-500 transition hover:opacity-90' />
			</button>
			<button onClick={handleDeletePost}>
				<Trash className='h-5 w-5 cursor-pointer text-red-500 transition hover:opacity-90' />
			</button>
		</>
	);
};
export default EditDeletePost;
