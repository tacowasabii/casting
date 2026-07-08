import { RoleCard } from "@/components/dashboard/role-card";
import type { RoleWithStats } from "@/lib/data";
import { ROLE_STATUSES } from "@/lib/types";

export function ProjectKanban({ roles }: { roles: RoleWithStats[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {ROLE_STATUSES.map((status) => {
        const list = roles.filter((r) => r.status === status);
        return (
          <div
            key={status}
            className="flex w-[240px] min-w-[220px] shrink-0 flex-col gap-2"
          >
            <div className="flex items-center gap-1.5 px-1">
              <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {status}
              </span>
              <span className="rounded-full bg-chip px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                {list.length}
              </span>
            </div>
            {list.length === 0 ? (
              <div className="flex h-24 items-center justify-center rounded-xl border border-dashed text-xs text-muted-foreground/60">
                배역 없음
              </div>
            ) : (
              list.map((role) => <RoleCard key={role.id} role={role} />)
            )}
          </div>
        );
      })}
    </div>
  );
}
