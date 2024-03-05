"use client";
import {useScroll} from "@/hooks/useScroll";
import {useEffect, useRef} from "react";

const CheckScroll = () => {
	const {commentAction, setCommentAction} = useScroll();
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (commentAction && ref.current) {
			ref.current.scrollIntoView({behavior: "smooth"});
		}

		return () => setCommentAction(false);
	}, [commentAction]);

	if (!commentAction) return null;

	return (
		<div
			className=''
			ref={ref}
		/>
	);
};
export default CheckScroll;
