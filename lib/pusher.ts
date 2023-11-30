import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
	appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
	key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
	secret: process.env.NEXT_PUBLIC_PUSHER_SECRET!,
	cluster: "eu",
	useTLS: true,
});

declare global {
	let pusher: PusherClient | undefined;
}

export const pusher =
	// @ts-ignore
	globalThis.pusher ||
	new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
		cluster: "eu",
	});
// @ts-ignore
if (process.env.NODE_ENV !== "production") globalThis.pusher = pusher;
