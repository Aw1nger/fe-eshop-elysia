"use server";

import { ApiErrorHandle } from "@/shared/action/api-error-handle";
import api from "@/shared/action/axios-instance";
import chalk from "chalk";

export async function deleteAction<queryType>(url: string, query?: queryType) {
  try {
    const response = await api.delete(url, {
      params: query,
    });

    console.log(chalk.bgRedBright("DELETE") + ":", {
      Url: response.config?.url,
      Query: query,
      Response: response?.data,
    });

    return { data: response.data, error: null };
  } catch (error: unknown) {
    return ApiErrorHandle(error);
  }
}
