import { redirect } from "next/navigation";

import { getProjectsWithRoles } from "@/lib/data";

/* "배역 · 선별" 메뉴의 목적지 — 배역 인덱스 화면은 디자인에 없고
   사이드바 컨텍스트가 배역 전환기이므로, 첫 활성 배역으로 보낸다. */
export default async function RolesIndexPage() {
  const projects = await getProjectsWithRoles();
  const roles = projects.flatMap((p) => p.roles);
  const target =
    roles.find((r) => r.status !== "확정" && r.status !== "종료") ?? roles[0];
  if (!target) redirect("/");
  redirect(`/roles/${target.id}`);
}
