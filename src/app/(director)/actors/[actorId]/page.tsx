import { FolderOpenIcon, MailIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

import { NoteEditor } from "@/components/actors/note-editor";
import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getActorById, getApplicationsByActor } from "@/lib/data";
import { ageOf, type ApplicationSource, type Triage } from "@/lib/types";
import { cn } from "@/lib/utils";

const SOURCE_LABELS: Record<ApplicationSource, string> = {
  form: "지원폼",
  email: "이메일",
  manual: "직접 등록",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function TriageBadge({ triage }: { triage: Triage }) {
  if (triage === null) {
    return <span className="text-muted-foreground">—</span>;
  }
  return (
    <Badge
      className={cn(
        triage === "관심" &&
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
        triage === "보류" &&
          "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
        triage === "제외" && "bg-muted text-muted-foreground",
      )}
    >
      {triage}
    </Badge>
  );
}

export default async function ActorProfilePage({
  params,
}: {
  params: Promise<{ actorId: string }>;
}) {
  const { actorId } = await params;
  const [actor, applications] = await Promise.all([
    getActorById(actorId),
    getApplicationsByActor(actorId),
  ]);

  const videos = applications.filter((a) => a.videoUrl !== null);
  const pdfs = applications.flatMap((a) => a.files);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex flex-none items-center gap-3 border-b px-6 py-4">
        <SidebarTrigger className="md:hidden" />
        <div>
          <h1 className="text-lg font-semibold">배우 프로필</h1>
          <p className="text-sm text-muted-foreground">
            <Link href="/actors" className="hover:underline">
              배우 라이브러리
            </Link>{" "}
            / {actor.name}
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="space-y-6">
          {/* 프로필 헤더 */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <AvatarPlaceholder
              name={actor.name}
              photo={actor.photo}
              className="size-16 text-xl"
            />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-xl font-semibold">{actor.name}</h2>
                <span className="text-sm text-muted-foreground">
                  {ageOf(actor.birthYear)}세 · {actor.height}cm ·{" "}
                  {actor.agency ?? "무소속"}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <PhoneIcon className="size-3.5" />
                  {actor.phone}
                </span>
                {actor.email ? (
                  <span className="inline-flex items-center gap-1.5">
                    <MailIcon className="size-3.5" />
                    {actor.email}
                  </span>
                ) : null}
              </div>
              {actor.tags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {actor.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}
              {actor.note ? (
                <div className="rounded-lg bg-muted/50 px-3 py-2 text-sm">
                  <span className="mr-2 font-medium text-muted-foreground">
                    라이브러리 메모
                  </span>
                  {actor.note}
                </div>
              ) : null}
            </div>
          </div>

          <Tabs defaultValue="history">
            <TabsList>
              <TabsTrigger value="history">
                지원 이력 ({applications.length})
              </TabsTrigger>
              <TabsTrigger value="media">파일·영상</TabsTrigger>
              <TabsTrigger value="note">메모</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="mt-2">
              {applications.length === 0 ? (
                <Empty className="border py-16">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <FolderOpenIcon />
                    </EmptyMedia>
                    <EmptyTitle>지원 이력이 없습니다</EmptyTitle>
                    <EmptyDescription>
                      아직 이 배우의 지원 기록이 없습니다.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <div className="rounded-xl border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="pl-4">작품</TableHead>
                        <TableHead>배역</TableHead>
                        <TableHead>지원일</TableHead>
                        <TableHead>경로</TableHead>
                        <TableHead className="pr-4">당시 분류</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell className="pl-4">
                            {app.project.title}
                          </TableCell>
                          <TableCell>
                            <Link
                              href={`/roles/${app.roleId}`}
                              className="font-medium hover:underline"
                            >
                              {app.role.name}
                            </Link>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(app.createdAt)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {SOURCE_LABELS[app.source]}
                          </TableCell>
                          <TableCell className="pr-4">
                            <TriageBadge triage={app.triage} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="media" className="mt-2">
              {videos.length === 0 && pdfs.length === 0 ? (
                <Empty className="border py-16">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <FolderOpenIcon />
                    </EmptyMedia>
                    <EmptyTitle>등록된 파일이 없습니다</EmptyTitle>
                    <EmptyDescription>
                      지원 시 첨부된 파일과 영상이 여기에 모입니다.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <div className="space-y-5">
                  {videos.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {videos.map((app) => (
                        <MediaPlaceholder
                          key={app.id}
                          kind="video"
                          label={`${app.project.title} · ${app.role.name}`}
                          duration={app.videoDuration}
                        />
                      ))}
                    </div>
                  ) : null}
                  {pdfs.length > 0 ? (
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {pdfs.map((file, i) => (
                        <MediaPlaceholder
                          key={`${file}-${i}`}
                          kind="pdf"
                          label={file}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
            </TabsContent>

            <TabsContent value="note" className="mt-2 max-w-xl">
              <NoteEditor defaultValue={actor.note} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
