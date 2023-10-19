import InfiniteScroll from "@/components/InfiniteScroll";
import PostCard from "@/components/cards/PostCard";
import ProfileNotFound from "@/components/shared/ProfileNotFound";
import {UserAvatar} from "@/components/shared/UserAvatar";
import {getUserById, getUserByUserName} from "@/lib/actions/user.action";
import {formatDate, formatedLink} from "@/lib/utils";
import {auth} from "@clerk/nextjs";
import {Cake, ExternalLink, FileEdit, MapPin, Verified} from "lucide-react";
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

	const mongoUser = await getUserById({clerkId: userId!});
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
			<div className='absolute left-0 top-[55px] -z-50 h-[130px] w-full bg-indigo-600' />
			<div className='bg-main mt-12 w-full rounded-md border-neutral-900 pb-8'>
				<div className='relative flex flex-col items-center max-md:items-start max-md:px-3'>
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

			<div className='mt-1.5 flex items-start gap-3 pb-4'>
				<div className=' flex w-[330px] flex-col gap-2.5 max-md:hidden'>
					<div className='bg-main rounded-md'>
						<h3 className='p-5 text-lg font-semibold'>Сообщества</h3>
						<div className='border-b border-black' />

						{user.followingTags.map((item: any) => (
							<Link
								className='group flex items-center gap-2.5 border-b border-black p-5'
								key={item.name}
								href={`/tags/${item.name}`}
							>
								<UserAvatar
									imgUrl={item.picture || "/nouser.jfif"}
									classNames='h-10 w-10'
								/>
								<p className='font-semibold text-zinc-300 first-letter:uppercase group-hover:text-indigo-500'>
									{item.name}
								</p>
							</Link>
						))}
					</div>

					<div className='bg-main flex items-center gap-2.5 rounded-md p-5 '>
						<FileEdit
							color='#969696'
							className='h-5 w-5'
						/>
						<p className='text-neutral-200'>Публикаций: {user.posts.length}</p>
					</div>
				</div>

				<div className='flex w-full flex-col gap-1.5'>
					<InfiniteScroll
						userId={userId?.toString()}
						user={JSON.stringify(mongoUser)}
						posts={JSON.parse(JSON.stringify(user.posts))}
						id='ProfilePage'
						username={user.username}
					/>
					{/* {user.posts.map((post: any, index: number) => (
						<PostCard
							key={post._id}
							userId={mongoUser?._id.toString()}
							banner={post?.banner}
							page='Profile'
							isPostSaved={mongoUser?.savedPosts.includes(post._id)}
							isOwnProfile={isOwnProfile}
							author={{
								name: user.name,
								picture: user.picture,
								username: user.username,
								_id: user._id.toString(),
							}}
							post={{
								title: post.title,
								comments: post.comments,
								tags: post.tags,
								likes: post.upvotes,
								views: post.views,
								createdAt: post.createdAt,
								id: post._id.toString(),
							}}
						/>
					))} */}
				</div>
			</div>
		</div>
	);
};
export default ProfilePage;
