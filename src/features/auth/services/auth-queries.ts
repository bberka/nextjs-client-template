import { queryOptions } from "@tanstack/react-query";
import { getCurrentUser } from "./auth-service";

export const authKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authKeys.all, "current-user"] as const,
};

export const currentUserQueryOptions = queryOptions({
  queryKey: authKeys.currentUser(),
  queryFn: getCurrentUser,
  retry: false,
  staleTime: 5 * 60 * 1000,
});
