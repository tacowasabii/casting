import { ReviewFlow } from "@/components/review/review-flow";
import { getShortlistDetail } from "@/lib/data";

export default async function ReviewCardsPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const { shortlist, role, project, items } = await getShortlistDetail(token);

  return (
    <ReviewFlow
      items={items}
      token={token}
      roleName={role.name}
      project={project}
      deadline={shortlist.deadline}
    />
  );
}
