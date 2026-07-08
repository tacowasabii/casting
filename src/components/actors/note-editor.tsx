"use client";

import { toast } from "sonner";

import { Textarea } from "@/components/ui/textarea";

interface NoteEditorProps {
  defaultValue?: string;
  placeholder?: string;
}

/** 디렉터 메모 박스 내부의 플랫 에디터 — 저장은 데모 */
export function NoteEditor({ defaultValue, placeholder }: NoteEditorProps) {
  return (
    <div>
      <Textarea
        defaultValue={defaultValue}
        placeholder={placeholder ?? "배우에 대한 메모를 남겨보세요"}
        className="min-h-24 resize-none border-none bg-transparent p-0 text-[13px] leading-relaxed text-[#4a4a4a] shadow-none focus-visible:ring-0"
      />
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={() => toast("메모가 저장되었습니다 (데모)")}
          className="cursor-pointer text-[11.5px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          저장
        </button>
      </div>
    </div>
  );
}
