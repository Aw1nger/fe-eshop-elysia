"use server";
import { cookies } from "next/headers";

export const Logout = async (domain: string) => {
  const CookieStore = await cookies();
  try {
    CookieStore.delete({
      name: "accessToken",
      path: "/",
      domain,
    });
    CookieStore.delete({
      name: "refreshToken",
      path: "/",
      domain,
    });
    return {
      data: {
        message: "Вы вышли из аккаунта",
      },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: { message: "Ошибка выхода" },
    };
  }
};
