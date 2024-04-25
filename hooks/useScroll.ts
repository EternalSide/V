import {create} from "zustand";

interface StateProps {
	isCommentButtonPressed: boolean;
	setIsCommentButtonPressed: (value: boolean) => void;
}

export const useScroll = create<StateProps>((set) => ({
	isCommentButtonPressed: false,
	setIsCommentButtonPressed: (value) =>
		set(() => ({isCommentButtonPressed: value})),
}));
