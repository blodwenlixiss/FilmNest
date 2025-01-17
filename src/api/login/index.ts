import { supabase } from "../supabase";

export type LoginTypes = {
  email: string;
  password: string;
};

export const login = async (credentials: LoginTypes) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) {
    console.error("Login error:", error);
    throw error; // This ensures errors are properly propagated
  }

  console.log("Login success:", data);
  return data;
};
