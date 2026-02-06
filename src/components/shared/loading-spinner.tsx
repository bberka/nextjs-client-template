"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  fullPage?: boolean;
}

export function LoadingSpinner({ className, fullPage }: LoadingSpinnerProps) {
  if (fullPage) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className={cn("size-8 animate-spin text-muted-foreground", className)} />
      </div>
    );
  }

  return <Loader2 className={cn("size-5 animate-spin text-muted-foreground", className)} />;
}
