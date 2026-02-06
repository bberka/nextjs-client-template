type EventHandler<T = unknown> = (payload: T) => void;

const listeners = new Map<string, Set<EventHandler>>();

export const eventBus = {
  on<T = unknown>(event: string, handler: EventHandler<T>) {
    if (!listeners.has(event)) {
      listeners.set(event, new Set());
    }
    listeners.get(event)!.add(handler as EventHandler);
  },

  off<T = unknown>(event: string, handler: EventHandler<T>) {
    listeners.get(event)?.delete(handler as EventHandler);
  },

  emit<T = unknown>(event: string, payload?: T) {
    listeners.get(event)?.forEach((handler) => handler(payload));
  },
};
