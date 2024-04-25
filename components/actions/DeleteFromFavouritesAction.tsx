"use client";

import {deletePostFromFavourites} from "@/lib/actions/user.action";
import {DeleteIcon} from "lucide-react";
import {useRouter} from "next/navigation";

interface Props {
	clerkId: string;
	postId: string;
}

const DeleteFromFavouritesAction = ({clerkId, postId}: Props) => {
	const router = useRouter();
	const handleDelete = async () => {
		try {
			await deletePostFromFavourites({clerkId, postId});

			router.refresh();
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<button
			onClick={handleDelete}
			type='button'
		>
			<DeleteIcon className='h-5 w-5 text-red-500 cursor-pointer hover:opacity-90 transition' />
		</button>
	);
};
export default DeleteFromFavouritesAction;
