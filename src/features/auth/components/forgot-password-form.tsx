"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { forgotPasswordSchema } from "../schemas";
import { useForgotPassword } from "../hooks/use-forgot-password";
import { useTranslate, useLocalizedRoute } from "@/features/i18n";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/shared/form-field";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const { t } = useTranslate();
  const { lr } = useLocalizedRoute();
  const forgotMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    await forgotMutation.mutateAsync(data);
  }

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{t("auth.forgotPassword.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("auth.forgotPassword.subtitle")}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label={t("auth.forgotPassword.email")} htmlFor="email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            {...register("email")}
          />
        </FormField>
        <Button type="submit" className="w-full" disabled={forgotMutation.isPending}>
          {forgotMutation.isPending ? t("common.loading") : t("auth.forgotPassword.submit")}
        </Button>
      </form>
      <p className="text-center text-sm">
        <Link href={lr(ROUTES.LOGIN)} className="text-muted-foreground hover:text-foreground">
          {t("auth.forgotPassword.backToLogin")}
        </Link>
      </p>
    </div>
  );
}
