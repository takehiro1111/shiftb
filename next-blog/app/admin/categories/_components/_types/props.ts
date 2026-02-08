import { z } from "zod";
import { CategoryFormSchema } from "@/app/_schemas/form";
import { Category } from "@/app/_types/categories";

export type CategoryFormProps = {
  title: "カテゴリー作成" | "カテゴリー編集";
  onSubmitHandle: (
    data: z.infer<typeof CategoryFormSchema>,
    reset: () => void,
  ) => Promise<void>;

  onSubmitDeleteHandle?: (reset: () => void) => Promise<void>;
  showDeleteButton: boolean;
  category?: Category;
  validationMode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all" | undefined;
};
