"use client";

import CategoryForm from "@/app/admin/categories/_components/CategoryForm";
import { z } from "zod";
import { CategoryFormSchema } from "@/app/_schemas/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  UpdateCategoryRequest,
  GetCategoryResponse,
  Category,
} from "@/app/_types/categories";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState<Category | null>(null);

  const onSubmitHandle = async (
    data: z.infer<typeof CategoryFormSchema>,
    reset: () => void,
  ): Promise<void> => {
    try {
      const body: UpdateCategoryRequest = {
        name: data.name,
      };

      await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      alert("更新しました。");
      reset();
      router.replace("/admin/categories");
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitDeleteHandle = async (reset: () => void): Promise<void> => {
    try {
      await fetch(`/api/admin/categories/${id}`, {
          method: "DELETE",
        },
      );

      alert("削除しました。");
      reset();
      router.replace("/admin/categories");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories/${id}`);
      const data: GetCategoryResponse = await res.json();
      setCategoryData(data.category);
    };

    fetcher();
  }, [id]);

  if (categoryData === null) return <span>Loading...</span>;

  return (
    <CategoryForm
      title="カテゴリー編集"
      onSubmitHandle={onSubmitHandle}
      onSubmitDeleteHandle={onSubmitDeleteHandle}
      showDeleteButton={true}
      category={categoryData}
      validationMode="onSubmit"
    />
  );
}
