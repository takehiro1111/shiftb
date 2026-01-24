"use client";

import PostForm from "@/app/posts/_components/PostForm";
import { z } from "zod";
import { PostFormSchema } from "@/app/_schemas/form";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const onSubmitHandle = async (
    data: z.infer<typeof PostFormSchema>,
    reset: () => void,
  ): Promise<void> => {
    try {
      const body = {
        title: data.title,
        content: data.content,
        thumbnailUrl: data.thumbnailUrl,
        categoryId: data.categoryId,
      };

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      alert("作成しました。");
      reset();
      router.push("/posts");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PostForm
      title="記事作成"
      onSubmitHandle={onSubmitHandle}
      mode="onSubmit"
      isCreated={true}
    />
  );
}
