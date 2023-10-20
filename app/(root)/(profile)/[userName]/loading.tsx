import {Loader2Icon} from "lucide-react";

const Loading = () => {
	return (
		<div className='w-full min-h-screen flex justify-center items-center'>
			<Loader2Icon className='h-[70px] w-[70px] animate-spin text-indigo-500' />
		</div>
	);
};
export default Loading;
