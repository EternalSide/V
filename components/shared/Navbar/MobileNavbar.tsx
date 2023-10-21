import {Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTrigger} from "@/components/ui/sheet";
import {sidebarLinks} from "@/constants";
import {Hash, Menu} from "lucide-react";
import Link from "next/link";
import BellPusher from "../BellPusher";

const BaseLink = ({route, label, icon: Icon}: any) => {
	return (
		<Link
			href={route}
			className='flex items-center
                      gap-x-4 rounded-md px-3 py-2 hover:bg-indigo-900'
		>
			<Icon className='h-6 w-6 max-lg:h-7 max-lg:w-7' />
			<p className='text-[20px] !text-white  group-hover:text-indigo-300'>{label}</p>
		</Link>
	);
};

const MobileNavbar = async ({username, followingTags}: any) => {
	return (
		<Sheet>
			<SheetTrigger>
				<Menu className='h-7 w-7' />
			</SheetTrigger>
			<SheetContent
				side='left'
				className='w-[300px] overflow-y-auto border-r-black bg-black pt-20 z-[100000] '
			>
				<SheetHeader>
					<SheetDescription>
						<div className='flex flex-col gap-5'>
							{sidebarLinks.map((item) => {
								const isProfileLink = item.label === "Профиль";
								return (
									<SheetClose
										key={item.route}
										asChild
									>
										<BaseLink
											key={item.label}
											label={item.label}
											route={!isProfileLink ? item.route : !username ? "/sign-in" : username}
											icon={item.icon}
										/>
									</SheetClose>
								);
							})}
							<BellPusher page={true} />
						</div>

						<div className='mt-8 text-left'>
							<h3 className='px-3 text-xl font-bold'>Подписки</h3>
							<div className='mt-3 flex flex-col gap-3'>
								{followingTags?.map((tag: any) => (
									<SheetClose
										key={tag._id}
										asChild
									>
										<BaseLink
											route={`/tags/${tag.name}`}
											label={tag.name}
											icon={Hash}
										/>
									</SheetClose>
								))}
							</div>
							{!username && (
								<div
									className='flex items-center
                    gap-x-2 rounded-md px-3 py-2'
								>
									<p className='text-lg text-neutral-200 group-hover:text-indigo-300'>Не найдено.</p>
								</div>
							)}
						</div>
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};
export default MobileNavbar;
