import Link from "next/link";

import { AddToShortlistButton } from "@/components/actors/add-to-shortlist-button";
import { NoteEditor } from "@/components/actors/note-editor";
import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
import { BreadcrumbBar } from "@/components/shared/breadcrumb-bar";
import { CaptionLabel } from "@/components/shared/caption-label";
import { Chip } from "@/components/shared/chip";
import { EmptyBlock } from "@/components/shared/empty-block";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { SectionHeader } from "@/components/shared/section-header";
import { TriageChip } from "@/components/shared/triage-chip";
import { getActorById, getApplicationsByActor } from "@/lib/data";
import { formatRelativeDays } from "@/lib/format";
import { ageOf, type ApplicationSource } from "@/lib/types";

const SOURCE_LABELS: Record<ApplicationSource, string> = {
  form: "지원 폼 접수",
  email: "이메일 접수",
  manual: "직접 등록",
};

function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <CaptionLabel size="sm" className="text-[10.5px] tracking-[.06em]">
        {label}
      </CaptionLabel>
      <span className="truncate text-[13px] text-foreground">{value}</span>
    </div>
  );
}

export default async function ActorProfilePage({
  params,
}: {
  params: Promise<{ actorId: string }>;
}) {
  const { actorId } = await params;
  const [actor, applications] = await Promise.all([
    getActorById(actorId),
    getApplicationsByActor(actorId),
  ]);

  const videos = applications.filter((a) => a.videoUrl !== null);
  const pdfs = applications.flatMap((a) => a.files);
  const projectCount = new Set(applications.map((a) => a.project.id)).size;
  const firstAppliedAt =
    applications.length > 0
      ? applications[applications.length - 1].createdAt
      : null;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-card">
      <BreadcrumbBar
        parentHref="/actors"
        parentLabel="배우 라이브러리"
        current={actor.name}
      />

      <div className="grid grid-cols-1 gap-[34px] p-[30px] lg:grid-cols-[300px_1fr]">
        {/* 좌측 — 프로필 요약 */}
        <div>
          <AvatarPlaceholder
            name={actor.name}
            photo={actor.photo}
            variant="photo"
            stripe={7}
            className="aspect-[3/4] w-full border border-border text-[64px]"
          />
          <h2 className="m-0 mt-5 text-[26px] font-extrabold tracking-[-.02em] text-foreground">
            {actor.name}
          </h2>
          <div className="mt-1.5 text-[13px] text-muted-foreground">
            {ageOf(actor.birthYear)}세 · {actor.height}cm ·{" "}
            {actor.agency ?? "소속사 없음"}
          </div>
          {actor.tags.length > 0 ? (
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {actor.tags.map((tag) => (
                <Chip key={tag} variant="outline" className="px-[11px] py-[5px]">
                  {tag}
                </Chip>
              ))}
            </div>
          ) : null}
          <div className="mt-[22px] flex flex-col gap-3.5 border-t border-hairline pt-[18px]">
            <KeyValue label="생년" value={String(actor.birthYear)} />
            <KeyValue label="연락처" value={actor.phone} />
            {actor.email ? <KeyValue label="이메일" value={actor.email} /> : null}
            {firstAppliedAt ? (
              <KeyValue
                label="최초 지원"
                value={formatRelativeDays(firstAppliedAt)}
              />
            ) : null}
          </div>
          <div className="mt-[22px]">
            <AddToShortlistButton actorName={actor.name} />
          </div>
        </div>

        {/* 우측 — 지원 이력 · 누적 자료 · 디렉터 메모 */}
        <div className="min-w-0">
          <SectionHeader
            title="지원 이력"
            meta={`${applications.length}건 · ${projectCount}작품`}
          />
          {applications.length === 0 ? (
            <EmptyBlock
              className="mt-4"
              title="No History"
              description="아직 이 배우의 지원 기록이 없습니다."
            />
          ) : (
            <div className="flex flex-col">
              {applications.map((app) => (
                <Link
                  key={app.id}
                  href={`/roles/${app.roleId}`}
                  className="flex items-center gap-4 border-b border-hairline px-0.5 py-4 transition-colors hover:bg-panel"
                >
                  <div className="w-16 shrink-0 font-mono text-[11px] text-[#b0b0b0]">
                    {formatRelativeDays(app.createdAt)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14.5px] font-bold text-foreground">
                      {app.role.name}{" "}
                      <span className="text-xs font-normal text-[#9a9a9a]">
                        · {app.project.title}
                      </span>
                    </div>
                    <div className="mt-1 truncate text-xs text-muted-foreground">
                      {app.note
                        ? `“${app.note}”`
                        : app.intro
                          ? `“${app.intro}”`
                          : SOURCE_LABELS[app.source]}
                    </div>
                  </div>
                  <TriageChip triage={app.triage} className="shrink-0" />
                </Link>
              ))}
            </div>
          )}

          <SectionHeader
            className="mt-[30px]"
            title="누적 자료"
            meta={`영상 ${videos.length} · 파일 ${pdfs.length}`}
          />
          {videos.length === 0 && pdfs.length === 0 ? (
            <EmptyBlock
              className="mt-4"
              title="No Files"
              description="지원 시 첨부된 파일과 영상이 여기에 모입니다."
            />
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {videos.map((app) => (
                <MediaPlaceholder
                  key={app.id}
                  kind="video"
                  duration={app.videoDuration}
                  playSize="sm"
                  className="aspect-[16/10]"
                />
              ))}
              {pdfs.map((file, i) => (
                <MediaPlaceholder key={`${file}-${i}`} kind="pdf" label={file} />
              ))}
            </div>
          )}

          <div className="mt-6 rounded border border-border bg-panel px-[18px] py-4">
            <CaptionLabel size="sm" className="mb-2.5">
              디렉터 메모
            </CaptionLabel>
            <NoteEditor defaultValue={actor.note} />
          </div>
        </div>
      </div>
    </div>
  );
}
