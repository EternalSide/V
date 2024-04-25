"use client";
import {Frown, Loader2Icon, Search} from "lucide-react";
import {Input} from "../ui/input";
import {useEffect, useRef, useState} from "react";
import {SearchInDatabase} from "@/lib/actions/general.action";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {UserAvatar} from "./UserAvatar";

const GlobalSearch = () => {
	// SearchInDatabase

	const [value, setValue] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const [result, setResult] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setResult([]);
		setIsLoading(true);
		const fetchResults = async () => {
			const results = await SearchInDatabase({query: value.trim()});
			setResult(results);
			setIsLoading(false);
			return results;
		};

		const debounce = setTimeout(() => {
			if (value) {
				fetchResults();
			}
		}, 500);

		return () => {
			clearTimeout(debounce);
		};
	}, [value, setValue]);

	const containerRef = useRef(null);

	useEffect(() => {
		const handleOutsideClick = (event: any) => {
			if (
				containerRef.current &&
				// @ts-ignore
				!containerRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};
		setIsOpen(false);
		document.addEventListener("click", handleOutsideClick);

		return () => document.removeEventListener("click", handleOutsideClick);
	}, [containerRef, pathname]);

	return (
		<div
			ref={containerRef}
			className='relative w-[525px] max-lg:hidden'
		>
			<div className='rounded-lg z-50 flex min-h-[40px] items-center gap-1 border border-neutral-700 bg-black  shadow-md focus-within:border-indigo-500 '>
				<Input
					onFocus={(e) => {
						if (result.length > 0) {
							setIsOpen(true);
						}
					}}
					onChange={(e) => {
						setValue(e.target.value);
						if (!isOpen) setIsOpen(true);
						if (e.target.value === "" || (e.target.value.length === 0 && isOpen)) {
							setIsOpen(false);
						}
					}}
					type='text'
					placeholder='Введите запрос'
					className='border-none bg-transparent shadow-none outline-none'
				/>
				<button className='button !cursor-default !rounded-r-none bg-transparent !p-2'>
					<Search className='h-6 w-6' />
				</button>
			</div>

			{isOpen && (
				<div className='absolute top-full z-[1000] py-4 pb-0 mt-2.5 w-full bg-main shadow-sm shadow-black rounded-md'>
					<div className='space-y-5'>
						{isLoading ? (
							<div className='py-10'>
								<Loader2Icon className='mx-auto h-10 w-10 animate-spin text-indigo-500' />
								<p className='text-center text-zinc-200 mt-1.5'>Секундочку..</p>
							</div>
						) : (
							<div className='flex flex-col'>
								<h3 className='px-5 font-semibold text-zinc-200 text-lg pb-4'>Результаты</h3>
								<div className='border-b border-zinc-800 ' />
								{result?.length > 0 ? (
									<div className='py-5 flex flex-col gap-2'>
										{result.map((item: any, index: number) => {
											if (item.type !== "Пост") {
												return (
													<Link
														className='flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-zinc-800'
														key={item.type + item.id + index}
														href={item.href}
													>
														<div className='flex items-start gap-3'>
															<UserAvatar
																imgUrl={item.picture}
																classNames='h-10 w-10'
															/>
															<div className='flex flex-col'>
																<p className='line-clamp-1'>{item.title}</p>
																<p className='mt-1 font-semibold capitalize text-zinc-200'>{item.type}</p>
															</div>
														</div>
													</Link>
												);
											} else {
												return (
													<Link
														className='flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-zinc-800'
														key={item.type + item.id + index}
														href={item.href}
													>
														<Search className='mt-1 w-5 h-5' />
														<div className='flex flex-col'>
															<p className='line-clamp-1'>{item.title}</p>
															<p className='mt-1 font-semibold capitalize text-zinc-200'>{item.type}</p>
														</div>
													</Link>
												);
											}
										})}
									</div>
								) : (
									<div className='flex flex-col items-center text-center px-4 py-10'>
										<Frown className='h-16 w-16 text-zinc-400' />
										<p className='text-zinc-200 mt-1.5 '>Ничего не найдено...</p>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
export default GlobalSearch;
