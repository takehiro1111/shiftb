import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .max(50, { message: "名前は50文字以内で入力してください" })
    .nonempty({ message: "名前を入力してください" }),

  email: z
    .string()
    .max(100, { message: "メールアドレスは100文字以内で入力してください" })
    .nonempty({ message: "メールアドレスを入力してください。" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "有効なメールアドレスを入力してください",
    }),

  body: z
    .string()
    .max(1000, { message: "名前は1000文字以内で入力してください" }),
});
