import * as z from "zod";
const emptyStringToUndefined = z.literal("").transform(() => undefined);

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}

export const createPostSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Поле не может быть меньше 5 символов." })
    .max(50),
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
