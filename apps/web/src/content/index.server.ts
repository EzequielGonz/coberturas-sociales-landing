/**
 * Registro central de las páginas SEO (solo servidor: el contenido no se suma
 * al JavaScript del visitante).
 *
 * Para agregar una página: sumala al archivo del silo y agregá su ruta a un
 * grupo de HUBS para que quede enlazada desde el pilar.
 */
import type { HubGroup, Page, PageData, RelatedLink } from './types';
import { prepagasGuias, prepagasPerfiles, prepagasPilar } from './prepagas.server';
import { comparativaPages, marcaPages } from './marcas.server';
import { zonaPages } from './zonas.server';
import { obrasGuias, obrasPilar } from './obras-sociales.server';
import { cotizadorPage, guiaPages } from './guias.server';

const P = '/prepagas';
const O = '/obras-sociales';

const ALL: Page[] = [
  prepagasPilar,
  ...prepagasGuias,
  ...prepagasPerfiles,
  ...marcaPages,
  ...comparativaPages,
  ...zonaPages,
  obrasPilar,
  ...obrasGuias,
  cotizadorPage,
  ...guiaPages,
];

const PUBLISHED = ALL.filter(page => page.status !== 'borrador');
const BY_PATH = new Map(PUBLISHED.map(page => [page.path, page]));

const toLink = (page: Page): RelatedLink => ({ path: page.path, nav: page.nav, description: page.description });
const linksFor = (paths: string[]) =>
  paths.map(path => BY_PATH.get(path)).filter((page): page is Page => Boolean(page)).map(toLink);

const paths = (pages: Page[]) => pages.map(page => page.path);
const zonasCaba = zonaPages.filter(page => page.label.endsWith('CABA'));
const zonasGba = zonaPages.filter(page => !page.label.endsWith('CABA'));

const HUBS: Record<string, { title: string; paths: string[] }[]> = {
  [P]: [
    { title: 'Prepagas', paths: paths(marcaPages) },
    { title: 'Comparativas', paths: paths(comparativaPages) },
    { title: 'Según tu situación', paths: paths(prepagasPerfiles) },
    { title: 'Antes de contratar', paths: [...paths(prepagasGuias), '/guias/cotizador-de-aportes'] },
    { title: 'Prepagas en CABA', paths: paths(zonasCaba) },
    { title: 'Prepagas en el conurbano', paths: paths(zonasGba) },
  ],
  [O]: [
    {
      title: 'Trámites',
      paths: [`${O}/derivacion-de-aportes-a-prepaga`, `${O}/cambio-de-obra-social`, `${O}/afiliacion-trabajo-nuevo`, `${O}/sumar-grupo-familiar`, `${O}/si-cambio-de-trabajo`],
    },
    {
      title: 'Para entender tu cobertura',
      paths: [`${O}/cuanto-se-aporta`, `${O}/obra-social-o-prepaga`, `${O}/obras-sociales-de-personal-de-direccion`, `${O}/que-cubre-el-pmo`, '/guias/cotizador-de-aportes'],
    },
    { title: 'Si querés pasarte a una prepaga', paths: [`${P}/prepaga-relacion-de-dependencia`, `${P}/prepaga-para-familias`, `${P}/como-elegir-una-prepaga`] },
  ],
};

const resolveHub = (groups: { title: string; paths: string[] }[]): HubGroup[] =>
  groups.map(group => ({ title: group.title, links: linksFor(group.paths) })).filter(group => group.links.length > 0);

const PILLAR_BY_SILO: Record<Page['silo'], { name: string; path: string }> = {
  prepagas: { name: 'Prepagas', path: P },
  'obras-sociales': { name: 'Obras sociales', path: O },
  guias: { name: 'Guías', path: '/guias' },
};

function relatedFor(page: Page): RelatedLink[] {
  const chosen = linksFor(page.related ?? []).filter(link => link.path !== page.path);
  if (chosen.length >= 3) return chosen.slice(0, 3);
  const taken = new Set([page.path, ...chosen.map(link => link.path)]);
  const siblings = PUBLISHED.filter(other => other.silo === page.silo && other.kind === 'guia' && !taken.has(other.path)).map(toLink);
  return [...chosen, ...siblings].slice(0, 3);
}

export function getPageData(path: string): PageData | null {
  const page = BY_PATH.get(path.replace(/\/+$/, '') || '/');
  if (!page) return null;

  const breadcrumbs = [{ name: 'Inicio', path: '/' }];
  if (page.kind !== 'pilar') breadcrumbs.push(PILLAR_BY_SILO[page.silo]);
  breadcrumbs.push({ name: page.nav, path: page.path });

  return {
    page,
    breadcrumbs,
    related: page.kind === 'pilar' ? [] : relatedFor(page),
    hub: page.kind === 'pilar' ? resolveHub(HUBS[page.path] ?? []) : [],
  };
}

/** Todo el contenido publicado, agrupado, para /guias. */
export function getGuiasHub(): HubGroup[] {
  return [
    { title: 'Prepagas', links: linksFor([P, ...paths(prepagasGuias), ...paths(prepagasPerfiles), ...paths(comparativaPages)]) },
    { title: 'Obras sociales', links: linksFor([O, ...paths(obrasGuias)]) },
    { title: 'Prepagas por marca', links: linksFor(paths(marcaPages)) },
    { title: 'Por zona', links: linksFor(paths(zonaPages)) },
    { title: 'Herramientas y recursos', links: linksFor([cotizadorPage.path, ...paths(guiaPages)]) },
  ].filter(group => group.links.length > 0);
}

export function sitemapEntries(): { path: string; lastmod: string }[] {
  const latest = PUBLISHED.reduce((max, page) => (page.updated > max ? page.updated : max), '');
  return [...PUBLISHED.map(page => ({ path: page.path, lastmod: page.updated })), { path: '/guias', lastmod: latest }];
}
