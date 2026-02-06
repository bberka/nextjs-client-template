export async function initMocks() {
  if (typeof window === "undefined") return;

  const { worker } = await import("./msw/browser");
  await worker.start({
    onUnhandledRequest: "bypass",
    quiet: false,
  });
}
