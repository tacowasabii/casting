"use client";

import { cn } from "@/lib/utils";

export interface TriadOption<T extends string> {
  value: T;
  label: string;
  /** 우측 mono 단축키 힌트 (데스크톱 전용) */
  kbd?: string;
}

/* 포지션별 기본 위계: [강조 검정 / 중립 검정 보더 / 소극 뮤트].
   선택값이 생기면 선택 버튼이 검정을 가져가고 나머지는 보조 위계로 물러난다. */
const DEFAULT_STYLES = [
  "bg-primary text-primary-foreground hover:bg-primary-hover",
  "border border-primary bg-card text-foreground hover:bg-accent",
  "border border-input bg-card text-[#b0b0b0] hover:text-foreground hover:border-primary",
] as const;

const UNSELECTED_STYLES = [
  "border border-primary bg-card text-foreground hover:bg-accent",
  "border border-primary bg-card text-foreground hover:bg-accent",
  "border border-input bg-card text-[#b0b0b0] hover:text-foreground hover:border-primary",
] as const;

/** 관심/보류/제외 · 좋아요/보류/제외 3버튼 액션 바 */
export function ActionTriad<T extends string>({
  options,
  value = null,
  onSelect,
  size = "desktop",
  className,
}: {
  options: readonly [TriadOption<T>, TriadOption<T>, TriadOption<T>];
  value?: T | null;
  onSelect: (value: T) => void;
  size?: "desktop" | "mobile";
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {options.map((option, i) => {
        const selected = value === option.value;
        const style =
          value === null || selected ? DEFAULT_STYLES[i] : UNSELECTED_STYLES[i];
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            aria-pressed={selected}
            className={cn(
              "flex flex-1 cursor-pointer items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-colors",
              size === "desktop" ? "rounded" : "rounded-lg",
              selected && "bg-primary text-primary-foreground border-primary hover:bg-primary-hover",
              !selected && style,
              selected && i !== 0 && "border",
            )}
          >
            {option.label}
            {option.kbd && size === "desktop" ? (
              <span className="font-mono text-[10px] opacity-50">
                {option.kbd}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
