"use client";

import {useScroll} from "@/hooks/useScroll";
import {MessageCircle} from "lucide-react";

const CommentAction = ({number}: {number: number}) => {
	const {setCommentAction} = useScroll();

	return (
		<button
			onClick={() => setCommentAction(true)}
			className='flex items-center gap-1.5'
		>
			<MessageCircle className='text-neutral-300 hover:opacity-80 transition' />
			<p className='text-sm text-neutral-300'>{number}</p>
		</button>
	);
};
export default CommentAction;
