/** 색상 테마 단일 소스 — id는 themes.css의 [data-theme="…"] 선택자와 1:1 대응 */

export const THEME_COOKIE = "castboard_theme";

export const THEMES = [
  {
    id: "mono",
    label: "라이트 모노크롬",
    themeColor: "#F5F5F5",
    preview: { bg: "#f5f5f5", sidebar: "#fcfcfc", accent: "#141414" },
  },
  {
    id: "oxblood",
    label: "딥 옥스블러드",
    themeColor: "#F3EBE9",
    preview: { bg: "#F3EBE9", sidebar: "#2E1417", accent: "#8A2A2A" },
  },
  {
    id: "oxblood-light",
    label: "옥스블러드 라이트",
    themeColor: "#F3EBE9",
    preview: { bg: "#F3EBE9", sidebar: "#EBD3D1", accent: "#8A2A2A" },
  },
  {
    id: "navy",
    label: "잉크 네이비",
    themeColor: "#EDF1F8",
    preview: { bg: "#EDF1F8", sidebar: "#15223A", accent: "#2A5CB8" },
  },
  {
    id: "navy-light",
    label: "네이비 라이트",
    themeColor: "#EDF1F8",
    preview: { bg: "#EDF1F8", sidebar: "#DBE6F6", accent: "#2A5CB8" },
  },
  {
    id: "forest",
    label: "딥 포레스트",
    themeColor: "#EDF1EC",
    preview: { bg: "#EDF1EC", sidebar: "#16281F", accent: "#1F7A50" },
  },
  {
    id: "forest-light",
    label: "포레스트 라이트",
    themeColor: "#EDF1EC",
    preview: { bg: "#EDF1EC", sidebar: "#D9E8DE", accent: "#1F7A50" },
  },
  {
    id: "editorial",
    label: "웜 에디토리얼",
    themeColor: "#F1E9DC",
    preview: { bg: "#F1E9DC", sidebar: "#211E1A", accent: "#C05A2E" },
  },
  {
    id: "editorial-light",
    label: "에디토리얼 라이트",
    themeColor: "#F1E9DC",
    preview: { bg: "#F1E9DC", sidebar: "#EBDCC2", accent: "#C05A2E" },
  },
  {
    id: "cinematic",
    label: "시네마틱",
    themeColor: "#F1F1F1",
    preview: { bg: "#F1F1F1", sidebar: "#1A1A1A", accent: "#141414" },
  },
  {
    id: "pop",
    label: "컬러 팝",
    themeColor: "#EDEFF7",
    preview: { bg: "#EDEFF7", sidebar: "#2B3A67", accent: "#4C63B6" },
  },
] as const;

export type Theme = (typeof THEMES)[number];
export type ThemeId = Theme["id"];

export const DEFAULT_THEME: ThemeId = "mono";

export function resolveTheme(value: string | undefined): ThemeId {
  return THEMES.some((t) => t.id === value)
    ? (value as ThemeId)
    : DEFAULT_THEME;
}

export function themeOf(id: ThemeId): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
