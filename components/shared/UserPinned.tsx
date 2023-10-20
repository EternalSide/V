import {Milestone} from "lucide-react";
import PostCard from "../cards/PostCard";

const UserPinned = ({pinnedPost, isOwnProfile, currentUserId, isPostSaved}: any) => {
	return (
		<div className='relative w-full bg-main rounded-md border-2 border-indigo-500 p-5 pt-10'>
			<div className='absolute left-3 -top-5 z-[100] bg-indigo-500 p-3 rounded-xl flex items-center gap-2'>
				<Milestone
					fill='black'
					className='h-6 w-6 text-black'
				/>
				<p className='text-black font-bold'>Закреп</p>
			</div>
			<PostCard
				userId={currentUserId}
				page='Profile'
				isOwnProfile={isOwnProfile}
				banner={pinnedPost?.banner}
				isPostSaved={isPostSaved}
				author={{
					name: pinnedPost?.author.name,
					picture: pinnedPost?.author.picture,
					username: pinnedPost?.author.username,
					_id: pinnedPost?.author._id,
				}}
				post={{
					id: pinnedPost?._id.toString(),
					title: pinnedPost?.title,
					comments: pinnedPost?.comments,
					likes: pinnedPost?.upvotes,
					views: pinnedPost?.views,
					createdAt: pinnedPost?.createdAt,
					tags: pinnedPost?.tags,
				}}
			/>
		</div>
	);
};
export default UserPinned;
