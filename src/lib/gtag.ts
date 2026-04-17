/**
 * Google Ads conversion tracking helpers.
 * gtag is loaded globally by the base Google Ads script in layout.tsx.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const ADS_ID = "AW-18087268476";

/**
 * Fire a Google Ads conversion event.
 * Usage: trackConversion('AW-18087268476/xxxxxxxxxxxxxxx', { value: 6.99, currency: 'USD' })
 */
export function trackConversion(
  sendTo: string,
  params?: { value?: number; currency?: string; transaction_id?: string }
) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "conversion", { send_to: sendTo, ...params });
}

/** Track a generic custom event */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

/** Track page view (SPA navigation) */
export function trackPageView(url: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", ADS_ID, { page_path: url });
}
