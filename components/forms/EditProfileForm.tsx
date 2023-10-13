"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { updateUser } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  portfolioWebsite: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const EditProfileForm = ({ user }: any) => {
  const parsedUser = JSON.parse(user);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      portfolioWebsite: parsedUser?.portfolioWebsite
        ? parsedUser.portfolioWebsite
        : "",
      location: parsedUser?.location ? parsedUser.location : "",
      bio: parsedUser?.bio ? parsedUser.bio : "",
    },
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await updateUser({
        path: "/",
        clerkId: parsedUser.clerkId,
        updatedData: values,
      });

      router.push(`/${parsedUser.username}`);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const { isDirty } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="min-w-full bg-main rounded-md p-6 space-y-10">
          <h1 className="font-bold text-2xl">Дополнительно</h1>
          <FormField
            control={form.control}
            name="portfolioWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Портфолио</FormLabel>
                <FormControl>
                  <Input
                    className="bg-black no-focus border border-neutral-800 "
                    placeholder="https://v.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Локация</FormLabel>
                <FormControl>
                  <Input
                    className="bg-black no-focus border border-neutral-800 "
                    placeholder="Токио, Япония"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>О себе</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-black no-focus border border-neutral-800 "
                    placeholder="Программист из Токио, 24 года."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="min-w-full bg-main rounded-md p-6 space-y-10">
          <Button
            disabled={isLoading || !isDirty}
            className="bg-indigo-600 w-full hover:bg-indigo-700 transition"
            type="submit"
          >
            {isLoading ? "Сохранение.." : "Сохранить"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default EditProfileForm;
