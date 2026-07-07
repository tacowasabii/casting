// 손으로 쓴 시드 데이터. 참조 무결성은 컴파일 타임에 강제:
// `as const satisfies` 로 리터럴 유니온 ID 타입을 뽑아, 없는 참조 = 컴파일 에러.
// 파생 가능한 값(배우 이름 등)은 중복 저장하지 않는다 — 화면은 data.ts 조인을 거칠 것.

import type {
  Actor,
  Application,
  Project,
  Review,
  Role,
  Shortlist,
  ShortlistItem,
} from "./types";

/** 언제 데모를 열어도 D-day가 유효하도록 상대 날짜로 생성 */
function daysFromNow(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
}

// ─── 작품 ───────────────────────────────────────────────

export const projects = [
  {
    id: "proj-1",
    title: "검은 파도",
    type: "드라마",
    production: "문라이트픽처스",
    shootPeriod: "2026.08 ~ 2026.12",
    note: "OTT 8부작. 부산 로케이션 다수.",
  },
  {
    id: "proj-2",
    title: "여름의 끝",
    type: "영화",
    production: "스튜디오 하람",
    shootPeriod: "2026.09 ~ 2026.10",
    note: "독립 장편. 전주 촬영.",
  },
] as const satisfies readonly Project[];

export type ProjectId = (typeof projects)[number]["id"];

// ─── 배역 ───────────────────────────────────────────────

type RoleSeed = Omit<Role, "projectId"> & { projectId: ProjectId };

export const roles = [
  {
    id: "role-101",
    projectId: "proj-1",
    name: "형사2역",
    headcount: 1,
    gender: "남",
    ageMin: 35,
    ageMax: 45,
    heightMin: 175,
    heightMax: 185,
    requirements: "부산 사투리 가능자 우대. 액션 경험 있으면 좋음. 4~7회 등장.",
    deadline: daysFromNow(-3),
    shootDate: "2026.09 중순",
    fee: "회당 80 (협의)",
    status: "감독컨펌",
  },
  {
    id: "role-102",
    projectId: "proj-1",
    name: "여고생 단역",
    headcount: 2,
    gender: "여",
    ageMin: 17,
    ageMax: 21,
    requirements: "교복 착용 씬. 대사 3~4마디. 실제 고등학생일 경우 보호자 동행.",
    deadline: daysFromNow(5),
    shootDate: "2026.08 말",
    status: "모집중",
  },
  {
    id: "role-103",
    projectId: "proj-1",
    name: "카페 사장",
    headcount: 1,
    gender: "여",
    ageMin: 45,
    ageMax: 55,
    requirements: "생활 연기 위주. 주인공과 짧은 대화 씬 2회.",
    deadline: daysFromNow(2),
    shootDate: "2026.09 초",
    status: "검토중",
  },
  {
    id: "role-104",
    projectId: "proj-1",
    name: "조직원3",
    headcount: 1,
    gender: "남",
    ageMin: 25,
    ageMax: 35,
    heightMin: 178,
    requirements: "몸 좋은 체형. 격투 씬 1회 (대역 가능).",
    deadline: daysFromNow(-7),
    shootDate: "2026.10 초",
    status: "오디션",
  },
  {
    id: "role-105",
    projectId: "proj-2",
    name: "주인공 동창",
    headcount: 1,
    gender: "남",
    ageMin: 28,
    ageMax: 34,
    requirements: "자연스러운 일상 연기. 회상 씬 포함 3회 등장.",
    deadline: daysFromNow(9),
    shootDate: "2026.09 말",
    status: "모집중",
  },
  {
    id: "role-106",
    projectId: "proj-2",
    name: "시장 상인",
    headcount: 3,
    gender: "여",
    ageMin: 55,
    ageMax: 70,
    requirements: "전주 거주자 우대. 반나절 촬영.",
    deadline: daysFromNow(12),
    status: "모집중",
  },
] as const satisfies readonly RoleSeed[];

