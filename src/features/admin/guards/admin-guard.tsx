"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth";
import { UserRole } from "@/features/auth";
import { useLocalizedRoute } from "@/features/i18n";
import { ROUTES } from "@/constants/routes";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export function AdminGuard({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();
  const { lr } = useLocalizedRoute();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(lr(ROUTES.LOGIN));
    } else if (user && user.role !== UserRole.Admin) {
      router.replace(lr(ROUTES.DASHBOARD));
    }
  }, [isAuthenticated, user, router, lr]);

  if (!isAuthenticated || !user || user.role !== UserRole.Admin) {
    return <LoadingSpinner fullPage />;
  }

  return <>{children}</>;
}
