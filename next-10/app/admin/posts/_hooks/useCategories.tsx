"use client";

import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`
        );
        const { categories } = await res.json();
        setCategories(categories ?? []);
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
