/* ============================================================================
 * DATOS DEL NEGOCIO — ÚNICO LUGAR PARA COMPLETAR
 * Home, artículos, header, footer, botones y datos para Google leen de acá.
 * Si un valor queda vacío, ese botón o dato no se muestra.
 * ========================================================================== */

export const FIRM_NAME = 'Compara Tu Obra Social';
export const LOGO_URL = 'https://horizons-cdn.hostinger.com/151eeb22-3829-49b1-ac75-b50202e69fd3/7a57f98a8bf0d1bd90419ea1ea9eb502.png';
export const SHARE_IMAGE_URL = 'https://images.hostinger.com/7bbe0a7b-418c-4cfd-bc96-ac602b28175d.png';

/** Dominio definitivo con https y sin barra final. Ej: 'https://www.comparatuobrasocial.com.ar'. */
export const SITE_URL = '';

/** Teléfono como se muestra, ej. '(011) 4000-0000', y en formato internacional para marcar, ej. '+541140000000'. */
export const PHONE = '';
export const PHONE_E164 = '';

/** WhatsApp: solo números, con 549. Ej: '5491140000000'. Mientras esté vacío, los botones llevan al formulario. */
export const WHATSAPP_NUMBER = '';
export const WHATSAPP_DEFAULT_MESSAGE = 'Hola, quiero asesoramiento para elegir una cobertura médica.';

export const EMAIL = '';
export const INSTAGRAM_URL = '';   // Ej: 'https://www.instagram.com/comparatuobrasocial'
export const INSTAGRAM_HANDLE = ''; // Ej: '@comparatuobrasocial'
export const FACEBOOK_URL = '';
export const TIKTOK_URL = '';
export const LINKEDIN_URL = '';

/** Dirección de atención (opcional; conviene que coincida con Google Business Profile). */
export const ADDRESS = { street: '', locality: '', region: 'Ciudad Autónoma de Buenos Aires', postalCode: '', country: 'AR' };

/** Códigos de verificación de Google Search Console y Bing Webmaster Tools. */
export const VERIFICATION = { google: '', bing: '' };

/** Clave de IndexNow (32 letras/números) para indexación rápida en Bing y otros. */
export const INDEXNOW_KEY = '';

/* ======================= Derivados — no hace falta editar ======================= */

export function whatsappUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}` : '';
}

export const PHONE_URL = PHONE_E164 ? `tel:${PHONE_E164}` : PHONE ? `tel:${PHONE.replace(/[^\d+]/g, '')}` : '';

export const SOCIAL_LINKS = [
  { label: INSTAGRAM_HANDLE || 'Instagram', url: INSTAGRAM_URL },
  { label: 'Facebook', url: FACEBOOK_URL },
  { label: 'TikTok', url: TIKTOK_URL },
  { label: 'LinkedIn', url: LINKEDIN_URL },
].filter(link => link.url);
