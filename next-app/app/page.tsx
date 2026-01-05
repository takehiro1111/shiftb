import { Articles } from "@/Components/Articles";
import { Providers } from "@/app/providers";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <>
        <div>
          <Providers>
            <Articles />
          </Providers>
        </div>
      </>
    </div>
  );
}
