import { prisma } from "../app/_libs/prisma";

async function main() {
  // 既存データを削除
  await prisma.post.deleteMany();

  const posts = await prisma.post.createMany({
    data: [
      {
        title: "最初の記事",
        content: "これは最初の記事です",
        thumbnailUrl: "https://example.com/image1.jpg",
      },
      {
        title: "2番目の記事",
        content: "これは2番目の記事です",
        thumbnailUrl: "https://example.com/image2.jpg",
      },
    ],
  });
  console.log({ posts });
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
