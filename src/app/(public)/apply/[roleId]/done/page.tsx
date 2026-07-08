import { CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getRoleById } from "@/lib/data";

export default async function ApplyDonePage({
  params,
}: {
  params: Promise<{ roleId: string }>;
}) {
  const { roleId } = await params;
  const { role, project } = await getRoleById(roleId);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-10 text-center">
      <CheckCircle2 className="size-16 text-emerald-400" strokeWidth={1.5} />
      <h1 className="text-xl font-semibold tracking-tight">
        지원이 접수되었습니다
      </h1>
      <Card className="w-full">
        <CardContent className="text-center">
          <p className="text-xs text-muted-foreground">{project.title}</p>
          <p className="mt-1 text-base font-medium">{role.name}</p>
        </CardContent>
      </Card>
      <p className="text-sm leading-relaxed text-muted-foreground">
        검토 결과는 개별 연락드리며,
        <br />
        오디션 확정 시 문자로 안내드립니다.
      </p>
    </div>
  );
}
