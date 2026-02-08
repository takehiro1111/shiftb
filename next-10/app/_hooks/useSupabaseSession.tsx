import { supabase } from "@/app/_libs/supabase";
import { Session } from "@supabase/supabase-js";
import useSWR from "swr";

export const useSupabaseSession = () => {
  const fetcher = async (): Promise<Session | null> => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  };

  const { data, isLoading } = useSWR<Session | null>("supabase_session", fetcher);

  return { session: data, isLoading, token: data?.access_token };
};
