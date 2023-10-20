import TagActions from "../actions/TagActions";

interface TagCardProps {
	tagTitle: string;
	tagPostsNumber: number;
	tagId: string;
	userId: string | null;
	isFollowing: boolean;
}

const TagCard = ({tagTitle, tagPostsNumber, tagId, isFollowing, userId}: TagCardProps) => {
	return (
		<div className='bg-main flex h-48 flex-col items-center justify-center rounded-md p-5'>
			<div className='flex flex-col gap-1.5'>
				<h3 className='text-xl font-semibold'>#{tagTitle}</h3>
				<p className='text-base text-neutral-400'>Постов: {tagPostsNumber}</p>
				<div className='mt-3'>
					<TagActions
						userId={userId}
						isFollowing={isFollowing}
						tagId={tagId}
						tagTitle={tagTitle}
					/>
				</div>
			</div>
		</div>
	);
};
export default TagCard;
