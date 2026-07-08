import { UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

// 이름 해시 → 고정 팔레트. 같은 배우는 항상 같은 색 (스크린샷·데모 간 일관성).
const PALETTES = [
  "from-[#2a1f1e] to-[#3d2b28] text-[#e9bcb6]",
  "from-[#1e2429] to-[#2b3640] text-[#bcd0dd]",
  "from-[#22261f] to-[#32402c] text-[#c6d8bd]",
  "from-[#26202a] to-[#38303f] text-[#d3c4dd]",
  "from-[#2a2623] to-[#403a30] text-[#ddd2bc]",
  "from-[#202626] to-[#2e3c3a] text-[#bddad5]",
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
          variant === "thumb"
            ? "rounded-full"
            : "transition-transform duration-500 hover:scale-105",
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
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent" />
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
