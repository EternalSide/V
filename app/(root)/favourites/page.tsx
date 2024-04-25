import DeleteFromFavouritesAction from "@/components/actions/DeleteFromFavouritesAction";
import {getUserFavourites} from "@/server_actions/user.action";
import {getTimestamp} from "@/lib/utils";
import {auth, redirectToSignIn} from "@clerk/nextjs";
import {Star} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FavouritesPage = async () => {
	const {userId} = auth();
	if (!userId) return redirectToSignIn();

	const userFavourites = await getUserFavourites({clerkId: userId});

	return (
		<div className='mx-auto w-full max-w-7xl pt-[85px] max-[1300px]:px-8'>
			<h1 className='text-3xl font-bold text-white'>
				Избранное ({userFavourites.length})
			</h1>
			<div className='flex gap-5 max-lg:flex-col max-lg:gap-2.5'>
				<div className='mt-6 flex flex-col gap-3 w-[270px] max-md:w-full'>
					<div className='font-semibold bg-[#1b1a1a] w-full rounded-xl p-3'>
						Посты
					</div>
				</div>
				<div className='mt-6 flex-1 flex flex-col gap-12 bg-main rounded-xl py-6 px-8'>
					{userFavourites?.length > 0 ? (
						userFavourites?.map((item: any) => (
							<article
								key={item._id}
								className='flex gap-2.5 items-start justify-between'
							>
								<div className='flex gap-2.5 items-start'>
									<Link
										className='relative h-10 w-10'
										href={item.author.username}
									>
										<Image
											src={item.author.picture}
											alt={`Изображение ${item.author.picture}`}
											className='rounded-full object-cover'
										/>
									</Link>
									<div className='flex flex-col gap-1.5 max-md:gap-2.5'>
										<Link href={`/post/${item._id}`}>
											<h3 className='max-w-xl line-clamp-1 font-semibold text-xl hover:text-indigo-400 transition'>
												{item.title}
											</h3>
										</Link>
										<div className='flex items-center gap-1 max-md:flex-col max-md:items-start'>
											<div className='flex items-center gap-1'>
												<Link href={item.author.username}>
													<h3 className='text-sm font-semibold hover:text-indigo-400 transition'>
														{item.author.name}
													</h3>
												</Link>
												<p className='text-xs text-zinc-400 mt-0.5'>
													• {getTimestamp(item.createdAt)}
												</p>
											</div>
										</div>
									</div>
								</div>
								<DeleteFromFavouritesAction
									postId={item._id.toString()}
									clerkId={userId}
								/>
							</article>
						))
					) : (
						<div className='flex items-center h-64 justify-center text-center'>
							<div className='flex flex-col gap-2.5'>
								<p className='font-semibold text-xl '>
									Ваш список чтения пуст{" "}
								</p>

								<p className='text-zinc-400'>
									Нажмите
									<Star className='inline mb-1.5 mx-1' />
									при просмотре поста, чтобы добавить его в избранное.
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default FavouritesPage;
