import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function ShortcutBar() {
  return (
    <div className="flex flex-none flex-wrap items-center gap-4 border-t px-4 py-2 text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <KbdGroup>
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
        </KbdGroup>
        이동
      </span>
      <span className="flex items-center gap-1.5">
        <KbdGroup>
          <Kbd>1</Kbd>
          <Kbd>2</Kbd>
          <Kbd>3</Kbd>
        </KbdGroup>
        분류
      </span>
      <span className="flex items-center gap-1.5">
        <Kbd>Space</Kbd>
        영상 재생
      </span>
      <span className="flex items-center gap-1.5">
        <Kbd>M</Kbd>
        메모
      </span>
    </div>
  );
}
