/** Fecha AAAA-MM-DD más reciente entre las válidas (para `lastmod` del sitemap). */
export function fechaMasReciente(...fechas: (string | undefined)[]): string | undefined {
  const validas = fechas.filter((f): f is string => typeof f === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(f));
  return validas.length ? validas.reduce((max, f) => (f > max ? f : max)) : undefined;
}

/**
 * Fechas reales del último cambio, calculadas al compilar (vite.config.ts): la
 * del último commit que tocó el contenido y la de la portada. Si git no está
 * disponible al compilar, es la fecha del build. Nunca una fecha fija.
 */
export const FECHA_CONTENIDO: string = typeof __FECHA_CONTENIDO__ === 'string' ? __FECHA_CONTENIDO__ : '';
export const FECHA_PORTADA: string = typeof __FECHA_PORTADA__ === 'string' ? __FECHA_PORTADA__ : '';
