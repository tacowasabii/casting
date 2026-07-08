import Link from "next/link";

import { DdayBadge } from "@/components/shared/dday-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { CopyLinkButton } from "@/components/roles/copy-link-button";
import { RoleTabs } from "@/components/roles/role-tabs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getRoleById, type RoleWithStats } from "@/lib/data";

function conditionLine(role: RoleWithStats): string {
  const parts: string[] = [
    role.gender === "무관" ? "성별 무관" : role.gender,
    `${role.ageMin}~${role.ageMax}세`,
  ];
  if (role.heightMin && role.heightMax) {
    parts.push(`${role.heightMin}~${role.heightMax}cm`);
  } else if (role.heightMin) {
    parts.push(`${role.heightMin}cm 이상`);
  } else if (role.heightMax) {
    parts.push(`${role.heightMax}cm 이하`);
  }
  parts.push(`모집 ${role.headcount}명`);
  if (role.shootDate) parts.push(`촬영 ${role.shootDate}`);
  return parts.join(" · ");
}

export default async function RoleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ roleId: string }>;
}) {
  const { roleId } = await params;
  const { role, project } = await getRoleById(roleId);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex-none border-b px-6 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <nav className="flex min-w-0 items-center gap-1.5 text-lg font-semibold">
            <Link
              href="/"
              className="truncate text-muted-foreground transition-colors hover:text-foreground"
            >
              {project.title}
            </Link>
            <span className="text-muted-foreground/50">›</span>
            <h1 className="truncate font-heading tracking-tight">{role.name}</h1>
          </nav>
          <StatusBadge status={role.status} />
          <DdayBadge deadline={role.deadline} />
          <div className="ml-auto">
            <CopyLinkButton
              path={`/apply/${role.id}`}
              label="지원 폼 링크 복사"
            />
          </div>
        </div>
        <p className="mt-1.5 truncate font-mono text-xs tracking-wide text-muted-foreground">
          {conditionLine(role)}
        </p>
        <RoleTabs roleId={role.id} className="mt-3" />
      </header>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
