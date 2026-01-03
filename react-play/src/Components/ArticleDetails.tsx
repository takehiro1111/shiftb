import { useParams } from "react-router-dom";
import { type Post } from "../types/Post";
import { useQuery } from "@tanstack/react-query";

export function ArticleDetails() {
  const { id } = useParams();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["detail", id],
    queryFn: () =>
      fetch(
        `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
      )
        .then((res) => res.json())
        .then((data) => data.post as Post),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!posts) {
    return <p>記事が見つかりません</p>;
  }

  return (
    <>
      <div>
        <img src={posts.thumbnailUrl} alt="サンプル画像" />
        <h2>APIで取得した記事タイトル:{id}</h2>
        <a href={posts.thumbnailUrl}>{posts.title}</a>
        <div dangerouslySetInnerHTML={{ __html: posts.content }} />
      </div>
    </>
  );
}
