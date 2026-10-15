import type { Route } from './+types/seo-guias';
import { HubGroups } from '@/components/articulo/article-page';
import { DocHero } from '@/components/articulo/doc-hero';
import { ArticleFinalCta } from '@/components/articulo/final-cta';
import { LeadForm } from '@/components/articulo/lead-form';
import { getGuiasHub } from '@/content/index.server';
import { withBrand } from '@/lib/page-meta';
import { breadcrumbSchema, businessSchema } from '@/lib/schema';
import { seo, siteOriginFrom } from '@/lib/seo';

const PATH = '/guias';
const BREADCRUMBS = [{ name: 'Inicio', path: '/' }, { name: 'Guías', path: PATH }];
const WHATSAPP_MESSAGE = 'Hola, leí las guías de su web y quiero asesoramiento para elegir mi cobertura.';

export function loader() {
  return { groups: getGuiasHub() };
}

export function meta({ matches, location }: Route.MetaArgs) {
  const origin = siteOriginFrom(matches);
  return seo({ matches, location }, {
    title: withBrand('Guías sobre prepagas y obras sociales'),
    description: 'Guías claras sobre prepagas y obras sociales en CABA y el AMBA: cómo elegir, derivar aportes, cambiarte, sumar a tu familia y comparar planes.',
    path: PATH,
    jsonLd: [businessSchema(origin), breadcrumbSchema(origin, BREADCRUMBS)],
  });
}

export default function GuiasPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="doc-page">
      <DocHero
        label="Guías y recursos"
        h1="Todo lo que necesitás saber"
        h1Em="para elegir tu cobertura."
        lead="Explicaciones simples sobre prepagas y obras sociales: cómo comparar, cómo usar tus aportes, cómo cambiarte y cómo sumar a tu familia."
        breadcrumbs={BREADCRUMBS}
        origen={PATH}
        whatsappMessage={WHATSAPP_MESSAGE}
      />
      <div className="doc-body">
        <div className="container">
          <div className="doc-article doc-article-wide"><HubGroups groups={loaderData.groups} /></div>
        </div>
      </div>
      <LeadForm tipo="Quiero comparar opciones" origen={PATH} whatsappMessage={WHATSAPP_MESSAGE} />
      <ArticleFinalCta whatsappMessage={WHATSAPP_MESSAGE} origen={PATH} />
    </div>
  );
}
