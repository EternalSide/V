import {LucideIcon} from "lucide-react";
import Link from "next/link";

interface Props {
	route: string;
	label: string;
	icon: LucideIcon;
	classNames?: string;
}

export const SidebarLink = ({route, label, icon: Icon, classNames}: Props) => {
	return (
		<Link
			href={route}
			className='flex items-center gap-x-4 rounded-md p-3 hover:bg-indigo-800 transition'
		>
			<Icon className='h-7 w-7' />
			<p className={`text-xl text-neutral-200 ${classNames}`}>{label}</p>
		</Link>
	);
};
