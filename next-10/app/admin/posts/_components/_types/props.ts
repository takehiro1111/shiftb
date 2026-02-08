import { z } from "zod";
import { AdminPostFormSchema } from "@/app/_schemas/form";
import { PostWithCategories } from "@/app/_types/posts";

// アップロード後に渡されるデータ型（thumbnailImageKey は string に変換済み）
export type PostFormData = Omit<
  z.infer<typeof AdminPostFormSchema>,
  "thumbnailImageKey"
> & {
  thumbnailImageKey: string;
};

export type PostFormProps = {
  title: "記事作成" | "記事編集" | "記事詳細";
  onSubmitHandle: (data: PostFormData, reset: () => void) => Promise<void>;

  onSubmitDeleteHandle?: (reset: () => void) => Promise<void>;
  post?: PostWithCategories;
  validationMode?:
    | "onBlur"
    | "onChange"
    | "onSubmit"
    | "onTouched"
    | "all"
    | undefined;
  isCreated: boolean;
};
