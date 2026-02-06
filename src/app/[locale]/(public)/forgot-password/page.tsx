"use client";

import { GuestGuard, ForgotPasswordForm } from "@/features/auth";

export default function ForgotPasswordPage() {
  return (
    <GuestGuard>
      <div className="flex min-h-screen items-center justify-center px-4">
        <ForgotPasswordForm />
      </div>
    </GuestGuard>
  );
}
