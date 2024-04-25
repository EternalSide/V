"use client";
import {useScroll} from "@/hooks/useScroll";

interface Props {
	children: React.ReactNode;
	className?: string;
}

const CommentAction = ({children, className}: Props) => {
	const {setIsCommentButtonPressed} = useScroll();

	return (
		<button
			onClick={() => setIsCommentButtonPressed(true)}
			className={className}
		>
			{children}
		</button>
	);
};
export default CommentAction;
