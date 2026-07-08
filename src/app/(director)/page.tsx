import { Bell } from "lucide-react";

import { NewProjectDialog } from "@/components/dashboard/new-project-dialog";
import { NewRoleDialog } from "@/components/dashboard/new-role-dialog";
import { RoleCard } from "@/components/dashboard/role-card";
import { CaptionLabel } from "@/components/shared/caption-label";
import { EmptyBlock } from "@/components/shared/empty-block";
import { SearchField } from "@/components/shared/search-field";
import { SectionHeader } from "@/components/shared/section-header";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getDashboardMetrics, getProjectsWithRoles } from "@/lib/data";

export default async function DashboardPage() {
  const [metrics, projects] = await Promise.all([
    getDashboardMetrics(),
    getProjectsWithRoles(),
  ]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      {/* 톱바 — 검색은 장식(셸), 알림 벨 + 잉크 점 */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-sidebar px-10 py-[15px]">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger className="md:hidden" />
          <SearchField
            placeholder="작품 · 배역 · 배우 검색"
            className="w-[340px] max-w-full"
          />
        </div>
        <div className="relative shrink-0 text-muted-foreground">
          <Bell className="size-[17px]" strokeWidth={1.4} />
          <span className="absolute -right-px -top-px size-[5px] rounded-full bg-primary" />
        </div>
      </div>

      {/* 페이지 헤더 + 메트릭 */}
      <div className="px-10 pb-4 pt-[26px]">
        <div className="flex items-end justify-between gap-4">
          <div>
            <CaptionLabel className="tracking-[.18em]">Overview</CaptionLabel>
            <h2 className="title-page m-0 mt-[7px] text-foreground">
              진행 현황
            </h2>
          </div>
          <NewRoleDialog />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          <MetricCard
            label="활성 배역"
            value={metrics.activeRoles}
            sub="개 진행 중"
          />
          <MetricCard
            label="신규 지원"
            value={metrics.newApplications}
            sub="건 미분류"
          />
          <MetricCard
            label="감독 응답 대기"
            value={metrics.awaitingDirector}
            sub="건 리마인드 필요"
            inverted
          />
        </div>
      </div>

      {/* 작품별 섹션 */}
      <div className="px-10 pb-[38px]">
        {projects.map(({ project, roles }) => (
          <section key={project.id} className="mt-[26px]">
            <SectionHeader
              title={project.title}
              sub={`${project.type} · ${project.production} · ${project.shootPeriod}`}
              meta={`배역 ${roles.length}`}
            />
            {roles.length === 0 ? (
              <EmptyBlock
                className="mt-4"
                title="No Roles"
                description="아직 배역이 없습니다. 새 배역을 만들어 지원을 받아보세요."
              />
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-3">
                {roles.map((role) => (
                  <RoleCard key={role.id} role={role} />
                ))}
              </div>
            )}
          </section>
        ))}
        <div className="mt-7">
          <NewProjectDialog />
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
  inverted = false,
}: {
  label: string;
  value: number;
  sub: string;
  inverted?: boolean;
}) {
  return (
    <div
      className={
        inverted
          ? "rounded border border-primary bg-primary px-5 py-4"
          : "rounded border border-border bg-card px-5 py-4"
      }
    >
      <CaptionLabel
        className={inverted ? "text-muted-foreground" : undefined}
      >
        {label}
      </CaptionLabel>
      <div className="mt-[9px] flex items-baseline gap-2">
        <span
          className={`num-display text-3xl ${inverted ? "text-primary-foreground" : "text-foreground"}`}
        >
          {value}
        </span>
        <span className="text-[13px] text-[#9a9a9a]">{sub}</span>
      </div>
    </div>
  );
}
