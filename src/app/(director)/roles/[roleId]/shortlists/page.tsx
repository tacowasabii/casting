import Link from "next/link";
import { HeartIcon, ListChecksIcon } from "lucide-react";

import { DdayBadge } from "@/components/shared/dday-badge";
import { CopyLinkButton } from "@/components/roles/copy-link-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getShortlistsByRole } from "@/lib/data";

export default async function ShortlistsPage({
  params,
}: {
  params: Promise<{ roleId: string }>;
}) {
  const { roleId } = await params;
  const shortlists = await getShortlistsByRole(roleId);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
      {shortlists.length === 0 ? (
        <Empty className="h-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ListChecksIcon />
            </EmptyMedia>
            <EmptyTitle>아직 숏리스트가 없습니다</EmptyTitle>
            <EmptyDescription>
              선별 보드에서 후보를 선택해 만들어보세요.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild variant="outline" size="sm">
              <Link href={`/roles/${roleId}`}>선별 보드로 이동</Link>
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shortlists.map((sl) => (
            <Card key={sl.id} size="sm" className="gap-3">
              <CardHeader className="gap-1">
                <CardTitle>{sl.title}</CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-1.5">
                  <DdayBadge deadline={sl.deadline} />
                  <Badge variant={sl.allowComment ? "secondary" : "outline"}>
                    {sl.allowComment ? "코멘트 허용" : "코멘트 비허용"}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4 text-sm">
                <span>
                  응답{" "}
                  <span className="font-medium">
                    {sl.reviewedCount}/{sl.itemCount}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <HeartIcon className="size-3.5 text-primary" />
                  좋아요 {sl.likeCount}
                </span>
              </CardContent>
              <CardFooter className="gap-2">
                <CopyLinkButton path={`/review/${sl.token}`} label="링크 복사" />
                <Button asChild size="sm" className="ml-auto">
                  <Link href={`/roles/${roleId}/shortlists/${sl.id}`}>
                    결과 보기
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
