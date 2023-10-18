"use client";
import React, { useRef, useState } from "react";
import { tagSchema } from "@/lib/validation";
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
import { Editor } from "@tinymce/tinymce-react";
import { usePathname, useRouter } from "next/navigation";
import { SingleImageDropzone } from "@/components/shared/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useToast } from "@/components/ui/use-toast";
import { editTag } from "@/lib/actions/tag.action";
import { Textarea } from "@/components//ui/textarea";
import { editorPlugins } from "@/constants";

interface Props {
  mongoUserId: string;
  tagDetails?: string;
  type?: "Edit" | "Create";
}

const CreateEditTagForm = ({ type, tagDetails, mongoUserId }: Props) => {
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const { edgestore } = useEdgeStore();

  let parsedTagDetails: any;

  if (type === "Edit") {
    parsedTagDetails = JSON.parse(tagDetails || "");
  }

  const form = useForm<z.infer<typeof tagSchema>>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: parsedTagDetails?.name || "",
      info: parsedTagDetails?.info || [],
      description: parsedTagDetails?.description || "",
      picture: parsedTagDetails?.picture || "",
    },
  });

  const editorRef = useRef(null);
  const path = usePathname();
  const router = useRouter();
  const { isSubmitting } = form.formState;
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof tagSchema>) => {
    if (type === "Edit") {
      await editTag({
        tagId: parsedTagDetails._id,
        authorId: parsedTagDetails.author,
        userId: mongoUserId,
        updatedData: values,
        path,
      });
      router.push(`/tags/${parsedTagDetails.name}`);
    } else {
      // const postId = await createPost({
      //   title: values.title,
      //   text: values.text,
      //   tags: values.tags,
      //   author: mongoUserId,
      //   banner: values.banner ? values.banner : "",
      //   path,
      // });
      // router.push(`/post/${postId}`);
    }
  };

  const handleUploadPicture = async (e: any, field: any) => {
    try {
      e.preventDefault();
      if (field?.value && field?.value.length >= 1) return;

      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            setIsLoading(true);
          },
        });

        form.setValue("picture", res.url);

        toast({
          title: "Лого успешно загружено ✅",
          duration: 2000,
          className: "toast-black",
        });

        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="create-edit_form"
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="max-w-3xl">
              <FormLabel className="text-xl">
                Наименование <span className="text-indigo-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  disabled={true}
                  className="bg-main no-focus border-none focus:border-indigo-500"
                  placeholder="Мой тег"
                  {...field}
                />
              </FormControl>
              <FormDescription className="pl-1 text-neutral-400">
                Имя тега пока-что нельзя менять.
              </FormDescription>
              <FormMessage className="text-indigo-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="max-w-3xl">
              <FormLabel className="text-xl">
                Описание <span className="text-indigo-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="bg-main no-focus border-none focus:border-indigo-500"
                  placeholder="Обсуждаем программирование и все что с ним связано!"
                  {...field}
                />
              </FormControl>
              <FormDescription className="pl-1 text-neutral-400">
                Описание для вашего тега
              </FormDescription>
              <FormMessage className="text-indigo-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem className="max-w-3xl">
              <FormLabel className="text-xl">Лого</FormLabel>
              <FormControl>
                <div className="w-full">
                  <SingleImageDropzone
                    height={300}
                    width={300}
                    value={type === "Edit" ? field?.value || file : file}
                    onChange={(file: any) => {
                      setFile(file);
                      form.setValue("picture", "");
                    }}
                  />
                  <Button
                    disabled={isLoading || field?.value!.length >= 1}
                    type="button"
                    className={`button-main relative  mt-1 w-full max-w-[300px] rounded-md bg-indigo-600 py-2 text-center hover:opacity-90 ${
                      isLoading && "border-b-[0px] "
                    }`}
                    onClick={(e) => handleUploadPicture(e, field)}
                  >
                    {isLoading ? "Загрузка..." : "Загрузить"}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-indigo-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="info"
          render={({ field }) => (
            <FormItem className="max-w-3xl">
              <FormLabel className="text-xl">
                Информация <span className="text-indigo-500">*</span>
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
                    height: 350,
                    menubar: false,
                    plugins: editorPlugins,
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
          className="bg-main -mt-7 w-full max-w-3xl bg-indigo-700 hover:bg-indigo-600"
          type="submit"
        >
          {isSubmitting ? "Сохранение.." : " Сохранить"}
        </Button>
      </form>
    </Form>
  );
};
export default CreateEditTagForm;
