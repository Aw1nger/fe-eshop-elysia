import { ApiError } from "@/shared/action/api-error";
import { ZodError, ZodSchema } from "zod";

export async function apiHandler<ReturnType>(
  apiFn: () => Promise<{
    data: ReturnType | null;
    error: {
      message: string;
      fields?: {
        field: string;
        message: string;
      }[];
    } | null;
  }>,
  schema: ZodSchema<ReturnType>,
): Promise<ReturnType> {
  try {
    const { data, error } = await apiFn();

    if (error) {
      throw new ApiError(error.message, { fields: error.fields });
    }

    return schema.parse(data);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      console.error("Zod parse error:", error.message, error.format());
      throw new ApiError("Невалидный ответ сервера, попробуйте позже!");
    } else if (error instanceof ApiError) {
      throw new ApiError(error.message, error.details);
    } else {
      throw new ApiError("Неизвестная ошибка, попробуйте позже!");
    }
  }
}
