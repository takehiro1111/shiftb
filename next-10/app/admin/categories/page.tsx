"use client";

import { Category } from "@/app/_types/categories";
import DisplayHeader from "@/app/_components/DisplayHeader";
import Link from "next/link";
import { useFetch } from "@/app/_hooks/useFetch";

export default function Page() {
  const { data, error, isLoading } = useFetch<{ categories: Category[] }>(
    "/api/admin/categories",
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <DisplayHeader title="カテゴリ一覧" entity="categories" />
      <div>
        <ul className="w-full">
          {data?.categories?.map((category: Category) => {
            return (
              <div key={category.id} className="py-4 border-b border-gray-400">
                <Link
                  href={`/admin/categories/${category.id}`}
                  className="font-bold"
                >
                  {category.name}
                </Link>
                <p className="text-sm text-gray-500">
                  {new Date(category.updatedAt).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </ul>
        {error && <p>カテゴリの表示に失敗しました</p>}
      </div>
    </>
  );
}
