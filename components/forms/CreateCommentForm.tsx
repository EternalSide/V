"use client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {usePathname} from "next/navigation";
import {useToast} from "../ui/use-toast";
import {createComment} from "@/lib/actions/comment.action";
import {useRef} from "react";
import {commentSchema} from "@/lib/validation";
import MainEditor from "../shared/MainEditor";

interface Props {
	authorId: string;
	postId: string;
}

const CreateCommentForm = ({postId, authorId}: Props) => {
	const form = useForm<z.infer<typeof commentSchema>>({
		resolver: zodResolver(commentSchema),
		defaultValues: {
			text: "",
		},
	});

	const path = usePathname();
	const {isSubmitting, isValid} = form.formState;
	const {toast} = useToast();
	const editorRef = useRef(null);

	const onSubmit = async (values: z.infer<typeof commentSchema>) => {
		await createComment({
			author: authorId,
			post: postId,
			text: values.text,
			path,
		});

		form.reset();

		return toast({
			duration: 2000,
			title: "Комментарий добавлен ✅",
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto mt-7 flex w-full max-w-7xl flex-col gap-3 py-8 text-white max-[1280px]:px-4 max-md:px-0'
			>
				<FormField
					control={form.control}
					name='text'
					render={({field}) => (
						<FormItem className='max-w-3xl'>
							<FormLabel className='text-xl'>Оставить комментарий</FormLabel>
							<FormControl>
								<MainEditor
									editorRef={editorRef}
									field={field}
									height={250}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<button
					disabled={isSubmitting || !isValid}
					className='button  w-full bg-indigo-600 hover:bg-indigo-700'
					type='submit'
				>
					{isSubmitting ? "Публикация.." : " Отправить"}
				</button>
			</form>
		</Form>
	);
};
export default CreateCommentForm;
