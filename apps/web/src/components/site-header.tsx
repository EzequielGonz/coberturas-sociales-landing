import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { MessageCircle } from 'lucide-react';
import { FIRM_NAME, LOGO_URL, PHONE, PHONE_URL, whatsappUrl } from '@/constants/brand';
import { track } from '@/lib/track';

// "Prepagas" y "Obras sociales" llevan a las secciones SEO. Las anclas llevan "/"
// para funcionar desde cualquier página; "Contacto" queda relativa porque los
// artículos también tienen su formulario (#contacto).
type Enlace = { texto: string; href: string; ruta?: boolean };
const enlaces: Enlace[] = [
  { texto: 'Prepagas', href: '/prepagas', ruta: true },
  { texto: 'Obras sociales', href: '/obras-sociales', ruta: true },
  { texto: 'Cómo comparamos', href: '/#como-comparamos' },
  { texto: 'Preguntas', href: '/#preguntas' },
  { texto: 'Contacto', href: '#contacto' },
];

export function SiteHeader() {
  const [oculta, setOculta] = useState(false);
  const [desplazada, setDesplazada] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anterior = window.scrollY;
    const alDesplazar = () => {
      const actual = window.scrollY;
      setDesplazada(actual > 16);
      if (Math.abs(actual - anterior) > 5) setOculta(actual > anterior && actual > 140);
      anterior = actual;
    };
    alDesplazar();
    window.addEventListener('scroll', alDesplazar, { passive: true });
    return () => window.removeEventListener('scroll', alDesplazar);
  }, []);

  useEffect(() => {
    if (!abierto) return;
    const raiz = document.documentElement;
    raiz.classList.add('menu-abierto');
    menu.current?.querySelector<HTMLElement>('a')?.focus();
    const alTeclear = (evento: KeyboardEvent) => { if (evento.key === 'Escape') setAbierto(false); };
    window.addEventListener('keydown', alTeclear);
    return () => {
      raiz.classList.remove('menu-abierto');
      window.removeEventListener('keydown', alTeclear);
      boton.current?.focus();
    };
  }, [abierto]);

  const cerrar = () => setAbierto(false);
  const enlace = (item: Enlace, movil = false) => item.ruta
    ? <Link key={item.href} to={item.href} prefetch="intent" onClick={movil ? cerrar : undefined}>{item.texto}</Link>
    : <a key={item.href} href={item.href} onClick={movil ? cerrar : undefined}>{item.texto}</a>;
  const wa = whatsappUrl('Hola, vi la web y quiero comparar coberturas.');

  return (
    <>
      <header className={`cabecera${oculta && !abierto ? ' is-oculta' : ''}${desplazada || abierto ? ' is-solida' : ''}`}>
        <div className="cabecera-barra">
          <a className="cabecera-marca" href="/#inicio" aria-label={`${FIRM_NAME}, ir al inicio`} onClick={cerrar}>
            <img src={LOGO_URL} alt="" width="52" height="48" />
            <span>Compara<strong>Tu Obra Social</strong></span>
          </a>
          <nav className="cabecera-nav" aria-label="Navegación principal">{enlaces.map(item => enlace(item))}</nav>
          <a className="cabecera-wa" href={wa} target="_blank" rel="noopener noreferrer" onClick={() => track('click_whatsapp', { origen: 'cabecera' })}>
            <MessageCircle size={17} strokeWidth={1.9} aria-hidden="true" /> <span>WhatsApp</span>
          </a>
          <button ref={boton} className={`cabecera-menu${abierto ? ' is-abierto' : ''}`} type="button" aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={abierto} aria-controls="menu-movil" onClick={() => setAbierto(!abierto)}>
            <span /><span />
          </button>
        </div>
      </header>
      <div id="menu-movil" ref={menu} className="menu-movil" hidden={!abierto}>
        <nav aria-label="Navegación móvil">{enlaces.map(item => enlace(item, true))}</nav>
        <div className="menu-movil-pie">
          <a className="menu-movil-wa" href={wa} target="_blank" rel="noopener noreferrer" onClick={cerrar}>
            <MessageCircle size={19} strokeWidth={1.9} aria-hidden="true" /> Escribinos por WhatsApp
          </a>
          {PHONE && PHONE_URL && <a className="menu-movil-tel" href={PHONE_URL}>{PHONE}</a>}
        </div>
      </div>
    </>
  );
}
