import { z } from "zod";
import { PostFormSchema } from "@/app/_schemas/form";
import { PostModel } from "@/app/generated/prisma/models/Post";

export type PostFormProps = {
  title: "記事作成" | "記事編集";
  onSubmitHandle: (
    data: z.infer<typeof PostFormSchema>,
    reset: () => void,
  ) => Promise<void>;

  onSubmitDeleteHandle?: (reset: () => void) => Promise<void>;
  showDeleteButton: boolean;
  post?: PostModel;
  mode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all" | undefined;
};
