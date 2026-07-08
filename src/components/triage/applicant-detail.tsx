"use client";

import { MousePointerClickIcon } from "lucide-react";

import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ApplicationWithActor } from "@/lib/data";
import type { ApplicationSource, Triage } from "@/lib/types";
import { ageOf } from "@/lib/types";

const SOURCE_LABEL: Record<ApplicationSource, string> = {
  form: "폼",
  email: "이메일",
  manual: "수동",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 font-medium">{value}</dd>
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
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MousePointerClickIcon />
            </EmptyMedia>
            <EmptyTitle>좌측에서 지원자를 선택하세요</EmptyTitle>
            <EmptyDescription>
              선택하면 프로필·영상·지원 정보를 확인할 수 있습니다.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  const { actor } = application;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div
        key={application.id}
        className="mx-auto max-w-2xl space-y-5 px-6 py-5 animate-in fade-in duration-200"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">{actor.name}</h2>
            <p className="text-sm text-muted-foreground">
              {ageOf(actor.birthYear)}세 · {actor.height}cm
              {actor.agency ? ` · ${actor.agency}` : ""}
            </p>
          </div>
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            value={triage ?? ""}
            onValueChange={(v) =>
              onTriageChange(v === "" ? null : (v as Triage))
            }
          >
            <ToggleGroupItem
              value="관심"
              className="data-[state=on]:border-red-cta/40 data-[state=on]:bg-red-cta/15 data-[state=on]:text-primary"
            >
              관심
            </ToggleGroupItem>
            <ToggleGroupItem
              value="보류"
              className="data-[state=on]:border-amber-500/30 data-[state=on]:bg-amber-500/15 data-[state=on]:text-amber-400"
            >
              보류
            </ToggleGroupItem>
            <ToggleGroupItem
              value="제외"
              className="data-[state=on]:border-border-strong data-[state=on]:bg-accent data-[state=on]:text-foreground"
            >
              제외
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <AvatarPlaceholder
          name={actor.name}
          photo={actor.photo}
          variant="card"
          className="h-64 w-full rounded-lg"
        />

        {application.videoUrl ? (
          <MediaPlaceholder
            kind="video"
            label="연기 영상"
            duration={application.videoDuration}
          />
        ) : null}

        {application.files.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {application.files.map((file) => (
              <MediaPlaceholder key={file} kind="pdf" label={file} />
            ))}
          </div>
        ) : null}

        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-lg border p-4 text-sm sm:grid-cols-3">
          <Info
            label="나이"
            value={`${ageOf(actor.birthYear)}세 (${actor.birthYear}년생)`}
          />
          <Info label="키" value={`${actor.height}cm`} />
          <Info label="연락처" value={actor.phone} />
          <Info label="소속사" value={actor.agency ?? "없음"} />
          <Info label="지원 경로" value={SOURCE_LABEL[application.source]} />
          <Info label="지원일" value={formatDate(application.createdAt)} />
        </dl>

        {actor.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {actor.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}

        {application.intro ? (
          <div>
            <h3 className="mb-1.5 text-sm font-medium">자기소개</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {application.intro}
            </p>
          </div>
        ) : null}

        <div className="grid gap-2">
          <Label htmlFor="applicant-note">메모</Label>
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
