import Navbar from "@/components/shared/Navbar/Navbar";
import {Toaster} from "@/components/ui/toaster";
import {getUserById} from "@/lib/actions/user.action";
import Notifications from "@/providers/Notifications";
import {ChildrenProps} from "@/types";
import {auth} from "@clerk/nextjs";

const RootLayout = async ({children}: ChildrenProps) => {
	const {userId} = auth();
	const user = await getUserById({clerkId: userId!});

	const notificationsDisabled =
		user.settings.notification_comment === false && user.settings.notification_like === false;

	return (
		<main className='relative h-full'>
			<Navbar
				followingTags={user?.followingTags}
				username={user?.username}
			/>
			<div className='relative mx-auto flex h-full w-full flex-col justify-between'>
				{children}
				{!notificationsDisabled && userId && (
					<Notifications
						userSettings={JSON.stringify(user.settings)}
						userId={user?._id.toString()}
					/>
				)}
				<Toaster />
			</div>
		</main>
	);
};
export default RootLayout;
