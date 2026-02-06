"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../services/profile-service";
import { profileKeys } from "../services/profile-queries";
import { showResult } from "@/services/notification-service";
import type { UpdateProfileRequest } from "../types";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateProfile(data),
    onSuccess(result) {
      showResult(result);
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
  });
}
