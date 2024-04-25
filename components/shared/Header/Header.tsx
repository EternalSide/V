import Link from "next/link";
import Image from "next/image";
import {FilePlus} from "lucide-react";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import MobileHeader from "./MobileHeader";

const Header = ({username}: {username: string}) => {
	return (
		<header className='bg-main fixed z-[666] flex h-14 w-full border-b border-neutral-800 shadow-xl max-[1280px]:px-4'>
			<div className='mx-auto flex w-full max-w-7xl items-center justify-between'>
				<Link
					className='max-sm:hidden'
					href='/'
				>
					<Image
						alt='Лого Сайта'
						src='/favicon.png'
						width={40}
						height={40}
						className='object-cover border-2 border-indigo-800 '
					/>
				</Link>
				<MobileHeader username={username} />

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
							<button className='button button-main flex items-center gap-2'>
								<FilePlus className='h-4 w-4' />
								Опубликовать
							</button>
						</Link>
						<UserButton afterSignOutUrl='/' />
					</SignedIn>
				</div>
			</div>
		</header>
	);
};
export default Header;
