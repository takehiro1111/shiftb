"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="flex gap-4 p-4 bg-gray-800">
      <Link href="/" className="text-white hover:text-gray-300">
        Blog
      </Link>
      <Link href="/contact" className="text-white hover:text-gray-300">
        お問い合わせ
      </Link>
    </header>
  );
}
