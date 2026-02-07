"use client";

import type { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";
import { MobileSidebar } from "./mobile-sidebar";

interface AppLayoutProps {
  locale: string;
  isAdmin?: boolean;
  headerContent?: ReactNode;
  children: ReactNode;
}

export function AppLayout({ locale, isAdmin, headerContent, children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar locale={locale} isAdmin={isAdmin} />
      <div className="flex flex-1 flex-col">
        <AppHeader mobileMenuTrigger={<MobileSidebar locale={locale} isAdmin={isAdmin} />}>
          {headerContent}
        </AppHeader>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
