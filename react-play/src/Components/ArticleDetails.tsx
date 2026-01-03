import { posts } from "../data/posts";
import { useParams } from "react-router-dom";

export function ArticleDetails() {
  const { id } = useParams();
  const data = posts.find((e) => e.id === Number(id));
  if (!data) {
    return <p>記事が見つかりませんでした。</p>;
  }

  return (
    <>
      <div>
        <img src={data.thumbnailUrl} alt="サンプル画像" />
        <h2>APIで取得した記事タイトル:{id}</h2>
        <a href={data.thumbnailUrl}>{data.title}</a>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    </>
  );
}
