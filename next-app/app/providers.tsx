"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5000, // データ取得して5秒以降後の再レンダリングはAPIを叩く
          gcTime: 10 * 60 * 1000, // モーダルを閉じたりページ遷移でアンマウントしても10分はキャッシュ保持
          refetchOnWindowFocus: true, // 別タブ見てて戻ってきた場合は自動で最新データ取得
          retry: 3, // エラー時に3回リトライ
          retryDelay: (attemptIndex) =>
            Math.min(1000 * 2 ** attemptIndex, 30000), // 指数バックオフ
        },
        mutations: {
          retry: 3, // エラー時に3回リトライ
          retryDelay: (attemptIndex) =>
            Math.min(1000 * 2 ** attemptIndex, 30000), // 指数バックオフ
        },
      },
    });
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
