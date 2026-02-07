"use client";

import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/routes";
import { useLocalizedRoute, useTranslate } from "@/features/i18n";
import { SeverityLevel } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "../hooks/use-login";
import { loginSchema } from "../schemas";
import { OAuthButtons } from "./oauth-buttons";

type LoginFormData = z.infer<typeof loginSchema>;

const DEMO_USERS = [
  { email: "admin@example.com", password: "admin123", label: "Admin" },
  { email: "user@example.com", password: "user123", label: "User" },
] as const;

export function LoginForm() {
  const { t } = useTranslate();
  const { lr } = useLocalizedRoute();
  const router = useRouter();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    const result = await loginMutation.mutateAsync(data);
    if (result.severity === SeverityLevel.Success) {
      router.push(lr(ROUTES.DASHBOARD));
    }
  }

  function handleDemoLogin(email: string, password: string) {
    setValue("email", email);
    setValue("password", password);
    handleSubmit(onSubmit)();
  }

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("auth.login.title")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("auth.login.subtitle")}
        </p>
      </div>

      <OAuthButtons disabled={loginMutation.isPending} />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t("auth.login.orContinueWith")}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label={t("auth.login.email")}
          htmlFor="email"
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            {...register("email")}
          />
        </FormField>
        <FormField
          label={t("auth.login.password")}
          htmlFor="password"
          error={errors.password?.message}
        >
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            {...register("password")}
          />
        </FormField>
        <div className="flex justify-end">
          <Link
            href={lr(ROUTES.FORGOT_PASSWORD)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {t("auth.login.forgotPassword")}
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending
            ? t("common.loading")
            : t("auth.login.submit")}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {t("auth.login.noAccount")}{" "}
        <Link
          href={lr(ROUTES.REGISTER)}
          className="font-medium text-foreground hover:underline"
        >
          {t("auth.login.register")}
        </Link>
      </p>

      {/* Demo Users */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t("auth.login.demoAccounts")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {DEMO_USERS.map((user) => (
          <Button
            key={user.email}
            variant="secondary"
            type="button"
            className="w-full text-xs"
            disabled={loginMutation.isPending}
            onClick={() => handleDemoLogin(user.email, user.password)}
          >
            {user.label}
            <span className="ml-1 text-muted-foreground">({user.email})</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
