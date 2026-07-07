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
