"use client";
import {Search} from "lucide-react";
import {Input} from "./ui/input";
import {useEffect, useState} from "react";
import {SearchInDatabase} from "@/lib/actions/general.action";

const GlobalSearch = () => {
	// SearchInDatabase

	const [value, setValue] = useState("");

	useEffect(() => {
		const fetchResults = async () => {
			const results = await SearchInDatabase({query: value});
			console.log(results);
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

	return (
		<div className='relative w-[425px] max-lg:hidden'>
			<div className='z-50 flex min-h-[40px] items-center gap-1 rounded-sm border border-neutral-700 bg-black  shadow-md focus-within:border-indigo-500 '>
				<Input
					onChange={(e) => setValue(e.target.value)}
					type='text'
					placeholder='Введите запрос'
					className='border-none bg-transparent shadow-none outline-none'
				/>
				<button className='button !rounded-r-none bg-transparent !p-2 hover:bg-indigo-700'>
					<Search className='h-6 w-6' />
				</button>
			</div>
		</div>
	);
};
export default GlobalSearch;
