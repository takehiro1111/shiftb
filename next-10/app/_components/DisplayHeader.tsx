"use client";

import Link from "next/link";
import { DisplayHeaderProps } from "@/app/_components/_types/header";

export default function DisplayHeader({ title, entity }: DisplayHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Link href={`/admin/${entity}/new`}>
        <button className="bg-blue-600 text-white font-bold px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700">
          新規作成
        </button>
      </Link>
    </div>
  );
}
