/* ============================================================================
 * ANALÍTICA PREPARADA (20/11): GA4, Google Tag Manager y píxel de Meta.
 *
 * Nada se carga mientras falte la variable de entorno. Se leen en el servidor
 * (loader de root.tsx), así que basta con cargarlas en Vercel y volver a
 * desplegar; no hace falta tocar el código:
 *   NEXT_PUBLIC_GTM_ID                  GTM-XXXXXXX  (si está, GA4 va dentro de GTM)
 *   NEXT_PUBLIC_GA_ID                   G-XXXXXXXXXX (solo si no hay GTM)
 *   NEXT_PUBLIC_META_PIXEL_ID           solo números
 *   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION valor «content» de Search Console
 *   NEXT_PUBLIC_BING_SITE_VERIFICATION   valor «content» de Bing (msvalidate.01)
 *   NEXT_PUBLIC_META_DOMAIN_VERIFICATION valor «content» de Meta Business
 * (Se usa el prefijo NEXT_PUBLIC_ para que los nombres sean los mismos en las
 * cuatro landings y en la guía, aunque el sitio no es Next.js.)
 *
 * Cada valor se valida con su formato: lo que no cumple se ignora, así nada
 * inesperado llega al HTML. Los eventos nunca llevan datos personales.
 * ========================================================================== */

export type ConfigAnalitica = {
  gtmId: string | null;
  gaId: string | null;
  metaPixelId: string | null;
  googleVerification: string | null;
  bingVerification: string | null;
  metaDomainVerification: string | null;
};

const FORMATOS: Record<keyof ConfigAnalitica, { variable: string; patron: RegExp }> = {
  gtmId: { variable: 'NEXT_PUBLIC_GTM_ID', patron: /^GTM-[A-Z0-9]{4,12}$/ },
  gaId: { variable: 'NEXT_PUBLIC_GA_ID', patron: /^G-[A-Z0-9]{4,16}$/ },
  metaPixelId: { variable: 'NEXT_PUBLIC_META_PIXEL_ID', patron: /^\d{8,20}$/ },
  googleVerification: { variable: 'NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION', patron: /^[A-Za-z0-9_-]{10,100}$/ },
  bingVerification: { variable: 'NEXT_PUBLIC_BING_SITE_VERIFICATION', patron: /^[A-Za-z0-9_-]{10,100}$/ },
  metaDomainVerification: { variable: 'NEXT_PUBLIC_META_DOMAIN_VERIFICATION', patron: /^[A-Za-z0-9_-]{10,100}$/ },
};

export function configAnalitica(env: Record<string, string | undefined>): ConfigAnalitica {
  const out = {} as ConfigAnalitica;
  for (const clave of Object.keys(FORMATOS) as (keyof ConfigAnalitica)[]) {
    const { variable, patron } = FORMATOS[clave];
    const valor = (env[variable] ?? '').trim();
    out[clave] = patron.test(valor) ? valor : null;
  }
  // Con GTM, GA4 se configura dentro de GTM: cargar los dos duplicaría las visitas.
  if (out.gtmId) out.gaId = null;
  return out;
}

export const SIN_ANALITICA: ConfigAnalitica = configAnalitica({});

/** Evento estándar del píxel de Meta para cada evento propio (los demás no se envían a Meta). */
export const EVENTO_META: Record<string, string> = {
  click_whatsapp: 'Contact',
  click_llamar: 'Contact',
  lead_enviado: 'Lead',
};

/** Fragmentos de inicio. Los IDs ya vienen validados por `configAnalitica`. */
export function scriptGtm(id: string): string {
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(id)});`;
}

export function scriptGa(id: string): string {
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(id)});`;
}

/** autoConfig desactivado: el píxel no lee botones ni formularios por su cuenta. */
export function scriptPixel(id: string): string {
  return `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('set','autoConfig',false,${JSON.stringify(id)});fbq('init',${JSON.stringify(id)});fbq('track','PageView');`;
}
