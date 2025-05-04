"use server";

import { ApiErrorHandle } from "@/shared/action/api-error-handle";
import api from "@/shared/action/axios-instance";
import chalk from "chalk";

export async function postAction<dataType>(url: string, data?: dataType) {
  try {
    const response = await api.post(url, data);

    console.log(chalk.bgGreenBright("POST") + ":", {
      Url: response.config?.url,
      "Request data": response.config?.data,
      Response: response?.data,
    });

    return { data: response.data, error: null };
  } catch (error: unknown) {
    return ApiErrorHandle(error);
  }
}
