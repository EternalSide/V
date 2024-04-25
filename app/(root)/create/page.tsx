import {auth} from "@clerk/nextjs";
import {getUserById} from "@/server_actions/user.action";
import {redirect} from "next/navigation";
import CreateEditPostForm from "@/components/forms/CreateEditPostForm";

export const metadata = {
	title: {
		absolute: "Опубликовать / V",
	},
};
const CreatePage = async () => {
	const {userId: clerkId} = auth();
	if (!clerkId) return redirect("/sign-in");

	const user = await getUserById({clerkId});

	return (
		<div className='mx-auto w-full max-w-7xl pb-8 pt-[85px]  max-[1280px]:px-4'>
			<h1 className='text-3xl font-bold'>Опубликовать</h1>
			<CreateEditPostForm
				type='Create'
				authorId={user._id.toString()}
			/>
		</div>
	);
};
export default CreatePage;
