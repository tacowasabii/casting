import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { Badge } from "@/components/ui/badge";
import { ageOf } from "@/lib/types";
import type { Actor, Application } from "@/lib/types";

// 감독 리뷰용 후보 카드 1장 — 연락처(전화·이메일)는 절대 노출하지 않는다.
export function ActorReviewCard({
  application,
  actor,
}: {
  application: Application;
  actor: Actor;
}) {
  const intro = application.intro ?? actor.intro;

  return (
    <div className="pb-6">
      <div className="relative">
        <AvatarPlaceholder
          name={actor.name}
          photo={actor.photo}
          variant="card"
          className="aspect-[3/4] w-full"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent px-5 pt-20 pb-5">
          <p className="text-3xl font-semibold text-white">{actor.name}</p>
          <p className="mt-1 text-base text-white/85">
            {ageOf(actor.birthYear)}세 · {actor.height}cm
          </p>
        </div>
      </div>

      <div className="space-y-5 px-5 pt-5">
        {application.videoUrl ? (
          <MediaPlaceholder
            kind="video"
            label="연기 영상"
            duration={application.videoDuration}
          />
        ) : null}

        {actor.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {actor.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}

        {intro ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {intro}
          </p>
        ) : null}

        {actor.agency ? (
          <p className="text-xs text-muted-foreground">소속 {actor.agency}</p>
        ) : null}
      </div>
    </div>
  );
}
