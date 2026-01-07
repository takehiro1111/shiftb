"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MicroCmsPost } from "@/app/_types/MicroCmsPost";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

export default function PostPage() {
  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://rxoongcgrp.microcms.io/api/v1/posts/${id}`,
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env
              .NEXT_PUBLIC_MICRO_CMS_API_KEY as string,
          },
        }
      );
      const data = await res.json();
      console.log("API Response:", data); // デバッグ用
      setPost(data);
    };

    fetcher();
  }, [id]);

  if (!id) return <p>記事IDが指定されていません。</p>;
  if (post === null) return <span>Loading...</span>;
  if (!post) return notFound();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {post.thumbnailUrl && (
          <Image
            src={post.thumbnailUrl.url}
            alt="サンプル画像"
            width={100}
            height={20}
            priority
            className="w-full h-64 object-cover"
          />
        )}
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
