"use client";

import { ActionTriad } from "@/components/shared/action-triad";
import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
import { CaptionLabel } from "@/components/shared/caption-label";
import { Chip } from "@/components/shared/chip";
import { EmptyBlock } from "@/components/shared/empty-block";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Textarea } from "@/components/ui/textarea";
import type { ApplicationWithActor } from "@/lib/data";
import { formatRelativeDays } from "@/lib/format";
import type { ApplicationSource, Triage } from "@/lib/types";
import { ageOf } from "@/lib/types";

const SOURCE_LABEL: Record<ApplicationSource, string> = {
  form: "지원 폼",
  email: "이메일",
  manual: "수동 등록",
};

const TRIAGE_OPTIONS = [
  { value: "관심", label: "관심", kbd: "1" },
  { value: "보류", label: "보류", kbd: "2" },
  { value: "제외", label: "제외", kbd: "3" },
] as const;

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <CaptionLabel size="sm" className="tracking-[.06em]">
        {label}
      </CaptionLabel>
      <div className="mt-1.5 truncate text-[13px] text-foreground">{value}</div>
    </div>
  );
}

export function ApplicantDetail({
  application,
  triage,
  onTriageChange,
}: {
  application: ApplicationWithActor | null;
  triage: Triage;
  onTriageChange: (triage: Triage) => void;
}) {
  if (!application) {
    return (
      <div className="hidden min-h-0 flex-1 items-center justify-center bg-card p-8 md:flex">
        <EmptyBlock
          className="w-full max-w-sm"
          title="Select"
          description="좌측에서 지원자를 선택하면 프로필·영상·지원 정보를 확인할 수 있습니다."
        />
      </div>
    );
  }

  const { actor } = application;
  const attachmentLabel =
    application.files.length === 0
      ? "없음"
      : application.files.length === 1
        ? application.files[0]
        : `${application.files[0]} 외 ${application.files.length - 1}`;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-card">
      <div
        key={application.id}
        className="px-[30px] pb-[30px] pt-[26px] animate-in fade-in duration-200"
      >
        {/* 이름 + 메타 + kbd 힌트 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-baseline gap-3">
            <h3 className="m-0 truncate text-[26px] font-extrabold tracking-[-.02em] text-foreground">
              {actor.name}
            </h3>
            <span className="shrink-0 text-[12.5px] text-muted-foreground">
              {ageOf(actor.birthYear)}세 · {actor.height}cm ·{" "}
              {actor.agency ?? "소속사 없음"}
            </span>
          </div>
          <div className="hidden items-center gap-3 xl:flex">
            <span className="flex items-center gap-1.5">
              <KbdGroup>
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
              </KbdGroup>
              <span className="text-[10.5px] text-faint">이동</span>
            </span>
            {TRIAGE_OPTIONS.map((o) => (
              <span key={o.value} className="flex items-center gap-1.5">
                <Kbd>{o.kbd}</Kbd>
                <span className="text-[10.5px] text-faint">{o.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 쇼릴 + 헤드샷 */}
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
          {application.videoUrl ? (
            <MediaPlaceholder
              kind="video"
              label={`SHOWREEL · ${actor.name}`}
              duration={application.videoDuration}
              playSize="md"
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-sm border border-border bg-secondary">
              <span className="font-mono text-[11px] text-faint">
                영상 없음
              </span>
            </div>
          )}
          <AvatarPlaceholder
            name={actor.name}
            photo={actor.photo}
            variant="photo"
            stripe={6}
            label="헤드샷"
            className="aspect-video w-full border border-border text-[44px]"
          />
        </div>

        {/* 태그 */}
        {actor.tags.length > 0 ? (
          <div className="mt-[18px] flex flex-wrap gap-2">
            {actor.tags.map((tag) => (
              <Chip key={tag} variant="outline" className="px-3 py-[5px]">
                {tag}
              </Chip>
            ))}
          </div>
        ) : null}

        {/* 지원 정보 + 자기소개 */}
        <div className="mt-4 border border-border px-5 py-[18px]">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Info label="지원 경로" value={SOURCE_LABEL[application.source]} />
            <Info
              label="지원일"
              value={formatRelativeDays(application.createdAt)}
            />
            <Info label="연락처" value={actor.phone} />
            <Info label="첨부" value={attachmentLabel} />
          </div>
          {application.intro ? (
            <p className="m-0 mt-4 border-t border-hairline pt-3.5 text-[13px] leading-relaxed text-secondary-foreground">
              {application.intro}
            </p>
          ) : null}
        </div>

        {/* 트리아지 — 같은 값을 다시 누르면 미분류로 해제 */}
        <ActionTriad
          className="mt-[18px]"
          options={TRIAGE_OPTIONS}
          value={triage}
          onSelect={(v) => onTriageChange(triage === v ? null : v)}
        />

        {/* 메모 — 목업엔 없지만 리스트 행 한 줄 메모의 원천이라 유지 */}
        <div className="mt-5">
          <CaptionLabel size="sm" className="mb-2 tracking-[.06em]">
            메모
          </CaptionLabel>
          <Textarea
            id="applicant-note"
            key={application.id}
            defaultValue={application.note ?? ""}
            placeholder="지원자에 대한 메모 (데모 — 저장되지 않습니다)"
          />
        </div>
      </div>
    </div>
  );
}
