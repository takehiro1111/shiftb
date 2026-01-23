"use client";

import CategoryForm from "@/app/admin/categories/_components/CategoryForm";
import { z } from "zod";
import { CategoryFormSchema } from "@/app/_schemas/form";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const onSubmitHandle = async (
    data: z.infer<typeof CategoryFormSchema>,
    reset: () => void,
  ): Promise<void> => {
    try {
      const body = {
        name: data.name,
      };

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      alert("作成しました。");
      reset();
      router.push("/admin/categories");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CategoryForm
      title="カテゴリー作成"
      onSubmitHandle={onSubmitHandle}
      showDeleteButton={false}
      mode="onSubmit"
    />
  );
}
