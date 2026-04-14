/**
 * Analytics facade — wire a provider (Plausible, GA4, Vercel Analytics) without
 * touching call sites. Safe to call from server or client; no-ops until implemented.
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === "undefined") {
    return;
  }
  void path;
  void title;
  // Example: window.plausible?.('pageview', { props: { path, title } });
}

export function trackEvent(name: string, payload?: Record<string, unknown>): void {
  if (typeof window === "undefined") {
    return;
  }
  void name;
  void payload;
}
