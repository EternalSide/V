import * as z from "zod";
const emptyStringToUndefined = z.literal("").transform(() => undefined);

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
	return schema.optional().or(emptyStringToUndefined);
}

const MIN_ERROR = "Поле не может быть меньше 5 символов.";
const VALID_URL = "Введите валидный URL";

export const createPostSchema = z.object({
	title: z.string().min(5, {message: MIN_ERROR}).max(75),
	text: z.string().min(5, {message: MIN_ERROR}).max(50000),
	banner: asOptionalField(z.string().url({message: "Введите валидный URL"})),
	tags: z
		.array(
			z
				.string()
				.min(2, {message: "Тег не может быть меньше 2 символов"})
				.max(15, {message: "Тег не может быть больше 15 символов"})
		)
		.min(1, {message: "Минимальное количество Тегов: 1"})
		.max(3, {message: "Максимальное количество Тегов: 3"}),
});

export const editProfileSchema = z.object({
	portfolioWebsite: z
		.string()
		.min(4, {
			message: VALID_URL,
		})
		.url({
			message: VALID_URL,
		})
		.max(50, {message: "Максимальное количество символов: 50"}),
	location: z
		.string()
		.min(2, {
			message: "Минимальное количество символов: 2",
		})
		.max(30, {message: "Максимальное количество символов: 30"}),
	bio: z
		.string()
		.min(5, {
			message: "Минимальное количество символов: 5",
		})
		.max(50, {message: "Максимальное количество символов: 50"}),
	theme_color: z.string(),
});

export const tagSchema = z.object({
	name: z
		.string()
		.min(4, {
			message: "Минимальное количество символов: 4",
		})
		.max(30, {message: "Максимальное количество символов: 30"}),

	description: z
		.string()
		.min(10, {
			message: "Минимальное количество символов: 10",
		})
		.max(150, {message: "Максимальное количество символов: 150"}),

	info: z
		.string()
		.min(10, {
			message: "Минимальное количество символов: 10",
		})
		.max(1000, {message: "Максимальное количество символов: 1000"}),

	picture: z.string().url({message: VALID_URL}),
});

export const commentSchema = z.object({
	text: z.string().min(5, {message: MIN_ERROR}).max(2000, {message: "Максимальное количество символов: 2000"}),
});
