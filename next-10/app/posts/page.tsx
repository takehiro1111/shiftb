"use client";

import { useEffect, useState } from "react";
import { PostModel } from "@/app/generated/prisma/models/Post";
import DisplayHeader from "@/app/_components/DisplayHeader";
import Link from "next/link";

export default function Page() {
  const [publicPosts, setPublicPostsPosts] = useState<PostModel[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch("/api/posts");
        const { posts } = await res.json();
        setPublicPostsPosts(posts);
      } catch (e) {
        console.error(e);
        setError(true);
      }
    };
    fetcher();
  }, []);

  if (error) return <span>エラーが発生しました</span>;
  if (publicPosts === null) return <span>Loading...</span>;

  return (
    <>
      <DisplayHeader title="記事一覧" entity="posts" />
      <div>
        <ul className="w-full">
          {publicPosts &&
            publicPosts.map((post: PostModel) => {
              return (
                <div key={post.id} className="py-4 border-b border-gray-400">
                  <Link href={`/posts/${post.id}`} className="font-bold">
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
