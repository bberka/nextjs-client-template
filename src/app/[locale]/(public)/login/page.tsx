"use client";

import { GuestGuard, LoginForm } from "@/features/auth";

export default function LoginPage() {
  return (
    <GuestGuard>
      <div className="flex min-h-screen items-center justify-center px-4">
        <LoginForm />
      </div>
    </GuestGuard>
  );
}
