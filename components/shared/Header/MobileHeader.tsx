import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTrigger,
} from "@/components/ui/sheet";
import {sidebarLinks} from "@/constants";
import {Menu} from "lucide-react";
import {SidebarLink} from "../Sidebar/SidebarLink";

const MobileHeader = async ({username}: {username: string}) => {
	return (
		<Sheet>
			<SheetTrigger className='sm:hidden'>
				<Menu className='h-7 w-7' />
			</SheetTrigger>
			<SheetContent
				side='left'
				className='w-[300px] border-r-neutral-800 bg-black pt-16 z-[666]'
			>
				<SheetHeader>
					<SheetDescription>
						<div className='flex flex-col gap-5'>
							{sidebarLinks.map((link) => {
								const isProfileLink = link.label === "Профиль";
								return (
									<SheetClose
										key={link.route}
										asChild
									>
										<SidebarLink
											label={link.label}
											route={
												!isProfileLink
													? link.route
													: !username
													? "/sign-in"
													: username
											}
											icon={link.icon}
										/>
									</SheetClose>
								);
							})}
						</div>
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};
export default MobileHeader;
