import { apiHandler } from "@/shared/action/api-handler";
import { getAction } from "@/shared/action/get-action";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { UserSchema } from "../model/user.schema";

export const getUser = async (username: string) =>
  await apiHandler<z.infer<typeof UserSchema>>(
    () => getAction(`user/${username}`),
    UserSchema,
  );

export const GetUserOptions = (username: string) =>
  queryOptions({
    queryKey: ["user", username],
    queryFn: async () => await getUser(username),
  });
