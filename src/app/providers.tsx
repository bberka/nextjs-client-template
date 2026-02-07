"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode, useEffect, useState } from "react";
import { initBroadcast } from "@/lib/events/broadcast";

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      }),
  );

  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    initBroadcast();

    async function init() {
      if (process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_ENABLE_MSW === "true") {
        const { initMocks } = await import("@/lib/api/mock-adapter");
        await initMocks();
      }
      setMswReady(true);
    }

    init();
  }, []);

  if (!mswReady) return null;

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
