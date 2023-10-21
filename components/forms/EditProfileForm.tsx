"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {Textarea} from "../ui/textarea";
import {updateUser} from "@/lib/actions/user.action";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {editProfileSchema} from "@/lib/validation";
import {Checkbox} from "../ui/checkbox";

const EditProfileForm = ({user}: any) => {
	const parsedUser = JSON.parse(user);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof editProfileSchema>>({
		defaultValues: {
			portfolioWebsite: parsedUser?.portfolioWebsite ? parsedUser.portfolioWebsite : "",
			location: parsedUser?.location ? parsedUser.location : "",
			bio: parsedUser?.bio ? parsedUser.bio : "",
			about: parsedUser?.about ? parsedUser.about : "",
			theme_color: parsedUser?.theme_color,
			settings: {
				notification_like: parsedUser?.settings?.notification_like === false ? false : true,
				notification_comment: parsedUser?.settings?.notification_comment === false ? false : true,
			},
		},
		resolver: zodResolver(editProfileSchema),
		mode: "onSubmit",
	});

	const router = useRouter();
	const onSubmit = async (values: z.infer<typeof editProfileSchema>) => {
		console.log(values);
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

	const {isDirty} = form.formState;

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'
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
										className='focus:border-indigo-700  border border-neutral-800 bg-black '
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
										className='focus:border-indigo-700 border border-neutral-800 bg-black '
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

				<div className='bg-main min-w-full space-y-8 rounded-md p-6'>
					<div className='flex items-center gap-2'>
						<h1 className='text-2xl font-bold'>Уведомления</h1>
					</div>
					<FormField
						control={form.control}
						name='settings.notification_like'
						render={({field}) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-700 p-4'>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>Показывать уведомления о лайках</FormLabel>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='settings.notification_comment'
						render={({field}) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-700 p-4'>
								<FormControl>
									<Checkbox
										className=''
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>Показывать уведомления о комментариях</FormLabel>
								</div>
							</FormItem>
						)}
					/>
				</div>

				<div className='bg-main min-w-full space-y-8 rounded-md p-6'>
					<div className='flex items-center gap-2'>
						<h1 className='text-2xl font-bold'>Оформление</h1>
					</div>
					<FormField
						control={form.control}
						name='theme_color'
						render={({field}) => (
							<FormItem>
								<FormLabel>Основной</FormLabel>

								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className='flex flex-col space-y-1'
									>
										<FormItem className='h-36 rounded-md bg-indigo-700 p-2'>
											<FormControl>
												<RadioGroupItem value='indigo' />
											</FormControl>
										</FormItem>
										<FormLabel className='!mt-6'>Небо</FormLabel>
										<FormItem className='h-36 rounded-md bg-sky-700 p-2'>
											<FormControl>
												<RadioGroupItem value='sky' />
											</FormControl>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='bg-main min-w-full space-y-10 rounded-md p-6'>
					<Button
						disabled={isLoading || !isDirty}
						className='w-full bg-indigo-600 transition hover:bg-indigo-700'
						type='submit'
					>
						{isLoading ? "Сохранение.." : "Сохранить"}
					</Button>
				</div>
			</form>
		</Form>
	);
};
export default EditProfileForm;
