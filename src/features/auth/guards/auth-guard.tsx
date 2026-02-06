"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../hooks/use-auth";
import { useLocalizedRoute } from "@/features/i18n";
import { ROUTES } from "@/constants/routes";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { useEvent } from "@/lib/events/use-event";
import { AUTH_EVENTS } from "../events";

export function AuthGuard({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const router = useRouter();
  const { lr } = useLocalizedRoute();

  useEvent(AUTH_EVENTS.LOGOUT, () => {
    clearAuth();
    router.replace(lr(ROUTES.LOGIN));
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(lr(ROUTES.LOGIN));
    }
  }, [isAuthenticated, router, lr]);

  if (!isAuthenticated) {
    return <LoadingSpinner fullPage />;
  }

  return <>{children}</>;
}
