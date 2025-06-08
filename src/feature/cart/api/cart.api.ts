import { ImageSchema } from "@/entities/image/model/image.schema";
import { apiHandler } from "@/shared/action/api-handler";
import { getAction } from "@/shared/action/get-action";
import { PaginationSchema } from "@/shared/model/pagination.schema";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

export const CartProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  user: z.object({
    username: z.string(),
    avatar: z.string().url(),
  }),
  images: ImageSchema.optional(),
});

const InfinityCartSchema = PaginationSchema.extend({
  cart: z.array(CartProductSchema),
});

export const GetInfinityCartOption = infiniteQueryOptions({
  queryKey: ["cart"],
  queryFn: async ({ pageParam }) =>
    await apiHandler<z.infer<typeof InfinityCartSchema>>(
      () => getAction("/cart", { limit: 10, page: pageParam }),
      InfinityCartSchema,
    ),
  initialPageParam: 1,
  getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  getPreviousPageParam: (lastPage) => lastPage.previous ?? undefined,
  select: (data) => data.pages.flatMap((page) => page.cart),
});
