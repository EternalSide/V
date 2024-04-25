import {getComments} from "@/server_actions/comment.action";
import ParseHTML from "../../../../components/shared/ParseHTML";
import Link from "next/link";
import {formatDate} from "@/lib/utils";
import {IComment} from "@/server_actions/models/comment.model";
import {IUser} from "@/server_actions/models/user.model";
import Image from "next/image";

const AllComents = async ({postId}: {postId: string}) => {
	const {comments} = await getComments({postId});

	return (
		<div className='mt-7 flex flex-col gap-10'>
			{comments?.map((comment: IComment & {author: IUser}) => (
				<article
					key={comment._id.toString()}
					className='flex w-full comments-start gap-3'
				>
					<Link
						className='relative h-10 w-10 mt-3'
						href={`/${comment.author.username}`}
					>
						<Image
							src={comment.author?.picture}
							alt={""}
							fill
							className='rounded-full object-cover'
						/>
					</Link>
					<div className='flex-1 rounded-lg border border-neutral-800 p-5'>
						<div className='mb-5 flex comments-center gap-3'>
							<Link
								href={`/${comment.author.username}`}
								className='flex comments-center gap-1 font-semibold'
							>
								<p>{comment.author.name}</p>
								<p className='text-sm text-zinc-400'>
									@{comment.author.username}
								</p>
							</Link>
							<p className='text-sm text-neutral-400'>
								{formatDate(comment.createdAt)}
							</p>
						</div>
						<ParseHTML data={comment.text} />
					</div>
				</article>
			))}
		</div>
	);
};
export default AllComents;
