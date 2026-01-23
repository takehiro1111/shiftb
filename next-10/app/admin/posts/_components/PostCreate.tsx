"use client";

import PostForm from "@/app/admin/posts/_components/PostForm";
import { z } from "zod";
import { PostUpdateFormSchema } from "@/app/_schemas/form";

export default function PostCreate() {
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

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      alert("作成しました。");
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PostForm
      title="記事作成"
      onSubmitHandle={onSubmitHandle}
      showDeleteButton={false}
      mode="onSubmit"
    />
  );
}
