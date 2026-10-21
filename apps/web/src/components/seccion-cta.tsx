import { MessageCircle, Phone } from 'lucide-react';
import { PHONE, PHONE_URL, whatsappUrl } from '@/constants/brand';
import { track } from '@/lib/track';

/**
 * Llamado a la acción entre secciones (21/10). Cada sección manda su propio
 * mensaje precargado a WhatsApp, así el asesor sabe desde dónde escriben.
 */
export function SeccionCta({ titulo, texto, mensaje, boton = 'Consultar por WhatsApp' }: { titulo: string; texto: string; mensaje: string; boton?: string }) {
  const wa = whatsappUrl(mensaje);
  return (
    <aside className="seccion-cta" aria-label={titulo}>
      <div className="container seccion-cta-inner reveal">
        <div>
          <p className="seccion-cta-titulo">{titulo}</p>
          <p className="seccion-cta-texto">{texto}</p>
        </div>
        <div className="seccion-cta-acciones">
          <a className="button button-whatsapp" href={wa || '#contacto'} target={wa ? '_blank' : undefined} rel={wa ? 'noopener noreferrer' : undefined} onClick={() => track('click_whatsapp', { origen: `home:${titulo}` })}>
            <MessageCircle size={18} strokeWidth={1.8} aria-hidden="true" />
            <span>{boton}</span>
          </a>
          {PHONE_URL && (
            <a className="seccion-cta-tel" href={PHONE_URL} onClick={() => track('click_llamar', { origen: `home:${titulo}` })}>
              <Phone size={16} strokeWidth={1.8} aria-hidden="true" /> {PHONE}
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
