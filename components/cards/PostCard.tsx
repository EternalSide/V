import {Eye, MessageCircle} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {getTimestamp} from "@/lib/utils";
import {UserAvatar} from "../shared/UserAvatar";
import EditDeletePost from "../actions/EditDeletePost";
import StarAction from "../actions/StarAction";
import TagLink from "../shared/Tag/TagLink";
import Metric from "../shared/Metric";
import ParseHTML from "../shared/ParseHTML";
import LikeAction from "../actions/LikeAction";
import CommentAction from "../actions/CommentAction";

interface Props {
	userId: string | null;
	isPostSaved: boolean;
	banner?: string;
	isOwnProfile?: any;
	page?: string;

	author: {_id: string; name: string; picture: string; username: string};

	post: {
		id: string;
		title: string;
		comments: any;
		tags: {
			_id: string;
			name: string;
		}[];

		likes: any;
		views: number;
		createdAt: Date;
	};
}

const PostCard = ({author, post, userId, isOwnProfile, isPostSaved, page, banner}: Props) => {
	return (
		<Link
			href={`/post/${post.id}`}
			className='card-main'
		>
			{banner && (
				<div className='relative h-64 w-full'>
					<Image
						fill
						className='object-cover object-top max-sm:p-4 max-sm:pb-0'
						alt='Изображение к посту'
						src={banner}
					/>
				</div>
			)}

			<div className='relative w-full py-4 pl-5 pr-7'>
				<div className='absolute right-7 top-4 flex items-center gap-x-2'>
					<StarAction
						authorName={author.name}
						userId={userId!}
						postId={post.id}
						isPostSaved={isPostSaved}
					/>

					{isOwnProfile && page === "Profile" && (
						<EditDeletePost
							type='Post'
							itemId={post.id}
							authorId={author._id}
						/>
					)}
				</div>
				<div>
					<div className='flex gap-2'>
						<UserAvatar
							imgUrl={author.picture}
							alt={author.name}
							classNames='h-10 w-10'
						/>

						<div className='flex flex-col'>
							<div className='flex items-center gap-2'>
								<h3 className='first-letter:uppercase'>{author.name}</h3>
								<p className='mt-1 text-xs text-zinc-400'>{getTimestamp(post.createdAt)}</p>
							</div>
							<p className='-mt-1 text-sm text-zinc-400'>@{author.username}</p>
							<h3 className='mt-3 text-2xl font-bold transition hover:text-indigo-400 max-sm:text-xl'>{post.title}</h3>
							<div className='mt-1.5 flex items-center gap-0.5'>
								{post.tags.map((tag: any) => (
									<TagLink
										key={tag._id}
										tagName={tag.name}
									/>
								))}
							</div>
							<div className='mt-3 flex items-center gap-6'>
								<div className='flex items-center gap-6'>
									<LikeAction
										postId={post.id}
										userId={userId}
										likes={post.likes}
										likesLength={post.likes.length}
									/>
									<CommentAction className='flex items-center gap-1.5'>
										<MessageCircle className='text-neutral-300 hover:opacity-80 transition' />
										<p className='text-sm text-neutral-300'>{post.comments.length}</p>
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
				<div className='mt-6 flex flex-col gap-3'>
					{post?.comments.length >= 2 &&
						post.comments.slice(0, 2).map((item: any) => (
							<article
								key={item._id}
								className='flex w-full items-start gap-2'
							>
								<div>
									<UserAvatar
										imgUrl={item.author.picture}
										classNames='h-8 w-8'
									/>
								</div>
								<div className='flex-1 rounded-lg bg-[#272727] p-5 pb-2.5'>
									<div className='mb-5 flex items-center gap-1.5'>
										<div className='flex items-center gap-1 font-semibold'>
											<p>{item.author.name}</p>
											<p className='text-sm text-zinc-400'>@{item.author.username}</p>
										</div>
										<p className='mt-0.5 text-xs text-zinc-400'>{getTimestamp(item.createdAt)}</p>
									</div>
									<ParseHTML
										data={item.text}
										comment
									/>
								</div>
							</article>
						))}
				</div>
				<div className='group ml-8 mt-4 w-fit rounded-xl px-3 py-2  hover:bg-zinc-800'>
					<CommentAction>
						<p className='text-sm font-semibold text-zinc-400 group-hover:text-white'>
							Все комментарии ({post.comments.length})
						</p>
					</CommentAction>
				</div>
			</div>
		</Link>
	);
};
export default PostCard;
