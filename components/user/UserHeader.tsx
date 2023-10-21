import Link from "next/link";
import {UserAvatar} from "../shared/UserAvatar";
import {ExternalLink, LucideIcon, Verified} from "lucide-react";
import {formatedLink} from "@/lib/utils";

interface Props {
	portfolioWebsite: string;
	isOwnProfile: boolean | string | null;
	picture: string;
	name: string;
	username: string;
	role: string;
	bio: string;
	userInfo: {
		icon: LucideIcon;
		text: string;
	}[];
}

const UserHeader = ({portfolioWebsite, isOwnProfile, picture, name, username, role, bio, userInfo}: Props) => {
	return (
		<div className='bg-main mt-12 w-full rounded-md pb-8 z-10 relative'>
			<div className='relative flex  flex-col items-center max-md:items-start max-md:px-3'>
				{isOwnProfile && (
					<Link href='/settings'>
						<button className='button button-main absolute right-7 top-4'>Редактировать</button>
					</Link>
				)}
				<UserAvatar
					imgUrl={picture}
					alt={`Фото ${username}`}
					classNames='relative -mt-12 h-32 w-32'
					imageClassNames='aspect-auto border-[8px] border-black object-top'
				/>
				<div className='mt-6 flex flex-col items-center gap-3 text-center max-md:items-start max-md:px-3 max-md:text-left'>
					<div>
						<div className='flex items-center gap-2'>
							<h1 className='text-3xl font-bold'>{name}</h1>
							{role === "admin" && (
								<Verified
									color='#6366f1'
									className='mt-1'
								/>
							)}
						</div>
						<p className='text-neutral-400'>@{username}</p>
					</div>
					<p className='max-w-2xl'>{bio ? bio : "Информация отсутствует."}</p>

					<div className='mt-4 flex gap-6 max-md:flex-col max-md:gap-4'>
						{userInfo?.map((item: any) => (
							<div
								key={item.text}
								className='flex items-center gap-2'
							>
								<item.icon
									color='#969696'
									className='h-5 w-5'
								/>
								<p className='pt-1 text-sm text-neutral-400'>{item.text}</p>
							</div>
						))}
						{portfolioWebsite && (
							<Link
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
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default UserHeader;
