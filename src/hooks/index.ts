import { useEffect } from "react";
import { useAtom } from "jotai";
import { supabase } from "@/api/supabase";
import { userAtom } from "@/api";

export const useAuthListener = () => {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });
    return () => subscription.unsubscribe();
  }, [setUser]);
};
