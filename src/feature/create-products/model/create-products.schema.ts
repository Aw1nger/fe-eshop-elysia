import { z } from "zod";

export const CreateProductsSchema = z.object({
  name: z
    .string()
    .min(2, "Название не должно быть миньше 2х символов!")
    .max(128, "Название не должно быть больше 128 символов!"),
  description: z.string().min(2).max(2048),
  price: z.number().min(0).max(9999999),
  count: z.number().min(1).max(9999999),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.type.startsWith("image/"),
      "Должно быть изобржаение!",
    )
    .optional(),
});
