"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useLocalizedRoute, useTranslate } from "@/features/i18n";
import { Separator } from "@/components/ui/separator";

export function PublicFooter() {
  const { t } = useTranslate();
  const { lr } = useLocalizedRoute();

  const productLinks = [
    { labelKey: "publicNav.home", route: ROUTES.HOME },
    { labelKey: "publicNav.features", route: ROUTES.FEATURES },
    { labelKey: "publicNav.pricing", route: ROUTES.PRICING },
    { labelKey: "publicNav.roadmap", route: ROUTES.ROADMAP },
    { labelKey: "publicNav.blog", route: ROUTES.BLOG },
    { labelKey: "publicNav.docs", route: ROUTES.DOCS },
    { labelKey: "publicNav.announcements", route: ROUTES.ANNOUNCEMENTS },
    { labelKey: "publicNav.changelogs", route: ROUTES.CHANGELOGS },
  ];

  const supportLinks = [
    { labelKey: "publicNav.faqs", route: ROUTES.FAQS },
    { labelKey: "publicNav.contact", route: ROUTES.CONTACT },
    { labelKey: "publicNav.feedback", route: ROUTES.FEEDBACK },
    { labelKey: "publicNav.status", route: ROUTES.STATUS },
  ];

  const legalLinks = [
    { labelKey: "publicFooter.privacyPolicy", route: ROUTES.PRIVACY_POLICY },
    { labelKey: "publicFooter.termsOfService", route: ROUTES.TERMS_OF_SERVICE },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{t("app.title")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("publicFooter.description")}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("publicFooter.product")}
            </h4>
            <nav className="flex flex-col gap-2">
              {productLinks.map((link) => (
                <Link
                  key={link.route}
                  href={lr(link.route)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("publicFooter.support")}
            </h4>
            <nav className="flex flex-col gap-2">
              {supportLinks.map((link) => (
                <Link
                  key={link.route}
                  href={lr(link.route)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("publicFooter.legal")}
            </h4>
            <nav className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.route}
                  href={lr(link.route)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          {t("publicFooter.copyright")}
        </div>
      </div>
    </footer>
  );
}
