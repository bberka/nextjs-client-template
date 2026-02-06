import { eventBus } from "./event-bus";

let channel: BroadcastChannel | null = null;

const CHANNEL_NAME = "app-sync";

export function initBroadcast() {
  if (typeof window === "undefined") return;
  if (channel) return;

  channel = new BroadcastChannel(CHANNEL_NAME);
  channel.onmessage = (event) => {
    const { type, payload } = event.data as { type: string; payload: unknown };
    eventBus.emit(type, payload);
  };
}

export function broadcast(event: string, payload?: unknown) {
  channel?.postMessage({ type: event, payload });
}
