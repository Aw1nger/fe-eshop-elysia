import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email("Введите корректный Email!"),
  username: z
    .string()
    .min(2, "Логин должен быть больше 2х символов")
    .max(32, "Логин не должен быть больше 32х символов")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username должен содержать только английские буквы и цифры, без пробелов",
    )
    .refine(
      (value) => !/^\d+$/.test(value),
      "Username не может состоять только из цифр",
    )
    .refine(
      (value) => !/^_+$/.test(value),
      "Username не может состоять только из нижних подчеркиваний",
    ),
  smart_token: z.string().optional(),
});
