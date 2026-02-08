"use client";

import { useParams } from "next/navigation";
import PostForm from "@/app/posts/_components/PostForm";
import { PostModel } from "@/app/generated/prisma/models/Post";
import { useFetch } from "@/app/_hooks/useFetch";

export default function Page() {
  const { id } = useParams();
  const { data, isLoading } = useFetch<{ post: PostModel }>(`/api/posts/${id}`);

  if (isLoading) return <p>Loading...</p>;

  return <PostForm title="記事詳細" isCreated={false} post={data?.post} />;
}
