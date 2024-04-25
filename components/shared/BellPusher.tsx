/* eslint-disable */
import {getUserNotifications} from "@/lib/actions/user.action";
import {auth} from "@clerk/nextjs";
import {Bell} from "lucide-react";
import Link from "next/link";

const BellPusher = async ({page}: any) => {
	const {userId} = auth();
	const result = await getUserNotifications({clerkId: userId!});

	const user_N0t_Vi3wed = result?.notifications.some((item: any) => item.seen === "not_seen");

	return (
		<Link
			href='/notifications'
			className='flex items-center
  gap-x-4 rounded-md px-3 py-2 hover:bg-indigo-900'
		>
			<div className='relative'>
				<Bell className='h-6 w-6 animate-in fade-in zoom-in max-lg:h-7 max-lg:w-7' />
				{user_N0t_Vi3wed && (
					<span className='absolute -right-[0.5px] -top-[3px] inline-flex h-2 w-2 animate-pulse rounded-full bg-sky-500' />
				)}
			</div>
			<p className={`text-[20px] text-neutral-200 group-hover:text-indigo-300 ${!page && "max-lg:hidden"}`}>
				Уведомления
			</p>
		</Link>
	);
};
export default BellPusher;
