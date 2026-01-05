"use client"

import { useQuery, type QueryKey } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL =
  "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev";

export default function useFetch<T>(queryKey: QueryKey, path: string) {
  return useQuery<T>({
    queryKey,
    queryFn: async () => {
      const url = path.startsWith("http") ? path : `${BASE_URL}/${path}`;
      const res = await axios.get(url);

      return res.data;
    },
  });
}
