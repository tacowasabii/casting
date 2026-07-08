import { ActorLibrary } from "@/components/actors/actor-table";
import { getActors } from "@/lib/data";

export default async function ActorsPage() {
  const actors = await getActors();
  return <ActorLibrary actors={actors} />;
}
