import { signUp } from "@/api/register";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: signUp,
  });
};
