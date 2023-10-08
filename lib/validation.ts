import * as z from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Поле не может быть меньше 5 символов." })
    .max(50),
  text: z
    .string()
    .min(5, { message: "Поле не может быть меньше 5 символов." })
    .max(50000),
  banner: z.string().url({ message: "URL не найден, загрузите изображение." }),
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
