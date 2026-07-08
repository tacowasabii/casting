import { ExternalLinkIcon } from "lucide-react";

import { DdayBadge } from "@/components/shared/dday-badge";
import { CopyLinkButton } from "@/components/roles/copy-link-button";
import {
  RemindButton,
  ResultsTable,
} from "@/components/shortlist/results-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getShortlistDetail } from "@/lib/data";

export default async function ShortlistResultPage({
  params,
}: {
  params: Promise<{ roleId: string; shortlistId: string }>;
}) {
  const { shortlistId } = await params;
  const { shortlist, items } = await getShortlistDetail(shortlistId);

  const counts = { like: 0, hold: 0, pass: 0, none: 0 };
  for (const { review } of items) {
    if (!review) counts.none += 1;
    else counts[review.verdict] += 1;
  }
  const responded = items.length - counts.none;
  const percent =
    items.length === 0 ? 0 : Math.round((responded / items.length) * 100);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="space-y-5 px-6 py-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-base font-semibold">{shortlist.title}</h2>
          <DdayBadge deadline={shortlist.deadline} />
          {shortlist.allowComment ? (
            <Badge variant="secondary">코멘트 허용</Badge>
          ) : null}
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <CopyLinkButton
              path={`/review/${shortlist.token}`}
              label="감독 링크 복사"
            />
            <Button asChild variant="outline" size="sm">
              <a
                href={`/review/${shortlist.token}`}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLinkIcon data-icon="inline-start" />
                감독 화면 미리보기
              </a>
            </Button>
            <RemindButton />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="gap-1.5 border-red-cta/40 bg-red-cta/15 text-primary"
          >
            <span className="size-1.5 rounded-full bg-red-cta" />
            좋아요 {counts.like}
          </Badge>
          <Badge
            variant="outline"
            className="gap-1.5 border-amber-500/30 bg-amber-500/15 text-amber-400"
          >
            <span className="size-1.5 rounded-full bg-amber-400" />
            보류 {counts.hold}
          </Badge>
          <Badge
            variant="outline"
            className="gap-1.5 border-border bg-chip/60 text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-neutral-500" />
            제외 {counts.pass}
          </Badge>
          <Badge variant="outline" className="gap-1.5">
            <span className="size-1.5 rounded-full border border-muted-foreground/40" />
            미응답 {counts.none}
          </Badge>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">응답률</span>
            <span className="font-medium">
              {responded}/{items.length} ({percent}%)
            </span>
          </div>
          <Progress value={percent} />
        </div>

        <ResultsTable items={items} />
      </div>
    </div>
  );
}
