"use client";

import { CategoryModel } from "@/app/generated/prisma/models/Category";
import DisplayHeader from "@/app/_components/DisplayHeader";
import Link from "next/link";
import useSWR from "swr";

export default function Page() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/admin/categories", fetcher);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <DisplayHeader title="カテゴリ一覧" entity="categories" />
      <div>
        <ul className="w-full">
          {data.categories?.map((category: CategoryModel) => {
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
                {error && <p>エラーが発生しました</p>}
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
