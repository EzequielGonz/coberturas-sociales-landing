/* ============================================================================
 * ATRIBUCIÓN DE LA VISITA (20/11): redes → landing → WhatsApp o formulario → CRM
 *
 * Al llegar se leen utm_source, utm_medium, utm_campaign, utm_content,
 * utm_term y fbclid; se guardan 30 minutos en sessionStorage y se suman:
 *  - al formulario (campos `atribucion` y `llegada`), y
 *  - al mensaje prellenado de WhatsApp, como una referencia corta al final:
 *      «… (ref: IG-ART-0112)»
 *
 * Formato de la referencia: RED-CAMPAÑA-PIEZA
 *  - RED: código de la red (IG, FB, TT, YT, TH, MT = Meta sin distinguir,
 *    GO = Google, BI = Bing, WEB = visita sin red identificable).
 *  - CAMPAÑA: utm_campaign, PIEZA: utm_content. Solo letras y números en
 *    mayúscula, hasta 12. Lo que falta al final se omite; si falta la campaña
 *    y hay pieza, va «X». Ejemplos: IG-ART-0112 · FB-PERFIL · WEB.
 * El CRM la lee con `leerReferencia` (src/lib/origen-redes.ts del CRM).
 * Guía completa: docs/redes/MEDICION-2026-11-20.md del CRM.
 *
 * Nunca se guarda ni se envía nombre, teléfono ni el texto de la consulta.
 * ========================================================================== */

export type Atribucion = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  /** Red deducida del referer cuando no hay etiquetas (instagram, google…). */
  referer_red?: string;
};

export const CLAVE_ALMACEN = 'atribucion_visita';
export const DURACION_MS = 30 * 60 * 1000;

const CAMPOS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'] as const;

/** Texto libre de una etiqueta: sin caracteres de control ni signos raros, 100 caracteres. */
function limpiar(valor: string | null, max = 100): string {
  return (valor ?? '').replace(/[^\p{L}\p{N} ._-]/gu, '').trim().slice(0, max);
}

/** Lee las etiquetas de la URL. Devuelve null si no hay ninguna. */
export function leerEtiquetas(search: string): Atribucion | null {
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(search);
  } catch {
    return null;
  }
  const out: Atribucion = {};
  for (const campo of CAMPOS) {
    const valor = limpiar(params.get(campo), campo === 'fbclid' ? 255 : 100);
    if (valor) out[campo] = valor;
  }
  return Object.keys(out).length ? out : null;
}

/** utm_source → código de red. Lo desconocido se conserva abreviado (hasta 4). */
const RED_POR_FUENTE: Record<string, string> = {
  instagram: 'IG', ig: 'IG',
  facebook: 'FB', fb: 'FB',
  tiktok: 'TT', tt: 'TT',
  youtube: 'YT', yt: 'YT',
  threads: 'TH', th: 'TH',
  meta: 'MT',
  whatsapp: 'WA', wa: 'WA',
  x: 'X', twitter: 'X',
  linkedin: 'LI', li: 'LI',
  google: 'GO', bing: 'BI',
  email: 'EM', mail: 'EM',
  web: 'WEB',
};

/** Host del referer → red (solo sitios externos conocidos). */
export function redDelReferer(referer: string, hostPropio: string): string | null {
  let host = '';
  try {
    host = new URL(referer).hostname.toLowerCase();
  } catch {
    return null;
  }
  const propio = hostPropio.toLowerCase().replace(/^www\./, '');
  const sinWww = host.replace(/^www\./, '');
  if (!host || sinWww === propio || sinWww.endsWith(`.${propio}`)) return null;
  const es = (dominio: string) => host === dominio || host.endsWith(`.${dominio}`);
  if (es('instagram.com')) return 'instagram';
  if (es('facebook.com') || es('fb.com') || es('fb.me')) return 'facebook';
  if (es('tiktok.com')) return 'tiktok';
  if (es('youtube.com') || es('youtu.be')) return 'youtube';
  if (es('threads.net') || es('threads.com')) return 'threads';
  if (es('t.co') || es('x.com') || es('twitter.com')) return 'x';
  if (es('linkedin.com') || es('lnkd.in')) return 'linkedin';
  if (/(^|\.)google\.[a-z.]+$/.test(host)) return 'google';
  if (es('bing.com')) return 'bing';
  return null;
}

export function normalizarCodigo(valor: string | undefined, max: number): string {
  return (valor ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, max);
}

/** Código de red de la visita: etiqueta, después fbclid (Meta), después referer, si no WEB. */
export function codigoRed(a: Atribucion | null): string {
  if (!a) return 'WEB';
  const fuente = (a.utm_source ?? '').toLowerCase().trim();
  if (fuente) return RED_POR_FUENTE[fuente] ?? (normalizarCodigo(fuente, 4) || 'WEB');
  if (a.fbclid) return 'MT';
  if (a.referer_red) return RED_POR_FUENTE[a.referer_red] ?? 'WEB';
  return 'WEB';
}

