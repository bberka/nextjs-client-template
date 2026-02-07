"use client";

import type { ReactNode } from "react";

interface AppHeaderProps {
  mobileMenuTrigger?: ReactNode;
  children?: ReactNode;
}

export function AppHeader({ mobileMenuTrigger, children }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
      {mobileMenuTrigger}
      {children}
    </header>
  );
}
