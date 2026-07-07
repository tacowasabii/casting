import Link from "next/link";

import { DdayBadge } from "@/components/shared/dday-badge";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RoleWithStats } from "@/lib/data";

function conditionLine(role: RoleWithStats): string {
  const parts: string[] = [
    role.gender === "무관" ? "성별 무관" : role.gender,
    `${role.ageMin}~${role.ageMax}세`,
  ];
  if (role.heightMin && role.heightMax) {
    parts.push(`${role.heightMin}~${role.heightMax}cm`);
  } else if (role.heightMin) {
    parts.push(`${role.heightMin}cm 이상`);
  } else if (role.heightMax) {
    parts.push(`${role.heightMax}cm 이하`);
  }
  return parts.join(" · ");
}

export function RoleCard({ role }: { role: RoleWithStats }) {
  return (
    <Link href={`/roles/${role.id}`} className="block">
      <Card size="sm" className="gap-2 transition-shadow hover:ring-foreground/25">
        <CardHeader className="gap-0.5">
          <CardTitle>{role.name}</CardTitle>
          <CardDescription className="text-xs">
            {conditionLine(role)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <DdayBadge deadline={role.deadline} />
            <span className="text-xs text-muted-foreground">
              지원 {role.totalApplications}명
            </span>
            {role.newApplications > 0 ? (
              <Badge>신규 {role.newApplications}</Badge>
            ) : null}
          </div>
          {role.awaitingDirector ? (
            <div className="flex items-center gap-1.5 text-xs font-medium text-violet-600">
              <span className="size-1.5 animate-pulse rounded-full bg-violet-500" />
              감독 응답 대기
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
}
