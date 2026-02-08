import "dotenv/config";
import { prisma } from "../app/_libs/prisma";

async function main() {
  // 既存データを削除
  await prisma.post.deleteMany();

  // thumbnailImageKey は Supabase Storage のパス（例: public/xxx）を指定
  // 実際に画像を表示するには、Supabase Storage に画像をアップロードし、そのパスを設定してください
  const posts = await prisma.post.createMany({
    data: [
      {
        title: "最初の記事",
        content: "これは最初の記事です",
        thumbnailImageKey: "38ef8182-757b-4496-8284-e52ecdcc22bf",
      },
      {
        title: "2番目の記事",
        content: "これは2番目の記事です",
        thumbnailImageKey: "38ef8182-757b-4496-8284-e52ecdcc22bf",
      },
    ],
  });
  const categories = await prisma.category.createMany({
    data: [
      {
        name: "最初のカテゴリ",
      },
      {
        name: "2番目のカテゴリ",
      },
    ],
  });
  console.log({ posts, categories });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
