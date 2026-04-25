export function trackEvent(event: string, payload?: Record<string, string>) {
  if (typeof window === 'undefined') return;

  (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer = (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer || [];
  (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer?.push({ event, ...payload });

  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === 'function') {
    w.gtag('event', event, payload);
  }
}
