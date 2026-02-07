import { create } from "zustand";
import type { User } from "../types";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

function loadPersistedUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function loadPersistedToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

const persistedUser = loadPersistedUser();
const persistedToken = loadPersistedToken();

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: persistedUser,
  token: persistedToken,
  isAuthenticated: !!persistedToken && !!persistedUser,

  setAuth(user: User, token: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    }
    set({ user, token, isAuthenticated: true });
  },

  clearAuth() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
