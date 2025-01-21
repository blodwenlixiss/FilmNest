import { ProfileType } from "@/types/profilePage/profile.types";
import { supabase } from "../supabase";

export const getProfileInfo = (id: string) => {
  return supabase.from("profiles").select("*").eq("id", id);
};

export const updateProfileInfo = async (payload: ProfileType) => {
  const user = await supabase.auth.getUser();

  if (!user?.data?.user) {
    throw new Error("User not authenticated");
  }

  const { data } = await supabase
    .from("profiles")
    .upsert({ ...payload, id: user.data.user.id })
    .select()
    .single();

  return data;
};

export const logout = () => {
  return supabase.auth.signOut();
};