export type RoleId = (typeof roles)[number]["id"];

// ─── 배우 (~28명, 4버킷) ────────────────────────────────
// 데모 동선(형사2역 보드·숏리스트)에 등장하는 배우만 intro까지 풀 디테일.

export const actors = [
  // A. 남 33~46 — 형사2역 버킷
  {
    id: "act-01",
    name: "김태산",
    birthYear: 1983,
    height: 180,
    phone: "010-2314-7789",
    email: "taesan.kim@example.com",
    agency: null,
    tags: ["부산사투리", "액션"],
    intro:
      "부산 출신이라 사투리가 자연스럽고, 액션스쿨 3년 수료했습니다. 단편 <추적>(2024)에서 형사 역을 맡았습니다.",
  },
  {
    id: "act-02",
    name: "박성재",
    birthYear: 1980,
    height: 177,
    phone: "010-8823-1102",
    agency: "액터스플레이",
    tags: ["중저음", "드라마"],
    intro: "연극 무대 12년. 묵직한 톤의 생활 연기가 강점입니다.",
  },
  {
    id: "act-03",
    name: "정우빈",
    birthYear: 1979,
    height: 175,
    phone: "010-5511-3324",
    agency: null,
    tags: ["저음", "형사물"],
    intro:
      "형사·군인 역할 위주로 12편 출연했습니다. 심문 씬 연기 영상 첨부드립니다.",
  },
  {
    id: "act-04",
    name: "오민석",
    birthYear: 1982,
    height: 184,
    phone: "010-9931-4456",
    agency: "제이앤컴퍼니",
    tags: ["무술유단", "액션"],
    intro: "태권도 4단, 검도 2단. 와이어 액션 경험 있습니다.",
  },
  {
    id: "act-05",
    name: "한지훈",
    birthYear: 1988,
    height: 179,
    phone: "010-3345-9987",
    agency: null,
    tags: ["코믹"],
    intro: "웹드라마 <오피스 블루스> 조연. 코믹과 정극을 오갑니다.",
  },
  {
    id: "act-06",
    name: "최강호",
    birthYear: 1977,
    height: 173,
    phone: "010-7712-5563",
    agency: "스타빌리지",
    tags: ["코믹", "경상도사투리"],
  },
  {
    id: "act-07",
    name: "이재원",
    birthYear: 1986,
    height: 182,
    phone: "010-4429-8871",
    agency: "제이앤컴퍼니",
    tags: ["모델출신"],
    intro: "모델 출신으로 화면 비율이 좋다는 평을 듣습니다. 정극 전향 3년차.",
  },
  {
    id: "act-08",
    name: "임태섭",
    birthYear: 1981,
    height: 178,
    phone: "010-6634-2210",
    agency: null,
    tags: ["연극", "부산사투리"],
  },

  // B. 여 17~22 — 여고생 버킷
  {
    id: "act-09",
    name: "서지우",
    birthYear: 2007,
    height: 162,
    phone: "010-2211-8834",
    agency: null,
    tags: ["아역출신"],
    intro: "아역으로 드라마 3편 출연했습니다. 현재 고3입니다.",
  },
  {
    id: "act-10",
    name: "김하윤",
    birthYear: 2006,
    height: 165,
    phone: "010-9987-2231",
    agency: "틴에이블",
    tags: ["댄스"],
    intro: "댄스 동아리 활동 중이라 안무 소화 가능합니다.",
  },
  {
    id: "act-11",
    name: "이채린",
    birthYear: 2008,
    height: 158,
    phone: "010-3312-6674",
    agency: null,
    tags: ["교복광고"],
  },
  {
    id: "act-12",
    name: "박소율",
    birthYear: 2005,
    height: 167,
    phone: "010-5546-1123",
    agency: "와이트리",
    tags: [],
  },
  {
    id: "act-13",
    name: "정다인",
    birthYear: 2009,
    height: 160,
    phone: "010-8874-3392",
    agency: null,
    tags: ["아역출신"],
  },
  {
    id: "act-14",
    name: "한서연",
    birthYear: 2006,
    height: 163,
    phone: "010-1129-7745",
    agency: "뉴에이블",
    tags: [],
  },
  {
    id: "act-15",
    name: "윤지아",
    birthYear: 2007,
    height: 161,
    phone: "010-6653-8821",
    agency: null,
    tags: ["노래"],
  },

  // C. 여 44~56 — 카페 사장 버킷
  {
    id: "act-16",
    name: "박정혜",
    birthYear: 1975,
    height: 163,
    phone: "010-7743-2214",
    agency: null,
    tags: ["전라도사투리"],
    intro: "생활 연기 전문입니다. 상업 광고 다수 출연.",
  },
  {
    id: "act-17",
    name: "이순영",
    birthYear: 1971,
    height: 160,
    phone: "010-2235-6698",
    agency: "극단파도",
    tags: ["뮤지컬"],
  },
  {
    id: "act-18",
    name: "조은실",
    birthYear: 1978,
    height: 165,
    phone: "010-9912-4437",
    agency: null,
    tags: [],
    intro: "카페를 실제로 8년 운영했습니다. 자연스러운 접객 연기 가능합니다.",
  },
  {
    id: "act-19",
    name: "강혜란",
    birthYear: 1973,
    height: 158,
    phone: "010-4467-1189",
    agency: null,
    tags: ["드라마"],
  },
  {
    id: "act-20",
    name: "신경아",
    birthYear: 1980,
    height: 162,
    phone: "010-3398-5521",
    agency: "액터스플레이",
    tags: [],
  },
  {
    id: "act-21",
    name: "오정임",
    birthYear: 1970,
    height: 157,
    phone: "010-8856-9932",
    agency: null,
    tags: ["연극"],
  },
  {
    id: "act-22",
    name: "백승희",
    birthYear: 1976,
    height: 164,
    phone: "010-5567-3348",
    agency: null,
    tags: [],
  },

  // D. 남 26~34 — 조직원3·주인공 동창 버킷 (2명 교차 지원)
  {
    id: "act-23",
    name: "장현우",
    birthYear: 1993,
    height: 178,
    phone: "010-2264-7719",
    agency: null,
    tags: ["액션"],
    intro: "복싱 아마추어 경력 4년. 격투 씬 소화 가능합니다.",
  },
  {
    id: "act-24",
    name: "노윤호",
    birthYear: 1996,
    height: 175,
    phone: "010-9945-2278",
    agency: "스타빌리지",
    tags: [],
  },
  {
    id: "act-25",
    name: "서동혁",
    birthYear: 1994,
    height: 181,
    phone: "010-3376-8845",
    agency: null,
    tags: ["무술유단"],
    intro: "유도 3단. 대역 없이 낙법 가능합니다. 단편 5편 출연.",
  },
  {
    id: "act-26",
    name: "임찬영",
    birthYear: 1998,
    height: 176,
    phone: "010-6612-4493",
    agency: null,
    tags: [],
  },
  {
    id: "act-27",
    name: "권해성",
    birthYear: 1995,
    height: 172,
    phone: "010-8821-6637",
    agency: "뉴에이블",
    tags: ["코믹"],
  },
  {
    id: "act-28",
    name: "유상민",
    birthYear: 1992,
    height: 183,
    phone: "010-4438-9915",
    agency: null,
    tags: ["액션", "승마"],
    intro: "체대 출신입니다. 몸 쓰는 역할이라면 자신 있습니다.",
  },
] as const satisfies readonly Actor[];

