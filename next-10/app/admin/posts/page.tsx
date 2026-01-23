import { notFound } from "next/navigation";
import { PostModel } from "@/app/generated/prisma/models/Post";
import DisplayHeader from "@/app/admin/_components/DisplayHeader";
import Link from "next/link";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts`, { cache: 'no-store' });
  const { posts } = await res.json();

  if (posts === null) return <span>Loading...</span>;
  if (!posts) return notFound();

  return (
    <>
      <DisplayHeader title="記事一覧" entity="posts" />
      <div>
        <ul className="w-full">
          {posts && posts.map((post: PostModel) => {
            return (
              <div key={post.id} className="py-4 border-b border-gray-400">
                <>
                  <Link href={`/admin/posts/${post.id}`} className="font-bold">
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
