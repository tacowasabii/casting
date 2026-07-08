"use client";

import { useState } from "react";
import { CopyIcon, ExternalLinkIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

const DEMO_REVIEW_PATH = "/review/demo-hs2";

function defaultDeadline(): string {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().slice(0, 10);
}

export function CreateShortlistDialog({
  roleName,
  count,
}: {
  roleName: string;
  count: number;
}) {
  const [open, setOpen] = useState(false);
  const [created, setCreated] = useState(false);

  const link =
    typeof window === "undefined"
      ? DEMO_REVIEW_PATH
      : `${window.location.origin}${DEMO_REVIEW_PATH}`;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCreated(true);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setCreated(false);
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          disabled={count === 0}
          className="cursor-pointer whitespace-nowrap rounded bg-primary px-4 py-2.5 text-[12.5px] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-default disabled:opacity-40"
        >
          숏리스트 만들기
        </button>
      </DialogTrigger>
      <DialogContent>
        {created ? (
          <>
            <DialogHeader>
              <DialogTitle>숏리스트가 생성되었습니다</DialogTitle>
              <DialogDescription>
                아래 링크를 감독에게 공유하세요. 로그인 없이 열람할 수
                있습니다. (데모)
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <Input
                readOnly
                value={link}
                className="font-mono text-xs"
                aria-label="리뷰 링크"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="링크 복사"
                onClick={() => {
                  void navigator.clipboard.writeText(link);
                  toast("링크가 복사되었습니다");
                }}
              >
                <CopyIcon />
              </Button>
            </div>
            <DialogFooter>
              <Button asChild variant="outline">
                <a href={DEMO_REVIEW_PATH} target="_blank" rel="noreferrer">
                  <ExternalLinkIcon data-icon="inline-start" />
                  감독 화면 미리보기
                </a>
              </Button>
              <DialogClose asChild>
                <Button type="button">완료</Button>
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>숏리스트 만들기</DialogTitle>
              <DialogDescription>
                관심 분류 후보{" "}
                <span className="font-medium text-foreground">{count}명</span>
                을 감독 리뷰 링크로 공유합니다.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="shortlist-title">제목</Label>
                <Input
                  id="shortlist-title"
                  defaultValue={`${roleName} 1차 후보`}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="shortlist-deadline">마감일</Label>
                <Input
                  id="shortlist-deadline"
                  type="date"
                  defaultValue={defaultDeadline()}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="shortlist-comment" defaultChecked />
                <Label htmlFor="shortlist-comment" className="font-normal">
                  감독 코멘트 허용
                </Label>
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
