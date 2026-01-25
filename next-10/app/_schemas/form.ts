import { z } from "zod";

// 共通フィールド
const basePostFields = {
  title: z
    .string()
    .max(50, { message: "タイトルは50文字以内で入力してください" })
    .nonempty({ message: "タイトルを入力してください" }),

  content: z
    .string()
    .max(10000, { message: "内容は10,000文字以内で入力してください" }),

  categoryId: z.coerce
    .number()
    .min(1, { message: "カテゴリを選択してください" }),
};

// admin 用（ファイルアップロード）
export const AdminPostFormSchema = z.object({
  ...basePostFields,
  thumbnailImageKey: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, {
      message: "画像をアップロードしてください",
    }),
});

// 公開用（URL 文字列）
export const PostFormSchema = z.object({
  ...basePostFields,
  thumbnailImageKey: z
    .string()
    .nonempty({ message: "画像をアップロードしてください" }),
});

export const CategoryFormSchema = z.object({
  name: z
    .string()
    .max(50, { message: "名前は50文字以内で入力してください" })
    .nonempty({ message: "カテゴリー名を入力してください" }),
});
