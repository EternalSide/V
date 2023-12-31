"use client";
import React, {useRef, useState} from "react";
import {createPostSchema} from "@/lib/validation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Badge} from "@/components/ui/badge";
import {Editor} from "@tinymce/tinymce-react";
import {usePathname, useRouter} from "next/navigation";
import {createPost, editPost} from "@/lib/actions/post.action";
import {SingleImageDropzone} from "@/components/shared/SingleImageDropzone";
import {useEdgeStore} from "@/lib/edgestore";
import {useToast} from "../ui/use-toast";
import {editorPlugins} from "@/constants";
import MainEditor from "../shared/MainEditor";

interface Props {
	mongoUserId: string;
	postDetails?: string;
	type?: "Edit" | "Create";
}

const CreateEditPostForm = ({type, postDetails, mongoUserId}: Props) => {
	const [file, setFile] = useState<File>();
	const [isLoading, setIsLoading] = useState(false);
	const {edgestore} = useEdgeStore();

	let parsedPostDetails: any;

	if (type === "Edit") {
		parsedPostDetails = JSON.parse(postDetails || "");
	}

	const groupedTags = parsedPostDetails?.tags.map((tag: any) => tag.name);

	const form = useForm<z.infer<typeof createPostSchema>>({
		resolver: zodResolver(createPostSchema),
		defaultValues: {
			title: parsedPostDetails?.title || "",
			tags: groupedTags || [],
			banner: parsedPostDetails?.banner || "",
			text: parsedPostDetails?.text || "",
		},
	});

	const editorRef = useRef(null);
	const path = usePathname();
	const router = useRouter();
	const {isSubmitting, isDirty} = form.formState;
	const {toast} = useToast();

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
				tags: values.tags,
				author: mongoUserId,
				banner: values?.banner ? values.banner : "",
				path,
			});

			router.push(`/post/${postId}`);
		}
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {
		if (e.key === "Enter" && field.name === "tags") {
			e.preventDefault();

			const tagInput = e.target as HTMLInputElement;
			const tagValue = tagInput.value.trim().toLowerCase();

			const regex = new RegExp("[a-zA-Z]", "g");

			if (!tagValue.match(regex)) {
				return form.setError("tags", {
					type: "required",
					message: "Используйте Латиницу ABC",
				});
			}

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
				className='create-edit_form'
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
					name='tags'
					render={({field}) => (
						<FormItem className='max-w-3xl'>
							<FormLabel className='text-xl'>
								Теги <span className='text-indigo-500'>*</span>
							</FormLabel>
							<FormControl>
								<>
									<Input
										disabled={type === "Edit"}
										className='bg-main no-focus border-none focus:border-indigo-500'
										placeholder='Выберите подходящие теги'
										onKeyDown={(e) => (type !== "Edit" ? handleInputKeyDown(e, field) : () => {})}
									/>
									{field.value.length > 0 && (
										<div className='flex flex-wrap justify-start gap-2.5 pt-1'>
											{field.value.map((tag: any) => (
												<Badge
													onClick={() => (type !== "Edit" ? handleTagRemove(tag, field) : () => {})}
													className={`button-main cursor-pointer rounded-md px-4 py-2 capitalize hover:bg-transparent ${
														type === "Edit" && "cursor-default hover:text-indigo-400"
													}`}
													key={tag}
												>
													{tag}
												</Badge>
											))}
										</div>
									)}
								</>
							</FormControl>
							<FormDescription className='pl-1 text-neutral-400'>Нажмите на Enter чтобы добавить Тег.</FormDescription>
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
										{isLoading ? "Загружается..." : field?.value!.length >= 1 ? "Сохранено" : "Загрузить"}
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
								{/* <Editor
									apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
									value={field?.value || ""}
									// @ts-ignore
									onInit={(evt, editor) => (editorRef.current = editor)}
									onBlur={field.onBlur}
									onEditorChange={(content) => field.onChange(content)}
									init={{
										height: 850,
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
								/> */}
							</FormControl>
							<FormMessage className='text-indigo-500' />
						</FormItem>
					)}
				/>
				<button
					disabled={isSubmitting || !isDirty}
					className='button -mt-7 w-full bg-indigo-700 hover:bg-indigo-600'
					type='submit'
				>
					{isSubmitting ? "Публикация.." : type !== "Edit" ? "Опубликовать" : "Сохранить"}
				</button>
			</form>
		</Form>
	);
};
export default CreateEditPostForm;
