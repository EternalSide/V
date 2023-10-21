import {getPopularPosts, getPostById} from "@/lib/actions/post.action";
import {getTimestamp} from "@/lib/utils";
import ParseHTML from "@/components/shared/ParseHTML";
import Link from "next/link";
import {UserAvatar} from "@/components/shared/UserAvatar";
import Image from "next/image";
import {auth} from "@clerk/nextjs";
import PostActions from "@/components/actions/PostActions";
import {getUserById} from "@/lib/actions/user.action";
import CreateCommentForm from "@/components/forms/CreateCommentForm";
import AllComents from "@/components/shared/AllComents";
import {Metadata} from "next";
import UserCard from "@/components/cards/UserCard";
import {ITag} from "@/database/models/tag.model";
import TagLink from "@/components/shared/Tag/TagLink";
import {BlockTitle} from "@/components/shared/Sidebar/RightSidebar";
import CheckScroll from "@/components/shared/CheckScroll";

interface ProfilePageProps {
	params: {postId: string};
}

export async function generateMetadata({params}: ProfilePageProps): Promise<Metadata> {
	const post = await getPostById({id: params.postId});

	return {
		title: `${post.title} / V`,
	};
}

const PostPage = async ({params}: ProfilePageProps) => {
	const post = await getPostById({id: params.postId});
	const {userId} = auth();
	// Заменить на рекомендуемое
	const popularPosts = await getPopularPosts();
	let user;

	if (userId) {
		user = await getUserById({clerkId: userId});
	}

	const isOwnPost = post?.author.clerkId === userId;

	return (
		<div className='mx-auto flex w-full max-w-7xl items-start gap-3 max-lg:gap-0 pt-[75px] max-[1400px]:px-3 max-lg:px-0 max-lg:pt-[55px] max-md:px-0'>
			<PostActions
				isLiked={post.upvotes.includes(user?._id.toString())}
				isPostSaved={user?.savedPosts.includes(post._id)}
				userId={user?._id.toString()}
				postId={post._id.toString()}
				likesNumber={post.upvotes.length}
				authorName={post.author.name}
			/>

			<div className='bg-main ml-20 flex flex-1 flex-col rounded-md max-md:ml-0 '>
				{post?.banner && (
					<div className='relative h-[320px] w-full'>
						<Image
							alt='Баннер'
							fill
							src={post?.banner}
							className='rounded-t-md object-cover object-center'
						/>
					</div>
				)}

				<div className='mt-6 flex items-start gap-1.5 px-14 max-md:px-6'>
					<div className='flex w-full items-start justify-between '>
						<Link
							href={`/${post.author.username}`}
							className='flex items-center gap-1.5'
						>
							<UserAvatar
								alt={post.author.name}
								classNames='h-10 w-10'
								imgUrl={post.author.picture}
							/>
							<div>
								<h3 className='text-lg font-semibold first-letter:uppercase'>{post.author.name}</h3>
								<p className='-mt-0.5 text-sm text-neutral-400'>@{post.author.username}</p>
							</div>
						</Link>
						{isOwnPost && (
							<Link href={`/edit/${post._id}`}>
								<button className='button button-main'>Редактировать</button>
							</Link>
						)}
					</div>
				</div>

				<div className='mt-2.5 px-14 max-md:px-6'>
					<p className='text-xs text-neutral-400'>{getTimestamp(post.createdAt)}</p>
					<div className='mt-2.5'>
						{post.tags.map((tag: ITag) => (
							<TagLink
								key={tag._id}
								tagName={tag.name}
							/>
						))}
					</div>
				</div>

				<div className='mt-4 flex items-center gap-3 px-14 max-md:px-6'>
					<p className='text-sm text-neutral-400'>Просмотров: {post.views}</p>
					<p className='text-sm text-neutral-400'>Комментариев: {post.comments.length}</p>
				</div>

				<div className=' mt-10 px-14 max-md:px-6'>
					<h1 className='mb-10 text-5xl font-bold max-md:text-3xl'>{post.title}</h1>
					<ParseHTML
						data={post.text}
						post={true}
					/>
				</div>
				<CheckScroll />
				<div className='w-full border-t border-neutral-800 p-12 pt-8 max-md:p-6'>
					<h1 className='text-3xl font-semibold'>Все Комментарии ({post.comments.length})</h1>

					<AllComents postId={params.postId} />
					{user ? (
						<CreateCommentForm
							authorId={user?._id.toString()}
							postId={params.postId}
						/>
					) : (
						<Link href='/sign-in'>
							<p className='mt-6 text-center'>Войдите, чтобы оставить комментарий.</p>
						</Link>
					)}
				</div>
			</div>

			<div className='sticky right-0 top-0 overflow-y-auto'>
				<UserCard author={post.author} />

				<div className='bg-main mt-3 flex h-fit w-[320px] flex-col rounded-md border border-neutral-800 max-lg:hidden'>
					<BlockTitle name='Похожее' />
					{popularPosts.slice(0, 3).map((post: any) => (
						<Link
							href={`/post/${post._id.toString()}`}
							key={post._id}
							className='group border border-transparent px-5 py-4 hover:border-indigo-700'
						>
							<p className='text-neutral-200 transition group-hover:text-indigo-500'>{post.title}</p>
							<p className='mt-2 text-sm text-zinc-400'>Комментариев: {post.numberOfComments}</p>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};
export default PostPage;
