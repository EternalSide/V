import Link from "next/link";
import Image from "next/image";
import {FilePlus} from "lucide-react";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import MobileNavbar from "./MobileNavbar";
import GlobalSearch from "@/components/shared/GlobalSearch";

const Navbar = ({followingTags, username}: any) => {
	return (
		<div className='bg-main fixed z-[10000] flex h-14 w-full border-b border-neutral-800 shadow-xl max-[1280px]:px-4'>
			<div className='mx-auto flex w-full max-w-7xl items-center justify-between'>
				<div className='flex items-center gap-x-2'>
					<Link
						className='max-sm:hidden flex items-end gap-0.5'
						href='/'
					>
						<Image
							alt='Лого Сайта'
							src='/favicon.png'
							width={40}
							height={45}
							className='object-cover border-2 border-indigo-800 '
						/>
					</Link>

					<div className='sm:hidden'>
						<MobileNavbar
							followingTags={followingTags}
							username={username}
						/>
					</div>
					<GlobalSearch />
				</div>

				<div className='flex items-center gap-x-3'>
					<SignedOut>
						<Link href='/sign-in'>
							<button className='button button-main'>Войти</button>
						</Link>
						<Link href='/sign-up'>
							<button className='button button-main'>Регистрация</button>
						</Link>
					</SignedOut>

					<SignedIn>
						<Link href='/create'>
							<button className='button button-main flex items-center gap-1.5'>
								<FilePlus className='h-4 w-4' />
								Опубликовать
							</button>
						</Link>
						<UserButton afterSignOutUrl='/' />
					</SignedIn>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
