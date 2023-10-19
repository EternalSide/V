import InfiniteScroll from "@/components/InfiniteScroll";
import FilterComponents from "@/components/shared/FilterComponents";
import HomeFilters from "@/components/shared/HomeFilters";
import LeftSidebar from "@/components/shared/Sidebar/LeftSidebar";
import RightSidebar from "@/components/shared/Sidebar/RightSidebar";
import {homeFilters} from "@/constants";
import {getAllPosts, getRecommendedPosts} from "@/lib/actions/post.action";
import {getUserById} from "@/lib/actions/user.action";
import {SearchParamsProps} from "@/types";
import {auth} from "@clerk/nextjs";

export const metadata = {
	title: {
		absolute: "Главная / V",
	},
};

export default async function Home({searchParams}: SearchParamsProps) {
	const {userId} = auth();
	const user = await getUserById({clerkId: userId!});

	let data: any = [];

	if (searchParams?.q === "recommended") {
		if (userId) {
			data = await getRecommendedPosts({
				userId,
				page: 1,
			});
		} else {
			data = await getRecommendedPosts({
				page: 1,
			});
			console.log(data);
		}
	} else {
		data = await getAllPosts({
			filterValue: searchParams?.q!,
			page: 1,
		});
	}

	// Fake data для тест бесконечнеого скролла
	// for (let i = 0; i <= 100; i++) {
	//   sendFakeData();
	// }

	return (
		<div className='mx-auto flex w-full max-w-7xl gap-3 max-lg:gap-0'>
			<LeftSidebar
				username={user?.username}
				followingTags={user?.followingTags}
			/>
			<section className='flex w-full flex-1 flex-col border-x border-neutral-700 pb-6 pt-[75px] max-lg:border-l-transparent  max-md:pb-14'>
				<div>
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
					<InfiniteScroll
						filterValue={searchParams?.q!}
						userId={userId?.toString()}
						user={JSON.stringify(user)}
						posts={data.posts}
						id={"MainPage"}
					/>
				</div>
			</section>
			<RightSidebar />
		</div>
	);
}
