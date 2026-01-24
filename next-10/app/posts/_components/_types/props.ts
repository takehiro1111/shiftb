import { z } from "zod";
import { PostFormSchema } from "@/app/_schemas/form";
import { PostModel } from "@/app/generated/prisma/models/Post";

type PostWithCategories = PostModel & {
  postCategories?: { categoryId: number }[];
};

export type PostFormProps = {
  title: "記事作成" | "記事詳細";
  onSubmitHandle?: (
    data: z.infer<typeof PostFormSchema>,
    reset: () => void,
  ) => Promise<void>;
  isCreated: boolean;
  post?: PostWithCategories;
  validationMode?:
    | "onBlur"
    | "onChange"
    | "onSubmit"
    | "onTouched"
    | "all"
    | undefined;
};
