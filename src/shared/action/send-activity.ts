"use server";

import { ApiErrorHandle } from "@/shared/action/api-error-handle";
import api from "@/shared/action/axios-instance";
import chalk from "chalk";

export async function sendActivity(
  device: "mobile" | "desktop",
  fingerprint: string,
) {
  try {
    const secret_token = process.env.SECRET_TOKEN;
    const response = await api.post("/activity", {
      fingerprint,
      platform: device,
      secret: secret_token,
    });

    console.log(chalk.bgGreen("ACTYVITY:") + ":", {
      Url: response.config?.url,
      "Request data": response.config?.data,
      Response: response?.data,
    });

    return { data: response.data, error: null };
  } catch (error: unknown) {
    return ApiErrorHandle(error);
  }
}
