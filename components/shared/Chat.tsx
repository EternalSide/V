"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { pusher } from "@/lib/pusher";
import { Send } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { sendMessage, type } from "@/lib/actions/message.action";
import { toast } from "../ui/use-toast";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { UserAvatar } from "./UserAvatar";
import Link from "next/link";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  text_message: z.string().min(1, {
    message: "text_message must be at least 1 characters.",
  }),
});

type Timeout = ReturnType<typeof setTimeout>;

interface ChatParams {
  authorId: string;
  tagId: string;
  messagesQ: any;
}

const Chat = ({ authorId, tagId, messagesQ }: ChatParams) => {
  const form = useForm({
    defaultValues: {
      text_message: "",
    },
    resolver: zodResolver(formSchema),
  });

  const parsedMessages = JSON.parse(messagesQ);
  const [messages, setMessages] = useState(parsedMessages);

  const router = useRouter();
  const pathname = usePathname();

  const [typing, setTyping] = useState("");
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);

  const scrollRef = useRef();

  useEffect(() => {
    router.refresh();
    // @ts-ignore
    scrollRef.current.scrollIntoView();
  }, [router]);

  useEffect(() => {
    if (tagId) {
      // @ts-ignore
      const channel = pusher.subscribe(tagId);

      channel.bind("new-type", (data: any) => {
        if (data.value === "typing") {
          setTyping(`${data.name} печатает сообщение...`);
        } else {
          setTyping(``);
        }
      });

      // Комментарии
      channel.bind("new-message", (data: any) => {
        toast({
          duration: 2000,
          title: "Сообщение отправлено",
        });

        setMessages((previousmessages: any) => {
          if (previousmessages.some((item: any) => item._id === data._id))
            return previousmessages;
          return [data, ...previousmessages];
        });
      });

      return () => {
        pusher.unsubscribe(tagId);
        pusher.unbind("new-message");
        pusher.unbind("new-type");
      };
    }
  }, [tagId]);

  // Уведомление всем участникам чата, что пользователь начал печатать.
  useEffect(() => {
    if (!authorId) return;
    /* Отправляем всем кто в чате уведомление, как 
     только пользователь начал печатать. */
    if (count === 0 && value) {
      type({
        authorId,
        tagId,
        value: "typing",
      });
    }

    let debouncedValue: Timeout;

    /* Как только пользователь перестал печатать, 
      уведомление о том что он печатает пропадет */
    if (value) {
      debouncedValue = setTimeout(() => {
        setCount(0);
        type({
          authorId,
          tagId,
          value: "not_typing",
        });
      }, 1500);

      setCount(1);
    }

    /* Это не даст нам отправить запрос, что пользователь перестал печатать. */
    return () => clearTimeout(debouncedValue);
  }, [value, authorId, tagId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!authorId) {
      return toast({
        title: "Отказ",
      });
    }
    try {
      await sendMessage({
        authorId,
        tagId,
        path: pathname,
        text: values.text_message,
      });

      toast({
        title: "Сообщение отправлено",
      });
      router.refresh();
      // @ts-ignore
      scrollRef.current.scrollIntoView();
      form.reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="w-full flex-1 overflow-y-auto border-x border-neutral-700">
        <div className="flex flex-1 flex-col  gap-6  px-4  pt-5">
          {messages?.map((message: any) => (
            <div className="flex items-center gap-2" key={message._id}>
              <Link href={`/${message.author.username}`}>
                <UserAvatar
                  imgUrl={message.author.picture}
                  classNames="h-10 w-10"
                />
              </Link>
              <div>
                <div className="flex max-w-3xl items-center gap-2">
                  <Link href={`/${message.author.username}`}>
                    <h3 className="font-semibold">{message.author.name}</h3>
                  </Link>
                  <p className="text-xs text-zinc-400">Сегодня, в 7:36</p>
                </div>
                <p className="line-clamp-1">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-1.5 ml-4">
          {typing.length > 1 && <p>{typing}</p>}
        </div>
        {/* @ts-ignore */}
        <div ref={scrollRef!} className="pt-10" />
        {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="text_message"
            render={({ field }) => (
              <FormItem onChange={(e: any) => setValue(e.target.value)}>
                <FormControl>
                  <div className="flex items-center justify-between gap-3 border-t border-neutral-700  bg-transparent py-2.5 pl-2 pr-6">
                    <Textarea
                      className="!no-focus !h-2 border-transparent bg-transparent"
                      placeholder="Введите сообщение.."
                      {...field}
                    />
                    <Button type="submit" className="!w-fit">
                      <Send className="h-7 w-7 text-indigo-500 transition hover:opacity-90" />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form> */}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="text_message"
            render={({ field }) => (
              <FormItem onChange={(e: any) => setValue(e.target.value)}>
                <FormControl>
                  <div className="flex items-center justify-between gap-3 border-l border-t border-neutral-700  bg-transparent py-2.5 pl-2 pr-6">
                    <Textarea
                      className="!no-focus !h-2 border-transparent bg-transparent"
                      placeholder="Введите сообщение.."
                      {...field}
                    />
                    <Button type="submit" className="!w-fit">
                      <Send className="h-7 w-7 text-indigo-500 transition hover:opacity-90" />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};
export default Chat;
