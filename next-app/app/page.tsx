"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MicroCmsPost } from "@/app/_types/MicroCmsPost";

export default function Home() {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("https://rxoongcgrp.microcms.io/api/v1/posts", {
        headers: {
          "X-MICROCMS-API-KEY": process.env
            .NEXT_PUBLIC_MICRO_CMS_API_KEY as string,
        },
      });
      const { contents } = await res.json();
      setPosts(contents);
    };

    fetcher();
  }, []);

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">記事一覧</h1>
        <div className="grid gap-4">
          {posts.map((element) => {
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
