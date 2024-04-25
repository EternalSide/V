"use client";
import {deletePostFromFavourites} from "@/server_actions/user.action";
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
		<button onClick={handleDelete}>
			<DeleteIcon className='h-5 w-5 text-red-500 hover:opacity-90 transition' />
		</button>
	);
};
export default DeleteFromFavouritesAction;
