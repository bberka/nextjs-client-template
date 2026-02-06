"use client";

import { useQuery } from "@tanstack/react-query";
import { profileQueryOptions } from "../services/profile-queries";

export function useProfile() {
  return useQuery(profileQueryOptions);
}
