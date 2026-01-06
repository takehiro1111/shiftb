"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema } from "@/app/_schemas/contact";
import axios from "axios";

type Mode = {
  mode: "onChange" | "onBlur" | "onSubmit";
  title: string;
};

const BASE_URL =
  "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts";

export function FormContact({ mode, title }: Mode) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    mode: mode,
    defaultValues: {
      name: "",
      email: "",
      body: "",
    },
  });

  const onSubmitHandle = async (data: z.infer<typeof contactFormSchema>) => {
    try {
      const body = {
        name: data.name,
        email: data.email,
        message: data.body,
      };
      const res = await axios.post(BASE_URL, body);

      console.log(res);
      alert("送信しました。");
      reset();
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="flex pl-4 font-bold">{title}</h2>
      <form
        onSubmit={handleSubmit(onSubmitHandle)}
        className="w-full space-y-4 px-4"
      >
        <div className="flex items-center gap-4">
          <label htmlFor="userName" className="w-32">
            お名前
          </label>
          <input
            type="text"
            id="userName"
            {...register("name")}
            className="flex-1 border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="email" className="w-32">
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="flex-1 border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="password" className="w-32">
            本文
          </label>
          <textarea
            id="body"
            rows={5}
            {...register("body")}
            className="flex-1 border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          />
          {errors.body && (
            <span className="text-red-500">{errors.body.message}</span>
          )}
        </div>
        <div className="flex gap-5 pl-36">
          <button
            type="submit"
            className="bg-black text-white font-bold px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            送信
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-300 text-black font-bold px-4 py-2 rounded disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            クリア
          </button>
        </div>
      </form>
    </div>
  );
}
