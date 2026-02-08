import { useSupabaseSession } from "@/app//_hooks/useSupabaseSession";
import useSWR from "swr";

export function useFetch<T>(
  endpoint: string,
  options?: { authorized?: boolean },
) {
  const { token } = useSupabaseSession();

  const key = options?.authorized ? (token ? endpoint : null) : endpoint;

  const fetcher = (url: string) =>
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
    }).then((res) => res.json());

  return useSWR<T>(key, fetcher);
}
