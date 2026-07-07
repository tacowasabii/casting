import { ActorTable } from "@/components/actors/actor-table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getActors } from "@/lib/data";

export default async function ActorsPage() {
  const actors = await getActors();

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex flex-none items-center gap-3 border-b px-6 py-4">
        <SidebarTrigger className="md:hidden" />
        <div>
          <h1 className="text-lg font-semibold">배우 라이브러리</h1>
          <p className="text-sm text-muted-foreground">
            모든 지원 이력이 배우 단위로 누적됩니다 · 총 {actors.length}명
          </p>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <ActorTable actors={actors} />
      </div>
    </div>
  );
}
