import { cn } from "@/lib/utils";

export interface GridTableHeader {
  label: string;
  align?: "left" | "right";
}

/** px+fr 혼합 grid 테이블 — 배우 목록·숏리스트 결과. 행은 GridTableRow로 같은 컬럼을 공유한다. */
export function GridTable({
  columns,
  headers,
  gap = 14,
  padX = 30,
  className,
  children,
}: {
  /** grid-template-columns 값 (예: "2.2fr 52px 52px 1.1fr 1.6fr 64px 88px") */
  columns: string;
  headers: GridTableHeader[];
  gap?: number;
  padX?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={className}
      style={
        {
          "--grid-table-cols": columns,
          "--grid-table-gap": `${gap}px`,
          "--grid-table-pad-x": `${padX}px`,
        } as React.CSSProperties
      }
    >
      <div
        className="grid items-center border-b border-border bg-panel py-3"
        style={{
          gridTemplateColumns: "var(--grid-table-cols)",
          gap: "var(--grid-table-gap)",
          paddingInline: "var(--grid-table-pad-x)",
        }}
      >
        {headers.map((h) => (
          <span
            key={h.label}
            className={cn("caption-sm", h.align === "right" && "text-right")}
          >
            {h.label}
          </span>
        ))}
      </div>
      {children}
    </div>
  );
}

export function GridTableRow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "grid items-center border-b border-hairline py-[13px]",
        className,
      )}
      style={{
        gridTemplateColumns: "var(--grid-table-cols)",
        gap: "var(--grid-table-gap)",
        paddingInline: "var(--grid-table-pad-x)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
