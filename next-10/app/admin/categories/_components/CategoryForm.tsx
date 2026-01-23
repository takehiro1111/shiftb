"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormSchema } from "@/app/_schemas/form";
import { type CategoryFormProps } from "@/app/admin/categories/_components/_types/props";

export default function CategoryForm({
  title,
  onSubmitHandle,
  onSubmitDeleteHandle,
  showDeleteButton,
  category,
  mode,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    mode: mode ?? "onSubmit",
    defaultValues: {
      name: category?.name,
    },
  });

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <form
        onSubmit={handleSubmit((data) => onSubmitHandle(data, reset))}
        className="w-full px-4 mt-16"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title">
            カテゴリー名
          </label>
          <input
            type="text"
            id="title"
            {...register("name")}
            className="border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="flex gap-5 mt-4">
          <button
            type="submit"
            className="bg-black text-white font-bold px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-200"
            disabled={isSubmitting}
          >
            {showDeleteButton ? "更新" : "作成"}
          </button>
          {showDeleteButton && (
            <button
              type="button"
              onClick={() => onSubmitDeleteHandle?.(reset)}
              className="bg-gray-300 text-black font-bold px-4 py-2 rounded disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-red-200"
              disabled={isSubmitting}
            >
              削除
            </button>
          )}
        </div>
      </form>
    </>
  );
}
