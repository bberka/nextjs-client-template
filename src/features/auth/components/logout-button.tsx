"use client";

import { useRouter } from "next/navigation";
import { useLogout } from "../hooks/use-logout";
import { useTranslate, useLocalizedRoute } from "@/features/i18n";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const { t } = useTranslate();
  const { lr } = useLocalizedRoute();
  const router = useRouter();
  const logoutMutation = useLogout();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    router.push(lr(ROUTES.LOGIN));
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout} disabled={logoutMutation.isPending}>
      <LogOut className="size-4" />
      {t("auth.logout")}
    </Button>
  );
}
