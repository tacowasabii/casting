"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface NoteEditorProps {
  defaultValue?: string;
  placeholder?: string;
}

export function NoteEditor({ defaultValue, placeholder }: NoteEditorProps) {
  return (
    <div className="space-y-3">
      <Textarea
        defaultValue={defaultValue}
        placeholder={placeholder ?? "배우에 대한 메모를 남겨보세요"}
        className="min-h-32"
      />
      <div className="flex justify-end">
        <Button onClick={() => toast("메모가 저장되었습니다 (데모)")}>
          저장
        </Button>
      </div>
    </div>
  );
}
