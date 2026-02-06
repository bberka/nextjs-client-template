"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth";
import { useLocalizedRoute } from "@/features/i18n";
import { ROUTES } from "@/constants/routes";

export default function HomePage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { lr } = useLocalizedRoute();

  useEffect(() => {
    router.replace(lr(isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN));
  }, [isAuthenticated, router, lr]);

  return null;
}
