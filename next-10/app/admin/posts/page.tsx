"use client";

import { useEffect, useState } from "react";
import { PostModel } from "@/app/generated/prisma/models/Post";
import DisplayHeader from "@/app/_components/DisplayHeader";
import Link from "next/link";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export default function Page() {
  const [posts, setPosts] = useState<PostModel[] | null>(null);
  const [error, setError] = useState(false);
  const { token } = useSupabaseSession();

  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      try {
        const res = await fetch("/api/admin/posts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const { posts } = await res.json();
        setPosts(posts);
      } catch (e) {
        console.error(e);
        setError(true);
      }
    };
    fetcher();
  }, [token]);

  if (error) return <span>エラーが発生しました</span>;
  if (posts === null) return <span>Loading...</span>;

  return (
    <>
      <DisplayHeader title="記事一覧" entity="posts" />
      <div>
        <ul className="w-full">
          {posts.map((post: PostModel) => {
              return (
                <div key={post.id} className="py-4 border-b border-gray-400">
                  <Link href={`/admin/posts/${post.id}`} className="font-bold">
                    {post.title}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              );
            })}
        </ul>
      </div>
    </>
  );
}
