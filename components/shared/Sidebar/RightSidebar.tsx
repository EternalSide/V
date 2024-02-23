import {getPopularPosts} from "@/lib/actions/post.action";
import {getPopularTags} from "@/lib/actions/tag.action";
import Link from "next/link";
import {ITag} from "@/database/models/tag.model";

export const BlockTitle = ({name}: {name: string}) => {
	return (
		<div className='border-b border-black'>
			<h3 className='p-5 text-xl font-bold'>#{name}</h3>
		</div>
	);
};

interface Nof {
	numberOfPosts: number;
}

const RightSidebar = async () => {
	const popularTags = await getPopularTags();
	const popularPosts = await getPopularPosts();
	const topAuthors = [
		{
			name: "Lesha",
			username: "V",
			picture:
				"https://i.pinimg.com/736x/21/be/dc/21bedc5f6a6e9a957747901d8d27f40a.jpg",
		},
	];

	return (
		<div
			className='sticky right-0 top-0 flex h-fit w-[330px]
    flex-col overflow-y-auto pb-5 pt-[75px] max-[1330px]:pr-4 max-xl:hidden'
		>
			<div className='bg-main flex w-full flex-col rounded-md border border-neutral-800'>
				<BlockTitle name='Популярное' />
				{popularPosts.map((post: any) => (
					<Link
						href={`/post/${post._id.toString()}`}
						key={post._id}
						className='group border border-transparent px-5 py-4 hover:border-indigo-700'
					>
						<p className='text-neutral-200 transition group-hover:text-indigo-500'>
							{post.title}
						</p>
						<p className='mt-2 text-sm text-zinc-400'>
							Комментариев: {post.numberOfComments}
						</p>
					</Link>
				))}
			</div>

			{/* <div className="bg-main mt-5 flex w-full flex-col rounded-md border border-neutral-800">
        <BlockTitle name="Топ Авторов" />
        {topAuthors.map((item: any) => (
          <Link
            key={item.href}
            href={`/${item.username}`}
            className="group flex items-center justify-between border border-transparent px-5 py-4 hover:border-indigo-700"
          >
            <div className="flex items-center gap-2">
              <UserAvatar imgUrl={item.picture} classNames="h-12 w-12" />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-zinc-400">@{item.username}</p>
              </div>
            </div>
            <button className="button !rounded-xl bg-indigo-600 font-semibold">
              Профиль
            </button>
          </Link>
        ))}
      </div> */}

			<div className='bg-main mt-3 flex w-full flex-col rounded-md border border-neutral-800'>
				<BlockTitle name='Сообщества' />
				{popularTags.map((tag: ITag & Nof) => (
					<Link
						href={`/tags/${tag.name}`}
						key={tag._id}
						className='group border border-transparent px-5 py-4 hover:border-indigo-700'
					>
						<p className='font-semibold text-neutral-200 transition first-letter:uppercase hover:text-indigo-500 group-hover:text-indigo-500'>
							{tag.name}
						</p>
						<p className='mt-2 text-sm text-zinc-400'>
							Постов: {tag.numberOfPosts}
						</p>
					</Link>
				))}
			</div>
			<div className='text-center mt-5'>
				<p className='text-zinc-400'>V (c) 2023</p>
			</div>
		</div>
	);
};
export default RightSidebar;
