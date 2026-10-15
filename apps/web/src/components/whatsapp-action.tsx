import { MessageCircle } from 'lucide-react';
import { WHATSAPP_DEFAULT_MESSAGE, whatsappUrl } from '@/constants/brand';
import { track } from '@/lib/track';

/**
 * Botón de WhatsApp de todo el sitio. El número se configura en constants/brand.ts.
 * Mientras no haya número, lleva al formulario (#contacto), igual que antes.
 * `message` permite que cada artículo mande un mensaje precargado propio.
 */
export function WhatsAppAction({ className = '', label = 'Consultar por WhatsApp', message = WHATSAPP_DEFAULT_MESSAGE }: { className?: string; label?: string; message?: string }) {
  const link = whatsappUrl(message);
  const available = link.startsWith('https://');
  return <a className={className} href={available ? link : '#contacto'} target={available ? '_blank' : undefined} rel={available ? 'noopener noreferrer' : undefined} aria-label={available ? label : `${label}. Por ahora, completá el formulario de contacto.`} onClick={available ? () => track('click_whatsapp', { origen: typeof window === 'undefined' ? '' : window.location.pathname }) : undefined}><MessageCircle size={18} strokeWidth={1.8} aria-hidden="true" /><span>{label}</span></a>;
}
