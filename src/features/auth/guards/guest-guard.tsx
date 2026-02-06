"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../hooks/use-auth";
import { useLocalizedRoute } from "@/features/i18n";
import { ROUTES } from "@/constants/routes";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export function GuestGuard({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();
  const { lr } = useLocalizedRoute();

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
