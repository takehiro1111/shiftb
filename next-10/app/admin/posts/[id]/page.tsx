"use client";

import PostForm from "@/app/admin/posts/_components/PostForm";
import { PostFormData } from "@/app/admin/posts/_components/_types/props";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  UpdatePostRequest,
  GetPostResponse,
  PostWithCategories,
} from "@/app/_types/posts";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [postData, setPostData] = useState<PostWithCategories | null>(null);
  const { token } = useSupabaseSession();

  const onSubmitHandle = async (
    data: PostFormData,
    reset: () => void,
  ): Promise<void> => {
    if (!token) return;
    try {
      const body: UpdatePostRequest = {
        title: data.title,
        content: data.content,
        thumbnailImageKey: data.thumbnailImageKey,
        categoryId: data.categoryId,
      };

      await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(body),
      });

      alert("更新しました。");
      reset();
      router.replace("/admin/posts");
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitDeleteHandle = async (reset: () => void): Promise<void> => {
    if (!token) return;

    try {
      await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
      });

      alert("削除しました。");
      reset();
      router.replace("/admin/posts");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      const res = await fetch(`/api/admin/posts/${id}`, {
        headers: { Authorization: token },
      });
      const data: GetPostResponse = await res.json();
      setPostData(data.post);
    };

    fetcher();
  }, [id, token]);

  if (postData === null) return <span>Loading...</span>;

  return (
    <PostForm
      title="記事編集"
      onSubmitHandle={onSubmitHandle}
      onSubmitDeleteHandle={onSubmitDeleteHandle}
      post={postData}
      validationMode="onSubmit"
      isCreated={false}
    />
  );
}