/** Arma «IG-ART-0112». Sin atribución devuelve «WEB» (visita directa u orgánica). */
export function armarReferencia(a: Atribucion | null): string {
  const red = codigoRed(a);
  const campana = normalizarCodigo(a?.utm_campaign, 12);
  const pieza = normalizarCodigo(a?.utm_content, 12);
  if (pieza) return `${red}-${campana || 'X'}-${pieza}`;
  if (campana) return `${red}-${campana}`;
  return red;
}

/** Inverso de `armarReferencia` (lo usan las pruebas y la guía). */
export function leerReferencia(texto: string): { red: string; campana: string | null; pieza: string | null } | null {
  const m = /\(\s*ref\s*:\s*([A-Z0-9]{1,4})(?:-([A-Z0-9]{1,12}))?(?:-([A-Z0-9]{1,12}))?\s*\)/i.exec(texto);
  if (!m) return null;
  const campana = m[2]?.toUpperCase() ?? null;
  return { red: m[1].toUpperCase(), campana: campana === 'X' ? null : campana, pieza: m[3]?.toUpperCase() ?? null };
}

/** Suma « (ref: …)» al final del mensaje, una sola vez. */
export function agregarReferencia(mensaje: string, ref: string): string {
  if (!ref || /\(\s*ref\s*:/i.test(mensaje)) return mensaje;
  const base = mensaje.trim() || 'Hola, quiero hacer una consulta.';
  return `${base} (ref: ${ref})`;
}

export function esEnlaceWhatsapp(href: string): boolean {
  try {
    const u = new URL(href);
    return u.hostname === 'wa.me' || u.hostname === 'api.whatsapp.com' || u.hostname === 'web.whatsapp.com';
  } catch {
    return false;
  }
}

/** Devuelve el enlace de WhatsApp con la referencia sumada al texto prellenado. */
export function enlaceConReferencia(href: string, ref: string): string {
  if (!esEnlaceWhatsapp(href)) return href;
  const u = new URL(href);
  u.searchParams.set('text', agregarReferencia(u.searchParams.get('text') ?? '', ref));
  // URLSearchParams escribe los espacios como «+»; WhatsApp los entiende, pero se dejan como %20.
  return u.toString().replace(/\+/g, '%20');
}

/* ------------------------------ Almacenamiento ----------------------------- */

type Almacen = Pick<Storage, 'getItem' | 'setItem'>;
type Guardado = { a: Atribucion; t: number };

export function leerGuardada(almacen: Almacen | null, ahora: number): Atribucion | null {
  if (!almacen) return null;
  try {
    const crudo = almacen.getItem(CLAVE_ALMACEN);
    if (!crudo) return null;
    const g = JSON.parse(crudo) as Guardado;
    if (!g || typeof g.t !== 'number' || typeof g.a !== 'object' || ahora - g.t > DURACION_MS) return null;
    return g.a;
  } catch {
    return null;
  }
}

export function guardar(almacen: Almacen | null, a: Atribucion, ahora: number): void {
  if (!almacen) return;
  try {
    almacen.setItem(CLAVE_ALMACEN, JSON.stringify({ a, t: ahora } satisfies Guardado));
  } catch {
    // Navegación privada o almacenamiento bloqueado: la visita sigue sin referencia.
  }
}

/**
 * Al cargar una página: etiquetas nuevas en la URL reemplazan a las guardadas;
 * sin etiquetas, se renuevan los 30 minutos de las guardadas; sin nada, se usa
 * la red del referer externo (si la hay).
 */
export function capturar(input: { search: string; referer: string; hostPropio: string; almacen: Almacen | null; ahora: number }): Atribucion | null {
  const nuevas = leerEtiquetas(input.search);
  const actual = nuevas ?? leerGuardada(input.almacen, input.ahora);
  const resultado = actual ?? (() => {
    const red = redDelReferer(input.referer, input.hostPropio);
    return red ? { referer_red: red } : null;
  })();
  if (resultado) guardar(input.almacen, resultado, input.ahora);
  return resultado;
}

/* --------------------------------- Navegador -------------------------------- */

function almacenDelNavegador(): Almacen | null {
  try {
    return typeof window === 'undefined' ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

/** Atribución vigente en este navegador (o null). */
export function atribucionActual(): Atribucion | null {
  return leerGuardada(almacenDelNavegador(), Date.now());
}

/** Referencia vigente: siempre devuelve algo en el navegador («WEB» sin datos). */
export function referenciaActual(): string {
  return armarReferencia(atribucionActual());
}

/** Se llama una vez por carga completa de página. */
export function capturarEnNavegador(): Atribucion | null {
  if (typeof window === 'undefined') return null;
  return capturar({
    search: window.location.search,
    referer: document.referrer,
    hostPropio: window.location.hostname.toLowerCase(),
    almacen: almacenDelNavegador(),
    ahora: Date.now(),
  });
}

/** Campos que se suman al envío del formulario (sin datos personales). */
export function datosParaFormulario(): { atribucion: Atribucion & { ref: string }; llegada: string } {
  const a = atribucionActual() ?? {};
  const red = (a.utm_source ?? a.referer_red ?? (a.fbclid ? 'meta' : '')).toLowerCase();
  return { atribucion: { ...a, ref: armarReferencia(a) }, llegada: red };
}
