"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THEME_COOKIE, THEMES, themeOf, type Theme, type ThemeId } from "@/lib/themes";

/** 테마 3색 미리보기 점 — 배경 / 사이드바 / 시그니처.
 *  dotBorder: 흰 팝오버(기본)와 다크 사이드바 트리거에서 각각 보이는 테두리 지정 */
function Swatch({
  theme,
  dotBorder = "border-black/10",
}: {
  theme: Theme;
  dotBorder?: string;
}) {
  return (
    <span className="flex shrink-0 items-center gap-[3px]">
      {[theme.preview.bg, theme.preview.sidebar, theme.preview.accent].map(
        (color, i) => (
          <span
            key={i}
            className={`size-[11px] rounded-full border ${dotBorder}`}
            style={{ background: color }}
          />
        ),
      )}
    </span>
  );
}

/** 사이드바 푸터 "설정" → 색상 테마 선택 드롭다운.
 *  선택 즉시 <html data-theme> 갱신(CSS 변수 전환) + 쿠키 저장(SSR 유지) + theme-color 메타 갱신 */
export function ThemePicker({ initialTheme }: { initialTheme: ThemeId }) {
  const [theme, setTheme] = useState<ThemeId>(initialTheme);

  function apply(id: ThemeId) {
    setTheme(id);
    document.documentElement.dataset.theme = id;
    document.cookie = `${THEME_COOKIE}=${id}; path=/; max-age=31536000; SameSite=Lax`;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", themeOf(id).themeColor);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-[13px] py-[11px] text-sm font-medium text-sidebar-foreground transition-colors hover:text-sidebar-primary"
        >
          <SlidersHorizontal
            className="size-[18px] text-sidebar-icon"
            strokeWidth={1.4}
          />
          <span>설정</span>
          <span className="ml-auto flex items-center">
            {/* 사이드바 배경 위 — 테마 연동 보더로 다크/라이트 모두에서 점이 보이게 */}
            <Swatch theme={themeOf(theme)} dotBorder="border-sidebar-muted/50" />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-60">
        <DropdownMenuLabel className="caption-sm">색상 테마</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(v) => apply(v as ThemeId)}
        >
          {THEMES.map((t) => (
            <DropdownMenuRadioItem
              key={t.id}
              value={t.id}
              className="gap-2.5 py-1.5"
            >
              <Swatch theme={t} />
              <span className="text-[12.5px]">{t.label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