export type ActorId = (typeof actors)[number]["id"];

// ─── 지원 (~33건) ───────────────────────────────────────

type ApplicationSeed = Omit<Application, "roleId" | "actorId"> & {
  roleId: RoleId;
  actorId: ActorId;
};

export const applications = [
  // role-101 형사2역 (10건: 관심4 / 보류3 / 제외3 — 경계 이탈 2건 포함)
  {
    id: "app-101-1",
    roleId: "role-101",
    actorId: "act-01",
    source: "form",
    files: ["프로필_김태산.pdf"],
    videoUrl: "https://youtu.be/demo-taesan",
    videoDuration: "1:24",
    intro: "부산 사투리 네이티브입니다. 심문 씬 위주로 영상 준비했습니다.",
    triage: "관심",
    note: "톤 좋음. 사투리 자연스러움",
    createdAt: daysFromNow(-9),
  },
  {
    id: "app-101-2",
    roleId: "role-101",
    actorId: "act-03",
    source: "email",
    files: ["정우빈_프로필.pdf", "필모그래피.pdf"],
    videoUrl: "https://youtu.be/demo-woobin",
    videoDuration: "2:03",
    triage: "관심",
    note: "형사물 경험 다수",
    createdAt: daysFromNow(-8),
  },
  {
    id: "app-101-3",
    roleId: "role-101",
    actorId: "act-04",
    source: "form",
    files: ["프로필_오민석.pdf"],
    videoUrl: "https://youtu.be/demo-minseok",
    videoDuration: "1:41",
    intro: "액션 합 경험 많습니다. 와이어 가능.",
    triage: "관심",
    createdAt: daysFromNow(-8),
  },
  {
    id: "app-101-4",
    roleId: "role-101",
    actorId: "act-07",
    source: "form",
    files: ["이재원_컴카드.pdf"],
    videoUrl: "https://youtu.be/demo-jaewon",
    videoDuration: "0:58",
    triage: "관심",
    note: "비주얼 좋음, 사투리는 확인 필요",
    createdAt: daysFromNow(-7),
  },
  {
    id: "app-101-5",
    roleId: "role-101",
    actorId: "act-02",
    source: "email",
    files: ["박성재_프로필.pdf"],
    videoUrl: null,
    triage: "보류",
    note: "영상 없음. 요청해둠",
    createdAt: daysFromNow(-9),
  },
  {
    id: "app-101-6",
    roleId: "role-101",
    actorId: "act-05",
    source: "form",
    files: ["프로필_한지훈.pdf"],
    videoUrl: "https://youtu.be/demo-jihoon",
    videoDuration: "1:12",
    triage: "보류",
    createdAt: daysFromNow(-6),
  },
  {
    id: "app-101-7",
    roleId: "role-101",
    actorId: "act-08",
    source: "manual",
    files: [],
    videoUrl: null,
    triage: "보류",
    note: "감독 지인 추천. 프로필 요청 중",
    createdAt: daysFromNow(-5),
  },
  {
    id: "app-101-8",
    roleId: "role-101",
    actorId: "act-06",
    source: "email",
    files: ["최강호_프로필.pdf"],
    videoUrl: "https://youtu.be/demo-kangho",
    videoDuration: "1:35",
    triage: "제외",
    note: "코믹 톤이 강함",
    createdAt: daysFromNow(-7),
  },
  {
    id: "app-101-9",
    roleId: "role-101",
    actorId: "act-23", // 33세 — 조건(35~45) 경계 이탈 지원
    source: "form",
    files: ["프로필_장현우.pdf"],
    videoUrl: "https://youtu.be/demo-hyunwoo",
    videoDuration: "1:08",
    intro: "나이대보다 성숙해 보인다는 얘기를 많이 듣습니다.",
    triage: "제외",
    note: "연기 좋으나 나이가 어려 보임",
    createdAt: daysFromNow(-6),
  },
  {
    id: "app-101-10",
    roleId: "role-101",
    actorId: "act-28", // 34세 — 경계 이탈
    source: "form",
    files: ["유상민_프로필.pdf"],
    videoUrl: "https://youtu.be/demo-sangmin",
    videoDuration: "1:50",
    triage: "제외",
    createdAt: daysFromNow(-4),
  },

  // role-102 여고생 단역 (7건: 미분류5 / 관심1 / 보류1 — 막 검토 시작한 느낌)
  {
    id: "app-102-1",
    roleId: "role-102",
    actorId: "act-10",
    source: "form",
    files: ["프로필_김하윤.pdf"],
    videoUrl: "https://youtu.be/demo-hayun",
    videoDuration: "0:47",
    intro: "교복 화보 촬영 경험 있습니다.",
    triage: "관심",
    createdAt: daysFromNow(-3),
  },
  {
    id: "app-102-2",
    roleId: "role-102",
    actorId: "act-09",
    source: "form",
    files: ["서지우_프로필.pdf"],
    videoUrl: "https://youtu.be/demo-jiwoo",
    videoDuration: "1:15",
    triage: "보류",
    createdAt: daysFromNow(-3),
  },
  {
    id: "app-102-3",
    roleId: "role-102",
    actorId: "act-11",
    source: "form",
    files: ["프로필_이채린.pdf"],
    videoUrl: null,
    triage: null,
    createdAt: daysFromNow(-2),
  },
  {
    id: "app-102-4",
    roleId: "role-102",
    actorId: "act-12",
    source: "email",
    files: ["박소율_프로필.pdf"],
    videoUrl: "https://youtu.be/demo-soyul",
    videoDuration: "0:52",
    triage: null,
    createdAt: daysFromNow(-2),
  },
  {
    id: "app-102-5",
    roleId: "role-102",
    actorId: "act-13",
    source: "form",
    files: ["프로필_정다인.pdf"],
    videoUrl: null,
    triage: null,
    createdAt: daysFromNow(-1),
  },
  {
    id: "app-102-6",
    roleId: "role-102",
    actorId: "act-14",
    source: "form",
    files: ["한서연_프로필.pdf"],
    videoUrl: "https://youtu.be/demo-seoyeon",
    videoDuration: "1:02",
    triage: null,
    createdAt: daysFromNow(-1),
  },
  {
    id: "app-102-7",
    roleId: "role-102",
    actorId: "act-15",
    source: "form",
    files: ["프로필_윤지아.pdf"],
    videoUrl: null,
    triage: null,
    createdAt: daysFromNow(0),
  },

  // role-103 카페 사장 (7건: 관심2 / 보류2 / 제외2 / 미분류1)
  {
    id: "app-103-1",
    roleId: "role-103",
    actorId: "act-18",
    source: "form",
    files: ["프로필_조은실.pdf"],
    videoUrl: "https://youtu.be/demo-eunsil",
    videoDuration: "1:19",
    intro: "실제 카페 운영 경험으로 자연스러운 동선 연기가 가능합니다.",
    triage: "관심",
    note: "실제 운영 경험 — 리얼함",
    createdAt: daysFromNow(-5),
  },
  {
    id: "app-103-2",
    roleId: "role-103",
    actorId: "act-16",
    source: "form",
    files: ["박정혜_프로필.pdf"],
    videoUrl: "https://youtu.be/demo-junghye",
    videoDuration: "1:33",
    triage: "관심",
    createdAt: daysFromNow(-5),
  },
  {
    id: "app-103-3",
    roleId: "role-103",
    actorId: "act-17",
    source: "email",
    files: ["이순영_프로필.pdf"],
    videoUrl: null,
    triage: "보류",
    createdAt: daysFromNow(-4),
  },
  {
    id: "app-103-4",
    roleId: "role-103",
    actorId: "act-20",
    source: "form",
    files: ["프로필_신경아.pdf"],
    videoUrl: "https://youtu.be/demo-kyunga",
    videoDuration: "0:55",
    triage: "보류",
    createdAt: daysFromNow(-3),
  },
  {
    id: "app-103-5",
    roleId: "role-103",
    actorId: "act-19",
    source: "form",
    files: ["강혜란_프로필.pdf"],
    videoUrl: null,
    triage: "제외",
    createdAt: daysFromNow(-3),
  },
  {
    id: "app-103-6",
    roleId: "role-103",
    actorId: "act-21",
    source: "email",
    files: ["오정임_프로필.pdf"],
    videoUrl: null,
    triage: "제외",
    note: "연령대 상단 초과",
    createdAt: daysFromNow(-2),
  },
  {
    id: "app-103-7",
    roleId: "role-103",
    actorId: "act-22",
    source: "form",
    files: ["프로필_백승희.pdf"],
    videoUrl: "https://youtu.be/demo-seunghee",
    videoDuration: "1:07",
    triage: null,
    createdAt: daysFromNow(-1),
  },

  // role-104 조직원3 (6건: 관심2 / 보류1 / 제외3)
  {
    id: "app-104-1",
    roleId: "role-104",
    actorId: "act-25",
    source: "form",
    files: ["프로필_서동혁.pdf"],
    videoUrl: "https://youtu.be/demo-donghyuk",
    videoDuration: "1:28",
    intro: "유도 3단. 낙법 직접 소화합니다.",
    triage: "관심",
    note: "오디션 확정",
    createdAt: daysFromNow(-15),
  },
  {
    id: "app-104-2",
    roleId: "role-104",
    actorId: "act-28",
    source: "form",
    files: ["유상민_프로필.pdf"],
    videoUrl: "https://youtu.be/demo-sangmin2",
    videoDuration: "1:44",
    triage: "관심",
    note: "오디션 확정",
    createdAt: daysFromNow(-14),
  },
  {
    id: "app-104-3",
    roleId: "role-104",
    actorId: "act-24",
    source: "email",
    files: ["노윤호_프로필.pdf"],
    videoUrl: "https://youtu.be/demo-yunho",
    videoDuration: "0:49",
    triage: "보류",
    createdAt: daysFromNow(-14),
  },
  {
    id: "app-104-4",
    roleId: "role-104",
    actorId: "act-23",
    source: "form",
    files: ["프로필_장현우.pdf"],
    videoUrl: "https://youtu.be/demo-hyunwoo2",
    videoDuration: "1:08",
    triage: "제외",
    note: "키 조건 미달",
    createdAt: daysFromNow(-13),
  },
  {
    id: "app-104-5",
    roleId: "role-104",
    actorId: "act-26",
    source: "form",
    files: ["임찬영_프로필.pdf"],
    videoUrl: null,
    triage: "제외",
    createdAt: daysFromNow(-12),
  },
  {
    id: "app-104-6",
    roleId: "role-104",
    actorId: "act-27",
    source: "email",
    files: ["권해성_프로필.pdf"],
    videoUrl: "https://youtu.be/demo-haesung",
    videoDuration: "1:21",
    triage: "제외",
    note: "코믹 이미지 강함",
    createdAt: daysFromNow(-12),
  },

  // role-105 주인공 동창 (3건: 전부 미분류 — 교차 지원 배우 2명 포함)
  {
    id: "app-105-1",
    roleId: "role-105",
    actorId: "act-23", // role-101/104에도 지원한 교차 지원자
    source: "form",
    files: ["프로필_장현우.pdf"],
    videoUrl: "https://youtu.be/demo-hyunwoo3",
    videoDuration: "1:08",
    intro: "또래 감성의 자연스러운 연기가 강점입니다.",
    triage: null,
    createdAt: daysFromNow(-1),
  },
  {
    id: "app-105-2",
    roleId: "role-105",
    actorId: "act-25", // 교차 지원자
    source: "form",
    files: ["프로필_서동혁.pdf"],
    videoUrl: "https://youtu.be/demo-donghyuk2",
    videoDuration: "1:28",
    triage: null,
    createdAt: daysFromNow(-1),
  },
  {
    id: "app-105-3",
    roleId: "role-105",
    actorId: "act-27",
    source: "form",
    files: ["권해성_프로필.pdf"],
    videoUrl: null,
    triage: null,
    createdAt: daysFromNow(0),
  },

  // role-106 시장 상인 — 지원 0 (링크만 발급된 상태의 현실감)
] as const satisfies readonly ApplicationSeed[];

