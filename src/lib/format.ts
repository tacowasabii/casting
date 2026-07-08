// 화면 공용 표시 포맷터. 데이터 접근 없이 순수 함수만 둔다.

import type { Role } from "./types";

/** "남 · 35~45세 · 175~185cm" — 배역 조건 한 줄 */
export function conditionLine(role: Role): string {
  const parts: string[] = [
    role.gender === "무관" ? "성별 무관" : role.gender,
    `${role.ageMin}~${role.ageMax}세`,
  ];
  if (role.heightMin && role.heightMax) {
    parts.push(`${role.heightMin}~${role.heightMax}cm`);
  } else if (role.heightMin) {
    parts.push(`${role.heightMin}cm 이상`);
  } else if (role.heightMax) {
    parts.push(`${role.heightMax}cm 이하`);
  }
  return parts.join(" · ");
}

/** ISO → "오늘" / "N일 전" (미래면 "N일 후") */
export function formatRelativeDays(iso: string): string {
  const days = Math.floor(
    (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (days === 0) return "오늘";
  return days > 0 ? `${days}일 전` : `${-days}일 후`;
}

/** "2:03" → 123 (초). 파싱 불가 시 null */
export function parseDurationToSeconds(duration: string): number | null {
  const m = duration.match(/^(\d+):(\d{2})$/);
  if (!m) return null;
  return Number(m[1]) * 60 + Number(m[2]);
}

/** 45 → "0:45" */
export function formatSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** 마감일 ISO → "3일 후 마감" / "오늘까지" / "마감" */
export function formatDeadlineLabel(iso: string): string {
  const days = Math.ceil(
    (new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
  if (days < 0) return "마감";
  if (days === 0) return "오늘까지";
  return `${days}일 후 마감`;
}
