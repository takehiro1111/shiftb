"use client";

import PostForm from "@/app/admin/posts/_components/PostForm";
import { z } from "zod";
import { PostFormSchema } from "@/app/_schemas/form";
import { useRouter } from "next/navigation";
import { CreatePostRequest } from "@/app/_types/posts";

export default function Page() {
  const router = useRouter();

  const onSubmitHandle = async (
    data: z.infer<typeof PostFormSchema>,
    reset: () => void,
  ): Promise<void> => {
    try {
      const body: CreatePostRequest = {
        title: data.title,
        content: data.content,
        thumbnailUrl: data.thumbnailUrl,
        categoryId: data.categoryId,
      };

      await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      alert("作成しました。");
      reset();
      router.replace("/admin/posts");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PostForm
      title="記事作成"
      onSubmitHandle={onSubmitHandle}
      validationMode="onSubmit"
      isCreated={true}
    />
  );
}
