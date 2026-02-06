"use client";

import { useQuery } from "@tanstack/react-query";
import { currentUserQueryOptions } from "../services/auth-queries";
import { useAuthStore } from "./use-auth";

export function useCurrentUser() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    ...currentUserQueryOptions,
    enabled: isAuthenticated,
  });
}
