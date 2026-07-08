import Link from "next/link";
import { Clock, Heart, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getShortlistDetail } from "@/lib/data";
import { MOCK_USER } from "@/lib/types";

function formatDeadline(iso: string): string {
  const d = new Date(iso);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

const GUIDE_ITEMS = [
  { icon: Heart, text: "후보별 좋아요/보류/제외를 선택해 주세요" },
  { icon: Clock, text: "약 3분 소요" },
  { icon: ShieldCheck, text: "배우 연락처는 표시되지 않습니다" },
] as const;

export default async function ReviewLandingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const { shortlist, role, project, items } = await getShortlistDetail(token);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-10">
        <p className="text-sm text-muted-foreground">
          {MOCK_USER.name} {MOCK_USER.role}님이 후보 검토를 요청했습니다
        </p>

        <Card className="w-full">
          <CardContent className="py-4 text-center">
            <p className="text-sm text-muted-foreground">
              〈{project.title}〉
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">
              {role.name}
            </p>
            <p className="mt-1.5 font-mono text-sm font-medium">
              후보 {items.length}명
            </p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              {formatDeadline(shortlist.deadline)}까지 검토 부탁드립니다
            </p>
          </CardContent>
        </Card>

        <ul className="w-full space-y-3">
          {GUIDE_ITEMS.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              <Icon className="size-4 shrink-0 text-foreground/60" />
              {text}
            </li>
          ))}
        </ul>
      </div>

      <div className="sticky bottom-0 border-t bg-background p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <Button asChild className="h-12 w-full text-base shadow-glow hover:shadow-glow-lg">
          <Link href={`/review/${token}/cards`}>검토 시작</Link>
        </Button>
      </div>
    </div>
  );
}
