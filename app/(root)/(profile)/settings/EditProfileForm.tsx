"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Button} from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {Textarea} from "../../../../components/ui/textarea";
import {updateUser} from "@/server_actions/user.action";
import {usePathname, useRouter} from "next/navigation";
import {editProfileSchema} from "@/lib/validation";

const EditProfileForm = ({user}: any) => {
	const parsedUser = JSON.parse(user);
	const router = useRouter();
	const path = usePathname();
	const form = useForm<z.infer<typeof editProfileSchema>>({
		defaultValues: {
			portfolioWebsite: parsedUser?.portfolioWebsite
				? parsedUser.portfolioWebsite
				: "",
			location: parsedUser?.location ? parsedUser.location : "",
			bio: parsedUser?.bio ? parsedUser.bio : "",
			about: parsedUser?.about ? parsedUser.about : "",
		},
		resolver: zodResolver(editProfileSchema),
		mode: "onSubmit",
	});

	const onSubmit = async (values: z.infer<typeof editProfileSchema>) => {
		try {
			await updateUser({
				path,
				clerkId: parsedUser.clerkId,
				updatedData: values,
			});

			router.push(`/${parsedUser.username}`);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-5'
			>
				<div className='bg-main min-w-full space-y-8 rounded-md p-6'>
					<h1 className='text-2xl font-bold'>Дополнительно</h1>
					<FormField
						control={form.control}
						name='portfolioWebsite'
						render={({field}) => (
							<FormItem>
								<FormLabel>Портфолио</FormLabel>
								<FormControl>
									<Input
										className='focus:border-indigo-700 border border-neutral-800 bg-black'
										placeholder='https://v.com'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='location'
						render={({field}) => (
							<FormItem>
								<FormLabel>Локация</FormLabel>
								<FormControl>
									<Input
										className='focus:border-indigo-700 border border-neutral-800 bg-black'
										placeholder='Токио, Япония'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='bio'
						render={({field}) => (
							<FormItem>
								<FormLabel>Информация</FormLabel>
								<FormControl>
									<Textarea
										className='no-focus border border-neutral-800 bg-black focus:border-indigo-700 '
										placeholder='Программист из Токио, 24 года.'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='about'
						render={({field}) => (
							<FormItem>
								<FormLabel>О себе</FormLabel>
								<FormControl>
									<Textarea
										className='no-focus border border-neutral-800 bg-black focus:border-indigo-700 '
										placeholder='Увлечения, хобби'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='bg-main min-w-full space-y-10 rounded-md p-6'>
					<Button
						type='submit'
						disabled={form.formState.isLoading || !form.formState.isDirty}
						className='w-full bg-indigo-600 hover:bg-indigo-700 transition '
					>
						{form.formState.isLoading ? "Сохранение.." : "Сохранить"}
					</Button>
				</div>
			</form>
		</Form>
	);
};
export default EditProfileForm;
