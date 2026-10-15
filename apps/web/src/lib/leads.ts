/* ============================================================================
 * ENVÍO DE FORMULARIOS (home y artículos)
 *
 * IMPORTANTE: el sitio original no guardaba las consultas en ningún lado.
 * Hasta conectar un proveedor, el formulario muestra el mensaje de éxito pero
 * la consulta NO se guarda. Elegí uno de estos y completá sus datos:
 *  - 'supabase' → ejecutar /supabase/consultas.sql y completar SUPABASE_CONFIG.
 *  - 'webhook'  → cualquier URL que reciba JSON por POST (Make, Zapier, n8n, CRM).
 *  - 'none'     → no guarda nada (estado actual).
 * ========================================================================== */

export type LeadsProvider = 'supabase' | 'webhook' | 'none';

export const LEADS_PROVIDER: LeadsProvider = 'none';

/** La anon key es pública por diseño: la política RLS del SQL solo permite insertar. */
export const SUPABASE_CONFIG = { url: '', anonKey: '', table: 'consultas' };

export const WEBHOOK_URL = '';

export type Lead = {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  busqueda: string;
  destinatario: string;
  personas: string;
  actual: string;
  detalle?: string;
  /** Solo en el formulario de los artículos. */
  situacion?: string;
  zona?: string;
  /** Página desde la que llegó la consulta. */
  origen?: string;
};

async function postJson(url: string, body: unknown, headers: Record<string, string> = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Error ${response.status} al enviar la consulta`);
}

export async function submitLead(lead: Lead): Promise<void> {
  const payload = { ...lead, origen: lead.origen || '/' };

  if (LEADS_PROVIDER === 'supabase') {
    const { url, anonKey, table } = SUPABASE_CONFIG;
    if (!url || !anonKey) throw new Error('Supabase sin configurar');
    await postJson(`${url}/rest/v1/${table}`, payload, { apikey: anonKey, Authorization: `Bearer ${anonKey}`, Prefer: 'return=minimal' });
    return;
  }
  if (LEADS_PROVIDER === 'webhook') {
    if (!WEBHOOK_URL) throw new Error('Webhook sin configurar');
    await postJson(WEBHOOK_URL, payload);
    return;
  }
  console.warn('[leads] Sin base de datos conectada: la consulta no se guardó. Configurá LEADS_PROVIDER en lib/leads.ts.', payload);
}
