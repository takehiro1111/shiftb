import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { type Post } from "../types/Post";

export function Articles() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
      );
      const data = await res.json();
      setPosts(data.posts);
    };

    fetcher();
  }, []);

  return (
    <>
      <div>
        <title>記事一覧ページ</title>
        <ul>
          {posts.map((element) => {
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
