"use client";

import {
  AlignJustify,
  Bookmark,
  LayoutGrid,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemePicker } from "@/components/layout/theme-picker";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import type { SidebarData } from "@/lib/data";
import type { ThemeId } from "@/lib/themes";
import { MOCK_USER } from "@/lib/types";
import { cn } from "@/lib/utils";

/* 사이드바 좌우 패딩 22px + 항목 내부 패딩 6px = 28px. 활성 세로바는 우측 가장자리(right-0)에 밀착. */

const MENU = [
  { title: "대시보드", href: "/", icon: LayoutGrid, exact: true },
  { title: "배역 · 선별", href: "/roles", icon: AlignJustify, exact: false },
  { title: "배우 라이브러리", href: "/actors", icon: UserRound, exact: false },
  { title: "숏리스트", href: "/shortlists", icon: Bookmark, exact: false },
] as const;

export function AppSidebar({
  data,
  theme,
}: {
  data: SidebarData;
  theme: ThemeId;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Sidebar>
      <SidebarHeader className="gap-0 px-7 pb-[34px] pt-[30px]">
        <Link href="/" className="block">
          <div className="text-2xl font-extrabold leading-none tracking-tight text-sidebar-primary">
            CASTBOARD
          </div>
          <div className="mt-2 text-[11px] tracking-[.04em] text-sidebar-muted">
            캐스팅 워크스페이스
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-0 overflow-x-hidden">
        <nav className="flex flex-col">
          {MENU.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-[13px] px-7 py-[11px] text-sm transition-colors",
                  active
                    ? "font-bold text-sidebar-active"
                    : "font-medium text-sidebar-foreground hover:text-sidebar-primary",
                )}
              >
                <item.icon
                  className={cn(
                    "size-[18px]",
                    active ? "text-sidebar-active" : "text-sidebar-icon",
                  )}
                  strokeWidth={1.4}
                />
                <span>{item.title}</span>
                {item.href === "/shortlists" &&
                data.pendingShortlistCount > 0 ? (
                  <span className="ml-auto rounded-full bg-sidebar-accent px-[7px] py-px font-mono text-[10px] text-sidebar-muted">
                    {data.pendingShortlistCount}
                  </span>
                ) : null}
                {active ? (
                  <span className="absolute right-0 top-1/2 h-5 w-0.5 -translate-y-1/2 bg-sidebar-active" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <ContextSection
          data={data}
          section={segments[0]}
          currentId={segments[1]}
        />
      </SidebarContent>

      <SidebarFooter className="gap-0 px-7 pb-5">
        <ThemePicker initialTheme={theme} />
        <div className="mt-3.5 flex items-center gap-3 border-t border-sidebar-border pt-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sidebar-avatar text-sm font-semibold text-sidebar-avatar-foreground">
            {MOCK_USER.name.charAt(0)}
          </div>
          <div className="min-w-0 leading-snug">
            <div className="truncate text-[13px] font-bold text-sidebar-primary">
              {MOCK_USER.name}
            </div>
            <div className="truncate text-[11px] text-sidebar-muted">
              {MOCK_USER.role}
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

/** 화면별 컨텍스트 — 선별: 현재 작품의 배역 / 라이브러리: 저장된 태그 / 숏리스트: 공유 중 */
function ContextSection({
  data,
  section,
  currentId,
}: {
  data: SidebarData;
  section: string | undefined;
  currentId: string | undefined;
}) {
  if (section === "roles") {
    const current =
      data.projects.find((p) => p.roles.some((r) => r.id === currentId)) ??
      data.projects[0];
    if (!current) return null;
    return (
      <ContextFrame label={`${current.project.title} · 배역`}>
        <nav className="flex flex-col gap-px">
          {current.roles.map((role) => {
            const active = role.id === currentId;
            return (
              <Link
                key={role.id}
                href={`/roles/${role.id}`}
                className={cn(
                  "flex items-center gap-2.5 rounded-sm px-2.5 py-2",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-muted hover:text-sidebar-primary",
                )}
              >
                <span
                  className={cn("truncate text-[13px]", active && "font-semibold")}
                >
                  {role.name}
                </span>
                <span
                  className={cn(
                    "ml-auto font-mono text-[10.5px]",
                    active ? "text-sidebar-primary" : "text-sidebar-caption",
                  )}
                >
                  {role.totalApplications}
                </span>
              </Link>
            );
          })}
        </nav>
      </ContextFrame>
    );
  }

  if (section === "actors") {
    if (data.tags.length === 0) return null;
    return (
      <ContextFrame label="저장된 태그">
        <div className="flex flex-wrap gap-1.5">
          {data.tags.slice(0, 8).map(({ tag, count }) => (
            <span
              key={tag}
              className="rounded-sm bg-sidebar-accent px-[9px] py-1 text-[11px] text-sidebar-foreground"
            >
              {tag} {count}
            </span>
          ))}
        </div>
      </ContextFrame>
    );
  }

  if (section === "shortlists") {
    if (data.sharedShortlists.length === 0) return null;
    return (
      <ContextFrame label="공유 중">
        <nav className="flex flex-col gap-0.5">
          {data.sharedShortlists.map((sl) => {
            const active = sl.id === currentId;
            return (
              <Link
                key={sl.id}
                href={`/shortlists/${sl.id}`}
                className={cn(
                  "rounded-sm px-2.5 py-2",
                  active
                    ? "bg-sidebar-accent"
                    : "hover:bg-sidebar-accent/60",
                )}
              >
                <div className="truncate text-[12.5px] font-semibold text-sidebar-primary">
                  {sl.title}
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="truncate text-[10.5px] text-sidebar-muted">
                    {sl.role.name} · {sl.project.title}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-sidebar-caption">
                    {sl.reviewedCount}/{sl.itemCount}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </ContextFrame>
    );
  }

  return null;
}

function ContextFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-7">
      <div className="my-[18px] h-px bg-sidebar-border" />
      <div className="caption-sm pb-3 tracking-[.12em] text-sidebar-caption">
        {label}
      </div>
      {children}
    </div>
  );
}
