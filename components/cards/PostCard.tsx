"use client";
import {Eye, MessageCircle} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {getTimestamp} from "@/lib/utils";
import EditDeletePost from "../actions/EditDeletePost";
import StarAction from "../actions/StarAction";
import Metric from "../shared/Metric";
import LikeAction from "../actions/LikeAction";
import CommentAction from "../actions/CommentAction";
import {useRouter} from "next/navigation";
import {PostWithAuthorAndComments} from "@/app/(root)/(home)/page";

interface Props {
	userId: string | null;
	isPostSaved: boolean;
	isOwnProfile?: boolean;
	page?: "Profile";
	post: PostWithAuthorAndComments;
}

const PostCard = ({post, userId, isOwnProfile, isPostSaved, page}: Props) => {
	const router = useRouter();

	const goToProfile = (e: any) => {
		e.preventDefault();
		return router.push(`/${post.author.username}`);
	};

	const isLiked = Boolean(
		userId &&
			post.upvotes.some((upvote) => upvote.toString() === userId.toString())
	);

	return (
		<Link
			href={`/post/${post._id}`}
			className='bg-main flex w-full flex-col items-start border border-transparent hover:border-indigo-700'
		>
			{post?.banner && (
				<div className='relative h-64 w-full'>
					<Image
						fill
						className='object-cover object-top max-sm:p-4 max-sm:pb-0'
						alt='Изображение к посту'
						src={post.banner}
					/>
				</div>
			)}

			<div className='relative w-full py-6 pl-5 pr-7'>
				<div className='absolute right-7 top-4 flex items-center gap-x-2'>
					<StarAction
						userId={userId!}
						postId={post._id}
						isPostSaved={isPostSaved}
					/>
					{isOwnProfile && page === "Profile" && (
						<EditDeletePost
							type='Post'
							postId={post._id}
							authorId={post.author._id.toString()}
						/>
					)}
				</div>
				<div>
					<div className='flex gap-2'>
						<button
							onClick={goToProfile}
							className='relative h-10 min-w-[40px] w-10'
						>
							<Image
								src={post.author?.picture}
								alt={`Изображение ${post.author?.picture}`}
								fill
								className='rounded-full object-cover'
							/>
						</button>

						<div className='flex flex-col'>
							<div className='flex items-center gap-2'>
								<button onClick={goToProfile}>
									<h3 className='first-letter:uppercase'>{post.author.name}</h3>
								</button>
								<p className='mt-1 text-xs text-zinc-400'>
									{getTimestamp(post.createdAt)}
								</p>
							</div>
							<p className='-mt-1 text-sm text-zinc-400'>
								@{post.author.username}
							</p>
							<h3 className='mt-3 text-2xl font-bold transition hover:text-indigo-400 max-sm:text-xl'>
								{post.title}
							</h3>

							<div className='mt-5 flex items-center gap-6'>
								<div className='flex items-center gap-6'>
									<LikeAction
										postId={post._id}
										userId={userId}
										likesLength={post.upvotes.length}
										isLiked={isLiked}
									/>
									<CommentAction className='flex items-center gap-1.5 text-sm text-neutral-300'>
										<MessageCircle className='text-neutral-300 hover:opacity-80 transition' />
										{post?.comments.length}
									</CommentAction>
								</div>
								<Metric
									icon={Eye}
									number={post.views}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};
export default PostCard;
