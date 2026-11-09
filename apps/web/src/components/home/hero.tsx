import { ArrowUpRight } from 'lucide-react';
import { WhatsAppAction } from '@/components/whatsapp-action';

export function Hero() {
  return <section className="hero" id="inicio"><div className="hero-glow" aria-hidden="true" /><div className="hero-inner"><div className="hero-copy reveal"><h1>Compará prepagas y obras sociales con un asesor<span className="period">.</span></h1><p className="hero-description">Te mostramos las opciones según tu edad, tu zona, tu familia y tus aportes, para que elijas sabiendo qué cubre cada plan.</p><div className="hero-buttons"><a className="button button-dark" href="#contacto">Quiero encontrar mi cobertura <ArrowUpRight size={19} /></a><WhatsAppAction className="button button-whatsapp" message="Hola, vi la web y quiero comparar coberturas para encontrar la mejor opción." /></div></div><div className="hero-visual reveal"><img src="/img/familia-cobertura.webp" alt="Familia caminando junta por un parque arbolado" width="1024" height="768" fetchPriority="high" /></div></div></section>;
}
