import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { RoleStatus } from "@/lib/types";

const STYLES: Record<RoleStatus, string> = {
  모집중: "bg-blue-100 text-blue-800 border-blue-200",
  검토중: "bg-amber-100 text-amber-800 border-amber-200",
  감독컨펌: "bg-violet-100 text-violet-800 border-violet-200",
  오디션: "bg-emerald-100 text-emerald-800 border-emerald-200",
  확정: "bg-teal-100 text-teal-900 border-teal-200",
  종료: "bg-neutral-100 text-neutral-500 border-neutral-200",
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
