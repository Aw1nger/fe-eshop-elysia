import { ProductSchema } from "@/entities/product";
import { apiHandler } from "@/shared/action/api-handler";
import { getAction } from "@/shared/action/get-action";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";

export const getProduct = async (id: string) =>
  await apiHandler<z.infer<typeof ProductSchema>>(
    () => getAction("/products/" + id),
    ProductSchema,
  );

export const GetProductOption = (id: string) =>
  queryOptions({
    queryKey: ["product", id],
    queryFn: async () => await getProduct(id),
  });
