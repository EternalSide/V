import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1688441",
  key: "d3e5b23db86bfc6c8ec2",
  secret: "a3a443360b229a2015ae",
  cluster: "ap1",
  useTLS: true,
});

export const pusherClient = new PusherClient("d3e5b23db86bfc6c8ec2", {
  cluster: "ap1",
});
