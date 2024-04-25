import PostCard from "@/components/cards/PostCard";
import LeftSidebar from "@/components/shared/Sidebar/LeftSidebar";
import RightSidebar from "@/components/shared/Sidebar/RightSidebar";
import {IComment} from "@/server_actions/models/comment.model";
import {IPost} from "@/server_actions/models/post.model";
import {IUser} from "@/server_actions/models/user.model";
import {getAllPosts} from "@/server_actions/post.action";
import {getUserById} from "@/server_actions/user.action";
import {auth} from "@clerk/nextjs";

export type PostWithAuthorAndComments = IPost & {
	author: IUser;
	comments: IComment & {
		author: IUser;
	};
};

export default async function Home() {
	const {userId} = auth();
	const user = await getUserById({clerkId: userId!});
	const posts = await getAllPosts();

	return (
		<div className='mx-auto flex w-full max-w-7xl gap-3 max-lg:gap-0 h-full pt-[56px]'>
			<LeftSidebar username={user?.username} />
			<section className='flex flex-1 flex-col border-x border-neutral-700 pb-6 max-lg:border-l-transparent'>
				<div className='border-b border-neutral-700 p-4'>
					<h1 className='text-3xl font-bold'>Главная</h1>
				</div>
				<div className='flex flex-col gap-1.5 flex-1'>
					{posts.map((post: PostWithAuthorAndComments) => (
						<PostCard
							key={post._id.toString()}
							userId={user?._id.toString() || null}
							isPostSaved={user?.savedPosts.includes(post._id)}
							post={post}
						/>
					))}
				</div>
			</section>
			<RightSidebar />
		</div>
	);
}
