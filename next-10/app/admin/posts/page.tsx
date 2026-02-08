"use client";

import { PostModel } from "@/app/generated/prisma/models/Post";
import DisplayHeader from "@/app/_components/DisplayHeader";
import Link from "next/link";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import useSWR from "swr";

export default function Page() {
  const { token } = useSupabaseSession();

  const fetcherWithToken = (url: string, token: string) =>
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    token ? "/api/admin/posts" : null,
    (url: string) => fetcherWithToken(url, token as string),
  );
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <DisplayHeader title="記事一覧" entity="posts" />
      <div>
        <ul className="w-full">
          {data?.posts.map((post: PostModel) => {
            return (
              <div key={post.id} className="py-4 border-b border-gray-400">
                <Link href={`/admin/posts/${post.id}`} className="font-bold">
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
