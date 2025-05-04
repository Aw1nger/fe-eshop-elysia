import { z } from "zod";

export const JwtMessageSchema = z.object({
  message: z.string().optional(),
  accessToken: z.string(),
  refreshToken: z.string(),
});
