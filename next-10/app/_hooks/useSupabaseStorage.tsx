import { supabase } from "@/app/_libs/supabase";
import useSWR from "swr";

export const useSupabaseStorage = (thumbnailImageKey: string | undefined) => {
  const fetcher = async () => {
    if (!thumbnailImageKey) return;

    const { data } = await supabase.storage
      .from("blog-nextjs")
      .createSignedUrl(thumbnailImageKey, 3600); // 1時間有効

    return data;
  };

  const { data } = useSWR(
    thumbnailImageKey ? "supabase_storage_url" : undefined,
    fetcher,
  );

  return { storageData: data };
};
