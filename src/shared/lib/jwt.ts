"use server";

import { UserSchema } from "@/entities/user/model/user.schema";
import api from "@/shared/action/axios-instance";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { z } from "zod";
import { SetJwtTokens } from "./set-tokens";

export const refreshToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    throw new Error("Refresh token отсутствует");
  }

  const { data } = await api.post("/auth/refresh-token", {
    refreshToken,
  });

  return await SetJwtTokens(data.accessToken, data.refreshToken);
};

export const GetPayload = async (): Promise<z.infer<typeof UserSchema>> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return await refreshToken();
    }

    await api.post("/auth/token");

    const decoded = jwt.decode(token!) as { [key: string]: any };

    return UserSchema.parse(decoded);
  } catch {
    return null;
  }
};
