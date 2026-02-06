"use client";

import { Shield } from "lucide-react";

interface BotProtectionWidgetProps {
  onVerified?: (token: string) => void;
}

export function BotProtectionWidget({ onVerified }: BotProtectionWidgetProps) {
  // Mock implementation — in production, integrate Turnstile or reCAPTCHA
  function handleClick() {
    onVerified?.(`mock-captcha-${Date.now()}`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
    >
      <Shield className="size-4" />
      <span>Verify you are human (mock)</span>
    </button>
  );
}
