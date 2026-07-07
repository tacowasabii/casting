"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, ImageIcon, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// 첨부된 상태 데모용 정적 칩 (셸 — 실제 업로드 없음)
const DEMO_FILES = [
  { name: "프로필_김하윤.pdf", icon: FileText },
  { name: "상반신_2026.jpg", icon: ImageIcon },
] as const;

export function ApplyForm({ roleId }: { roleId: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [consentRequired, setConsentRequired] = useState(false);
  const [consentPool, setConsentPool] = useState(false);

  const canSubmit = name.trim().length > 0 && consentRequired;

  return (
    <>
      <div className="flex-1 space-y-5 px-5 py-6">
        <div className="space-y-2">
          <Label htmlFor="apply-name">
            이름 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="apply-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="apply-birth">생년</Label>
            <Input
              id="apply-birth"
              inputMode="numeric"
              maxLength={4}
              placeholder="2006"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apply-height">키 (cm)</Label>
            <Input id="apply-height" inputMode="numeric" placeholder="165" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="apply-phone">연락처</Label>
          <Input id="apply-phone" type="tel" placeholder="010-0000-0000" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apply-agency">소속사 (선택)</Label>
          <Input id="apply-agency" placeholder="무소속이면 비워 두세요" />
        </div>

        <div className="space-y-2">
          <Label>프로필 파일</Label>
          <button
            type="button"
            className="w-full rounded-lg border border-dashed border-input py-4 text-sm text-muted-foreground transition-colors hover:bg-muted/50"
          >
            + 파일 선택 (PDF/이미지, 최대 3개)
          </button>
          <div className="space-y-1.5">
            {DEMO_FILES.map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2"
              >
                <file.icon className="size-4 shrink-0 text-muted-foreground" />
                <span className="min-w-0 flex-1 truncate text-sm">
                  {file.name}
                </span>
                <X className="size-3.5 shrink-0 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="apply-video">연기 영상</Label>
          <Input
            id="apply-video"
            type="url"
            placeholder="https://youtu.be/..."
          />
          <p className="text-xs text-muted-foreground">
            유튜브 또는 드라이브 링크를 붙여넣어 주세요
          </p>
          <Button type="button" variant="ghost" size="sm">
            <Upload data-icon="inline-start" />
            파일로 업로드
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="apply-intro">자기소개 (선택)</Label>
          <Textarea
            id="apply-intro"
            rows={4}
            className="min-h-24"
            placeholder="배역과 관련된 경험이나 강점을 알려 주세요"
          />
        </div>

        <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
          <div className="flex items-start gap-2.5">
            <Checkbox
              id="consent-required"
              checked={consentRequired}
              onCheckedChange={(v) => setConsentRequired(v === true)}
              className="mt-0.5"
            />
            <Label
              htmlFor="consent-required"
              className="text-xs leading-relaxed font-normal text-muted-foreground"
            >
              <span>
                <span className="font-medium text-foreground">(필수)</span>{" "}
                제출한 정보는 본 배역의 캐스팅 검토 목적으로 사용되며, 해당
                작품 제작진에게 공유될 수 있고 배역 종료 시 파기됩니다.
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
              className="text-xs leading-relaxed font-normal text-muted-foreground"
            >
              <span>
                (선택) 인재풀 등록에 동의합니다 (보유 3년, 미동의 시에도 지원
                가능)
              </span>
            </Label>
          </div>
          <a
            href="#"
            className="inline-block text-xs text-muted-foreground underline underline-offset-2"
          >
            개인정보 처리방침
          </a>
        </div>
      </div>

      <div className="sticky bottom-0 border-t bg-background p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <Button
          className="h-12 w-full text-base"
          disabled={!canSubmit}
          onClick={() => router.push(`/apply/${roleId}/done`)}
        >
          지원하기
        </Button>
      </div>
    </>
  );
}
