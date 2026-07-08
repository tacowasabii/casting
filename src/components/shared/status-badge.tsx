import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { RoleStatus } from "@/lib/types";

const STYLES: Record<RoleStatus, string> = {
  모집중: "border-red-cta/40 bg-red-cta/15 text-primary",
  검토중: "border-amber-500/30 bg-amber-500/15 text-amber-400",
  감독컨펌: "border-violet-500/30 bg-violet-500/15 text-violet-400",
  오디션: "border-sky-500/30 bg-sky-500/15 text-sky-400",
  확정: "border-emerald-500/30 bg-emerald-500/15 text-emerald-400",
  종료: "border-border bg-chip/60 text-muted-foreground",
};

export function StatusBadge({
  status,
  className,
}: {
  status: RoleStatus;
  className?: string;
}) {
  return (
    <Badge variant="outline" className={cn(STYLES[status], className)}>
      {status}
    </Badge>
  );
}