export type ApplicationId = (typeof applications)[number]["id"];

// ─── 숏리스트 ───────────────────────────────────────────
// 토큰은 데모 중 주소창에 직접 칠 수 있도록 기억 가능한 슬러그.

type ShortlistSeed = Omit<Shortlist, "roleId"> & { roleId: RoleId };

export const shortlists = [
  {
    id: "sl-1",
    roleId: "role-101",
    title: "형사2역 1차 후보",
    token: "demo-hs2",
    deadline: daysFromNow(3),
    allowComment: true,
    createdAt: daysFromNow(-2),
  },
  {
    id: "sl-2",
    roleId: "role-104",
    title: "조직원3 최종",
    token: "demo-org3",
    deadline: daysFromNow(-2),
    allowComment: false,
    createdAt: daysFromNow(-10),
  },
] as const satisfies readonly ShortlistSeed[];

export type ShortlistId = (typeof shortlists)[number]["id"];

type ShortlistItemSeed = Omit<ShortlistItem, "shortlistId" | "applicationId"> & {
  shortlistId: ShortlistId;
  applicationId: ApplicationId;
};

export const shortlistItems = [
  // sl-1: 형사2역 관심 4명 + 보류 1명 승격
  { id: "sli-1", shortlistId: "sl-1", applicationId: "app-101-1", order: 1 },
  { id: "sli-2", shortlistId: "sl-1", applicationId: "app-101-2", order: 2 },
  { id: "sli-3", shortlistId: "sl-1", applicationId: "app-101-3", order: 3 },
  { id: "sli-4", shortlistId: "sl-1", applicationId: "app-101-4", order: 4 },
  { id: "sli-5", shortlistId: "sl-1", applicationId: "app-101-5", order: 5 },
  // sl-2: 조직원3
  { id: "sli-6", shortlistId: "sl-2", applicationId: "app-104-1", order: 1 },
  { id: "sli-7", shortlistId: "sl-2", applicationId: "app-104-2", order: 2 },
  { id: "sli-8", shortlistId: "sl-2", applicationId: "app-104-3", order: 3 },
] as const satisfies readonly ShortlistItemSeed[];

