// @ts-nocheck
"use client";
import {useScroll} from "@/hooks/useScroll";
import {useEffect, useRef} from "react";

const CheckScroll = () => {
	const {commentAction, setCommentAction} = useScroll();
	const ref = useRef();
	useEffect(() => {
		if (commentAction) {
			ref.current.scrollIntoView();
		}

		return () => setCommentAction(false);
	}, [commentAction, setCommentAction]);

	if (!commentAction) return null;

	return <div ref={ref} />;
};
export default CheckScroll;
