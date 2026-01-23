import { z } from "zod";
import { PostUpdateFormSchema } from "@/app/_schemas/form";
import { PostModel } from "@/app/generated/prisma/models/Post";

export type PostFormProps = {
  title: "記事作成" | "記事編集";
  onSubmitHandle: (
    data: z.infer<typeof PostUpdateFormSchema>,
    reset: () => void,
  ) => Promise<void>;
  showDeleteButton: boolean;
  post?: PostModel;
  mode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all" | undefined;
};
