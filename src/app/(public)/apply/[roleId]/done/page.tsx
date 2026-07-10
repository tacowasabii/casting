import { CaptionLabel } from "@/components/shared/caption-label";
import { getRoleById } from "@/lib/data";

export default async function ApplyDonePage({
  params,
}: {
  params: Promise<{ roleId: string }>;
}) {
  const { roleId } = await params;
  const { role, project } = await getRoleById(roleId);

  return (
    <div className="flex flex-1 flex-col">
      {/* 지원 폼 헤더의 에코 — 작은 검정 블록 */}
      <header className="bg-primary px-6 pb-5 pt-6">
        <div className="font-mono text-[10px] uppercase tracking-[.14em] text-primary-foreground/55">
          지원 완료
        </div>
        <h1 className="m-0 mt-2 text-xl font-extrabold tracking-[-.01em] text-primary-foreground">
          {role.name}{" "}
          <span className="text-[13px] font-normal text-primary-foreground/65">
            · {project.title}
          </span>
        </h1>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-7 py-10 text-center">
        <CaptionLabel className="tracking-[.18em]">Submitted</CaptionLabel>
        <h2 className="m-0 text-xl font-extrabold tracking-[-.015em] text-foreground">
          지원이 접수되었습니다
        </h2>
        <p className="m-0 text-[13px] leading-relaxed text-muted-foreground">
          검토 결과는 개별 연락드리며,
          <br />
          오디션 확정 시 문자로 안내드립니다.
        </p>
      </div>

      <footer className="px-5 py-3 text-center text-[10px] text-faint">
        Powered by 캐스트보드
      </footer>
    </div>
  );
}
