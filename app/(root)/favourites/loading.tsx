import {Loader2Icon} from "lucide-react";

const Loading = () => {
	return (
		<div className='mx-auto w-full max-w-7xl pt-[85px] max-[1300px]:px-8'>
			<h1 className='text-3xl font-bold text-white'>Избранное </h1>
			<div className='flex gap-5 max-lg:flex-col max-lg:gap-2.5'>
				<div className='mt-6 flex flex-col gap-3 w-[270px] max-md:w-full'>
					<div className='font-semibold bg-[#1b1a1a] w-full rounded-xl p-3'>Посты</div>
				</div>
				<div className='mt-6 flex-1 flex flex-col gap-12 bg-[#171717] rounded-xl py-6 px-8'>
					<div className='flex items-center h-64 justify-center'>
						<Loader2Icon className='h-12 w-12 animate-spin text-indigo-500' />
					</div>
				</div>
			</div>
		</div>
	);
};
export default Loading;
