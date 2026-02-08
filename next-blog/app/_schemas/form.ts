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
  thumbnailImageKey: z.custom<FileList>().optional(),
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

export const SignInFormSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "メールアドレスを入力してください。" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "有効なメールアドレスを入力してください",
    }),
  password: z
    .string()
    .min(6, { message: "パスワードは最低6文字以上入力してください。" })
    .max(12, { message: "パスワードは最大12文字以下で入力してください。" }),
});

export const SignUpFormSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "メールアドレスを入力してください。" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "有効なメールアドレスを入力してください",
    }),
  password: z
    .string()
    .min(6, { message: "パスワードは最低6文字以上入力してください。" })
    .max(12, { message: "パスワードは最大12文字以下で入力してください。" }),
});
