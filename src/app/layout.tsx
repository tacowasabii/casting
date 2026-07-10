import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import { resolveTheme, THEME_COOKIE, themeOf } from "@/lib/themes";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "캐스트보드",
  description: "이메일과 엑셀과 카톡에 흩어진 캐스팅 업무를 한 화면으로",
};

async function themeFromCookie() {
  const store = await cookies();
  return resolveTheme(store.get(THEME_COOKIE)?.value);
}

export async function generateViewport(): Promise<Viewport> {
  return { themeColor: themeOf(await themeFromCookie()).themeColor };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await themeFromCookie();
  return (
    <html
      lang="ko"
      data-theme={theme}
      className={`${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
