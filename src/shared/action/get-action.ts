"use server";

import api from "@/shared/action/axios-instance";
import chalk from "chalk";
import { ApiErrorHandle } from "./api-error-handle";

export async function getAction<queryType>(url: string, query?: queryType) {
  try {
    const response = await api.get(url, {
      params: query,
    });

    console.log(chalk.bgBlueBright("GET") + ":", {
      Url: response.config?.url,
      Query: query,
      Response: response?.data,
    });

    return { data: response.data, error: null };
  } catch (error: unknown) {
    return ApiErrorHandle(error);
  }
}
