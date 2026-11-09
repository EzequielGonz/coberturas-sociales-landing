import { Link } from 'react-router';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';
import { WhatsAppAction } from '@/components/whatsapp-action';
import { EMAIL, FACEBOOK_URL, FIRM_NAME, INSTAGRAM_HANDLE, INSTAGRAM_URL, LOGO_URL, PHONE, PHONE_URL } from '@/constants/brand';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <a href="/#inicio" className="brand footer-logo"><img src={LOGO_URL} alt="" width="240" height="222" loading="lazy" /><span>Compara <strong>Tu Obra Social</strong></span></a>
          <p>Prepagas y obras sociales comparadas con un asesor, en CABA y el AMBA.</p>
          <WhatsAppAction className="footer-cta" label="Escribinos por WhatsApp" />
        </div>
        <nav className="footer-links" aria-label="Coberturas">
          <h3>Coberturas</h3>
          <Link to="/prepagas">Prepagas</Link>
          <Link to="/obras-sociales">Obras sociales</Link>
          <Link to="/guias/cotizador-de-aportes">Cotizador de aportes</Link>
          <Link to="/guias">Guías</Link>
        </nav>
        <nav className="footer-links" aria-label="Ayuda">
          <h3>Ayuda</h3>
          <a href="/#como-funciona">Cómo funciona</a>
          <a href="/#preguntas">Preguntas frecuentes</a>
          <a href="/#contacto">Hacer una consulta</a>
        </nav>
        <div className="footer-contact">
          <h3>Contacto</h3>
          {PHONE_URL && <a href={PHONE_URL}><Phone size={16} strokeWidth={1.6} aria-hidden="true" /> {PHONE}</a>}
          {EMAIL && <a href={`mailto:${EMAIL}`}><Mail size={16} strokeWidth={1.6} aria-hidden="true" /> {EMAIL}</a>}
          {INSTAGRAM_URL && <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><Instagram size={16} strokeWidth={1.6} aria-hidden="true" /> {INSTAGRAM_HANDLE || 'Instagram'}</a>}
          {FACEBOOK_URL && <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"><Facebook size={16} strokeWidth={1.6} aria-hidden="true" /> Facebook</a>}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {FIRM_NAME}</span>
        <a href="#inicio" className="footer-top">Volver arriba ↑</a>
      </div>
    </footer>
  );
}
