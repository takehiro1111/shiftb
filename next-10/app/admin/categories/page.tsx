"use client";

import { useEffect, useState } from "react";
import { CategoryModel } from "@/app/generated/prisma/models/Category";
import DisplayHeader from "@/app/admin/_components/DisplayHeader";
import Link from "next/link";

export default function Page() {
  const [categories, setCategories] = useState<CategoryModel[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`);
        const { categories } = await res.json();
        setCategories(categories);
      } catch (e) {
        console.error(e);
        setError(true);
      }
    };
    fetcher();
  }, []);

  if (error) return <span>エラーが発生しました</span>;
  if (categories === null) return <span>Loading...</span>;

  return (
    <>
      <DisplayHeader title="カテゴリ一覧" entity="categories" />
      <div>
        <ul className="w-full">
          {categories.map((category: CategoryModel) => {
            return (
              <div key={category.id} className="py-4 border-b border-gray-400">
                <Link href={`/admin/categories/${category.id}`} className="font-bold">
                  {category.name}
                </Link>
                <p className="text-sm text-gray-500">
                  {new Date(category.updatedAt).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
