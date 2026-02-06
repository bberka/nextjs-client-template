export type BotProtectionProvider = "turnstile" | "mock";

export interface BotProtectionResult {
  token: string;
  provider: BotProtectionProvider;
}
