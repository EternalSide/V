import {getPopularPosts} from "@/server_actions/post.action";
import Link from "next/link";

const RightSidebar = async () => {
	const popularPosts = await getPopularPosts();

	return (
		<div className='sticky right-0 top-0 flex w-full max-w-[330px] flex-col gap-5 overflow-y-auto pt-6 max-[1330px]:pr-4 max-xl:hidden'>
			<div className='bg-main flex w-full flex-col rounded-md border border-neutral-800'>
				<div className='border-b border-neutral-800 p-5'>
					<h3 className='text-xl font-bold'>#Популярное</h3>
				</div>
				{popularPosts.map((post: any) => (
					<Link
						key={post._id}
						href={`/post/${post._id}`}
						className='group border border-transparent p-5 hover:border-indigo-700 transition'
					>
						<p className='text-neutral-200 transition group-hover:text-indigo-500'>
							{post.title}
						</p>
						<p className='mt-2 text-sm text-zinc-400'>
							Комментариев: {post?.comments?.length || 0}
						</p>
					</Link>
				))}
			</div>
			<div className='text-center'>
				<p className='text-zinc-400'>V (c) {2024}</p>
			</div>
		</div>
	);
};
export default RightSidebar;
