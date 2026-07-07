"use client";

import { InboxIcon } from "lucide-react";

import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ApplicationWithActor } from "@/lib/data";
import type { Triage } from "@/lib/types";
import { ageOf } from "@/lib/types";
import { cn } from "@/lib/utils";

function TriageDot({ triage }: { triage: Triage }) {
  return (
    <span
      title={triage ?? "미분류"}
      className={cn(
        "size-2 shrink-0 rounded-full",
        triage === "관심" && "bg-emerald-500",
        triage === "보류" && "bg-amber-500",
        triage === "제외" && "bg-neutral-400",
        triage === null && "border border-muted-foreground/40",
      )}
    />
  );
}

export function ApplicantList({
  applications,
  totalCount,
  triageMap,
  selectedId,
  onSelect,
  checkedIds,
  onCheckedChange,
}: {
  applications: ApplicationWithActor[];
  totalCount: number;
  triageMap: Record<string, Triage>;
  selectedId: string | null;
  onSelect: (id: string) => void;
  checkedIds: Set<string>;
  onCheckedChange: (id: string, checked: boolean) => void;
}) {
  if (totalCount === 0) {
    return (
      <div className="flex w-80 shrink-0 flex-col border-r">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <InboxIcon />
            </EmptyMedia>
            <EmptyTitle>아직 지원자가 없습니다</EmptyTitle>
            <EmptyDescription>
              상단의 지원 폼 링크를 공유하면 지원자가 이곳에 쌓입니다.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className="flex w-80 min-h-0 shrink-0 flex-col border-r">
      <ScrollArea className="min-h-0 flex-1">
        {applications.length === 0 ? (
          <p className="px-4 py-10 text-center text-xs text-muted-foreground">
            조건에 맞는 지원자가 없습니다
          </p>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              onClick={() => onSelect(app.id)}
              className={cn(
                "flex cursor-pointer items-center gap-3 border-b px-3 py-2.5 transition-colors",
                selectedId === app.id ? "bg-accent" : "hover:bg-muted/50",
              )}
            >
              <span
                className="flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={checkedIds.has(app.id)}
                  onCheckedChange={(v) => onCheckedChange(app.id, v === true)}
                  aria-label={`${app.actor.name} 선택`}
                />
              </span>
              <AvatarPlaceholder
                name={app.actor.name}
                photo={app.actor.photo}
                className="size-9 text-xs"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {app.actor.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {ageOf(app.actor.birthYear)}세 · {app.actor.height}cm
                </p>
              </div>
              <TriageDot triage={triageMap[app.id] ?? null} />
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  );
}
