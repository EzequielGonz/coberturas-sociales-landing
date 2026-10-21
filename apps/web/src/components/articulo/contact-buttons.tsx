import { ArrowUpRight, Phone } from 'lucide-react';
import { PHONE, PHONE_URL } from '@/constants/brand';
import { WhatsAppAction } from '@/components/whatsapp-action';
import { track } from '@/lib/track';

type Props = {
  whatsappMessage: string;
  origen: string;
  formLabel: string;
  callLabel: string;
  /** 'light' para la banda oscura final. */
  tone?: 'dark' | 'light';
};

/**
 * Botón principal + WhatsApp, con las mismas clases que la home.
 * Con teléfono cargado, el principal muestra el número; si no, lleva al formulario.
 */
export function ContactButtons({ whatsappMessage, origen, formLabel, callLabel, tone = 'dark' }: Props) {
  const primary = tone === 'dark' ? 'button button-dark' : 'button button-light';
  const secondary = 'button button-whatsapp';
  return (
    <>
      {PHONE_URL ? (
        <a className={primary} href={PHONE_URL} aria-label={`${callLabel}: ${PHONE}`} onClick={() => track('click_llamar', { origen })}>
          <Phone size={18} strokeWidth={1.8} /> {PHONE}
        </a>
      ) : (
        <a className={primary} href="#contacto">{formLabel} <ArrowUpRight size={18} /></a>
      )}
      <WhatsAppAction className={secondary} message={whatsappMessage} />
    </>
  );
}
