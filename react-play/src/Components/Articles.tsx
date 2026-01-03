import { Link } from "react-router-dom";
import { type Post } from "../types/Post";
import { useQuery } from "@tanstack/react-query";

export function Articles() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: () =>
      fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
      )
        .then((res) => res.json())
        .then((data) => data.posts as Post[]),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <div>
        <title>記事一覧ページ</title>
        <ul>
          {posts?.map((element) => {
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
