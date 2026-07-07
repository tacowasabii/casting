"use client";

import { BellRingIcon } from "lucide-react";
import { toast } from "sonner";

import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ShortlistDetailItem } from "@/lib/data";
import type { Verdict } from "@/lib/types";
import { ageOf } from "@/lib/types";
import { cn } from "@/lib/utils";

const VERDICT_META: Record<Verdict, { label: string; className: string }> = {
  like: {
    label: "좋아요",
    className: "border-emerald-200 bg-emerald-100 text-emerald-800",
  },
  hold: {
    label: "보류",
    className: "border-amber-200 bg-amber-100 text-amber-800",
  },
  pass: {
    label: "제외",
    className: "border-neutral-200 bg-neutral-100 text-neutral-600",
  },
};

function formatWatch(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}분 ${s}초` : `${s}초`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function RemindButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => toast("리마인드를 보냈습니다 (데모)")}
    >
      <BellRingIcon data-icon="inline-start" />
      리마인드 재전송
    </Button>
  );
}

export function ResultsTable({ items }: { items: ShortlistDetailItem[] }) {
  return (
    <div className="overflow-hidden rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 pl-4">순번</TableHead>
            <TableHead>후보</TableHead>
            <TableHead>감독 판정</TableHead>
            <TableHead>코멘트</TableHead>
            <TableHead>시청 시간</TableHead>
            <TableHead className="pr-4">응답일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(({ item, actor, review }) => (
            <TableRow
              key={item.id}
              className={cn(!review && "bg-muted/30 text-muted-foreground")}
            >
              <TableCell className="pl-4 text-muted-foreground">
                {item.order}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <AvatarPlaceholder
                    name={actor.name}
                    photo={actor.photo}
                    className="size-8 text-xs"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {actor.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {ageOf(actor.birthYear)}세 · {actor.height}cm
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {review ? (
                  <Badge
                    variant="outline"
                    className={VERDICT_META[review.verdict].className}
                  >
                    {VERDICT_META[review.verdict].label}
                  </Badge>
                ) : (
                  <Badge variant="outline">미응답</Badge>
                )}
              </TableCell>
              <TableCell className="max-w-[280px] whitespace-normal text-muted-foreground">
                {review?.comment ?? "—"}
              </TableCell>
              <TableCell>
                {review ? formatWatch(review.watchSeconds) : "—"}
              </TableCell>
              <TableCell className="pr-4 text-muted-foreground">
                {review ? formatDate(review.reviewedAt) : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