export type ShortlistItemId = (typeof shortlistItems)[number]["id"];

type ReviewSeed = Omit<Review, "shortlistItemId"> & {
  shortlistItemId: ShortlistItemId;
};

export const reviews = [
  // sl-1: 5명 중 3명만 응답 — "응답 3/5 · 리마인드" 상태
  {
    shortlistItemId: "sli-1",
    verdict: "like",
    watchSeconds: 84,
    reviewedAt: daysFromNow(-1),
  },
  {
    shortlistItemId: "sli-2",
    verdict: "like",
    comment: "2번 톤 좋네요. 사투리도 자연스럽고.",
    watchSeconds: 45,
    reviewedAt: daysFromNow(-1),
  },
  {
    shortlistItemId: "sli-3",
    verdict: "hold",
    watchSeconds: 12, // 영상을 거의 안 본 티
    reviewedAt: daysFromNow(-1),
  },
  // sl-2: 3/3 완료
  {
    shortlistItemId: "sli-6",
    verdict: "like",
    watchSeconds: 63,
    reviewedAt: daysFromNow(-8),
  },
  {
    shortlistItemId: "sli-7",
    verdict: "like",
    watchSeconds: 51,
    reviewedAt: daysFromNow(-8),
  },
  {
    shortlistItemId: "sli-8",
    verdict: "pass",
    watchSeconds: 8,
    reviewedAt: daysFromNow(-7),
  },
] as const satisfies readonly ReviewSeed[];
