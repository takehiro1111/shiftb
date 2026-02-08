"use client";

import CategoryForm from "@/app/admin/categories/_components/CategoryForm";
import { z } from "zod";
import { CategoryFormSchema } from "@/app/_schemas/form";
import { useRouter } from "next/navigation";
import { CreateCategoryRequest } from "@/app/_types/categories";

export default function Page() {
  const router = useRouter();

  const onSubmitHandle = async (
    data: z.infer<typeof CategoryFormSchema>,
    reset: () => void,
  ): Promise<void> => {
    try {
      const body: CreateCategoryRequest = {
        name: data.name,
      };

      await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      alert("作成しました。");
      reset();
      router.replace("/admin/categories");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CategoryForm
      title="カテゴリー作成"
      onSubmitHandle={onSubmitHandle}
      showDeleteButton={false}
      validationMode="onSubmit"
    />
  );
}
