"use server";

import { UserSchema } from "@/entities/user/model/user.schema";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { z } from "zod";

export const SetJwtTokens = async (
  access: string,
  refresh?: string,
): Promise<z.infer<typeof UserSchema>> => {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", access, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 60,
    path: "/",
  });

  refresh &&
    cookieStore.set("refreshToken", refresh, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

  const decoded = jwt.decode(access) as { [key: string]: any };

  return UserSchema.parse(decoded);
};
