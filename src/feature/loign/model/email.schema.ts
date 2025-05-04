import { z } from "zod";

export const EmailSchema = z.object({
  email: z.string().email("Введите корректный Email!"),
  smart_token: z.string().optional(),
});
