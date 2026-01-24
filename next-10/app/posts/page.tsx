import { notFound } from "next/navigation";
import { PostModel } from "@/app/generated/prisma/models/Post";
import Link from "next/link";

export default async function PostPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
  const { posts } = await res.json();

  if (posts === null) return <span>Loading...</span>;
  if (!posts) return notFound();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">記事一覧</h2>
        <Link href="/posts/new">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            新規作成
          </button>
        </Link>
      </div>

      <div>
        <ul className="w-full">
          {posts.map((post: PostModel) => {
            return (
              <div key={post.id} className="py-4 border-b border-gray-400">
                <>
                  <Link href={`/posts/${post.id}`} className="font-bold">
                    {post.title}
                  </Link>
                </>
                <p className="text-sm text-gray-500">
                  {new Date(post.updatedAt).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
