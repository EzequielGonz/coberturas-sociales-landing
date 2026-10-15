/**
 * Registra conversiones en `dataLayer` (Google Tag Manager / GA4) si está instalado.
 * Eventos: click_llamar, click_whatsapp, lead_enviado. Si no hay GTM, no hace nada.
 */
export function track(event: string, params: Record<string, string> = {}): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
