import { UserCheckIcon } from "lucide-react";

import { CopyTextButton } from "@/components/audition/copy-text-button";
import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Textarea } from "@/components/ui/textarea";
import { getApplicationsByRole, getRoleById } from "@/lib/data";
import { ageOf } from "@/lib/types";

/** 셸 데모용 정적 참석 상태 패턴: 첫 번째 참석 / 두 번째 미정 / 나머지 미발송 */
function AttendanceBadge({ index }: { index: number }) {
  if (index === 0) {
    return (
      <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
        참석
      </Badge>
    );
  }
  if (index === 1) {
    return (
      <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
        미정
      </Badge>
    );
  }
  return <Badge variant="outline">미발송</Badge>;
}

export default async function AuditionPage({
  params,
}: {
  params: Promise<{ roleId: string }>;
}) {
  const { roleId } = await params;
  const [{ role, project }, applications] = await Promise.all([
    getRoleById(roleId),
    getApplicationsByRole(roleId),
  ]);

  const confirmed = applications.filter((a) => a.triage === "관심");

  const message = [
    `[캐스트보드] ${project.title} '${role.name}' 오디션 안내`,
    `일시: 7월 15일(수) 14:00 (촬영 예정: ${role.shootDate ?? "미정"})`,
    "장소: 서울 마포구 OO스튜디오 3층",
    "참석 가능 여부를 회신 부탁드립니다.",
  ].join("\n");

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <Card>
          <CardHeader>
            <CardTitle>확정 후보</CardTitle>
            <CardDescription>
              &lsquo;관심&rsquo;으로 분류된 지원자 {confirmed.length}명
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            {confirmed.length === 0 ? (
              <Empty className="py-12">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <UserCheckIcon />
                  </EmptyMedia>
                  <EmptyTitle>확정 후보가 없습니다</EmptyTitle>
                  <EmptyDescription>
                    선별 보드에서 지원자를 &lsquo;관심&rsquo;으로 분류하면
                    여기에 표시됩니다.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <ul className="divide-y">
                {confirmed.map((app, index) => (
                  <li
                    key={app.id}
                    className="flex items-center gap-3 px-4 py-2.5"
                  >
                    <AvatarPlaceholder
                      name={app.actor.name}
                      photo={app.actor.photo}
                      className="size-9"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {app.actor.name}
                        <span className="ml-2 font-normal text-muted-foreground">
                          {ageOf(app.actor.birthYear)}세 · {app.actor.height}cm
                        </span>
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {app.actor.phone}
                        {app.actor.email ? ` · ${app.actor.email}` : ""}
                      </p>
                    </div>
                    <AttendanceBadge index={index} />
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>안내 문자</CardTitle>
            <CardDescription>
              자동 생성된 문구를 수정해 사용할 수 있습니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea defaultValue={message} className="min-h-40" />
            <CopyTextButton text={message} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
