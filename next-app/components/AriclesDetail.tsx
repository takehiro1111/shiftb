"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import type { Post } from "@/types/post";
import useFetch, { BASE_URL } from "@/hooks/useFetch";

export function ArticleDetails() {
  const { id } = useParams();
  const { data, isLoading } = useFetch<{ post: Post }>(
    ["data", id],
    `${BASE_URL}/posts/${id}`
  );

  if (!id) {
    return <p>記事IDが指定されていません。</p>;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!data?.post) {
    return <p>記事が見つかりません</p>;
  }

  return (
    <>
      <div>
        <Image
          src={data.post.thumbnailUrl}
          alt="サンプル画像"
          width={100}
          height={20}
          priority
        />
        <h2>APIで取得した記事タイトル:{id}</h2>
        <a href={data.post.thumbnailUrl}>{data.post.title}</a>
        <div dangerouslySetInnerHTML={{ __html: data.post.content }} />
      </div>
    </>
  );
}
