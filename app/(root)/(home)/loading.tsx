import BellPusher from "@/components/shared/BellPusher";
import FilterComponents from "@/components/shared/FilterComponents";
import HomeFilters from "@/components/shared/HomeFilters";
import {BaseLink} from "@/components/shared/Sidebar/LeftSidebar";
import {BlockTitle} from "@/components/shared/Sidebar/RightSidebar";
import {Skeleton} from "@/components/ui/skeleton";
import {homeFilters, sidebarLinks} from "@/constants";
import {Hash, Loader2Icon} from "lucide-react";

const Loading = () => {
	return (
		<div className='mx-auto flex w-full max-w-7xl gap-3 max-lg:gap-0 h-full'>
			<div className='h-full sticky left-0 top-0 flex  flex-col gap-8 overflow-y-auto border-neutral-700 pl-4 pt-[95px] max-lg:h-full max-lg:border-r max-lg:px-2 max-sm:hidden lg:w-[254px]'>
				<div className='flex flex-col gap-3'>
					{sidebarLinks.map((item) => {
						return (
							<BaseLink
								key={item.label}
								label={item.label}
								route='/'
								icon={item.icon}
							/>
						);
					})}
					<BellPusher />
				</div>

				<div>
					<h3 className='px-3 text-xl font-bold max-lg:hidden'>Подписки</h3>
					<div className='mt-3 flex flex-col gap-2'>
						<div className='flex items-center  gap-x-4 rounded-md'>
							<Hash className='h-[26px] w-[26px] animate-in fade-in zoom-in max-lg:h-7 max-lg:w-7' />
							<Skeleton className='w-full h-8' />
						</div>
					</div>
					<div className='mt-3 flex flex-col gap-2'>
						<div className='flex items-center  gap-x-4 rounded-md'>
							<Hash className='h-[26px] w-[26px] animate-in fade-in zoom-in max-lg:h-7 max-lg:w-7' />
							<Skeleton className='w-full h-8' />
						</div>
					</div>
				</div>
			</div>

			<section className='flex w-full flex-1 flex-col h-full border-x border-neutral-700 pb-6 pt-[75px] max-lg:border-l-transparent  max-md:pb-14'>
				<div className=''>
					<div className='mb-3 border-b border-neutral-700 pb-5'>
						<h1 className='px-4 text-3xl font-bold'>Главная</h1>
					</div>
					<div className='px-4'>
						<HomeFilters />
						<FilterComponents
							containerClasses='sm:hidden'
							filters={homeFilters}
						/>
					</div>
				</div>
				<div className='mt-2.5 flex flex-col gap-1.5'>
					<Loader2Icon className='mx-auto my-10 h-10 w-10 animate-spin text-indigo-500' />
				</div>
			</section>

			<div
				className='sticky right-0 top-0 flex h-fit w-[330px]
    flex-col overflow-y-auto pb-5  pt-[75px] text-white dark:shadow-none max-[1330px]:pr-4 max-xl:hidden'
			>
				<div className='bg-main w-full rounded-md border border-neutral-800'>
					<BlockTitle name='Популярное' />
					<div className='flex h-[370px] items-center  justify-center'>
						<Loader2Icon className='h-10 w-10 animate-spin text-indigo-500' />
					</div>
				</div>

				<div className='bg-main mt-5 w-full rounded-md border border-neutral-800'>
					<BlockTitle name='Топ Авторов' />
					<div className='flex h-[248px] items-center justify-center'>
						<Loader2Icon className='h-10 w-10 animate-spin text-indigo-500' />
					</div>
				</div>
			</div>
		</div>
	);
};
export default Loading;
