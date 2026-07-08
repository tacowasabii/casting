import { cn } from "@/lib/utils";

/** ⌕ 검색 필드 — onChange 없이 쓰면 장식용 정적 박스로 렌더 (대시보드 톱바) */
export function SearchField({
  placeholder,
  value,
  onChange,
  className,
}: {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded border border-input bg-card px-3.5 py-[9px]",
        className,
      )}
    >
      <span className="text-sm text-[#aeaeae]">⌕</span>
      {onChange ? (
        <input
          type="search"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-[13px] text-foreground outline-none placeholder:text-[#aeaeae]"
        />
      ) : (
        <span className="text-[13px] text-[#aeaeae]">{placeholder}</span>
      )}
    </div>
  );
}
