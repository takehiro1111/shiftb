"use client";

import { useForm, Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostFormSchema } from "@/app/_schemas/form";
import { type PostFormProps } from "@/app/posts/_components/_types/props";
import { useCategories } from "@/app/admin/posts/_hooks/useCategories";
import { useEffect } from "react";

type FormData = z.infer<typeof PostFormSchema>;

export default function PostForm({
  title,
  onSubmitHandle,
  isCreated,
  post,
  mode,
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(PostFormSchema) as Resolver<FormData>,
    mode: mode ?? "onSubmit",
    defaultValues: {
      title: post?.title,
      content: post?.content,
      thumbnailUrl: post?.thumbnailUrl,
      categoryId: post?.postCategories?.[0]?.categoryId,
    },
  });
  const { categories, isLoading } = useCategories();

  useEffect(() => {
    if (!isLoading && post) {
      reset({
        title: post.title,
        content: post.content,
        thumbnailUrl: post.thumbnailUrl,
        categoryId: post.postCategories?.[0]?.categoryId,
      });
    }
  }, [isLoading, post, reset]);

  return (
    <>
      <h2 className="text-2xl font-bold">{title}</h2>
      <form
        onSubmit={handleSubmit((data) => onSubmitHandle(data, reset))}
        className="w-full space-y-4 px-4"
      >
        <div className="flex items-center gap-4">
          <label htmlFor="title" className="w-32">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="flex-1 border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="content" className="w-32">
            内容
          </label>
          <textarea
            id="content"
            rows={10}
            {...register("content")}
            className="flex-1 border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          />
          {errors.content && (
            <span className="text-red-500">{errors.content.message}</span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="thumbnailUrl" className="w-32">
            サムネイルURL
          </label>
          <input
            type="text"
            id="thumbnailUrl"
            {...register("thumbnailUrl")}
            className="flex-1 border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          />
          {errors.thumbnailUrl && (
            <span className="text-red-500">{errors.thumbnailUrl.message}</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="categoryId" className="w-32">
            カテゴリー
          </label>
          <select
            {...register("categoryId", { valueAsNumber: true })}
            disabled={isLoading || isSubmitting}
            className={
              "flex-1 border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            }
          >
            {isCreated && <option value="">選択してください</option>}
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <span className="text-red-500">{errors.categoryId.message}</span>
          )}
        </div>

        {isCreated && (
          <div className="flex gap-5 pl-36">
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700"
              disabled={isSubmitting}
            >
              作成
            </button>
          </div>
        )}
      </form>
    </>
  );
}
