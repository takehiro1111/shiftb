"use client";

import { GetCategoriesResponse } from "@/app/_types/categories";
import useSWR from "swr";

export function useCategories() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR<GetCategoriesResponse>(
    "/api/admin/categories",
    fetcher,
  );
  return { categories: data?.categories ?? [], isLoading, error };
}
