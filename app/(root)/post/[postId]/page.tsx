import {getPostById} from "@/server_actions/post.action";
import {getTimestamp} from "@/lib/utils";
import ParseHTML from "@/components/shared/ParseHTML";
import Link from "next/link";
import Image from "next/image";
import {auth} from "@clerk/nextjs";
import PostActions from "@/components/actions/PostActions";
import {getUserById} from "@/server_actions/user.action";
import CreateCommentForm from "@/components/forms/CreateCommentForm";
import AllComents from "@/app/(root)/post/[postId]/AllComents";
import UserCard from "@/components/cards/UserCard";
import CheckScroll from "@/components/shared/CheckScroll";

interface ProfilePageProps {
	params: {postId: string};
}

const PostPage = async ({params}: ProfilePageProps) => {
	const post = await getPostById({id: params.postId});
	const {userId: currentUserClerkId} = auth();
	const isOwnPost = post?.author.clerkId === currentUserClerkId;

	const currentUser = await getUserById({clerkId: currentUserClerkId!});

	return (
		<div className='mx-auto flex w-full max-w-7xl items-start gap-3 max-lg:gap-0 pt-[75px] max-[1400px]:px-3 max-lg:px-0 max-lg:pt-[55px] max-md:px-0'>
			<PostActions
				isLiked={post.upvotes.includes(currentUser?._id.toString())}
				isPostSaved={currentUser?.savedPosts.includes(post._id)}
				userId={currentUser?._id.toString()}
				postId={post._id.toString()}
				likesLength={post.upvotes.length}
				commentsNumber={post.comments.length}
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
							<div className='relative h-10 w-10'>
								<Image
									alt={`Изображение ${post.author?.picture}`}
									fill
									src={post.author?.picture}
									className='rounded-full object-cover'
								/>
							</div>

							<div>
								<h3 className='text-lg font-semibold first-letter:uppercase'>
									{post.author.name}
								</h3>
								<p className='-mt-0.5 text-sm text-neutral-400'>
									@{post.author.username}
								</p>
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
					<p className='text-xs text-neutral-400'>
						{getTimestamp(post.createdAt)}
					</p>
				</div>

				<div className='mt-4 flex items-center gap-3 px-14 max-md:px-6'>
					<p className='text-sm text-neutral-400'>Просмотров: {post.views}</p>
					<p className='text-sm text-neutral-400'>
						Комментариев: {post.comments.length}
					</p>
				</div>

				<div className=' mt-10 px-14 max-md:px-6'>
					<h1 className='mb-10 text-5xl font-bold max-md:text-3xl'>
						{post.title}
					</h1>
					<ParseHTML
						data={post.text}
						post={true}
					/>
				</div>
				<CheckScroll />
				<div className='w-full border-t border-neutral-800 p-12 pt-8 max-md:p-6'>
					<h1 className='text-3xl font-semibold'>
						Все Комментарии ({post.comments.length})
					</h1>
					<AllComents postId={params.postId} />
					{currentUser ? (
						<CreateCommentForm
							authorId={currentUser?._id.toString()}
							postId={params.postId}
						/>
					) : (
						<Link href='/sign-in'>
							<p className='mt-6 text-center'>
								Войдите, чтобы оставить комментарий.
							</p>
						</Link>
					)}
				</div>
			</div>
			<div className='sticky right-0 top-0 overflow-y-auto'>
				<UserCard author={post.author} />
			</div>
		</div>
	);
};
export default PostPage;
