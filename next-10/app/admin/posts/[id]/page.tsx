"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { PostModel } from "@/app/generated/prisma/models/Post";

export default function UpdatePostPage() {
  const [postData, setPostData] = useState<PostModel | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`,
      );
      const { post } = await res.json();
      setPostData(post);
    };

    fetcher();
  }, [id]);

  if (!id) return <p>記事IDが指定されていません。</p>;
  if (postData === null) return <span>Loading...</span>;
  if (!postData) return notFound();

  console.log(postData);

  return (
    <>
      <h2 className="text-2xl font-bold">記事一覧</h2>
    </>
  );
}
