import Header from "@/components/shared/Header/Header";
import {Toaster} from "@/components/ui/toaster";
import {getUserById} from "@/server_actions/user.action";
import {auth} from "@clerk/nextjs";

const RootLayout = async ({children}: {children: React.ReactNode}) => {
	const {userId} = auth();
	const user = await getUserById({clerkId: userId!});

	return (
		<main className='relative h-full'>
			<Header username={user?.username} />
			{children}
			<Toaster />
		</main>
	);
};
export default RootLayout;
