"use client";

import { GuestGuard, RegisterForm } from "@/features/auth";

export default function RegisterPage() {
  return (
    <GuestGuard>
      <div className="flex min-h-screen items-center justify-center px-4">
        <RegisterForm />
      </div>
    </GuestGuard>
  );
}
