import type { MetaDescriptor } from 'react-router';
import { FIRM_NAME, SHARE_IMAGE_URL } from '@/constants/brand';
import type { PageData } from '@/content/types';
import { articleSchema, breadcrumbSchema, businessSchema, faqSchema } from '@/lib/schema';
import { seo, siteOriginFrom, type SeoArgs } from '@/lib/seo';

/** Suma el nombre del sitio al título solo si no lo vuelve demasiado largo para Google. */
export const withBrand = (title: string): string => {
  const branded = `${title} | ${FIRM_NAME}`;
  return branded.length <= 65 ? branded : title;
};

export function pageMeta(args: SeoArgs, data: PageData | undefined): MetaDescriptor[] {
  if (!data) return [{ title: `Página no encontrada | ${FIRM_NAME}` }, { name: 'robots', content: 'noindex' }];
  const { page, breadcrumbs } = data;
  const origin = siteOriginFrom(args.matches);
  const jsonLd: object[] = [businessSchema(origin), articleSchema(origin, page), breadcrumbSchema(origin, breadcrumbs)];
  if (page.faqs?.length) jsonLd.push(faqSchema(page.faqs));
  return seo(args, {
    title: withBrand(page.title),
    description: page.description,
    path: page.path,
    image: SHARE_IMAGE_URL,
    type: page.kind === 'pilar' ? 'website' : 'article',
    jsonLd,
  });
}
