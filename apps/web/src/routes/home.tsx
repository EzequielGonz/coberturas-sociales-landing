import type { Route } from './+types/home';
import { seo, siteOriginFrom } from '@/lib/seo';
import { FIRM_NAME, SHARE_IMAGE_URL } from '@/constants/brand';
import { businessSchema, websiteSchema } from '@/lib/schema';
import { Hero } from '@/components/home/hero';
import { Value } from '@/components/home/value';
import { Story } from '@/components/home/story';
import { ContactForm } from '@/components/home/contact-form';
import { Faq } from '@/components/home/faq';
import { SeccionCta } from '@/components/seccion-cta';

export function meta({ matches, location }: Route.MetaArgs) {
  const origin = siteOriginFrom(matches);
  return seo({ matches, location }, {
    title: `Prepagas y obras sociales en CABA y GBA | ${FIRM_NAME}`,
    description: 'Compará prepagas y obras sociales en CABA y el AMBA. Derivá tus aportes, sumá a tu familia y elegí tu plan con asesoramiento personalizado.',
    image: SHARE_IMAGE_URL,
    jsonLd: [businessSchema(origin), websiteSchema(origin)],
  });
}
export default function HomePage() {
  return (
    <>
      <Hero />
      <SeccionCta titulo="¿Te aumentó la cuota?" texto="Te mostramos opciones con mejores prestadores o un costo más bajo, comparadas en una sola llamada." mensaje="Hola, me aumentó la cuota y quiero comparar opciones de cobertura." />
      <Value />
      <SeccionCta titulo="Derivá tus aportes y pagá menos" texto="Si trabajás en relación de dependencia o sos monotributista, tus aportes pueden cubrir gran parte de la cuota." mensaje="Hola, quiero saber cómo derivar mis aportes a una prepaga." boton="Quiero derivar mis aportes" />
      <Story />
      <SeccionCta titulo="Cobertura para toda la familia" texto="Sumá a tu pareja e hijos y elegí con los prestadores que ya conocés y en los que confiás." mensaje="Hola, busco una cobertura médica para mi familia." boton="Cotizar para mi familia" />
      <ContactForm />
      <Faq />
    </>
  );
}
