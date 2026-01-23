"use client"

import PostForm from "@/app/admin/posts/_components/PostForm";
import { z } from "zod";
import { PostUpdateFormSchema } from "@/app/_schemas/form";
import { useEffect, useState } from "react";

import { PostModel } from "@/app/generated/prisma/models/Post";
import { useParams, useRouter } from "next/navigation";

export default function PostUpdate() {
  const { id } = useParams();
  const router = useRouter()
  const [postData, setPostData] = useState<PostModel | null>(null);

  const onSubmitHandle = async (
    data: z.infer<typeof PostUpdateFormSchema>,
    reset: () => void,
  ): Promise<void> => {
    try {
      const body = {
        title: data.title,
        content: data.content,
        thumbnailUrl: data.thumbnailUrl,
      };

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      alert("更新しました。");
      reset();
      router.push("/admin/posts")
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts/${id}`,
      );
      const { post } = await res.json();
      setPostData(post);
    };

    fetcher();
  }, [id]);

  if (postData === null) return <span>Loading...</span>;

  return (
    <PostForm
      title="記事編集"
      onSubmitHandle={onSubmitHandle}
      showDeleteButton={true}
      post={postData} 
      mode="onSubmit"
    />
  );
}
