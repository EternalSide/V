import * as z from "zod";
const emptyStringToUndefined = z.literal("").transform(() => undefined);

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}

export const createPostSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Поле не может быть меньше 5 символов." })
    .max(75),
  text: z
    .string()
    .min(5, { message: "Поле не может быть меньше 5 символов." })
    .max(50000),
  banner: asOptionalField(z.string().url({ message: "Введите валидный URL" })),
  tags: z
    .array(
      z
        .string()
        .min(2, { message: "Тег не может быть меньше 2 символов" })
        .max(15, { message: "Тег не может быть больше 15 символов" }),
    )
    .min(1, { message: "Минимальное количество Тегов: 1" })
    .max(3, { message: "Максимальное количество Тегов: 3" }),
});

export const editProfileSchema = z.object({
  portfolioWebsite: z
    .string()
    .min(4, {
      message: "Не меньше 4 ",
    })
    .url({
      message: "Введите валидный URL",
    })
    .max(50),
  location: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(20),
  bio: z
    .string()
    .min(1, {
      message: "Username must be at least 2 characters.",
    })
    .max(50),
  theme_color: z.string(),
});

export const tagSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Не меньше 4 ",
    })
    .max(30),
  description: z
    .string()
    .min(10, {
      message: "Username must be at least 2 characters.",
    })
    .max(150),
  info: z
    .string()
    .min(10, {
      message: "Username must be at least 2 characters.",
    })
    .max(1000),
  picture: z.string().url(),
});
