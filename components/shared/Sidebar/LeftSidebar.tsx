import {sidebarLinks} from "@/constants";
import {SidebarLink} from "./SidebarLink";

const LeftSidebar = async ({username}: {username: string}) => {
	return (
		<div className='sticky lg:w-[254px] left-0 top-0 border-neutral-700 pt-6 max-lg:border-r max-sm:hidden  max-[1280px]:px-2'>
			<div className='flex flex-col gap-3'>
				{sidebarLinks.map((link) => {
					const isProfileLink = link.label === "Профиль";
					const route = !isProfileLink
						? link.route
						: !username
						? "/sign-in"
						: username;
					return (
						<SidebarLink
							label={link.label}
							route={route}
							icon={link.icon}
							classNames='max-lg:hidden'
						/>
					);
				})}
			</div>
		</div>
	);
};
export default LeftSidebar;
