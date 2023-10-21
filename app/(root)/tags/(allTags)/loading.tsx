import {Skeleton} from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<div className='mx-auto w-full max-w-7xl pt-[85px] max-[1300px]:px-8 '>
			<h1 className='text-3xl font-bold text-white'>Сообщества</h1>

			<div className='mt-6 grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1'>
				{Array.from({length: 16}, (_, key) => (
					<Skeleton
						key={key}
						className='h-[192px]'
					/>
				))}
			</div>
		</div>
	);
};
export default Loading;
