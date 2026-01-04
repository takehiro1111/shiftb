import { Link } from "react-router-dom";
import usePosts from "../hooks/usePost";
import type { Post } from "../types/Post";

export function Articles() {
  const { data, isLoading } = usePosts<{ posts: Post[] }>("posts");

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!data) {
    return <p>記事が存在しません。</p>;
  }

  return (
    <>
      <div>
        <title>記事一覧ページ</title>
        <ul>
          {data.posts.map((element) => {
            return (
              <li key={element.id}>
                <Link to={`/posts/${element.id}`}>{element.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
