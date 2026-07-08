import { ApplyForm } from "@/components/apply/apply-form";
import { DdayBadge } from "@/components/shared/dday-badge";
import { getRoleById } from "@/lib/data";
import type { Role } from "@/lib/types";

// 배역 요건 한 줄 요약 — "여 · 17~21세 · 키 무관" 형식
function requirementLine(role: Role): string {
  const gender = role.gender === "무관" ? "성별 무관" : role.gender;
  const age = `${role.ageMin}~${role.ageMax}세`;
  const height =
    role.heightMin && role.heightMax
      ? `${role.heightMin}~${role.heightMax}cm`
      : role.heightMin
        ? `${role.heightMin}cm 이상`
        : role.heightMax
          ? `${role.heightMax}cm 이하`
          : "키 무관";
  return `${gender} · ${age} · ${height}`;
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ roleId: string }>;
}) {
  const { roleId } = await params;
  const { role, project } = await getRoleById(roleId);

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b bg-muted/30 px-5 py-6">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {project.title} · {project.type}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            {role.name}
          </h1>
          <DdayBadge deadline={role.deadline} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {requirementLine(role)}
        </p>
      </header>

      <ApplyForm roleId={roleId} />

      <footer className="px-5 py-3 text-center text-[10px] text-muted-foreground/70">
        Powered by 캐스트보드
      </footer>
    </div>
  );
}
