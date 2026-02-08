"use client";

import { PostModel } from "@/app/generated/prisma/models/Post";
import DisplayHeader from "@/app/_components/DisplayHeader";
import Link from "next/link";
import useSWR from "swr";

export default function Page() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/posts", fetcher);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <DisplayHeader title="記事一覧" entity="posts" />
      <div>
        <ul className="w-full">
          {data?.posts.map((post: PostModel) => {
            return (
              <div key={post.id} className="py-4 border-b border-gray-400">
                <Link href={`/posts/${post.id}`} className="font-bold">
                  {post.title}
                </Link>
                <p className="text-sm text-gray-500">
                  {new Date(post.updatedAt).toLocaleDateString()}
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
