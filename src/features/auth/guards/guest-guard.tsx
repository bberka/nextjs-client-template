"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../hooks/use-auth";
import { useLocalizedRoute } from "@/features/i18n";
import { ROUTES } from "@/constants/routes";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { useEvent } from "@/lib/events/use-event";
import { AUTH_EVENTS } from "../events";

export function GuestGuard({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();
  const { lr } = useLocalizedRoute();

  useEvent(AUTH_EVENTS.LOGIN, () => {
    // Another tab logged in — reload auth state from localStorage
    const token = localStorage.getItem("auth_token");
    const userRaw = localStorage.getItem("auth_user");
    if (token && userRaw) {
      try {
        setAuth(JSON.parse(userRaw), token);
      } catch {
        // ignore parse errors
      }
    }
    router.replace(lr(ROUTES.DASHBOARD));
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(lr(ROUTES.DASHBOARD));
    }
  }, [isAuthenticated, router, lr]);

  if (isAuthenticated) {
    return <LoadingSpinner fullPage />;
  }

  return <>{children}</>;
}
