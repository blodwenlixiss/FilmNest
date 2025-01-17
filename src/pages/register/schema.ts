import { z } from "zod";

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(1, "username is required")
    .max(40, "username is too long"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  full_name: z.string().max(50, "First name is too long").optional(),
  email: z.string().email(),
});
