import { z } from "zod";

export const CodeSchema = z.object({
  email: z.string().email(),
  code: z
    .string()
    .min(6, "Введите корректный код")
    .max(6, "Введите корректный код"),
});
