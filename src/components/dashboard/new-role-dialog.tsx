"use client";

import { useState } from "react";
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

export function NewRoleDialog() {
  const [open, setOpen] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast("배역이 생성되었습니다 (데모)");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="cursor-pointer whitespace-nowrap rounded bg-primary px-[17px] py-2.5 text-[12.5px] font-semibold tracking-[.02em] text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          ＋ 새 배역 만들기
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[min(85svh,44rem)] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>새 배역</DialogTitle>
          <DialogDescription>
            배역을 만들면 지원 폼 링크가 자동으로 발급됩니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="role-name">배역명</Label>
            <Input id="role-name" placeholder="예: 형사2역" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="role-headcount">모집 인원</Label>
              <Input
                id="role-headcount"
                type="number"
                min={1}
                defaultValue={1}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role-gender">성별</Label>
              <Select defaultValue="무관">
                <SelectTrigger id="role-gender" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="남">남</SelectItem>
                  <SelectItem value="여">여</SelectItem>
                  <SelectItem value="무관">무관</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role-age-min">나이 범위</Label>
            <div className="flex items-center gap-2">
              <Input
                id="role-age-min"
                type="number"
                placeholder="최소"
                aria-label="최소 나이"
              />
              <span className="text-muted-foreground">~</span>
              <Input
                type="number"
                placeholder="최대"
                aria-label="최대 나이"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role-height-min">
              키 범위
              <span className="font-normal text-muted-foreground">(선택)</span>
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="role-height-min"
                type="number"
                placeholder="최소 (cm)"
                aria-label="최소 키"
              />
              <span className="text-muted-foreground">~</span>
              <Input
                type="number"
                placeholder="최대 (cm)"
                aria-label="최대 키"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role-requirements">상세 조건</Label>
            <Textarea
              id="role-requirements"
              placeholder="사투리, 특기, 노출 여부 등 자유롭게 적어주세요"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="role-shoot-date">촬영 예정일</Label>
              <Input id="role-shoot-date" placeholder="예: 2026.09 중순" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role-deadline">지원 마감일</Label>
              <Input id="role-deadline" type="date" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role-fee">
              출연료
              <span className="font-normal text-muted-foreground">(선택)</span>
            </Label>
            <Input id="role-fee" placeholder="예: 회당 80 (협의)" />
            <p className="text-xs text-muted-foreground">
              내부 메모 — 공개 지원 폼에는 노출되지 않습니다.
            </p>
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
