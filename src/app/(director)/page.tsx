import { NewProjectDialog } from "@/components/dashboard/new-project-dialog";
import { NewRoleDialog } from "@/components/dashboard/new-role-dialog";
import { ProjectKanban } from "@/components/dashboard/project-kanban";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProjects, getRolesByProject } from "@/lib/data";

export default async function DashboardPage() {
  const projects = await getProjects();
  const rolesByProject = await Promise.all(
    projects.map((p) => getRolesByProject(p.id)),
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex flex-none items-center gap-3 border-b px-6 py-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-heading text-lg font-bold tracking-tight">대시보드</h1>
        <div className="ml-auto">
          <NewProjectDialog />
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
        <Tabs defaultValue={projects[0]?.id} className="gap-4">
          <TabsList variant="line">
            {projects.map((p) => (
              <TabsTrigger key={p.id} value={p.id} className="px-3">
                {p.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {projects.map((p, i) => (
            <TabsContent key={p.id} value={p.id} className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{p.type}</Badge>
                <span className="text-sm text-muted-foreground">
                  {p.production} · 촬영 {p.shootPeriod}
                </span>
                <div className="ml-auto">
                  <NewRoleDialog />
                </div>
              </div>
              <ProjectKanban roles={rolesByProject[i]} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
