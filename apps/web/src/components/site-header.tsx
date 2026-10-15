import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { WhatsAppAction } from '@/components/whatsapp-action';
import { FIRM_NAME, LOGO_URL } from '@/constants/brand';

// "Prepagas" y "Obras sociales" llevan a las secciones SEO y reemplazan al ancla
// "Coberturas". Las demás anclas llevan "/" para funcionar desde cualquier página;
// "Contacto" queda relativa porque los artículos también tienen su formulario (#contacto).
const links = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Prepagas', href: '/prepagas', route: true },
  { label: 'Obras sociales', href: '/obras-sociales', route: true },
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Preguntas frecuentes', href: '/#preguntas' },
  { label: 'Contacto', href: '#contacto' },
];

export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      if (Math.abs(current - last) > 5) setHidden(current > last && current > 140 && !open);
      last = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);
  const renderLink = (link: (typeof links)[number], mobile = false) => {
    const content = mobile ? <>{link.label}<ArrowUpRight size={16} /></> : link.label;
    const onClick = mobile ? () => setOpen(false) : undefined;
    return link.route
      ? <Link to={link.href} key={link.href} prefetch="intent" onClick={onClick}>{content}</Link>
      : <a href={link.href} key={link.href} onClick={onClick}>{content}</a>;
  };
  return <header className={`site-header ${hidden ? 'site-header--hidden' : ''}`}>
    <div className="header-inner">
      <a className="brand" href="/#inicio" aria-label={`${FIRM_NAME} — inicio`} onClick={() => setOpen(false)}><img src={LOGO_URL} alt={`Logo de ${FIRM_NAME}`} width="48" height="48" /><span>Compara <strong>Tu Obra Social</strong></span></a>
      <nav className="desktop-nav" aria-label="Navegación principal">{links.map(link => renderLink(link))}</nav>
      <div className="header-actions"><WhatsAppAction className="header-whatsapp" label="Consultar por WhatsApp" /><button className="menu-toggle" type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => { setOpen(!open); setHidden(false); }}>{open ? <X size={23} /> : <Menu size={23} />}</button></div>
    </div>
    <nav id="mobile-nav" className={`mobile-nav ${open ? 'mobile-nav--open' : ''}`} aria-label="Navegación móvil">{links.map(link => renderLink(link, true))}</nav>
  </header>;
}
