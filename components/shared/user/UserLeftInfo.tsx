import {FileEdit} from "lucide-react";
import Link from "next/link";

const UserLeftInfo = ({about, postsLength, followingTags}: any) => {
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
			{followingTags.length > 0 && (
				<div className='bg-main rounded-md'>
					<div className='flex gap-2 items-center p-5 '>
						<h3 className='text-lg font-semibold'>Сообщества</h3>
					</div>
					<div className='border-b border-zinc-800' />

					{followingTags.map((item: any) => (
						<Link
							className='group flex items-start gap-2.5 border-b border-zinc-800 p-5'
							key={item._id}
							href={`/tags/${item.name}`}
						>
							<img
								src={item.picture || "/nouser.jfif"}
								className='h-10 w-10 object-cover rounded-full mt-0.5'
							/>

							<div className='flex flex-col gap-2.5'>
								<p className='font-semibold text-zinc-300 first-letter:uppercase group-hover:text-indigo-400'>
									{item.name}
								</p>
								<p className='text-xs text-zinc-300'>
									{item?.description
										? String(item.description).length > 50
											? item.description.slice(0, 50) + "..."
											: item.description
										: "Информация отсутствует."}
								</p>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
};
export default UserLeftInfo;
