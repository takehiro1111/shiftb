"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { PostModel } from "@/app/generated/prisma/models/Post";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostFormSchema } from "@/app/_schemas/form";

export default function Page() {
  const [postData, setPostData] = useState<PostModel | null>(null);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
    mode: "onSubmit",
    defaultValues: {
      title: postData?.title,
      content: postData?.content,
      thumbnailUrl: postData?.thumbnailUrl,
    },
  });

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts/${id}`,
      );
      const { post } = await res.json();
      setPostData(post);
    };

    fetcher();
  }, [id]);

  if (!id) return <p>記事IDが指定されていません。</p>;
  if (postData === null) return <span>Loading...</span>;
  if (!postData) return notFound();

  const onSubmitHandle = async (data: z.infer<typeof PostFormSchema>) => {
    try {
      const body = {
        title: data.title,
        content: data.content,
        thumbnailUrl: data.thumbnailUrl,
      };

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      alert("更新しました。");
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold">記事編集</h2>
      <form
        onSubmit={handleSubmit(onSubmitHandle)}
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
            className="bg-black text-white font-bold px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            更新
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-300 text-black font-bold px-4 py-2 rounded disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            削除
          </button>
        </div>
      </form>
    </>
  );
}
