import { UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

// 이름 해시 → 고정 팔레트. 같은 배우는 항상 같은 색 (스크린샷·데모 간 일관성).
const PALETTES = [
  "from-rose-200 to-rose-400 text-rose-950",
  "from-orange-200 to-orange-400 text-orange-950",
  "from-amber-200 to-yellow-400 text-amber-950",
  "from-emerald-200 to-emerald-400 text-emerald-950",
  "from-teal-200 to-cyan-400 text-teal-950",
  "from-sky-200 to-blue-400 text-sky-950",
  "from-violet-200 to-purple-400 text-violet-950",
  "from-fuchsia-200 to-pink-400 text-fuchsia-950",
] as const;

function paletteOf(name: string) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return PALETTES[h % PALETTES.length];
}

interface AvatarPlaceholderProps {
  name: string;
  /** public/ 경로의 실사진 — 있으면 아바타 대신 렌더 (코드 수정 없는 업그레이드 경로) */
  photo?: string;
  /** thumb: 리스트용 원형 / card: 풀블리드 프로필 카드 느낌 */
  variant?: "thumb" | "card";
  className?: string;
}

export function AvatarPlaceholder({
  name,
  photo,
  variant = "thumb",
  className,
}: AvatarPlaceholderProps) {
  const initial = name.charAt(0);
  const palette = paletteOf(name);

  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={name}
        className={cn(
          "object-cover",
          variant === "thumb" ? "rounded-full" : "",
          className,
        )}
      />
    );
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
          palette,
          className,
        )}
      >
        <UserRound
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 size-2/3 opacity-15"
          strokeWidth={1}
        />
        <span className="text-6xl font-semibold opacity-80">{initial}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-medium",
        palette,
        className,
      )}
    >
      {initial}
    </div>
  );
}
