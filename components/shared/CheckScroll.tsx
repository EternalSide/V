"use client";
import {useScroll} from "@/hooks/useScroll";
import {useEffect, useRef} from "react";

const CheckScroll = () => {
	const {isCommentButtonPressed, setIsCommentButtonPressed} = useScroll();
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isCommentButtonPressed && ref.current) {
			ref.current.scrollIntoView({behavior: "smooth"});
		}

		return () => setIsCommentButtonPressed(false);
	}, [isCommentButtonPressed]);

	if (!isCommentButtonPressed) return null;

	return <div ref={ref} />;
};
export default CheckScroll;
