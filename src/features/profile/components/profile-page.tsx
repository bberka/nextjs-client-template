"use client";

import { useProfile } from "../hooks/use-profile";
import { ProfileForm } from "./profile-form";
import { useTranslate } from "@/features/i18n";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { SeverityLevel } from "@/types/api";

export function ProfilePage() {
  const { t } = useTranslate();
  const { data: result, isLoading } = useProfile();

  if (isLoading) return <LoadingSpinner fullPage />;

  const profile = result?.severity === SeverityLevel.Success ? result.value : null;
  if (!profile) return <p className="text-muted-foreground">Failed to load profile.</p>;

  return (
    <div className="space-y-6">
      <PageHeader title={t("profile.title")} description={t("profile.subtitle")} />
      <ProfileForm profile={profile} />
    </div>
  );
}
