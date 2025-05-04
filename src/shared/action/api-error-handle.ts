import { AxiosError } from "axios";

export function ApiErrorHandle(error: unknown) {
  if (error instanceof AxiosError) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message,
        fields: error.response?.data?.fields,
      },
    };
  }

  console.error("Неизвестная ошибка:", error);
  return {
    data: null,
    error: {
      message: "Произошла не известная ошибка!",
    },
  };
}
