"use client";
import Link from "next/link";
import usePosts from "@/hooks/usePost";
import type { Post } from "@/types/post";

export function Articles() {
  const { data, isLoading } = usePosts<{ posts: Post[] }>("posts");

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!data) {
    return <p>記事が存在しません。</p>;
  }

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">記事一覧</h1>
        <ul className="space-y-2">
          {data.posts.map((element) => {
            return (
              <li key={element.id} className="border-b pb-2">
                <Link href={`/posts/${element.id}`}>{element.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
