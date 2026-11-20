import { EVENTO_META } from '@/lib/analitica';
import { referenciaActual } from '@/lib/atribucion';

type Ventana = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

/** Último envío de cada evento, para no contar dos veces el mismo clic. */
const ultimos = new Map<string, number>();
const VENTANA_DUPLICADO_MS = 1000;

/**
 * Registra conversiones (click_llamar, click_whatsapp, lead_enviado):
 *  - en `dataLayer` (Google Tag Manager),
 *  - en GA4 directo (`gtag`) si está cargado,
 *  - en el píxel de Meta (Contact o Lead) si está cargado.
 * Suma la referencia de la visita (`ref`, por ejemplo IG-ART-0112). Nunca
 * recibe nombre, teléfono ni el texto de la consulta. Sin analítica cargada,
 * solo queda en `dataLayer` y no sale del navegador.
 */
export function track(event: string, params: Record<string, string> = {}): void {
  if (typeof window === 'undefined') return;
  const ahora = Date.now();
  if (ahora - (ultimos.get(event) ?? 0) < VENTANA_DUPLICADO_MS) return;
  ultimos.set(event, ahora);

  const datos = { ...params, ref: referenciaActual() };
  const w = window as Ventana;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...datos });
  if (typeof w.gtag === 'function') w.gtag('event', event, datos);
  const meta = EVENTO_META[event];
  if (meta && typeof w.fbq === 'function') w.fbq('track', meta, { content_name: datos.ref });
}
