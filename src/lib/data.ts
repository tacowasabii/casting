// 유일한 데이터 접근 지점. 화면은 이 모듈의 함수만 호출한다 (mock-data 직접 import 금지).
// 전부 async 시그니처 — 이후 Supabase로 교체할 때 호출부 무변경이 목표.
// 미존재 id/token은 첫 번째 목데이터로 폴백 (데모 중 URL 오타로 빈 화면 방지).

import {
  actors,
  applications,
  projects,
  reviews,
  roles,
  shortlistItems,
  shortlists,
} from "./mock-data";
import type {
  Actor,
  Application,
  Project,
  Review,
  Role,
  RoleStatus,
  Shortlist,
  ShortlistItem,
  Triage,
} from "./types";

export interface RoleWithStats extends Role {
  totalApplications: number;
  /** 미분류(triage null) 지원 수 — 대시보드 신규 뱃지 */
  newApplications: number;
  /** 감독 응답 대기 중인 숏리스트 존재 여부 */
  awaitingDirector: boolean;
}

export interface ApplicationWithActor extends Application {
  actor: Actor;
}

export interface ApplicationWithRole extends Application {
  role: Role;
  project: Project;
}

export interface ActorWithSummary extends Actor {
  applicationCount: number;
  lastAppliedAt: string | null;
  lastTriage: Triage;
  /** '관심' 분류를 받은 지원 수 — 라이브러리 "'관심' 이력" 필터 */
  interestCount: number;
}

export interface ShortlistWithStats extends Shortlist {
  itemCount: number;
  reviewedCount: number;
  likeCount: number;
}

export interface ShortlistDetailItem {
  item: ShortlistItem;
  application: Application;
  actor: Actor;
  review: Review | null;
}

export interface ShortlistDetail {
  shortlist: Shortlist;
  role: Role;
  project: Project;
  items: ShortlistDetailItem[];
}

function roleStats(role: Role): RoleWithStats {
  const apps = applications.filter((a) => a.roleId === role.id);
  const roleShortlists = shortlists.filter((s) => s.roleId === role.id);
  const awaitingDirector = roleShortlists.some((s) => {
    const items = shortlistItems.filter((i) => i.shortlistId === s.id);
    const reviewed = items.filter((i) =>
      reviews.some((r) => r.shortlistItemId === i.id),
    );
    return items.length > 0 && reviewed.length < items.length;
  });
  return {
    ...role,
    totalApplications: apps.length,
    newApplications: apps.filter((a) => a.triage === null).length,
    awaitingDirector,
  };
}

export async function getProjects(): Promise<Project[]> {
  return [...projects];
}

export async function getRolesByProject(
  projectId: string,
): Promise<RoleWithStats[]> {
  return roles.filter((r) => r.projectId === projectId).map(roleStats);
}

export async function getRoleById(
  roleId: string,
): Promise<{ role: RoleWithStats; project: Project }> {
  const role = roles.find((r) => r.id === roleId) ?? roles[0];
  const project = projects.find((p) => p.id === role.projectId) ?? projects[0];
  return { role: roleStats(role), project };
}

export async function getApplicationsByRole(
  roleId: string,
): Promise<ApplicationWithActor[]> {
  return applications
    .filter((a) => a.roleId === roleId)
    .map((a) => ({
      ...a,
      actor: actors.find((x) => x.id === a.actorId) ?? actors[0],
    }));
}

export async function getActors(): Promise<ActorWithSummary[]> {
  return actors.map((actor) => {
    const apps = applications
      .filter((a) => a.actorId === actor.id)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return {
      ...actor,
      applicationCount: apps.length,
      lastAppliedAt: apps[0]?.createdAt ?? null,
      lastTriage: apps[0]?.triage ?? null,
      interestCount: apps.filter((a) => a.triage === "관심").length,
    };
  });
}

export async function getActorById(actorId: string): Promise<Actor> {
  return actors.find((a) => a.id === actorId) ?? actors[0];
}

