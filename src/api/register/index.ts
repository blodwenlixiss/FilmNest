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
    throw error;
  }

  if (data.user) {
    const { error: insertError } = await supabase.from("profiles").insert({
      id: data.user.id,
      username,
      full_name,
      avatar_url: null,
    });

    if (insertError) {
      throw insertError;
    }
  }

  return data;
};
