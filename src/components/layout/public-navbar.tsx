"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useLocalizedRoute, useTranslate, useLocale } from "@/features/i18n";
import { useAuthStore } from "@/features/auth";
import { useThemeSync } from "@/features/theme";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Globe, Menu, X } from "lucide-react";

interface NavLink {
  labelKey: string;
  route: string;
}

const NAV_LINKS: NavLink[] = [
  { labelKey: "publicNav.home", route: ROUTES.HOME },
  { labelKey: "publicNav.pricing", route: ROUTES.PRICING },
  { labelKey: "publicNav.blog", route: ROUTES.BLOG },
  { labelKey: "publicNav.announcements", route: ROUTES.ANNOUNCEMENTS },
  { labelKey: "publicNav.changelogs", route: ROUTES.CHANGELOGS },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const { t } = useTranslate();
  const { lr } = useLocalizedRoute();
  const { locale, setLocale, supportedLocales } = useLocale();
  const { resolvedTheme, setTheme } = useThemeSync();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(route: string) {
    const href = lr(route);
    if (route === ROUTES.HOME) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href={lr(ROUTES.HOME)} className="flex items-center gap-2 font-semibold text-lg">
          {t("app.title")}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.route}
              href={lr(link.route)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive(link.route) && "bg-accent text-accent-foreground font-medium",
              )}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => {
              const next = supportedLocales[(supportedLocales.indexOf(locale) + 1) % supportedLocales.length];
              setLocale(next);
            }}
            title="Switch language"
          >
            <Globe className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            title="Toggle theme"
          >
            {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          {isAuthenticated ? (
            <Button asChild size="sm">
              <Link href={lr(ROUTES.DASHBOARD)}>{t("publicNav.dashboard")}</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href={lr(ROUTES.LOGIN)}>{t("publicNav.login")}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={lr(ROUTES.REGISTER)}>{t("publicNav.register")}</Link>
              </Button>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="border-t px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.route}
                href={lr(link.route)}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive(link.route) && "bg-accent text-accent-foreground font-medium",
                )}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-2 border-t pt-3">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                const next = supportedLocales[(supportedLocales.indexOf(locale) + 1) % supportedLocales.length];
                setLocale(next);
              }}
            >
              <Globe className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <div className="flex-1" />
            {isAuthenticated ? (
              <Button asChild size="sm">
                <Link href={lr(ROUTES.DASHBOARD)} onClick={() => setMobileOpen(false)}>
                  {t("publicNav.dashboard")}
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={lr(ROUTES.LOGIN)} onClick={() => setMobileOpen(false)}>
                    {t("publicNav.login")}
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={lr(ROUTES.REGISTER)} onClick={() => setMobileOpen(false)}>
                    {t("publicNav.register")}
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
