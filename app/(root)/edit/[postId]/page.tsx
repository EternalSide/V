import CreateEditPostForm from "@/components/forms/CreateEditPostForm";
import {getPostById} from "@/server_actions/post.action";
import {getUserById} from "@/server_actions/user.action";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";

export const metadata = {
	title: {
		absolute: "Редактировать / V",
	},
};

const EditPostPage = async ({params}: {params: {postId: string}}) => {
	const {userId: clerkId} = auth();
	if (!clerkId) redirect("/sign-in");

	const user = await getUserById({clerkId});
	const post = await getPostById({id: params.postId});

	const isOwnPost = post?.author.clerkId === clerkId;
	if (!isOwnPost) redirect("/");

	return (
		<div className='mx-auto w-full  max-w-7xl pt-[85px] max-[1280px]:px-4'>
			<h1 className='text-3xl font-bold'>Редактировать</h1>
			<CreateEditPostForm
				type='Edit'
				postDetails={JSON.stringify(post)}
				authorId={user._id.toString()}
			/>
		</div>
	);
};
export default EditPostPage;
