import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .max(30, { message: "名前は30文字以内で入力してください" })
    .nonempty({ message: "名前を入力してください" }),

  email: z
    .string()
    .nonempty({ message: "メールアドレスを入力してください。" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "有効なメールアドレスを入力してください",
    }),

  body: z
    .string()
    .max(500, { message: "名前は500文字以内で入力してください" })
    .nonempty({ message: "本文を入力してください" }),
});
