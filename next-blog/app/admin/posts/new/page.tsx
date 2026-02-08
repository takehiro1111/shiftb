"use client";

import PostForm from "@/app/admin/posts/_components/PostForm";
import { PostFormData } from "@/app/admin/posts/_components/_types/props";
import { useRouter } from "next/navigation";
import { CreatePostRequest } from "@/app/_types/posts";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export default function Page() {
  const router = useRouter();
  const { token } = useSupabaseSession();

  const onSubmitHandle = async (
    data: PostFormData,
    reset: () => void,
  ): Promise<void> => {
    if (!token) return;
    try {
      const body: CreatePostRequest = {
        title: data.title,
        content: data.content,
        thumbnailImageKey: data.thumbnailImageKey,
        categoryId: data.categoryId,
      };

      await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
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
