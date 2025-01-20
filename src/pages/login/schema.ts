import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().min(1, "email is required"),
  password: z.string().min(8, "Please enter correct password"),
});
