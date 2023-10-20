import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import Link from "next/link";
import {Button} from "../../ui/button";
import ParseHTML from "../ParseHTML";
import Image from "next/image";
import {UserAvatar} from "../UserAvatar";

interface Props {
	info: string | null;
	followers: any;
	postCount: number;
}

const MobileTagLeft = ({info, followers, postCount}: Props) => {
	return (
		<div className='lg:hidden'>
			<Sheet>
				<SheetTrigger>
					<Menu className='mt-1.5 h-7 w-7' />
				</SheetTrigger>
				<SheetContent
					side='left'
					className='bg-main w-[300px] overflow-y-auto border-r-black  text-white'
				>
					<SheetHeader>
						<SheetTitle>
							<Link
								className='!mt-5 !p-5'
								href={"/create"}
							>
								<Button className='bg-indigo-600 !p-5 text-white'>Новый пост</Button>
							</Link>
						</SheetTitle>
						<SheetDescription>
							<div className='mt-4  border-y border-neutral-800 py-5 '>
								<h3 className='font-semibold'>Информация</h3>
								{info ? (
									<ParseHTML
										data={info}
										info={true}
									/>
								) : (
									<p className='mt-4 text-sm text-zinc-300'>Автор не указал информацию.</p>
								)}
							</div>
							<div className='border-b border-neutral-800 p-5'>
								<h3 className='font-semibold'>Участники</h3>
								{followers.length > 0 ? (
									<div className='mt-4 grid grid-cols-4 gap-3'>
										{followers.map((item: any) => (
											<Link
												key={item._id}
												href={`/${item.username}`}
											>
												<UserAvatar
													imgUrl={item.picture}
													classNames='h-12 w-12'
												/>
											</Link>
										))}
									</div>
								) : (
									<div className='mt-4 flex flex-col items-center gap-3'>
										<div className='relative h-32 w-3/4'>
											<Image
												fill
												src='https://i.pinimg.com/564x/50/d9/8a/50d98ab13eab211195c1ce2a41c49ef6.jpg'
												alt='Лого Тега'
												className='rounded-md object-cover'
											/>
										</div>
										<h3 className='text-zinc-400'>Ничего не найдено...</h3>
									</div>
								)}
							</div>
							<div className='mt-5 text-center'>
								<p className='font-semibold text-zinc-400'>Опубликовано постов: {postCount}</p>
							</div>
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	);
};
export default MobileTagLeft;
