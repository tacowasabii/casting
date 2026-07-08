import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
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
    <div className="pb-4">
      {/* 단일 4:5 미디어 카드 — 영상이 있으면 다크 스테이지, 없으면 해치 사진 자리 */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {application.videoUrl ? (
          <div className="flex size-full items-center justify-center bg-[#161616]">
            <span className="flex size-[60px] items-center justify-center rounded-full border-[1.5px] border-white/90 pl-[3px] text-lg text-white">
              ▶
            </span>
            <span className="absolute left-4 top-3.5 rounded-sm bg-black/35 px-2 py-[3px] font-mono text-[10px] tracking-[.08em] text-[#cfcfcf]">
              연기 영상{application.videoDuration ? ` · ${application.videoDuration}` : ""}
            </span>
          </div>
        ) : (
          <AvatarPlaceholder
            name={actor.name}
            photo={actor.photo}
            variant="photo"
            stripe={8}
            className="size-full text-[64px]"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-[18px] pt-14">
          <div className="flex items-baseline gap-2">
            <span className="text-[22px] font-extrabold tracking-[-.01em] text-white">
              {actor.name}
            </span>
            <span className="text-xs text-white/80">
              {ageOf(actor.birthYear)}세 · {actor.height}cm
            </span>
          </div>
          {actor.tags.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {actor.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-white/45 px-2 py-[3px] text-[10.5px] text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {intro ? (
        <p className="m-0 px-[22px] py-4 text-[13px] leading-relaxed text-[#4a4a4a]">
          “{intro}”
        </p>
      ) : null}
    </div>
  );
}
