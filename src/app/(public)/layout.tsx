export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 배우·감독용 공개 화면은 모바일 우선 — 데스크톱에서도 폰 폭 컬럼으로 시뮬레이션
    <div className="flex min-h-dvh justify-center bg-neutral-100">
      <div className="flex min-h-dvh w-full max-w-[420px] flex-col bg-background shadow-sm">
        {children}
      </div>
    </div>
  );
}
