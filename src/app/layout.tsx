// layout.tsx

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";
import { ProviderCompose } from "./_providers/provider-compose";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Главная | Elysia",
  description: "Курсовая работа Бородина Никиты Гр 90",
  openGraph: {
    title: "Главная | Elysia",
    description: "Курсовая работа Бородина Никиты Гр 90",
    images: ["/elysia.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${roboto.className} bg-background flex min-h-[100dvh] flex-col antialiased`}
      >
        <ProviderCompose>{children}</ProviderCompose>
        <Toaster />
      </body>
    </html>
  );
}
