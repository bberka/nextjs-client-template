import { queryOptions } from "@tanstack/react-query";
import { getProfile } from "./profile-service";

export const profileKeys = {
  all: ["profile"] as const,
  detail: () => [...profileKeys.all, "detail"] as const,
};

export const profileQueryOptions = queryOptions({
  queryKey: profileKeys.detail(),
  queryFn: getProfile,
});
