import { Link } from 'react-router';
import { FIRM_NAME } from '@/constants/brand';
import { CTA } from '@/constants/cta';
import { formatDate } from '@/lib/text';
import { ContactButtons } from './contact-buttons';

type Props = {
  label: string;
  h1: string;
  h1Em?: string;
  lead: string;
  breadcrumbs: { name: string; path: string }[];
  updated?: string;
  origen: string;
  whatsappMessage: string;
};

/** Termina el título con el punto verde de la home cuando la frase cierra con punto. */
function WithPeriod({ text }: { text: string }) {
  return text.endsWith('.') ? <>{text.slice(0, -1)}<span className="period">.</span></> : <>{text}</>;
}

export function DocHero({ label, h1, h1Em, lead, breadcrumbs, updated, origen, whatsappMessage }: Props) {
  return (
    <section className="doc-hero">
      <div className="container">
        <div className="doc-hero-inner">
          <nav className="doc-breadcrumb" aria-label="Ruta de navegación">
            <ol>
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.path}>
                  {index < breadcrumbs.length - 1 ? <Link to={crumb.path}>{crumb.name}</Link> : <span aria-current="page">{crumb.name}</span>}
                </li>
              ))}
            </ol>
          </nav>
          <p className="eyebrow"><span className="eyebrow-line" /> {label}</p>
          <h1>{h1Em ? <>{h1} <em><WithPeriod text={h1Em} /></em></> : <WithPeriod text={h1} />}</h1>
          <p className="doc-lead">{lead}</p>
          <div className="hero-buttons">
            <ContactButtons whatsappMessage={whatsappMessage} origen={origen} formLabel={CTA.hero.primary} callLabel={CTA.mid.callLabel} />
          </div>
        </div>
      </div>
      <div className="container doc-meta">
        <span>Equipo de asesores de {FIRM_NAME}</span>
        {updated && <span>Actualizado el <time dateTime={updated}>{formatDate(updated)}</time></span>}
      </div>
    </section>
  );
}
