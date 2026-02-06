"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUserSchema, updateUserSchema } from "../schemas";
import { useCreateUser } from "../hooks/use-create-user";
import { useUpdateUser } from "../hooks/use-update-user";
import { useTranslate } from "@/features/i18n";
import { SeverityLevel } from "@/types/api";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/shared/form-field";
import type { AdminUser } from "../types";

type CreateFormData = z.infer<typeof createUserSchema>;
type UpdateFormData = z.infer<typeof updateUserSchema>;

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: AdminUser | null;
}

export function UserFormDialog({ open, onOpenChange, user }: UserFormDialogProps) {
  const { t } = useTranslate();
  const isEdit = !!user;
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const schema = isEdit ? updateUserSchema : createUserSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateFormData | UpdateFormData>({
    resolver: zodResolver(schema),
    defaultValues: user
      ? { name: user.name, email: user.email, role: user.role as "admin" | "user" }
      : { name: "", email: "", password: "", role: "user" as const },
  });

  useEffect(() => {
    if (open) {
      reset(
        user
          ? { name: user.name, email: user.email, role: user.role as "admin" | "user" }
          : { name: "", email: "", password: "", role: "user" as const },
      );
    }
  }, [open, user, reset]);

  async function onSubmit(data: CreateFormData | UpdateFormData) {
    if (isEdit && user) {
      const result = await updateMutation.mutateAsync({ id: user.id, data });
      if (result.severity === SeverityLevel.Success) onOpenChange(false);
    } else {
      const result = await createMutation.mutateAsync(data as CreateFormData);
      if (result.severity === SeverityLevel.Success) onOpenChange(false);
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? t("admin.users.edit") : t("admin.users.create")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label={t("auth.register.name")} htmlFor="name" error={errors.name?.message}>
            <input
              id="name"
              type="text"
              className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...register("name")}
            />
          </FormField>
          <FormField label={t("auth.register.email")} htmlFor="email" error={errors.email?.message}>
            <input
              id="email"
              type="email"
              className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...register("email")}
            />
          </FormField>
          {!isEdit && (
            <FormField label={t("auth.register.password")} htmlFor="password" error={(errors as Record<string, { message?: string }>).password?.message}>
              <input
                id="password"
                type="password"
                className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                {...register("password" as never)}
              />
            </FormField>
          )}
          <FormField label="Role" htmlFor="role">
            <select
              id="role"
              className="flex h-9 w-full rounded-md border bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...register("role")}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </FormField>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)} disabled={isPending}>
              {t("common.cancel")}
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? t("common.loading") : t("common.save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
