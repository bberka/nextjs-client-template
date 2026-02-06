"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OtpInput } from "./otp-input";
import { useRequestOtp } from "../hooks/use-request-otp";
import { useVerifyOtp } from "../hooks/use-verify-otp";
import { useTranslate } from "@/features/i18n";
import { SeverityLevel } from "@/types/api";

interface OtpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onVerified: () => void;
}

const RESEND_COOLDOWN = 60;

export function OtpDialog({ open, onOpenChange, email, onVerified }: OtpDialogProps) {
  const { t } = useTranslate();
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const requestOtp = useRequestOtp();
  const verifyOtp = useVerifyOtp();

  useEffect(() => {
    if (!open) {
      setCode("");
      setCountdown(RESEND_COOLDOWN);
      return;
    }
    const interval = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [open]);

  const handleResend = useCallback(async () => {
    await requestOtp.mutateAsync({ email });
    setCountdown(RESEND_COOLDOWN);
  }, [email, requestOtp]);

  async function handleVerify() {
    const result = await verifyOtp.mutateAsync({ email, code });
    if (result.severity === SeverityLevel.Success) {
      onVerified();
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t("otp.title")}</DialogTitle>
          <DialogDescription>{t("otp.subtitle")}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <OtpInput value={code} onChange={setCode} disabled={verifyOtp.isPending} />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleResend}
            disabled={countdown > 0 || requestOtp.isPending}
          >
            {countdown > 0 ? t("otp.resendIn", { seconds: countdown }) : t("otp.resend")}
          </Button>
          <Button onClick={handleVerify} disabled={code.length !== 6 || verifyOtp.isPending}>
            {verifyOtp.isPending ? t("common.loading") : t("otp.submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
