import { ProductSchema } from "@/entities/product/model/product.schema";
import { apiHandler } from "@/shared/action/api-handler";
import { getAction } from "@/shared/action/get-action";
import { PaginationSchema } from "@/shared/model/pagination.schema";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

const InfinityUserProductsSchema = PaginationSchema.extend({
  products: z.array(ProductSchema),
});

export const GetInfinityUserProductsOptions = (username: string) =>
  infiniteQueryOptions({
    queryKey: ["products", username],
    queryFn: async ({ pageParam }) =>
      await apiHandler<z.infer<typeof InfinityUserProductsSchema>>(
        () =>
          getAction(`/user/${username}/products`, {
            limit: 10,
            page: pageParam,
          }),
        InfinityUserProductsSchema,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    getPreviousPageParam: (lastPage) => lastPage.previous ?? undefined,
    select: (data) => data.pages.flatMap((page) => page.products),
  });
