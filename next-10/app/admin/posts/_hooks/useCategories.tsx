"use client";

import { useEffect, useState } from "react";
import { Category, GetCategoriesResponse } from "@/app/_types/categories";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        const data: GetCategoriesResponse = await res.json();
        setCategories(data.categories ?? []);
      } catch (e) {
        setError(e instanceof Error ? e : new Error("Failed to fetch categories"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
}
