"use client";

import { GetCategoriesResponse } from "@/app/_types/categories";
import { useFetch } from "@/app/_hooks/useFetch";

export function useCategories() {
  const { data, error, isLoading } = useFetch<{
    categories: GetCategoriesResponse;
  }>("/api/admin/categories");

  return { categories: data?.categories ?? [], isLoading, error };
}
