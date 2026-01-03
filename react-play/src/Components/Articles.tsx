import { posts } from "../data/posts";
import { Link } from "react-router-dom";

export function Articles() {
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


