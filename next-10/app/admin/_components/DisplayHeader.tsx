"use client";

import Link from "next/link";
import { DisplayHeaderProps } from "@/app/admin/_components/_types/header";

export default function DisplayHeader({ title, entity }: DisplayHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link href={`/admin/${entity}/new`}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            新規作成
          </button>
        </Link>
      </div>
    </>
  );
}
