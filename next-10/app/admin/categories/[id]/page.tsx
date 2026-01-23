"use client";

import CategoryForm from "@/app/admin/categories/_components/CategoryForm";
import { z } from "zod";
import { CategoryFormSchema } from "@/app/_schemas/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CategoryModel } from "@/app/generated/prisma/models/Category";
import { useParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState<CategoryModel | null>(null);

  const onSubmitHandle = async (
    data: z.infer<typeof CategoryFormSchema>,
    reset: () => void,
  ): Promise<void> => {
    try {
      const body = {
        name: data.name,
      };

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      alert("更新しました。");
      reset();
      router.push("/admin/categories");
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitDeleteHandle = async (reset: () => void): Promise<void> => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories/${id}`,
        {
          method: "DELETE",
        },
      );

      alert("削除しました。");
      reset();
      router.push("/admin/categories");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories/${id}`,
      );
      const { category } = await res.json();
      setCategoryData(category);
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
      mode="onSubmit"
    />
  );
}
