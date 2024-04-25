import UserLeftInfo from "@/app/(root)/(profile)/[userName]/UserLeftInfo";
import {getUserByUserName} from "@/server_actions/user.action";
import {formatDate} from "@/lib/utils";
import {auth} from "@clerk/nextjs";
import {Cake, Frown, MapPin} from "lucide-react";
import {redirect} from "next/navigation";
import UserHeader from "./UserHeader";
import PostCard from "@/components/cards/PostCard";

type Props = {
	params: {userName: string};
};

const ProfilePage = async ({params}: Props) => {
	const user = await getUserByUserName({username: params.userName});
	if (!user) return redirect("/");

	const userInfo = [
		{
			icon: MapPin,
			text: user?.location ? user.location : "Не Известно",
		},
		{
			icon: Cake,
			text: `Регистрация: ${formatDate(user.joinedAt)}`,
		},
	];

	const {userId: currentUserClerkId} = auth();

	const isOwnProfile = Boolean(
		currentUserClerkId && user?.clerkId === currentUserClerkId
	);

	return (
		<div className='mx-auto w-full max-w-6xl px-4 pt-[75px] max-md:px-0'>
			<div className='absolute left-0 top-[55px] h-[130px] w-full bg-indigo-700' />
			<UserHeader
				portfolioWebsite={user?.portfolioWebsite}
				isOwnProfile={isOwnProfile}
				picture={user?.picture}
				name={user.name}
				username={user.username}
				bio={user?.bio}
				userInfo={userInfo}
			/>
			<div className='mt-1.5 flex items-start gap-2.5 pb-4'>
				<UserLeftInfo
					about={user?.about}
					postsLength={user.posts.length}
				/>
				<div className='flex w-full flex-col gap-2'>
					{user?.posts.length > 0 ? (
						user.posts.map((post: any) => (
							<PostCard
								key={post.id}
								post={post}
								userId={user?._id.toString() || null}
								isPostSaved={user?.savedPosts.includes(post._id)}
								isOwnProfile={isOwnProfile}
								page='Profile'
							/>
						))
					) : (
						<div className='bg-main flex h-[400px] w-full flex-col items-center justify-center gap-1.5'>
							<Frown className='h-16 w-16 text-zinc-400' />
							<h3 className='font-semibold text-zinc-400 text-2xl'>
								Ничего не найдено :(
							</h3>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default ProfilePage;
