"use client";

import {toast} from "@/components/ui/use-toast";
import {pusher} from "@/lib/pusher";
import {useEffect} from "react";

interface Props {
	userId: string;
	userSettings: any;
}

const Notifications = ({userId, userSettings}: Props) => {
	// const audioElement = new Audio("/iphone_ding.mp3");
	const settings = JSON.parse(userSettings);

	useEffect(() => {
		// @ts-ignore
		const channel = pusher.subscribe(userId);

		// Комментарии
		if (settings.notification_comment === true) {
			channel.bind("comment", (data: string) => {
				toast({
					duration: 2000,
					title: data,
				});
				// audioElement.play();
			});
		}

		// Лайки
		if (settings.notification_like === true) {
			channel.bind("like", (data: string) => {
				toast({
					duration: 2000,
					title: data,
				});

				// audioElement.play();
			});
		}

		return () => {
			pusher.unsubscribe(userId);
			pusher.unbind("comment");
			pusher.unbind("like");
		};
	}, []);

	return null;
};
export default Notifications;
