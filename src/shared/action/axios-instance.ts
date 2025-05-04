"use server";

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import chalk from "chalk";
import { cookies } from "next/headers";
import { SetJwtTokens } from "../lib/set-tokens";

const API_BASE_URL = process.env.API_URL || "http://localhost:8000";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const getAccessToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
};

const getCookieList = async () => {
  const CookieStore = await cookies();

  const storedCookies = CookieStore.getAll();
  return storedCookies.map(({ name, value }) => `${name}=${value}`).join("; ");
};

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await getAccessToken();
    const cookies = await getCookieList();

    if (accessToken) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    if (cookies) {
      config.headers.set("Cookie", cookies);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  async (response) => {
    const setCookieHeaders = response.headers["set-cookie"];
    if (setCookieHeaders) {
      const cookieStore = await cookies();
      setCookieHeaders.forEach((cookie: string) => {
        const [cookieName, ...rest] = cookie.split("=");
        const cookieValue = rest.join("=");
        cookieStore.set(cookieName.trim(), cookieValue.trim(), {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
        });
      });
    }
    return response;
  },
  async (error: AxiosError) => {
    console.error(
      chalk.bgRedBright("Error"),
      chalk.yellowBright(error.config?.url),
      {
        Code: error.code,
        Headers: error.config?.headers,
        Status: error.status,
        "Request data": error.config?.data,
        Response: error.response?.data,
      },
    );

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value;

        if (!refreshToken) {
          throw new Error("Refresh token отсутствует");
        }

        const { data } = await axios.post(
          API_BASE_URL + "/auth/refresh-token",
          {
            token: refreshToken,
          },
        );

        await SetJwtTokens(data.accessToken);

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Не удалось обновить токен:", refreshError);

        const cookieStore = await cookies();
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
