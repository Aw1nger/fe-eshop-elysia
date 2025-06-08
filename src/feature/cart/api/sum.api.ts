import { apiHandler } from "@/shared/action/api-handler";
import { getAction } from "@/shared/action/get-action";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";

const SumSchema = z.number();

export const SumOptions = queryOptions({
  queryKey: ["cart", "cart-sum"],
  queryFn: async () =>
    await apiHandler<z.infer<typeof SumSchema>>(
      () => getAction("/cart/sum"),
      SumSchema,
    ),
});
