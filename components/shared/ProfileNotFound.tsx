import {Cake, ExternalLink, FileEdit, Frown, MessageCircle} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProfileNotFound = () => {
	const userInfo = [
		{
			icon: Cake,
			text: `Регистрация: Октябрь 2023`,
		},
	];
	return (
		<div className='mx-auto w-full max-w-6xl px-4 pt-[75px] max-md:px-3'>
			<div className='bg-main mt-12 w-full rounded-md border-neutral-900 pb-8'>
				<div className='relative flex flex-col items-center max-md:items-start max-md:px-3'>
					<div className='relative -mt-12 h-32 w-32'>
						<Image
							fill
							className='aspect-auto rounded-full border-[8px] border-black object-cover object-top'
							alt='Test alt'
							src='/nouser.jfif'
						/>
					</div>
					<div className='mt-6 flex flex-col items-center gap-3 text-center max-md:items-start max-md:px-3 max-md:text-left'>
						<div>
							<h1 className='text-3xl font-bold'>Аккаунт 404</h1>
						</div>
						<p className='max-w-2xl'>Информация отсутствует.</p>

						<div className='mt-4 flex gap-6 max-md:flex-col max-md:gap-4'>
							{userInfo?.map((item: any) => (
								<div
									key={item.label}
									className='flex items-center gap-2'
								>
									<item.icon
										color='#969696'
										className='h-5 w-5'
									/>
									<p className='pt-1 text-sm text-neutral-400'>{item.text}</p>
								</div>
							))}
							<Link
								target='_blank'
								href='https://v-hazel-beta.vercel.app/'
								className='group flex items-center gap-2'
							>
								<ExternalLink
									color='#969696'
									className='!group-hover:text-indigo-500 h-5 w-5 transition'
								/>
								<p className='pt-1 text-sm text-neutral-400 transition group-hover:text-indigo-500'>
									v-hazel-beta.vercel.app
								</p>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className='mt-1.5 flex items-start gap-3 pb-4'>
				<div className='bg-main flex w-[330px] flex-col gap-5 p-5 max-md:hidden rounded-md'>
					<div className='flex items-center gap-2.5'>
						<FileEdit
							color='#969696'
							className='h-5 w-5'
						/>
						<p className='text-neutral-200'>Публикаций: 0</p>
					</div>
					<div className='flex items-center gap-2.5'>
						<MessageCircle
							color='#969696'
							className='h-5 w-5'
						/>
						<p className='text-neutral-200'>Комментариев: 0</p>
					</div>
				</div>

				<div className='bg-main flex h-[400px] w-full flex-col items-center justify-center gap-1.5'>
					<Frown className='h-16 w-16 text-zinc-400' />
					<h3 className='font-semibold text-zinc-400 text-2xl'>Ничего не найдено :(</h3>
				</div>
			</div>
		</div>
	);
};
export default ProfileNotFound;
