import InfiniteScroll from "@/components/shared/InfiniteScroll";
import ProfileNotFound from "@/components/shared/ProfileNotFound";
import UserPinnedPost from "@/components/shared/UserPinnedPost";
import UserHeader from "@/components/shared/user/UserHeader";
import UserLeftInfo from "@/components/shared/user/UserLeftInfo";
import {getUserById, getUserByUserName} from "@/lib/actions/user.action";
import {formatDate} from "@/lib/utils";
import {auth} from "@clerk/nextjs";
import {Cake, Frown, MapPin} from "lucide-react";
import {Metadata} from "next";

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
	const user = await getUserByUserName({username: params.userName});

	if (!user) return <ProfileNotFound />;

	const {userId} = auth();
	const currentUser = await getUserById({clerkId: userId!});

	const isOwnProfile = userId && user?.clerkId === userId;

	const generateUserInfo = (location: string, joinedAt: string) => {
		return [
			{
				icon: MapPin,
				text: location ? location : "Не Известно",
			},
			{
				icon: Cake,
				text: `Регистрация: ${formatDate(joinedAt)}`,
			},
		];
	};

	const userInfo = generateUserInfo(user?.location, user?.joinedAt);

	return (
		<div className='mx-auto w-full max-w-6xl px-4 pt-[75px] max-md:px-0 '>
			<div className={`absolute left-0 top-[55px] h-[130px] w-full bg-${user?.theme_color}-700`} />
			<UserHeader
				portfolioWebsite={user?.portfolioWebsite}
				isOwnProfile={isOwnProfile}
				picture={user?.picture}
				name={user?.name}
				username={user?.username}
				role={user?.role}
				bio={user?.bio}
				userInfo={userInfo}
			/>
			<div className='mt-1.5 flex items-start gap-2.5 pb-4'>
				<UserLeftInfo
					about={user?.about}
					postsLength={user.posts.length}
					followingTags={user?.followingTags}
				/>

				<div className='flex w-full flex-col gap-2'>
					{user?.userPinned && (
						<UserPinnedPost
							isOwnProfile={isOwnProfile}
							pinnedPost={user.userPinned}
							currentUserId={currentUser?._id.toString() || null}
							isPostSaved={currentUser?.savedPosts.includes(user?.userPinned?._id.toString())}
							border={`border-${user?.theme_color}-500`}
							bg={`bg-${user?.theme_color}-500`}
						/>
					)}
					{user?.posts.length > 0 ? (
						<InfiniteScroll
							userId={userId?.toString()}
							user={JSON.stringify(currentUser)}
							posts={JSON.parse(JSON.stringify(user.posts))}
							id='ProfilePage'
							username={user.username}
							mainId={currentUser?._id.toString()}
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
