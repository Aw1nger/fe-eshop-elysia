import { z } from "zod";

const ImageVersionSchema = z.object({
  format: z.enum(["jpeg", "webp", "avif"]),
  signedUrl: z.string().url(),
});

export const ImageSchema = z.object({
  id: z.number(),
  versions: z.array(ImageVersionSchema),
});
