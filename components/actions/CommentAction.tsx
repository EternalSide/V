"use client";
import {useScroll} from "@/hooks/useScroll";

interface Props {
	children: React.ReactNode;
	className?: string;
}

const CommentAction = ({children, className}: Props) => {
	const {setCommentAction} = useScroll();

	return (
		<button
			onClick={() => setCommentAction(true)}
			className={className}
		>
			{children}
		</button>
	);
};
export default CommentAction;
