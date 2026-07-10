"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { CaptionLabel } from "@/components/shared/caption-label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// 첨부된 상태 데모용 정적 칩 (셸 — 실제 업로드 없음)
const DEMO_FILES = ["프로필_김하윤.pdf", "상반신_2026.jpg"] as const;

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <CaptionLabel size="sm" className="mb-[7px] tracking-[.06em]">
        {label}
        {optional ? (
          <span className="ml-1 normal-case tracking-normal text-icon-mute">
            (선택)
          </span>
        ) : null}
      </CaptionLabel>
      {children}
    </div>
  );
}

export function ApplyForm({ roleId }: { roleId: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [consentRequired, setConsentRequired] = useState(false);
  const [consentPool, setConsentPool] = useState(false);

  const canSubmit = name.trim().length > 0 && consentRequired;

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 px-6 py-5">
        <Field label="이름">
          <Input
            id="apply-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="생년">
            <Input
              id="apply-birth"
              inputMode="numeric"
              maxLength={4}
              placeholder="1988"
            />
          </Field>
          <Field label="키(cm)">
            <Input id="apply-height" inputMode="numeric" placeholder="180" />
          </Field>
        </div>

        <Field label="연락처">
          <Input id="apply-phone" type="tel" placeholder="010-0000-0000" />
        </Field>

        <Field label="소속사" optional>
          <Input id="apply-agency" placeholder="무소속이면 비워 두세요" />
        </Field>

        <Field label="프로필 · 연기 영상">
          <button
            type="button"
            className="w-full cursor-pointer rounded border border-dashed border-input px-4 py-[18px] text-center transition-colors hover:border-primary"
          >
            <span className="block text-xl leading-none text-icon-mute">＋</span>
            <span className="mt-1 block text-[11.5px] text-muted-foreground">
              파일 첨부 또는 유튜브·드라이브 링크
            </span>
          </button>
          <div className="mt-2 flex flex-col">
            {DEMO_FILES.map((file) => (
              <div
                key={file}
                className="flex items-center justify-between border-b border-hairline py-2 text-[12.5px] text-secondary-foreground"
              >
                <span className="min-w-0 truncate font-mono text-[11.5px]">
                  {file}
                </span>
                <span className="shrink-0 cursor-pointer text-faint">✕</span>
              </div>
            ))}
          </div>
        </Field>

        <Field label="자기소개" optional>
          <Textarea
            id="apply-intro"
            rows={4}
            className="min-h-24"
            placeholder="사투리·특기 등 자유롭게"
          />
        </Field>

        <div className="mt-1 flex flex-col gap-3">
          <div className="flex items-start gap-2.5">
            <Checkbox
              id="consent-required"
              checked={consentRequired}
              onCheckedChange={(v) => setConsentRequired(v === true)}
              className="mt-0.5"
            />
            <Label
              htmlFor="consent-required"
              className="text-[11px] font-normal leading-relaxed text-muted-foreground"
            >
              <span>
                <span className="font-semibold text-foreground">(필수)</span>{" "}
                개인정보 수집·이용에 동의합니다. 제출한 정보는 본 배역의 캐스팅
                검토 목적으로 사용되며, 배역 종료 후 보관 기간 정책에 따라
                파기됩니다.
              </span>
            </Label>
          </div>
          <div className="flex items-start gap-2.5">
            <Checkbox
              id="consent-pool"
              checked={consentPool}
              onCheckedChange={(v) => setConsentPool(v === true)}
              className="mt-0.5"
            />
            <Label
              htmlFor="consent-pool"
              className="text-[11px] font-normal leading-relaxed text-muted-foreground"
            >
              <span>
                (선택) 인재풀 등록에 동의합니다 (보유 3년, 미동의 시에도 지원
                가능)
              </span>
            </Label>
          </div>
          <a
            href="#"
            className="inline-block text-[11px] text-muted-foreground underline underline-offset-2"
          >
            개인정보 처리방침
          </a>
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-hairline bg-card p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => router.push(`/apply/${roleId}/done`)}
          className="w-full cursor-pointer rounded-lg bg-primary py-[15px] text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-default disabled:bg-muted disabled:text-muted-foreground"
        >
          지원서 제출
        </button>
      </div>
    </>
  );
}
