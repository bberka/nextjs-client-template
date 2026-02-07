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
  Home,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function getMainNav(locale: string): NavItem[] {
  return [
    { label: "Home", href: localizedRoute(locale, ROUTES.HOME), icon: <Home className="size-4" /> },
    { label: "Dashboard", href: localizedRoute(locale, ROUTES.DASHBOARD), icon: <LayoutDashboard className="size-4" /> },
    { label: "Profile", href: localizedRoute(locale, ROUTES.PROFILE), icon: <User className="size-4" /> },
  ];
}

export function getAdminNav(locale: string): NavItem[] {
  return [
    { label: "Users", href: localizedRoute(locale, ROUTES.ADMIN_USERS), icon: <Users className="size-4" /> },
    { label: "Roles", href: localizedRoute(locale, ROUTES.ADMIN_ROLES), icon: <Shield className="size-4" /> },
    { label: "Permissions", href: localizedRoute(locale, ROUTES.ADMIN_PERMISSIONS), icon: <KeyRound className="size-4" /> },
    { label: "Audit Log", href: localizedRoute(locale, ROUTES.ADMIN_AUDIT_LOG), icon: <ScrollText className="size-4" /> },
  ];
}

interface SidebarNavLinksProps {
  locale: string;
  isAdmin?: boolean;
  onNavigate?: () => void;
}

export function SidebarNavLinks({ locale, isAdmin, onNavigate }: SidebarNavLinksProps) {
  const pathname = usePathname();
  const mainNav = getMainNav(locale);
  const adminNav = getAdminNav(locale);

  return (
    <nav className="flex-1 overflow-y-auto p-3 space-y-1">
      <div className="mb-2 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Main</div>
      {mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
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
              onClick={onNavigate}
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
  );
}