export async function getApplicationsByActor(
  actorId: string,
): Promise<ApplicationWithRole[]> {
  return applications
    .filter((a) => a.actorId === actorId)
    .map((a) => {
      const role = roles.find((r) => r.id === a.roleId) ?? roles[0];
      const project =
        projects.find((p) => p.id === role.projectId) ?? projects[0];
      return { ...a, role, project };
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getShortlistsByRole(
  roleId: string,
): Promise<ShortlistWithStats[]> {
  return shortlists
    .filter((s) => s.roleId === roleId)
    .map((s) => {
      const items = shortlistItems.filter((i) => i.shortlistId === s.id);
      const itemReviews = items
        .map((i) => reviews.find((r) => r.shortlistItemId === i.id))
        .filter((r): r is (typeof reviews)[number] => r !== undefined);
      return {
        ...s,
        itemCount: items.length,
        reviewedCount: itemReviews.length,
        likeCount: itemReviews.filter((r) => r.verdict === "like").length,
      };
    });
}

export interface ProjectWithRoles {
  project: Project;
  roles: RoleWithStats[];
}

/** 대시보드 작품 섹션 + 사이드바 "{작품} · 배역" 컨텍스트 공용 */
export async function getProjectsWithRoles(): Promise<ProjectWithRoles[]> {
  return projects.map((project) => ({
    project,
    roles: roles.filter((r) => r.projectId === project.id).map(roleStats),
  }));
}

export interface DashboardMetrics {
  /** 확정·종료가 아닌 배역 수 */
  activeRoles: number;
  /** 전체 미분류(triage null) 지원 수 */
  newApplications: number;
  /** 감독 미응답 항목이 남은 숏리스트 수 — 리마인드 필요 */
  awaitingDirector: number;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const pendingShortlists = shortlists.filter((s) => {
    const items = shortlistItems.filter((i) => i.shortlistId === s.id);
    const reviewed = items.filter((i) =>
      reviews.some((r) => r.shortlistItemId === i.id),
    );
    return items.length > 0 && reviewed.length < items.length;
  });
  return {
    // mock-data의 리터럴 유니온은 "확정"/"종료"를 안 담을 수 있어 직접 비교하면 TS2367 — includes로 우회
    activeRoles: roles.filter(
      (r) => !(["확정", "종료"] as RoleStatus[]).includes(r.status),
    ).length,
    newApplications: applications.filter((a) => a.triage === null).length,
    awaitingDirector: pendingShortlists.length,
  };
}

export interface ShortlistWithContext extends ShortlistWithStats {
  role: Role;
  project: Project;
}

/** 전체 숏리스트 인덱스 + 사이드바 "공유 중" — 최신 생성순 */
export async function getAllShortlists(): Promise<ShortlistWithContext[]> {
  const all = await Promise.all(
    projects.flatMap((p) =>
      roles
        .filter((r) => r.projectId === p.id)
        .map(async (r) => {
          const lists = await getShortlistsByRole(r.id);
          return lists.map((s) => ({ ...s, role: r as Role, project: p }));
        }),
    ),
  );
  return all.flat().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export interface TagCount {
  tag: string;
  count: number;
}

/** 배우 태그 집계, count 내림차순 — 사이드바 "저장된 태그" */
export async function getTagCounts(): Promise<TagCount[]> {
  const counts = new Map<string, number>();
  for (const actor of actors) {
    for (const tag of actor.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export interface SidebarData {
  projects: ProjectWithRoles[];
  tags: TagCount[];
  sharedShortlists: ShortlistWithContext[];
  /** 감독 미응답이 남은 숏리스트 수 — 메뉴 뱃지 */
  pendingShortlistCount: number;
}

export async function getSidebarData(): Promise<SidebarData> {
  const [projectsWithRoles, tags, sharedShortlists, metrics] =
    await Promise.all([
      getProjectsWithRoles(),
      getTagCounts(),
      getAllShortlists(),
      getDashboardMetrics(),
    ]);
  return {
    projects: projectsWithRoles,
    tags,
    sharedShortlists,
    pendingShortlistCount: metrics.awaitingDirector,
  };
}

/** id 또는 token 어느 쪽으로도 조회 — 디렉터 결과 화면(id)과 감독 리뷰(token)가 공유 */
export async function getShortlistDetail(
  idOrToken: string,
): Promise<ShortlistDetail> {
  const shortlist =
    shortlists.find((s) => s.id === idOrToken || s.token === idOrToken) ??
    shortlists[0];
  const role = roles.find((r) => r.id === shortlist.roleId) ?? roles[0];
  const project = projects.find((p) => p.id === role.projectId) ?? projects[0];
  const items = shortlistItems
    .filter((i) => i.shortlistId === shortlist.id)
    .sort((a, b) => a.order - b.order)
    .map((item) => {
      const application =
        applications.find((a) => a.id === item.applicationId) ??
        applications[0];
      const actor =
        actors.find((x) => x.id === application.actorId) ?? actors[0];
      return {
        item,
        application,
        actor,
        review: reviews.find((r) => r.shortlistItemId === item.id) ?? null,
      };
    });
  return { shortlist, role, project, items };
}
