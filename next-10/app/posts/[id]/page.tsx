"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { type PostWithCategories } from "@/app/posts/[id]/_types/form";
import PostForm from "@/app/posts/_components/PostForm";

export default function Page() {
  const [postData, setPostData] = useState<PostWithCategories | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetcher = async () => {
      const res = await fetch(`/api/posts/${id}`);
      const { post } = await res.json();
      setPostData(post);
    };

    fetcher();
  }, [id]);

  if (postData === null) return <span>Loading...</span>;

  return <PostForm title="記事詳細" isCreated={false} post={postData} />;
}
