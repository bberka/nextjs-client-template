"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import { eventBus } from "@/lib/events/event-bus";
import { broadcast } from "@/lib/events/broadcast";
import { THEME_EVENTS } from "../events";

export function useThemeSync() {
  const { theme, setTheme, resolvedTheme, themes } = useTheme();

  const handleThemeChange = useCallback(
    (newTheme: unknown) => {
      if (typeof newTheme === "string") {
        setTheme(newTheme);
      }
    },
    [setTheme],
  );

  useEffect(() => {
    eventBus.on(THEME_EVENTS.THEME_CHANGED, handleThemeChange);
    return () => {
      eventBus.off(THEME_EVENTS.THEME_CHANGED, handleThemeChange);
    };
  }, [handleThemeChange]);

  const setThemeAndSync = useCallback(
    (newTheme: string) => {
      setTheme(newTheme);
      broadcast(THEME_EVENTS.THEME_CHANGED, newTheme);
    },
    [setTheme],
  );

  return { theme, setTheme: setThemeAndSync, resolvedTheme, themes };
}
