"use client";

import { useForm, Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminPostFormSchema } from "@/app/_schemas/form";
import { type PostFormProps } from "@/app/admin/posts/_components/_types/props";
import { useCategories } from "@/app/admin/posts/_hooks/useCategories";
import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/app/_libs/supabase";
import { v4 as uuidv4 } from "uuid"; // 固有IDを生成するライブラリ
import { useSupabaseStorage } from "@/app/_hooks/useSupabaseStorage";
import { Category } from "@/app/_types/categories";

type FormData = z.infer<typeof AdminPostFormSchema>;

export default function PostForm({
  title,
  onSubmitHandle,
  onSubmitDeleteHandle,
  post,
  validationMode,
  isCreated,
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(AdminPostFormSchema) as Resolver<FormData>,
    mode: validationMode ?? "onSubmit",
    defaultValues: {
      title: post?.title,
      content: post?.content,
      categoryId: post?.postCategories?.[0]?.categoryId,
    },
  });
  const { categories, isLoading } = useCategories();
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!isLoading && post) {
      reset({
        title: post.title,
        content: post.content,
        categoryId: post.postCategories?.[0]?.categoryId,
      });
    }
  }, [isLoading, post, reset]);

  const { storageData } = useSupabaseStorage(post?.thumbnailImageKey);
  const imageURL = thumbnailImageUrl || storageData?.signedUrl;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setThumbnailImageUrl(previewUrl);
    }
  };

  const onSubmitWithUpload = async (formData: FormData) => {
    const file = formData.thumbnailImageKey?.[0];

    if (!file) {
      await onSubmitHandle(
        { ...formData, thumbnailImageKey: post?.thumbnailImageKey ?? "" },
        reset,
      );
      return;
    }

    const filePath = `public/${uuidv4()}`;

    const { data: uploadData, error } = await supabase.storage
      .from("blog-nextjs")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      alert(error.message);
      return;
    }

    await onSubmitHandle(
      { ...formData, thumbnailImageKey: uploadData.path },
      reset,
    );
  };

  return (
    <>
      <h2 className="text-2xl font-bold">{title}</h2>
      <form
        onSubmit={handleSubmit(onSubmitWithUpload)}
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
        <div>
          <label
            htmlFor="thumbnailImageKey"
            className="block text-sm font-medium text-gray-700"
          >
            サムネイル画像
          </label>
          {imageURL && (
            <Image
              src={imageURL}
              alt="サムネイル"
              width={192}
              height={108}
              className="mb-2 rounded"
              unoptimized
            />
          )}
          <input
            type="file"
            id="thumbnailImageKey"
            accept="image/*"
            {...register("thumbnailImageKey", { onChange: handleImageChange })}
            className="flex-1 border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          />
          {errors.thumbnailImageKey && (
            <span className="text-red-500">
              {errors.thumbnailImageKey.message}
            </span>
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
            {categories.map((category: Category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <span className="text-red-500">{errors.categoryId.message}</span>
          )}
        </div>

        <div className="flex gap-5 pl-36">
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isCreated ? "作成" : "更新"}
          </button>
          {!isCreated && (
            <button
              type="button"
              onClick={() => onSubmitDeleteHandle?.(reset)}
              className="bg-red-400 text-black font-bold px-4 py-2 rounded disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-red-500"
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
