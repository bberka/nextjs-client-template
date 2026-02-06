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
import { Moon, Sun, Globe, Menu, X, ChevronDown } from "lucide-react";

interface NavLink {
  labelKey: string;
  route: string;
}

interface NavDropdownGroup {
  labelKey: string;
  links: NavLink[];
}

const NAV_GROUPS: NavDropdownGroup[] = [
  {
    labelKey: "publicNav.product",
    links: [
      { labelKey: "publicNav.features", route: ROUTES.FEATURES },
      { labelKey: "publicNav.pricing", route: ROUTES.PRICING },
      { labelKey: "publicNav.roadmap", route: ROUTES.ROADMAP },
      { labelKey: "publicNav.status", route: ROUTES.STATUS },
    ],
  },
  {
    labelKey: "publicNav.resources",
    links: [
      { labelKey: "publicNav.blog", route: ROUTES.BLOG },
      { labelKey: "publicNav.docs", route: ROUTES.DOCS },
      { labelKey: "publicNav.announcements", route: ROUTES.ANNOUNCEMENTS },
      { labelKey: "publicNav.changelogs", route: ROUTES.CHANGELOGS },
    ],
  },
  {
    labelKey: "publicNav.support",
    links: [
      { labelKey: "publicNav.faqs", route: ROUTES.FAQS },
      { labelKey: "publicNav.contact", route: ROUTES.CONTACT },
      { labelKey: "publicNav.feedback", route: ROUTES.FEEDBACK },
    ],
  },
];

function MobileNavGroup({
  group,
  onNavigate,
}: {
  group: NavDropdownGroup;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslate();
  const { lr } = useLocalizedRoute();
  const pathname = usePathname();

  function isActive(route: string) {
    const href = lr(route);
    if (route === ROUTES.HOME) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
      >
        {t(group.labelKey)}
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="ml-3 flex flex-col gap-1 border-l pl-3">
          {group.links.map((link) => (
            <Link
              key={link.route}
              href={lr(link.route)}
              onClick={onNavigate}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive(link.route) &&
                  "bg-accent text-accent-foreground font-medium",
              )}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

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

  function isGroupActive(group: NavDropdownGroup) {
    return group.links.some((link) => isActive(link.route));
  }

  const linkStyles =
    "rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground";
  const activeStyles = "bg-accent text-accent-foreground font-medium";

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link
          href={lr(ROUTES.HOME)}
          className="flex items-center gap-2 font-semibold text-lg"
        >
          {t("app.title")}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href={lr(ROUTES.HOME)}
            className={cn(linkStyles, isActive(ROUTES.HOME) && activeStyles)}
          >
            {t("publicNav.home")}
          </Link>

          {NAV_GROUPS.map((group) => (
            <div key={group.labelKey} className="group relative">
              <button
                type="button"
                className={cn(
                  linkStyles,
                  "flex items-center gap-1",
                  isGroupActive(group) && activeStyles,
                )}
              >
                {t(group.labelKey)}
                <ChevronDown className="size-3 transition-transform group-hover:rotate-180" />
              </button>

              <div className="invisible absolute left-0 top-full pt-1 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                <div className="min-w-45 rounded-md border bg-popover p-1 shadow-md">
                  {group.links.map((link) => (
                    <Link
                      key={link.route}
                      href={lr(link.route)}
                      className={cn(
                        "block rounded-sm px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                        isActive(link.route) &&
                          "bg-accent text-accent-foreground font-medium",
                      )}
                    >
                      {t(link.labelKey)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => {
              const next =
                supportedLocales[
                  (supportedLocales.indexOf(locale) + 1) %
                    supportedLocales.length
                ];
              setLocale(next);
            }}
            title="Switch language"
          >
            <Globe className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            title="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
          {isAuthenticated ? (
            <Button asChild size="sm">
              <Link href={lr(ROUTES.DASHBOARD)}>
                {t("publicNav.dashboard")}
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href={lr(ROUTES.LOGIN)}>{t("publicNav.login")}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={lr(ROUTES.REGISTER)}>
                  {t("publicNav.register")}
                </Link>
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
          {mobileOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </Button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            <Link
              href={lr(ROUTES.HOME)}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive(ROUTES.HOME) && activeStyles,
              )}
            >
              {t("publicNav.home")}
            </Link>

            {NAV_GROUPS.map((group) => (
              <MobileNavGroup
                key={group.labelKey}
                group={group}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-2 border-t pt-3">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                const next =
                  supportedLocales[
                    (supportedLocales.indexOf(locale) + 1) %
                      supportedLocales.length
                  ];
                setLocale(next);
              }}
            >
              <Globe className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {resolvedTheme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
            <div className="flex-1" />
            {isAuthenticated ? (
              <Button asChild size="sm">
                <Link
                  href={lr(ROUTES.DASHBOARD)}
                  onClick={() => setMobileOpen(false)}
                >
                  {t("publicNav.dashboard")}
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href={lr(ROUTES.LOGIN)}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("publicNav.login")}
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link
                    href={lr(ROUTES.REGISTER)}
                    onClick={() => setMobileOpen(false)}
                  >
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
