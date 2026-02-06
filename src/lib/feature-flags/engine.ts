import { create } from "zustand";
import { localStore } from "@/lib/storage/local";

const STORAGE_KEY = "feature_flags";

interface FeatureFlagState {
  flags: Record<string, boolean>;
  isEnabled: (flag: string) => boolean;
  setFlag: (flag: string, enabled: boolean) => void;
  loadFlags: (defaults: Record<string, boolean>) => void;
}

export const useFeatureFlagStore = create<FeatureFlagState>((set, get) => ({
  flags: localStore.getItem<Record<string, boolean>>(STORAGE_KEY) ?? {},

  isEnabled(flag: string) {
    return get().flags[flag] ?? false;
  },

  setFlag(flag: string, enabled: boolean) {
    set((state) => {
      const flags = { ...state.flags, [flag]: enabled };
      localStore.setItem(STORAGE_KEY, flags);
      return { flags };
    });
  },

  loadFlags(defaults: Record<string, boolean>) {
    const stored = localStore.getItem<Record<string, boolean>>(STORAGE_KEY) ?? {};
    const merged = { ...defaults, ...stored };
    localStore.setItem(STORAGE_KEY, merged);
    set({ flags: merged });
  },
}));

export function useFeatureFlag(flag: string): boolean {
  return useFeatureFlagStore((state) => state.isEnabled(flag));
}
