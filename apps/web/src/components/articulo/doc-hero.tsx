import { Link } from 'react-router';
import { CTA } from '@/constants/cta';
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

export function DocHero({ h1, h1Em, lead, breadcrumbs, origen, whatsappMessage }: Props) {
  return (
    <section className="doc-hero">
      <div className="container">
        <div className="doc-hero-inner">
          {breadcrumbs.length > 1 && <Link className="doc-volver" to={breadcrumbs[breadcrumbs.length - 2].path}>← {breadcrumbs[breadcrumbs.length - 2].name}</Link>}
          
          <h1>{h1Em ? <>{h1} <em><WithPeriod text={h1Em} /></em></> : <WithPeriod text={h1} />}</h1>
          <p className="doc-lead">{lead}</p>
          <div className="hero-buttons">
            <ContactButtons whatsappMessage={whatsappMessage} origen={origen} formLabel={CTA.hero.primary} callLabel={CTA.mid.callLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}
