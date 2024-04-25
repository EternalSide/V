import {FileEdit} from "lucide-react";

const UserLeftInfo = ({about, postsLength}: any) => {
	return (
		<div className=' flex w-[330px] flex-col gap-1.5 max-md:hidden'>
			<div className='bg-main flex items-center gap-2.5 rounded-md p-5 '>
				<FileEdit className='h-5 w-5 text-zinc-400' />
				<p className='text-neutral-200'>Публикаций: {postsLength}</p>
			</div>
			{about && about.length > 0 && (
				<div className='bg-main rounded-md'>
					<div className='flex gap-2 items-center p-4'>
						<h3 className='text-lg font-semibold'>О себе</h3>
					</div>
					<div className='border-b border-zinc-800' />
					<div className='p-4'>
						<p className='text-zinc-400'>{about}</p>
					</div>
				</div>
			)}
		</div>
	);
};
export default UserLeftInfo;
