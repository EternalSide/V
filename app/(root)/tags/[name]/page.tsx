import InfiniteScroll from "@/components/shared/InfiniteScroll";
import FilterComponents from "@/components/shared/FilterComponents";
import HomeFilters from "@/components/shared/HomeFilters";
import MobileTagLeft from "@/components/shared/Tag/MobileTagLeft";
import TagHeader from "@/components/shared/Tag/TagHeader";
import {homeFilters} from "@/constants";
import {getTagInfo} from "@/lib/actions/tag.action";
import {getUserById} from "@/lib/actions/user.action";
import {SearchParamsProps} from "@/types";
import {auth} from "@clerk/nextjs";
import {Metadata} from "next";
import Image from "next/image";
import TagLeftInfo from "@/components/shared/Tag/TagLeftInfo";

interface TagPageProps extends SearchParamsProps {
	params: {
		name: string;
	};
}

export async function generateMetadata({params}: TagPageProps): Promise<Metadata> {
	const {tag} = await getTagInfo({tagName: params.name});

	if (!tag) {
		return {
			title: `Тег не найден / V`,
		};
	}

	return {
		title: `${tag.name[0].toUpperCase() + tag.name.slice(1)} / V`,
	};
}

const TagPage = async ({params, searchParams}: TagPageProps) => {
	const {tag, postsLength} = await getTagInfo({
		tagName: params.name,
		search: searchParams?.q,
	});

	const {userId} = auth();
	const user = await getUserById({clerkId: userId!});

	const isFollowing = tag.followers.some((t: any) => t._id.toString() === user?._id.toString());

	const isCreator = tag.author?.toString() === user?._id.toString();

	return (
		<div className='mx-auto w-full max-w-7xl pb-6 pt-[85px] max-[1280px]:px-4'>
			<h1 className='text-4xl font-bold first-letter:uppercase'>{tag.name}</h1>
			<div className='mt-3 h-full'>
				<TagHeader
					tagId={JSON.stringify(tag._id)}
					tagTitle={tag.name}
					tagDescription={tag?.description}
					tagPicture={tag?.picture}
					isFollowing={isFollowing}
					isCreator={isCreator}
					userId={JSON.stringify(user?._id)}
				/>

				<section className='flex w-full justify-start gap-0 max-lg:mt-6 max-sm:mt-0'>
					<TagLeftInfo
						tagInfo={tag?.info}
						tagFollowers={tag?.followers}
						postsLength={postsLength}
					/>

					<div className='flex flex-1 flex-col  pt-12 max-lg:border-l-transparent max-sm:pt-6'>
						<div className='flex items-center gap-3 px-4 max-lg:px-0'>
							<MobileTagLeft
								info={tag?.info ? tag.info : null}
								followers={tag?.followers}
								postCount={tag.posts.length}
							/>
							<HomeFilters />
							<FilterComponents
								containerClasses='sm:hidden flex-1'
								filters={homeFilters}
							/>
						</div>

						<div className='mt-2.5 flex flex-col gap-1.5 max-sm:mt-5 '>
							{tag.posts.length > 0 ? (
								<InfiniteScroll
									tagName={params.name}
									id='TagPage'
									posts={tag.posts}
									user={JSON.stringify(user)}
									filterValue={searchParams?.q!}
								/>
							) : (
								<div className='flex flex-col items-center gap-3'>
									<div className='relative h-64 w-full'>
										<Image
											fill
											src='https://i.pinimg.com/736x/33/a5/fe/33a5fe463b06359c015cfa2ac6c21afd.jpg'
											alt='Ничего не найдено'
											className='rounded-md object-cover'
										/>
									</div>
									<h3 className='text-zinc-400'>Ничего не найдено...</h3>
									<p className='text-zinc-400'>Станьте первым, кто напишет статью в разделе {params.name}</p>
								</div>
							)}
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};
export default TagPage;
