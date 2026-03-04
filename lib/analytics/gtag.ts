/**
 * GA4 イベントトラッキングラッパー
 * GA_MEASUREMENT_ID が未設定の環境では静かに無視する
 */

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
    dataLayer: unknown[];
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** ページビュー送信 */
export function pageview(url: string): void {
  if (typeof window === 'undefined' || !GA_ID || !window.gtag) return;
  window.gtag('config', GA_ID, { page_path: url });
}

/** 汎用イベント送信 */
export function event(
  action: string,
  params: Record<string, string | number | boolean> = {}
): void {
  if (typeof window === 'undefined' || !GA_ID || !window.gtag) return;
  window.gtag('event', action, params);
}

/** フォーム送信イベント */
export function trackFormSubmit(formName: string): void {
  event('form_submit', { form_name: formName });
}

/** AI診断完了イベント */
export function trackDiagnosisComplete(recommendedService: string): void {
  event('diagnosis_complete', { service: recommendedService });
}

/** リンククリックイベント */
export function trackCtaClick(label: string, destination: string): void {
  event('cta_click', { label, destination });
}
