"use client";

import { Clapperboard, LayoutDashboard, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MOCK_USER } from "@/lib/types";

const MENU = [
  { title: "대시보드", href: "/", icon: LayoutDashboard },
  { title: "배우 라이브러리", href: "/actors", icon: Users },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Clapperboard className="size-4" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            캐스트보드
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/" || pathname.startsWith("/roles")
                    : pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <AvatarPlaceholder name={MOCK_USER.name} className="size-8 text-xs" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{MOCK_USER.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {MOCK_USER.role}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
