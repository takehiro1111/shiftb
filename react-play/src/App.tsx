import { Articles } from "./Components/Articles";
import { ArticleDetails } from "./Components/ArticleDetails";
import { FormContact } from "./Components/FormContact";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./Components/Header";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000, // データ取得して5秒以降後の再レンダリングはAPIを叩く
      gcTime: 10 * 60 * 1000, // モーダルを閉じたりページ遷移でアンマウントしても10分はキャッシュ保持
      refetchOnWindowFocus: true, // 別タブ見てて戻ってきた場合は自動で最新データ取得
      retry: 3, // エラー時に3回リトライ
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 指数バックオフ
    },
    mutations: {
      retry: 3, // エラー時に3回リトライ
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 指数バックオフ
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/posts/:id" element={<ArticleDetails />} />
            <Route
              path="/contact"
              element={
                <FormContact mode="onSubmit" title="お問い合わせフォーム" />
              }
            />
          </Routes>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
