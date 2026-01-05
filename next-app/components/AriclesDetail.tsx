import { useParams } from "react-router-dom";
import { type Post } from "../types/Post";
import useFetch from "../hooks/useFetch";

export function ArticleDetails() {
  const { id } = useParams();
  const { data, isLoading } = useFetch<{ post: Post }>(
    ["data", id],
    `posts/${id}`
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
        <img src={data.post.thumbnailUrl} alt="サンプル画像" />
        <h2>APIで取得した記事タイトル:{id}</h2>
        <a href={data.post.thumbnailUrl}>{data.post.title}</a>
        <div dangerouslySetInnerHTML={{ __html: data.post.content }} />
      </div>
    </>
  );
}
