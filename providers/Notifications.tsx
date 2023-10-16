"use client";

import { toast } from "@/components/ui/use-toast";
import { pusherClient } from "@/lib/pusher";
import { useEffect } from "react";

interface Props {
  userId: string;
}

const Notifications = ({ userId }: Props) => {
  // const audioElement = new Audio("/iphone_ding.mp3");

  useEffect(() => {
    if (userId) {
      const channel = pusherClient.subscribe(userId);
      console.log(userId);
      // Комментарии
      channel.bind("comment", (data: string) => {
        toast({
          duration: 2000,
          title: data,
        });
        // audioElement.play();
        console.log("okkk");
      });

      // Лайки
      channel.bind("like", (data: string) => {
        toast({
          duration: 2000,
          title: data,
        });
        console.log("okkk");
        // audioElement.play();
      });

      return () => {
        pusherClient.unsubscribe(userId);
        pusherClient.unbind("comment");
        pusherClient.unbind("like");
      };
    }
  }, []);

  return null;
};
export default Notifications;
