import type { Route } from './+types/home';
import { seo, siteOriginFrom } from '@/lib/seo';
import { FIRM_NAME, SHARE_IMAGE_URL } from '@/constants/brand';
import { businessSchema, websiteSchema } from '@/lib/schema';
import { Hero } from '@/components/home/hero';
import { Value } from '@/components/home/value';
import { Story } from '@/components/home/story';
import { ContactForm } from '@/components/home/contact-form';
import { Faq } from '@/components/home/faq';

export function meta({ matches, location }: Route.MetaArgs) {
  const origin = siteOriginFrom(matches);
  return seo({ matches, location }, {
    title: `Prepagas y obras sociales en CABA y GBA | ${FIRM_NAME}`,
    description: 'Compará prepagas y obras sociales en CABA y el AMBA. Derivá tus aportes, sumá a tu familia y elegí tu plan con asesoramiento personalizado.',
    image: SHARE_IMAGE_URL,
    jsonLd: [businessSchema(origin), websiteSchema(origin)],
  });
}
export default function HomePage() { return <><Hero /><Value /><Story /><ContactForm /><Faq /></>; }
