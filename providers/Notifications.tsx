"use client";

import { toast } from "@/components/ui/use-toast";
import { pusher } from "@/lib/pusher";
import { useEffect } from "react";

interface Props {
  userId: string;
}

const Notifications = ({ userId }: Props) => {
  // const audioElement = new Audio("/iphone_ding.mp3");

  useEffect(() => {
    if (userId) {
      // @ts-ignore
      const channel = pusher.subscribe(userId);

      // Комментарии
      channel.bind("comment", (data: string) => {
        toast({
          duration: 2000,
          title: data,
        });
        // audioElement.play();
      });

      // Лайки
      channel.bind("like", (data: string) => {
        toast({
          duration: 2000,
          title: data,
        });

        // audioElement.play();
      });

      return () => {
        pusher.unsubscribe(userId);
        pusher.unbind("comment");
        pusher.unbind("like");
      };
    }
  }, []);

  return null;
};
export default Notifications;
