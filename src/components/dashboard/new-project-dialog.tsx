"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const PROJECT_TYPES = ["영화", "드라마", "웹드라마", "기타"] as const;

export function NewProjectDialog() {
  const [open, setOpen] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast("작품이 생성되었습니다 (데모)");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon data-icon="inline-start" />새 작품
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 작품</DialogTitle>
          <DialogDescription>
            작품을 만들고 그 아래에 배역을 추가하세요.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="project-title">작품명</Label>
            <Input id="project-title" placeholder="예: 검은 파도" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project-type">유형</Label>
            <Select defaultValue="드라마">
              <SelectTrigger id="project-type" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project-production">제작사</Label>
            <Input id="project-production" placeholder="예: 문라이트픽처스" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project-period">촬영 기간</Label>
            <Input id="project-period" placeholder="예: 2026.08 ~ 2026.12" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project-note">메모</Label>
            <Textarea
              id="project-note"
              placeholder="로케이션, 편성 등 참고 사항"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                취소
              </Button>
            </DialogClose>
            <Button type="submit">만들기</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
