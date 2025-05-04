import { ImageSchema } from "@/entities/image/model/image.schema";
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  count: z.number(),
  user: z.object({
    username: z.string(),
    avatar: z.string().nullable(),
  }),
  images: z.array(ImageSchema),
});
