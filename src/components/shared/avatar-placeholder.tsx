import { cn } from "@/lib/utils";

/* 모노 해치 패턴 — 사진이 없는 모든 자리의 공통 질감 */
function hatch(stripe: number): React.CSSProperties {
  return {
    backgroundImage: `repeating-linear-gradient(45deg, #e6e6e6, #e6e6e6 ${stripe}px, #efefef ${stripe}px, #efefef ${stripe * 2}px)`,
  };
}

interface AvatarPlaceholderProps {
  name: string;
  /** public/ 경로의 실사진 — 있으면 아바타 대신 렌더 (코드 수정 없는 업그레이드 경로) */
  photo?: string;
  /** thumb: 리스트용 원형 / photo: 각진 사각 (선별 46×58 · 프로필 3:4 · 헤드샷 16:9) */
  variant?: "thumb" | "photo";
  /** 해치 스트라이프 두께 px — 크기가 클수록 굵게 */
  stripe?: number;
  /** photo 전용: 이니셜 아래 mono 서브라벨 ("헤드샷" 등) */
  label?: string;
  className?: string;
}

export function AvatarPlaceholder({
  name,
  photo,
  variant = "thumb",
  stripe,
  label,
  className,
}: AvatarPlaceholderProps) {
  const initial = name.charAt(0);

  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={name}
        className={cn(
          "object-cover",
          variant === "thumb" && "rounded-full",
          className,
        )}
      />
    );
  }

  if (variant === "photo") {
    return (
      <div
        className={cn(
          "flex shrink-0 flex-col items-center justify-center font-semibold text-[#a8a8a8]",
          className,
        )}
        style={hatch(stripe ?? 6)}
      >
        <span>{initial}</span>
        {label ? (
          <span className="mt-1.5 font-mono text-[10px] font-normal tracking-normal text-faint">
            {label}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full text-sm font-semibold text-[#a8a8a8]",
        className,
      )}
      style={hatch(stripe ?? 4)}
    >
      {initial}
    </div>
  );
}
