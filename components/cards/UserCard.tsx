import {formatDate} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import {IUser} from "@/server_actions/models/user.model";

const UserCard = ({author}: {author: IUser}) => {
	const userInfo = [
		{
			label: "О себе:",
			text: author?.bio ? author.bio : "Информация отсутствует.",
		},
		{
			label: "Постов:",
			text: author.posts.length,
		},
		{
			label: "Регистрация:",
			text: formatDate(author.joinedAt),
		},
	];
	return (
		<div className='bg-main relative h-fit w-[320px] rounded-md border border-neutral-800 max-lg:hidden'>
			<div className='h-16 w-full bg-indigo-700' />
			<div className='p-5'>
				<Link
					className='flex items-start gap-2'
					href={`/${author.username}`}
				>
					<div className='relative h-10 w-10'>
						<Image
							src={author?.picture}
							alt={`Изображение ${author?.picture}`}
							fill
							className='rounded-full object-cover'
						/>
					</div>

					<div>
						<h3 className='text-xl font-semibold first-letter:uppercase'>
							{author.name}
						</h3>
						<p className='text-sm text-neutral-400'>@{author.username}</p>
					</div>
				</Link>

				<div className='mt-4 flex flex-col gap-4'>
					{userInfo.map((info: (typeof userInfo)[0]) => (
						<div key={info.label}>
							<h3 className='text-base font-semibold text-neutral-400'>
								{info.label}
							</h3>
							<p className='first-letter:uppercase'>{info.text}</p>
						</div>
					))}
					<Link href={`/${author.username}`}>
						<button className='button w-full bg-indigo-600'>Профиль</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default UserCard;
