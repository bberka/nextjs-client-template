"use client";

import type { ReactNode } from "react";
import { PublicNavbar } from "./public-navbar";
import { PublicFooter } from "./public-footer";

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
