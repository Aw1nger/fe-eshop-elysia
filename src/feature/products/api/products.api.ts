import { ProductSchema } from "@/entities/product/model/product.schema";
import { apiHandler } from "@/shared/action/api-handler";
import { getAction } from "@/shared/action/get-action";
import { PaginationSchema } from "@/shared/model/pagination.schema";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

const InfinityProductsSchema = PaginationSchema.extend({
  products: z.array(ProductSchema),
});

export const GetInfinityProductsOption = infiniteQueryOptions({
  queryKey: ["products"],
  queryFn: async ({ pageParam }) =>
    await apiHandler<z.infer<typeof InfinityProductsSchema>>(
      () => getAction("/products", { limit: 10, page: pageParam }),
      InfinityProductsSchema,
    ),
  initialPageParam: 1,
  getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  getPreviousPageParam: (lastPage) => lastPage.previous ?? undefined,
  select: (data) => data.pages.flatMap((page) => page.products),
});
