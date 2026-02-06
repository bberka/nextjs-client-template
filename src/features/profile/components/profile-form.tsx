"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateProfileSchema } from "../schemas";
import { useUpdateProfile } from "../hooks/use-update-profile";
import { useTranslate } from "@/features/i18n";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/shared/form-field";
import type { UserProfile } from "../types";

type ProfileFormData = z.infer<typeof updateProfileSchema>;

interface ProfileFormProps {
  profile: UserProfile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const { t } = useTranslate();
  const updateMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: profile.name, email: profile.email },
  });

  useEffect(() => {
    reset({ name: profile.name, email: profile.email });
  }, [profile, reset]);

  async function onSubmit(data: ProfileFormData) {
    await updateMutation.mutateAsync(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
      <FormField label={t("profile.name")} htmlFor="name" error={errors.name?.message}>
        <input
          id="name"
          type="text"
          className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          {...register("name")}
        />
      </FormField>
      <FormField label={t("profile.email")} htmlFor="email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          {...register("email")}
        />
      </FormField>
      <Button type="submit" disabled={!isDirty || updateMutation.isPending}>
        {updateMutation.isPending ? t("common.loading") : t("profile.save")}
      </Button>
    </form>
  );
}
