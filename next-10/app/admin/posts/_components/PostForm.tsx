"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostFormSchema } from "@/app/_schemas/form";
import { type PostFormProps } from "@/app/admin/posts/_components/_types/props";

export default function PostForm({
  title,
  onSubmitHandle,
  onSubmitDeleteHandle,
  showDeleteButton,
  post,
  mode,
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
    mode: mode ?? "onSubmit",
    defaultValues: {
      title: post?.title,
      content: post?.content,
      thumbnailUrl: post?.thumbnailUrl,
    },
  });

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
        <div>
          <select name="category">
            <option value="">選択してください</option>
            <option value="1"></option>
            <option value="1"></option>
            <option value="1"></option>
          </select>
        </div>

        <div className="flex gap-5 pl-36">
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
