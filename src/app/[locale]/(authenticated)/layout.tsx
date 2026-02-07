"use client";

import { AuthGuard, useAuthStore, UserMenu, UserRole } from "@/features/auth";
import { useLocale, LocaleSwitcher } from "@/features/i18n";
import { AppLayout } from "@/components/layout/app-layout";
import { useThemeSync } from "@/features/theme";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((s) => s.user);
  const { locale } = useLocale();
  const { resolvedTheme, setTheme } = useThemeSync();

  return (
    <AuthGuard>
      <AppLayout
        locale={locale}
        isAdmin={user?.role === UserRole.Admin}
        headerContent={
          <div className="flex flex-1 items-center justify-end gap-2">
            <LocaleSwitcher />
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              title="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <UserMenu />
          </div>
        }
      >
        {children}
      </AppLayout>
    </AuthGuard>
  );
}
