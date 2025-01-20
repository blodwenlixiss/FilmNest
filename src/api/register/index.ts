import { supabase } from "../supabase";

export type SignUpValues = {
  payload: {
    email: string;
    password: string;
    username?: string;
    full_name?: string;
  };
};

export const signUp = async ({ payload }: SignUpValues) => {
  const { email, password, username, full_name } = payload;
  console.log("Sign-up payload:", { email, password, username, full_name });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        full_name,
      },
    },
  });

  if (error) {
    console.error("Error during sign-up:", error);
    throw error;
  }

  console.log("User data after sign-up:", data.user);
  return data;
};
