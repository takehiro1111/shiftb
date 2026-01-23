import { z } from "zod";

export const PostFormSchema = z.object({
  title: z
    .string()
    .max(50, { message: "タイトルは50文字以内で入力してください" })
    .nonempty({ message: "タイトルを入力してください" }),

  content: z
    .string()
    .max(10000, { message: "内容は10,000文字以内で入力してください" }),

  thumbnailUrl: z
    .string()
    .nonempty({ message: "リンクを入力してください" }),
});


export const CategoryFormSchema = z.object({
  name: z
    .string()
    .max(50, { message: "名前は50文字以内で入力してください" })
    .nonempty({ message: "カテゴリー名を入力してください" }),
});
