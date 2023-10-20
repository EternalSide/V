import InfiniteScroll from "@/components/shared/InfiniteScroll";
import ProfileNotFound from "@/components/shared/ProfileNotFound";
import {UserAvatar} from "@/components/shared/UserAvatar";
import UserPinned from "@/components/shared/UserPinned";
import {getUserById, getUserByUserName} from "@/lib/actions/user.action";
import {formatDate, formatedLink} from "@/lib/utils";
import {auth} from "@clerk/nextjs";
import {BookUser, Cake, ExternalLink, FileEdit, Frown, MapPin, Users2, Verified} from "lucide-react";
import {Metadata} from "next";
import Link from "next/link";

type ProfilePageProps = {
	params: {userName: string};
};

export async function generateMetadata({params}: ProfilePageProps): Promise<Metadata> {
	const user = await getUserByUserName({username: params.userName});

	if (!user) {
		return {
			title: `Пользователь не найден / V`,
		};
	}

	return {
		title: `${user.name} (@${user.username}) / V`,
	};
}

const ProfilePage = async ({params}: ProfilePageProps) => {
	const {userId} = auth();
	const user = await getUserByUserName({username: params.userName});

	const currentUser = await getUserById({clerkId: userId!});

	const isOwnProfile = userId && user?.clerkId === userId;

	if (!user) return <ProfileNotFound />;

	const generateUserInfo = (user: any) => {
		return [
			{
				icon: MapPin,
				text: user?.location ? user.location : "Не Известно",
			},
			{
				icon: Cake,
				text: `Регистрация: ${formatDate(user.joinedAt)}`,
			},
		];
	};

	const userInfo = generateUserInfo(user);

	return (
		<div className='mx-auto w-full max-w-6xl px-4 pt-[75px] max-md:px-0 '>
			<div className='absolute left-0 top-[55px] h-[130px] w-full bg-indigo-700' />
			<div className='bg-main mt-12 w-full rounded-md pb-8 z-10 relative'>
				<div className='relative flex  flex-col items-center max-md:items-start max-md:px-3'>
					{isOwnProfile && (
						<Link href='/settings'>
							<button className='button button-main absolute right-7 top-4'>Редактировать</button>
						</Link>
					)}
					<UserAvatar
						imgUrl={user.picture}
						alt={`Фото ${user.username}`}
						classNames='relative -mt-12 h-32 w-32'
						imageClassNames='aspect-auto border-[8px] border-black object-top'
					/>
					<div className='mt-6 flex flex-col items-center gap-3 text-center max-md:items-start max-md:px-3 max-md:text-left'>
						<div>
							<div className='flex items-center gap-2'>
								<h1 className='text-3xl font-bold'>{user.name}</h1>
								{user?.role === "admin" && (
									<Verified
										color='#6366f1'
										className='mt-1'
									/>
								)}
							</div>
							<p className='text-neutral-400'>@{user.username}</p>
						</div>
						<p className='max-w-2xl'>{user.bio ? user.bio : "Информация отсутствует."}</p>

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
							{user?.portfolioWebsite && (
								<Link
									target='_blank'
									href={user.portfolioWebsite}
									className='group flex items-center gap-2'
								>
									<ExternalLink
										color='#969696'
										className='!group-hover:text-indigo-500 h-5 w-5 transition'
									/>
									<p className='pt-1 text-sm text-neutral-400 transition group-hover:text-indigo-500'>
										{formatedLink(user.portfolioWebsite)}
									</p>
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className='mt-1.5 flex items-start gap-2.5 pb-4'>
				<div className=' flex w-[330px] flex-col gap-1.5 max-md:hidden'>
					<div className='bg-main flex items-center gap-2.5 rounded-md p-5 '>
						<FileEdit className='h-5 w-5 text-zinc-400' />
						<p className='text-neutral-200'>Публикаций: {user.posts.length}</p>
					</div>
					<div className='bg-main rounded-md'>
						<div className='flex gap-2 items-center p-4'>
							<BookUser className='text-zinc-400 h-5 w-5' />
							<h3 className='text-lg font-semibold'>О себе</h3>
						</div>
						<div className='border-b border-zinc-800' />
						<div className='p-4'>
							<p className='text-zinc-400'>Делаю вдох так пахнет диор......</p>
						</div>
					</div>
					{user?.followingTags.length > 0 && (
						<div className='bg-main rounded-md'>
							<div className='flex gap-2 items-center p-5 '>
								<Users2 className='text-zinc-400 h-5 w-5' />
								<h3 className='text-lg font-semibold'>Сообщества</h3>
							</div>
							<div className='border-b border-zinc-800' />

							{user.followingTags.map((item: any) => (
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

				<div className='flex w-full flex-col gap-2'>
					{user?.userPinned && (
						<UserPinned
							isOwnProfile={isOwnProfile}
							pinnedPost={user.userPinned}
							currentUserId={currentUser?._id.toString() || null}
							isPostSaved={currentUser?.savedPosts.includes(user?.userPinned?._id.toString())}
						/>
					)}
					{user?.posts.length > 0 ? (
						<InfiniteScroll
							userId={userId?.toString()}
							user={JSON.stringify(currentUser)}
							posts={JSON.parse(JSON.stringify(user.posts))}
							id='ProfilePage'
							username={user.username}
							mainId={currentUser._id.toString()}
							isOwnProfile={isOwnProfile}
						/>
					) : (
						<div className='bg-main flex h-[400px] w-full flex-col items-center justify-center gap-1.5'>
							<Frown className='h-16 w-16 text-zinc-400' />
							<h3 className='font-semibold text-zinc-400 text-2xl'>Ничего не найдено :(</h3>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default ProfilePage;
