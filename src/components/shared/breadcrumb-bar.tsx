import Link from "next/link";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

/** "← 상위 / 현재" 슬림 톱바 — 프로필·숏리스트 상세·오디션 */
export function BreadcrumbBar({
  parentHref,
  parentLabel,
  current,
  actions,
  className,
}: {
  parentHref: string;
  parentLabel: string;
  current: string;
  /** 우측 액션 슬롯 */
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-2.5 border-b border-border bg-card px-[30px] py-[15px] text-muted-foreground",
        className,
      )}
    >
      <SidebarTrigger className="md:hidden" />
      <Link
        href={parentHref}
        className="flex items-center gap-2.5 transition-colors hover:text-foreground"
      >
        <span className="text-[13px]">←</span>
        <span className="text-[12.5px]">{parentLabel}</span>
      </Link>
      <span className="text-[12.5px] text-icon-mute">/</span>
      <span className="truncate text-[12.5px] font-semibold text-foreground">
        {current}
      </span>
      {actions ? (
        <div className="ml-auto flex items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
