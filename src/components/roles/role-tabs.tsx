"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function RoleTabs({
  roleId,
  className,
}: {
  roleId: string;
  className?: string;
}) {
  const pathname = usePathname();
  const tabs = [
    { href: `/roles/${roleId}`, label: "지원자", exact: true },
    { href: `/roles/${roleId}/shortlists`, label: "숏리스트", exact: false },
    { href: `/roles/${roleId}/audition`, label: "오디션", exact: false },
  ];

  return (
    <nav className={cn("flex gap-5", className)}>
      {tabs.map((tab) => {
        const active = tab.exact
          ? pathname === tab.href
          : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "border-b-2 pb-2.5 text-sm font-medium transition-colors",
              active
                ? "border-red-cta text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
