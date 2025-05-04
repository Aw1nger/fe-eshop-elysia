import { z } from "zod";

export const PaginationSchema = z.object({
  next: z.number().nullable(),
  previous: z.number().nullable(),
});
