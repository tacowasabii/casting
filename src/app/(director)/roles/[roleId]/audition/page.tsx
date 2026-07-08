import { CopyTextButton } from "@/components/audition/copy-text-button";
import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
import { BreadcrumbBar } from "@/components/shared/breadcrumb-bar";
import { CaptionLabel } from "@/components/shared/caption-label";
import { Chip } from "@/components/shared/chip";
import { EmptyBlock } from "@/components/shared/empty-block";
import { SectionHeader } from "@/components/shared/section-header";
import { Textarea } from "@/components/ui/textarea";
import { getApplicationsByRole, getRoleById } from "@/lib/data";
import { ageOf } from "@/lib/types";

/** 셸 데모용 정적 참석 상태 패턴: 첫 번째 참석 / 두 번째 미정 / 나머지 미발송 */
function AttendanceChip({ index }: { index: number }) {
  if (index === 0) return <Chip variant="solid">참석</Chip>;
  if (index === 1) return <Chip variant="ink-outline">미정</Chip>;
  return <Chip variant="muted">미발송</Chip>;
}

export default async function AuditionPage({
  params,
}: {
  params: Promise<{ roleId: string }>;
}) {
  const { roleId } = await params;
  const [{ role, project }, applications] = await Promise.all([
    getRoleById(roleId),
    getApplicationsByRole(roleId),
  ]);

  const confirmed = applications.filter((a) => a.triage === "관심");

  const message = [
    `[캐스트보드] ${project.title} '${role.name}' 오디션 안내`,
    `일시: 7월 15일(수) 14:00 (촬영 예정: ${role.shootDate ?? "미정"})`,
    "장소: 서울 마포구 OO스튜디오 3층",
    "참석 가능 여부를 회신 부탁드립니다.",
  ].join("\n");

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-card">
      <BreadcrumbBar
        parentHref={`/roles/${role.id}`}
        parentLabel="선별 보드"
        current={`${role.name} · 오디션`}
      />

      <div className="grid items-start gap-8 p-[30px] lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0">
          <SectionHeader
            title="확정 후보"
            meta={`관심 ${confirmed.length}명`}
          />
          {confirmed.length === 0 ? (
            <EmptyBlock
              className="mt-4"
              title="No Candidates"
              description="선별 보드에서 지원자를 '관심'으로 분류하면 여기에 표시됩니다."
            />
          ) : (
            <ul className="m-0 list-none p-0">
              {confirmed.map((app, index) => (
                <li
                  key={app.id}
                  className="flex items-center gap-3 border-b border-hairline py-3"
                >
                  <AvatarPlaceholder
                    name={app.actor.name}
                    photo={app.actor.photo}
                    className="size-9 text-sm"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="m-0 truncate text-sm font-bold text-foreground">
                      {app.actor.name}
                      <span className="ml-2 font-mono text-[10.5px] font-normal text-faint">
                        {ageOf(app.actor.birthYear)}세 · {app.actor.height}cm
                      </span>
                    </p>
                    <p className="m-0 mt-0.5 truncate text-xs text-muted-foreground">
                      {app.actor.phone}
                      {app.actor.email ? ` · ${app.actor.email}` : ""}
                    </p>
                  </div>
                  <AttendanceChip index={index} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded border border-border bg-panel px-[18px] py-4">
          <CaptionLabel size="sm">안내 문자</CaptionLabel>
          <p className="m-0 mt-1 text-xs text-muted-foreground">
            자동 생성된 문구를 수정해 사용할 수 있습니다
          </p>
          <Textarea defaultValue={message} className="mt-3 min-h-40 bg-card" />
          <div className="mt-3">
            <CopyTextButton text={message} />
          </div>
        </div>
      </div>
    </div>
  );
}
