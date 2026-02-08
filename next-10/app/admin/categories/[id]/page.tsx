"use client";

import CategoryForm from "@/app/admin/categories/_components/CategoryForm";
import { Category } from "@/app/_types/categories";
import { z } from "zod";
import { CategoryFormSchema } from "@/app/_schemas/form";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { UpdateCategoryRequest } from "@/app/_types/categories";
import { useFetch } from "@/app/_hooks/useFetch";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();

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
      });

      alert("削除しました。");
      reset();
      router.replace("/admin/categories");
    } catch (e) {
      console.log(e);
    }
  };

  const { data, isLoading } = useFetch<{ category: Category }>(
    `/api/admin/categories/${id}`,
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <CategoryForm
      title="カテゴリー編集"
      onSubmitHandle={onSubmitHandle}
      onSubmitDeleteHandle={onSubmitDeleteHandle}
      showDeleteButton={true}
      category={data?.category}
      validationMode="onSubmit"
    />
  );
}
