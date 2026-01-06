"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import usePosts from "@/app/_hooks/usePost";
import type { Post } from "@/app/_types/post";

export default function Home() {
  const { data, isLoading } = usePosts<{ posts: Post[] }>("posts");

  if (isLoading) return <span>Loading...</span>;
  if (!data) return notFound();

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">記事一覧</h1>
        <div className="grid gap-4">
          {data.posts.map((element) => {
            return (
              <Link
                key={element.id}
                href={`/posts/${element.id}`}
                className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {element.title}
                </h2>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
