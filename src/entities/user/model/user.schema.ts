import { z } from "zod";

export const UserSchema = z
  .object({
    id: z.number(),
    email: z.string().email(),
    username: z.string(),
    avatar: z.string().nullable(),
    role: z.enum(["user", "admin"]),
  })
  .nullable();
