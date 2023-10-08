"use client";

import React, { useRef, useState } from "react";

import { createPostSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { Editor } from "@tinymce/tinymce-react";
import { usePathname, useRouter } from "next/navigation";
import { createPost } from "@/lib/actions/post.action";
import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";

interface Props {
  mongoUserId: string;
}

const CreatePostForm = ({ mongoUserId }: Props) => {
  const [file, setFile] = useState<File>();

  const { edgestore } = useEdgeStore();
  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      tags: [],
      banner: "",
      text: "",
    },
  });
  const editorRef = useRef(null);
  const path = usePathname();
  const router = useRouter();
  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof createPostSchema>) => {
    console.log(values);
    // const postId = await createPost({
    //   title: values.title,
    //   text: values.text,
    //   tags: values.tags,
    //   author: mongoUserId,
    //   path,
    // });

    // router.push(`/post/${postId}`);
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any,
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim().toLowerCase();

      if (tagValue !== "") {
        if (field.value.length >= 3) {
          return form.setError("tags", {
            type: "required",
            message: "Тегов не может быть больше 3ех.",
          });
        }
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Тег не может быть больше 15 символов.",
          });
        }
        if (tagValue.length < 2) {
          return form.setError("tags", {
            type: "required",
            message: "Тег не может быть меньше 2 символов.",
          });
        }
        // * Если Тега нету, то добавим его.
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
        console.log(field.value);
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    form.clearErrors("tags");
    const newTags = field.value.filter((t: any) => t !== tag);
    form.setValue("tags", newTags);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-7xl flex-col gap-10 pt-20 text-white max-[1280px]:px-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="max-w-3xl">
              <FormLabel className="text-xl">Заголовок</FormLabel>
              <FormControl>
                <Input
                  className="bg-main no-focus border-none focus:border-indigo-500"
                  {...field}
                  placeholder="Почему в Redux так много boilerplate?"
                />
              </FormControl>
              <FormDescription>
                Ваш пост увидят на главной, будьте сообразительны!
              </FormDescription>
              <FormMessage className="text-indigo-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="max-w-3xl">
              <FormLabel className="text-xl">Теги</FormLabel>
              <FormControl>
                <>
                  <Input
                    className="bg-main no-focus border-none focus:border-indigo-500"
                    placeholder="React.js"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex flex-wrap justify-start gap-2.5 pt-1">
                      {field.value.map((tag: any) => (
                        <Badge
                          onClick={() => handleTagRemove(tag, field)}
                          className="button-main cursor-pointer rounded-md px-4 py-2 capitalize hover:bg-transparent"
                          key={tag}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription>Нажатие на Enter добавит Тег.</FormDescription>
              <FormMessage className="text-indigo-500" />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="banner"
          render={({ field }) => (
            <FormItem className="max-w-3xl">
              <FormLabel className="text-xl">Баннер</FormLabel>

              <FormControl>
                <div className="w-full">
                  <SingleImageDropzone
                    height={400}
                    value={file}
                    onChange={(file: any) => {
                      setFile(file);
                    }}
                  />
                  <FormDescription>Действие не обязательно. </FormDescription>
                  <button
                    className="mt-2.5 flex justify-end rounded-md bg-indigo-600 px-3.5 py-2"
                    onClick={async (e) => {
                      if (field.value.length >= 1) return;
                      if (file) {
                        const res = await edgestore.publicFiles.upload({
                          file,
                          onProgressChange: (progress) => {
                            form.setValue("banner", "");
                          },
                        });
                        // you can run some server action or api here
                        // to add the necessary data to your database
                        form.setValue("banner", res.url);
                        console.log(res);
                      }
                    }}
                  >
                    Загрузить
                  </button>
                </div>
              </FormControl>

              <FormMessage className="text-indigo-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="max-w-3xl">
              <FormLabel className="text-xl">Текст</FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.TINY_KEY}
                  initialValue=""
                  // @ts-ignore
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    height: 450,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | " +
                      "codesample | bold italic forecolor | alignleft aligncenter |" +
                      "alignright alignjustify | bullist numlist",
                    content_style: "body { font-family:Inter; font-size:16px }",
                    skin: "oxide-dark",
                    content_css: "dark",
                  }}
                />
              </FormControl>

              <FormMessage className="text-indigo-500" />
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmitting}
          className="bg-main mt-0 w-fit bg-indigo-700 hover:bg-indigo-600"
          type="submit"
        >
          {isSubmitting ? "Публикация.." : " Опубликовать"}
        </Button>
      </form>
    </Form>
  );
};
export default CreatePostForm;
