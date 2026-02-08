"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import PostForm from "@/app/posts/_components/PostForm";

export default function Page() {
  const { id } = useParams();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, isLoading } = useSWR(`/api/posts/${id}`, fetcher);

  if (isLoading) return <p>Loading...</p>;

  return <PostForm title="記事詳細" isCreated={false} post={data} />;
}
