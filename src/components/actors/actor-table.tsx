"use client";

import { SearchIcon, UsersIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ActorWithSummary } from "@/lib/data";
import { ageOf, type Triage } from "@/lib/types";
import { cn } from "@/lib/utils";

function TriageBadge({ triage }: { triage: Triage }) {
  if (triage === null) {
    return <span className="text-muted-foreground">—</span>;
  }
  return (
    <Badge
      className={cn(
        triage === "관심" &&
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
        triage === "보류" &&
          "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
        triage === "제외" && "bg-muted text-muted-foreground",
      )}
    >
      {triage}
    </Badge>
  );
}

export function ActorTable({ actors }: { actors: ActorWithSummary[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(
    () => [...new Set(actors.flatMap((a) => a.tags))],
    [actors],
  );

  const filtered = actors.filter((actor) => {
    const nameMatch = actor.name.includes(query.trim());
    const tagMatch = selectedTags.every((tag) => actor.tags.includes(tag));
    return nameMatch && tagMatch;
  });

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="relative max-w-sm">
          <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="이름으로 검색"
            className="pl-8"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {allTags.map((tag) => {
            const active = selectedTags.includes(tag);
            return (
              <Badge
                key={tag}
                variant={active ? "default" : "outline"}
                className="cursor-pointer select-none"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Empty className="border py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UsersIcon />
            </EmptyMedia>
            <EmptyTitle>조건에 맞는 배우가 없습니다</EmptyTitle>
            <EmptyDescription>
              검색어나 태그 필터를 조정해 보세요.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">배우</TableHead>
                <TableHead>나이</TableHead>
                <TableHead>키</TableHead>
                <TableHead>소속사</TableHead>
                <TableHead>태그</TableHead>
                <TableHead>지원 이력</TableHead>
                <TableHead className="pr-4">최근 분류</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((actor) => (
                <TableRow
                  key={actor.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/actors/${actor.id}`)}
                >
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-2.5">
                      <AvatarPlaceholder
                        name={actor.name}
                        photo={actor.photo}
                        className="size-8"
                      />
                      <span className="font-medium">{actor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{ageOf(actor.birthYear)}세</TableCell>
                  <TableCell>{actor.height}cm</TableCell>
                  <TableCell>
                    {actor.agency ?? (
                      <span className="text-muted-foreground">무소속</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {actor.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{actor.applicationCount}회</TableCell>
                  <TableCell className="pr-4">
                    <TriageBadge triage={actor.lastTriage} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
