"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Editor } from "@tinymce/tinymce-react";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { createComment } from "@/lib/actions/comment.action";
import { useRef } from "react";
import { commentSchema } from "@/lib/validation";
import { editorPlugins } from "@/constants";

interface Props {
  authorId: string;
  postId: string;
}

const CreateCommentForm = ({ postId, authorId }: Props) => {
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: "",
    },
  });

  const path = usePathname();
  const { isSubmitting } = form.formState;
  const { toast } = useToast();
  const editorRef = useRef(null);

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    await createComment({
      author: authorId,
      post: postId,
      text: values.text,
      path,
    });

    return toast({
      duration: 2000,
      title: "Комментарий добавлен ✅",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto mt-7 flex w-full max-w-7xl flex-col gap-9 py-8 text-white max-[1280px]:px-4 max-md:px-0"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="max-w-3xl">
              <FormLabel className="text-xl">
                Оставьте комментарий <span className="text-indigo-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.TINY_KEY}
                  initialValue={field?.value || ""}
                  // @ts-ignore
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    height: 450,
                    menubar: false,
                    plugins: editorPlugins,
                    toolbar:
                      "undo redo | " +
                      "codesample | bold italic forecolor | alignleft aligncenter |" +
                      "alignright alignjustify | bullist numlist",
                    content_style: "body { font-family:Inter; font-size:16px }",
                    skin: "oxide-dark",
                    content_css: "dark",
                    directionality: "ltr",
                    language: "ru_RU",
                  }}
                />
              </FormControl>
              <FormMessage className="text-indigo-500" />
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmitting}
          className="bg-main -mt-8 w-full max-w-3xl bg-indigo-700 hover:bg-indigo-600"
          type="submit"
        >
          {isSubmitting ? "Публикация.." : " Отправить"}
        </Button>
      </form>
    </Form>
  );
};
export default CreateCommentForm;
