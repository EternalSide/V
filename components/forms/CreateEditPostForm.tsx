"use client";
import React, {useRef, useState} from "react";
import {createPostSchema} from "@/lib/validation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {usePathname, useRouter} from "next/navigation";
import {createPost, editPost} from "@/server_actions/post.action";
import {SingleImageDropzone} from "@/components/shared/SingleImageDropzone";
import {useEdgeStore} from "@/lib/edgestore";
import {useToast} from "../ui/use-toast";
import MainEditor from "../shared/PostEditor";

interface Props {
	authorId: string;
	type: "Edit" | "Create";
	postDetails?: string;
}

const CreateEditPostForm = ({type, postDetails, authorId}: Props) => {
	const [file, setFile] = useState<File>();
	const [isLoading, setIsLoading] = useState(false);
	const {edgestore} = useEdgeStore();
	const editorRef = useRef(null);
	const path = usePathname();
	const router = useRouter();
	const {toast} = useToast();

	let parsedPostDetails: any;

	if (type === "Edit") {
		parsedPostDetails = JSON.parse(postDetails || "");
	}

	const form = useForm<z.infer<typeof createPostSchema>>({
		resolver: zodResolver(createPostSchema),
		defaultValues: {
			title: parsedPostDetails?.title || "",
			banner: parsedPostDetails?.banner || "",
			text: parsedPostDetails?.text || "",
		},
	});

	const onSubmit = async (values: z.infer<typeof createPostSchema>) => {
		if (type === "Edit") {
			await editPost({
				postId: parsedPostDetails._id,
				text: values.text,
				title: values.title,
				banner: values?.banner ? values.banner : "",
				path,
			});

			router.push(`/post/${parsedPostDetails._id}`);
		} else {
			const postId = await createPost({
				title: values.title,
				text: values.text,
				author: authorId,
				banner: values?.banner ? values.banner : "",
				path,
			});

			router.push(`/post/${postId}`);
		}
	};

	const handleUploadPicture = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		field: any
	) => {
		try {
			e.preventDefault();
			if (field?.value && field?.value.length >= 1) return;

			if (file) {
				const res = await edgestore.publicFiles.upload({
					file,
					onProgressChange: () => {
						setIsLoading(true);
					},
				});
				form.setValue("banner", res.url);
				toast({
					title: "Баннер успешно загружен ✅",
					duration: 2000,
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
				className='mx-auto mt-6 flex w-full max-w-7xl flex-col gap-9 pb-8'
				onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
			>
				<FormField
					control={form.control}
					name='title'
					render={({field}) => (
						<FormItem className='max-w-3xl'>
							<FormLabel className='text-xl'>
								Заголовок <span className='text-indigo-500'>*</span>
							</FormLabel>
							<FormControl>
								<Input
									className='bg-main no-focus border-none focus:border-indigo-500'
									{...field}
									placeholder='Почему в Redux так много boilerplate?'
								/>
							</FormControl>
							<FormDescription className='pl-1 text-neutral-400'>
								Придумайте заголовок для вашего поста.
							</FormDescription>
							<FormMessage className='text-indigo-500' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='banner'
					render={({field}) => (
						<FormItem className='max-w-3xl'>
							<FormLabel className='text-xl'>Баннер</FormLabel>
							<FormControl>
								<div className='w-full'>
									<SingleImageDropzone
										height={320}
										value={type === "Edit" ? field?.value || file : file}
										onChange={(file: any) => {
											setFile(file);
											form.setValue("banner", "");
										}}
									/>

									<button
										disabled={isLoading || field?.value!.length >= 1}
										type='button'
										className={`button button-main relative mt-1 w-full rounded-md bg-indigo-600 py-2 text-center hover:opacity-90 ${
											isLoading && "border-b-[0px] "
										}`}
										onClick={(e) => handleUploadPicture(e, field)}
									>
										{isLoading
											? "Загружается..."
											: field?.value!.length >= 1
											? "Сохранено"
											: "Загрузить"}
									</button>
								</div>
							</FormControl>
							<FormMessage className='text-indigo-500' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='text'
					render={({field}) => (
						<FormItem className='w-full'>
							<FormLabel className='text-xl'>
								Текст <span className='text-indigo-500'>*</span>
							</FormLabel>
							<FormControl>
								<MainEditor
									editorRef={editorRef}
									field={field}
								/>
							</FormControl>
							<FormMessage className='text-indigo-500' />
						</FormItem>
					)}
				/>
				<button
					disabled={form.formState.isSubmitting || !form.formState.isDirty}
					className='button -mt-7 w-full bg-indigo-700 hover:bg-indigo-600'
					type='submit'
				>
					{form.formState.isSubmitting
						? "Публикация.."
						: type !== "Edit"
						? "Опубликовать"
						: "Сохранить"}
				</button>
			</form>
		</Form>
	);
};
export default CreateEditPostForm;
