import { TriageBoard } from "@/components/triage/triage-board";
import { getApplicationsByRole, getRoleById } from "@/lib/data";

export default async function RoleApplicantsPage({
  params,
}: {
  params: Promise<{ roleId: string }>;
}) {
  const { roleId } = await params;
  const [{ role, project }, applications] = await Promise.all([
    getRoleById(roleId),
    getApplicationsByRole(roleId),
  ]);

  return (
    <TriageBoard role={role} project={project} applications={applications} />
  );
}
