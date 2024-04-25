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
});

export const editProfileSchema = z.object({
	portfolioWebsite: asOptionalField(
		z
			.string()
			.url({
				message: VALID_URL,
			})
			.max(50, {message: "Максимальное количество символов: 50"})
	),

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
	about: asOptionalField(
		z.string().max(50, {message: "Максимальное количество символов: 50"})
	),
});

export const commentSchema = z.object({
	text: z
		.string()
		.min(5, {message: MIN_ERROR})
		.max(2000, {message: "Максимальное количество символов: 2000"}),
});
