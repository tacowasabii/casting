import { cookies } from "next/headers";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSidebarData } from "@/lib/data";
import { resolveTheme, THEME_COOKIE } from "@/lib/themes";

export default async function DirectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebar, cookieStore] = await Promise.all([
    getSidebarData(),
    cookies(),
  ]);
  const theme = resolveTheme(cookieStore.get(THEME_COOKIE)?.value);

  return (
    <SidebarProvider>
      <AppSidebar data={sidebar} theme={theme} />
      {/* 선별 보드 등 풀하이트 화면을 위해 inset이 뷰포트를 꽉 잡고, 스크롤은 각 페이지가 관리 */}
      <SidebarInset className="flex h-svh min-w-0 flex-col overflow-hidden">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
