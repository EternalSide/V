import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1688441",
  key: "d3e5b23db86bfc6c8ec2",
  secret: "a3a443360b229a2015ae",
  cluster: "ap1",
  useTLS: true,
});

declare global {
  let pusher: PusherClient | undefined;
}

export const pusher =
  // @ts-ignore
  globalThis.pusher ||
  new PusherClient(`d3e5b23db86bfc6c8ec2`, {
    cluster: "ap1",
  });
// @ts-ignore
if (process.env.NODE_ENV !== "production") globalThis.pusher = pusher;
