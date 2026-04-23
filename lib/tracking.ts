export function trackEvent(event: string, payload?: Record<string, string>) {
  if (typeof window !== 'undefined') {
    (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer = (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer || [];
    (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer?.push({ event, ...payload });
  }
}
