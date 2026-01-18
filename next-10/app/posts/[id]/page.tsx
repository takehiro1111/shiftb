"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { axios } from "axios";

export type PostShowResponse = {
  post: {
    id: number;
    title: string;
    content: string;
    thumbnailImageKey: string;
    createdAt: Date;
    updatedAt: Date;
    postCategories: {
      category: Category;
    }[];
  };
};

export default function PostPage() {
  const [post, setPost] = useState<PostShowResponse | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetcher = async () => {
      const res = await axios.get(`/api/posts/${id}`)
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
