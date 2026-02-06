"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/auth-service";
import { useAuthStore } from "./use-auth";
import { eventBus } from "@/lib/events/event-bus";
import { broadcast } from "@/lib/events/broadcast";
import { AUTH_EVENTS } from "../events";

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSettled() {
      clearAuth();
      queryClient.clear();
      eventBus.emit(AUTH_EVENTS.LOGOUT);
      broadcast(AUTH_EVENTS.LOGOUT);
    },
  });
}
