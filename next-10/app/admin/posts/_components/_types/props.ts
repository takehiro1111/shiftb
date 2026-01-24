import { z } from "zod";
import { PostFormSchema } from "@/app/_schemas/form";
import { PostWithCategories } from "@/app/_types/posts";

export type PostFormProps = {
  title: "記事作成" | "記事編集" | "記事詳細";
  onSubmitHandle: (
    data: z.infer<typeof PostFormSchema>,
    reset: () => void,
  ) => Promise<void>;

  onSubmitDeleteHandle?: (reset: () => void) => Promise<void>;
  post?: PostWithCategories;
  validationMode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all" | undefined;
  isCreated: boolean
};
