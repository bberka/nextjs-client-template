"use client";

import type { ReactNode } from "react";

export function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}
