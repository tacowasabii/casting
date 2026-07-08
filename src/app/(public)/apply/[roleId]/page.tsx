import { ApplyForm } from "@/components/apply/apply-form";
import { getRoleById } from "@/lib/data";
import { conditionLine, formatDeadlineLabel } from "@/lib/format";

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ roleId: string }>;
}) {
  const { roleId } = await params;
  const { role, project } = await getRoleById(roleId);

  return (
    <div className="flex flex-1 flex-col">
      {/* 검정 헤더 블록 — 배역·조건·마감을 반전 위계로 */}
      <header className="bg-primary px-6 pb-5 pt-6">
        <div className="font-mono text-[10px] uppercase tracking-[.14em] text-[#8a8a8a]">
          지원서
        </div>
        <h1 className="m-0 mt-2 text-xl font-extrabold tracking-[-.01em] text-primary-foreground">
          {role.name}{" "}
          <span className="text-[13px] font-normal text-primary-foreground/65">
            · {project.title}
          </span>
        </h1>
        <p className="m-0 mt-2 text-[11.5px] leading-normal text-primary-foreground/60">
          {conditionLine(role)}
          {role.requirements ? ` · ${role.requirements}` : ""}
          <br />
          지원 마감 · {formatDeadlineLabel(role.deadline)}
        </p>
      </header>

      <ApplyForm roleId={roleId} />

      <footer className="px-5 py-3 text-center text-[10px] text-faint">
        Powered by 캐스트보드
      </footer>
    </div>
  );
}
