// 기획서 5절 데이터 모델. User/Team은 셸에서 제외하고 MOCK_USER 상수로 대체.

export type ProjectType = "영화" | "드라마" | "웹드라마" | "기타";

export type RoleStatus =
  | "모집중"
  | "검토중"
  | "감독컨펌"
  | "오디션"
  | "확정"
  | "종료";

export const ROLE_STATUSES: readonly RoleStatus[] = [
  "모집중",
  "검토중",
  "감독컨펌",
  "오디션",
  "확정",
  "종료",
];

/** null = 미분류 */
export type Triage = "관심" | "보류" | "제외" | null;

export type Verdict = "like" | "hold" | "pass";

export type ApplicationSource = "form" | "email" | "manual";

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  production: string;
  shootPeriod: string;
  note?: string;
}

export interface Role {
  id: string;
  projectId: string;
  name: string;
  headcount: number;
  gender: "남" | "여" | "무관";
  ageMin: number;
  ageMax: number;
  heightMin?: number;
  heightMax?: number;
  requirements?: string;
  /** ISO — 지원 마감일 */
  deadline: string;
  shootDate?: string;
  /** 출연료 — 내부 메모 (공개 화면 미노출) */
  fee?: string;
  status: RoleStatus;
}

export interface Actor {
  id: string;
  name: string;
  birthYear: number;
  height: number;
  phone: string;
  email?: string;
  agency: string | null;
  tags: readonly string[];
  note?: string;
  /** public/avatars/ 로컬 파일 — 없으면 이니셜 아바타 */
  photo?: string;
  intro?: string;
}

export interface Application {
  id: string;
  roleId: string;
  actorId: string;
  source: ApplicationSource;
  /** 파일명만 (셸 placeholder) */
  files: readonly string[];
  videoUrl: string | null;
  videoDuration?: string;
  intro?: string;
  triage: Triage;
  note?: string;
  createdAt: string;
}

export interface Shortlist {
  id: string;
  roleId: string;
  title: string;
  token: string;
  deadline: string;
  allowComment: boolean;
  createdAt: string;
}

export interface ShortlistItem {
  id: string;
  shortlistId: string;
  applicationId: string;
  order: number;
}

export interface Review {
  shortlistItemId: string;
  verdict: Verdict;
  comment?: string;
  watchSeconds: number;
  reviewedAt: string;
}

export const MOCK_USER = {
  name: "이수진",
  role: "캐스팅 디렉터",
} as const;

/** birthYear → 만 나이 근사 (셸 데모용) */
export function ageOf(birthYear: number): number {
  return new Date().getFullYear() - birthYear;
}
