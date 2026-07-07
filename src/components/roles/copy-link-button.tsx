"use client";

import { LinkIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function CopyLinkButton({
  path,
  label,
  className,
}: {
  path: string;
  label: string;
  className?: string;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={className}
      onClick={() => {
        void navigator.clipboard.writeText(
          `${window.location.origin}${path}`,
        );
        toast("링크가 복사되었습니다");
      }}
    >
      <LinkIcon data-icon="inline-start" />
      {label}
    </Button>
  );
}
