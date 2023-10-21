import Image from "next/image";
import Link from "next/link";
import ParseHTML from "../ParseHTML";
import {UserAvatar} from "../UserAvatar";
import {IUser} from "@/database/models/user.model";

interface Props {
	tagInfo: string;
	postsLength: number;
	tagFollowers: IUser[];
}

const TagLeftInfo = ({tagInfo, tagFollowers, postsLength}: Props) => {
	return (
		<div className='w-[280px] pt-10 max-lg:hidden'>
			<div className='flex items-center justify-between'>
				<Link href='/create'>
					<button className='button ml-3 bg-indigo-600 text-white'>Новый пост</button>
				</Link>
			</div>
			<div className='mt-4 border-y border-neutral-800 p-5'>
				<h3 className='font-semibold'>Информация</h3>
				{tagInfo ? (
					<ParseHTML
						data={tagInfo}
						info={true}
					/>
				) : (
					<p className='mt-4 text-sm text-zinc-300'>Автор не указал информацию.</p>
				)}
			</div>
			<div className='w-full border-neutral-800' />
			<div className='border-b border-neutral-800 p-5'>
				<h3 className='font-semibold'>Участники</h3>
				{tagFollowers.length > 0 ? (
					<div className='mt-4 grid grid-cols-4 gap-3 content-center'>
						{tagFollowers.map((item: IUser) => (
							<Link
								key={item._id}
								href={`/${item.username}`}
							>
								<UserAvatar
									imgUrl={item.picture}
									classNames='h-12 w-12'
								/>
							</Link>
						))}
					</div>
				) : (
					<div className='mt-4 flex flex-col items-center gap-3'>
						<div className='relative h-32 w-3/4'>
							<Image
								fill
								src='https://i.pinimg.com/564x/50/d9/8a/50d98ab13eab211195c1ce2a41c49ef6.jpg'
								alt='Лого Тега'
								className='rounded-md object-cover'
							/>
						</div>
						<h3 className='text-zinc-400'>Ничего не найдено...</h3>
					</div>
				)}
			</div>
			<div className='p-5 text-center'>
				<p className='font-semibold text-zinc-400'>Опубликовано постов: {postsLength}</p>
			</div>
		</div>
	);
};
export default TagLeftInfo;
