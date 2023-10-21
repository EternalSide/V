import Link from "next/link";

const TagRightInfo = () => {
	return (
		<div className='pt-12 w-full max-w-[280px] max-lg:hidden'>
			<h3 className='font-serif text-zinc-200 text-xl font-semibold'>#Популярное</h3>
			<div className='p-5 flex gap-8 flex-col'>
				<Link
					className='group'
					href='/'
				>
					<h3 className='text-zinc-300 group-hover:text-indigo-400 transition'>
						Я не могу минут 30 в себя прийти»: Валя Карнавал в истерике вышла в Сеть
					</h3>
					<p className='text-zinc-300 text-sm mt-2.5'>0 комментариев</p>
				</Link>
				<Link
					className='group'
					href='/'
				>
					<h3 className='text-zinc-300 group-hover:text-indigo-400 transition'>
						Я не могу минут 30 в себя прийти»: Валя Карнавал в истерике вышла в Сеть
					</h3>
					<p className='text-zinc-300 text-sm mt-2.5'>0 комментариев</p>
				</Link>
				<Link
					className='group'
					href='/'
				>
					<h3 className='text-zinc-300 group-hover:text-indigo-400 transition'>
						Я не могу минут 30 в себя прийти»: Валя Карнавал в истерике вышла в Сеть
					</h3>
					<p className='text-zinc-300 text-sm mt-2.5'>0 комментариев</p>
				</Link>
			</div>
		</div>
	);
};
export default TagRightInfo;
