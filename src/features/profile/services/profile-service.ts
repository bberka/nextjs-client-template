import { apiClient } from "@/lib/api/client";
import type { UserProfile, UpdateProfileRequest } from "../types";

export function getProfile() {
  return apiClient.get<UserProfile>("/profile");
}

export function updateProfile(data: UpdateProfileRequest) {
  return apiClient.put<UserProfile>("/profile", data);
}
