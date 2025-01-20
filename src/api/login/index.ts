import { supabase } from "../supabase";

export type LoginTypes = {
  email: string;
  password: string;
};

export const login = async (credentials: LoginTypes) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  console.log(data);
  if (error) {
    console.error("Login error:", error);
    throw error;
  }

  return data;
};
