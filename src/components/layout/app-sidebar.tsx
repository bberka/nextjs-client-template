"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ROUTES, localizedRoute } from "@/constants/routes";
import {
  LayoutDashboard,
  Users,
  Shield,
  KeyRound,
  ScrollText,
  User,
  Settings,
} from "lucide-react";

interface AppSidebarProps {
  locale: string;
  isAdmin?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function AppSidebar({ locale, isAdmin }: AppSidebarProps) {
  const pathname = usePathname();

  const mainNav: NavItem[] = [
    { label: "Dashboard", href: localizedRoute(locale, ROUTES.DASHBOARD), icon: <LayoutDashboard className="size-4" /> },
    { label: "Profile", href: localizedRoute(locale, ROUTES.PROFILE), icon: <User className="size-4" /> },
  ];

  const adminNav: NavItem[] = [
    { label: "Users", href: localizedRoute(locale, ROUTES.ADMIN_USERS), icon: <Users className="size-4" /> },
    { label: "Roles", href: localizedRoute(locale, ROUTES.ADMIN_ROLES), icon: <Shield className="size-4" /> },
    { label: "Permissions", href: localizedRoute(locale, ROUTES.ADMIN_PERMISSIONS), icon: <KeyRound className="size-4" /> },
    { label: "Audit Log", href: localizedRoute(locale, ROUTES.ADMIN_AUDIT_LOG), icon: <ScrollText className="size-4" /> },
  ];

  return (
    <aside className="hidden md:flex w-60 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center border-b px-4">
        <Link href={localizedRoute(locale, ROUTES.DASHBOARD)} className="flex items-center gap-2 font-semibold">
          <Settings className="size-5" />
          <span>App Template</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="mb-2 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Main</div>
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
        {isAdmin && (
          <>
            <div className="mt-4 mb-2 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Admin</div>
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </>
        )}
      </nav>
    </aside>
  );
}
