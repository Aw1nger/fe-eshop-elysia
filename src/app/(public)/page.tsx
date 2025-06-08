// (public)/page.tsx

import { Products } from "@/feature/products";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="grid min-h-[calc(100vh-(var(--spacing)*16))] grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
        <div className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
          <div className="flex w-full justify-center">
            <Image
              src="/elysia.webp"
              alt="Elysia"
              width={180}
              height={38}
              priority
            />
          </div>
          <ol className="list-inside list-decimal text-center font-mono text-sm/6 sm:text-left">
            <li className="mb-2 tracking-[-.01em]">
              <code className="rounded bg-black/[.05] px-1 py-0.5 font-mono font-semibold dark:bg-white/[.06]">
                Backend:
              </code>{" "}
              ElysiaJS
            </li>
            <li className="mb-2 tracking-[-.01em]">
              <code className="rounded bg-black/[.05] px-1 py-0.5 font-mono font-semibold dark:bg-white/[.06]">
                Frontend:
              </code>{" "}
              NextJS{" "}
            </li>
            <li className="tracking-[-.01em]">Разработанно Nikita Aw1nger</li>
          </ol>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm font-medium transition-colors hover:bg-[#383838] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
              href="https://t.me/aw1nger"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/elysia.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Telegram
            </a>
            <a
              className="flex h-10 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm font-medium transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:w-auto sm:px-5 sm:text-base md:w-[158px] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
              href={process.env.API_URL + "/swagger"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Swagger
            </a>
          </div>
        </div>
      </section>
      <section className="container mx-auto my-4 grid grid-cols-2 gap-2 px-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <Products />
      </section>
    </>
  );
}
