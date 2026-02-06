import { useEffect } from "react";
import { eventBus } from "./event-bus";

export function useEvent<T = unknown>(event: string, handler: (payload: T) => void) {
  useEffect(() => {
    eventBus.on(event, handler);
    return () => {
      eventBus.off(event, handler);
    };
  }, [event, handler]);
}
