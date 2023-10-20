import {create} from "zustand";

interface StateProps {
	commentAction: boolean;
	setCommentAction: (value: boolean) => void;
}

export const useScroll = create<StateProps>((set) => ({
	commentAction: false,
	setCommentAction: (value) => set(() => ({commentAction: value})),
}));
