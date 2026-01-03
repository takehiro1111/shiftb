import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type Post } from "../types/Post";

export function ArticleDetails() {
  const { id } = useParams();
  const [posts, setPosts] = useState<Post | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
      );
      const data = await res.json();
      setPosts(data.post);
    };

    fetcher();
  }, [id]);

  if (!posts) {
    return <p>記事データが取得できませんでした。</p>;
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
