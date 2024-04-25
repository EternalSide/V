import Link from "next/link";
import {ExternalLink, LucideIcon} from "lucide-react";
import {formatedLink} from "@/lib/utils";
import Image from "next/image";

interface Props {
	portfolioWebsite: string;
	isOwnProfile: boolean;
	picture: string;
	name: string;
	username: string;
	bio: string;
	userInfo: {
		icon: LucideIcon;
		text: string;
	}[];
}

const UserHeader = ({
	portfolioWebsite,
	isOwnProfile,
	picture,
	name,
	username,
	bio,
	userInfo,
}: Props) => {
	return (
		<div className='bg-main mt-12 w-full rounded-md pb-8 z-10 relative'>
			<div className='relative flex  flex-col items-center max-md:items-start max-md:px-3'>
				{isOwnProfile && (
					<Link href='/settings'>
						<button className='button button-main absolute right-7 top-4'>
							Редактировать
						</button>
					</Link>
				)}
				<div className='relative -mt-12 h-32 w-32'>
					<Image
						src={picture}
						alt={`Фото ${username}`}
						className='aspect-auto border-[8px] border-black object-top rounded-full object-cover'
					/>
				</div>

				<div className='mt-6 flex flex-col items-center gap-3 text-center max-md:items-start max-md:px-3 max-md:text-left'>
					<div>
						<div className='flex items-center gap-2'>
							<h1 className='text-3xl font-bold'>{name}</h1>
						</div>
						<p className='text-neutral-400'>@{username}</p>
					</div>
					<p className='max-w-2xl'>{bio ? bio : "Информация отсутствует."}</p>

					<div className='mt-4 flex gap-6 max-md:flex-col max-md:gap-4'>
						{userInfo?.map((info: (typeof userInfo)[0]) => (
							<div
								key={info.text}
								className='flex items-center gap-2'
							>
								<info.icon
									color='#969696'
									className='h-5 w-5'
								/>
								<p className='pt-1 text-sm text-neutral-400'>{info.text}</p>
							</div>
						))}
						{portfolioWebsite && (
							<a
								target='_blank'
								href={portfolioWebsite}
								className='group flex items-center gap-2'
							>
								<ExternalLink
									color='#969696'
									className='!group-hover:text-indigo-500 h-5 w-5 transition'
								/>
								<p className='pt-1 text-sm text-neutral-400 transition group-hover:text-indigo-500'>
									{formatedLink(portfolioWebsite)}
								</p>
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default UserHeader;
