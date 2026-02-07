"use client";

import Link from "next/link";
import { ROUTES, localizedRoute } from "@/constants/routes";
import { Settings } from "lucide-react";
import { SidebarNavLinks } from "./sidebar-nav";

interface AppSidebarProps {
  locale: string;
  isAdmin?: boolean;
}

export function AppSidebar({ locale, isAdmin }: AppSidebarProps) {
  return (
    <aside className="hidden md:flex w-60 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center border-b px-4">
        <Link href={localizedRoute(locale, ROUTES.DASHBOARD)} className="flex items-center gap-2 font-semibold">
          <Settings className="size-5" />
          <span>App Template</span>
        </Link>
      </div>
      <SidebarNavLinks locale={locale} isAdmin={isAdmin} />
    </aside>
  );
}
