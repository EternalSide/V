import {Skeleton} from "@/components/ui/skeleton";
import {homeFilters} from "@/constants";
import {Loader2Icon, Menu} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const Loading = () => {
	return (
		<div className='w-full min-h-screen flex justify-center items-center'>
			<Loader2Icon className='h-[70px] w-[70px] animate-spin text-indigo-500' />
		</div>
	);
};
export default Loading;
