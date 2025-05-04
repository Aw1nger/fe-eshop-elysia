import { apiHandler } from "@/shared/action/api-handler";
import { envAction } from "@/shared/action/env-action";
import { queryOptions } from "@tanstack/react-query";
import { z, ZodSchema } from "zod";

export const envOptions = <T>(environments: string[], schema: ZodSchema<T>) =>
  queryOptions({
    queryKey: environments,
    queryFn: async () =>
      await apiHandler<z.infer<typeof schema>>(
        () => envAction<T>(environments),
        schema,
      ),
  });
