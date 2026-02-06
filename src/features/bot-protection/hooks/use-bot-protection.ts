"use client";

import { useCallback, useState } from "react";
import type { BotProtectionResult } from "../types";

export function useBotProtection() {
  const [isVerifying, setIsVerifying] = useState(false);

  const verify = useCallback(async (): Promise<BotProtectionResult> => {
    setIsVerifying(true);
    try {
      // In development/mock mode, return a mock token
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { token: `mock-captcha-${Date.now()}`, provider: "mock" };
    } finally {
      setIsVerifying(false);
    }
  }, []);

  return { verify, isVerifying };
}
