import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),

	// Silo 1 — Prepagas (marcas, comparativas, perfiles, guías y zonas del AMBA)
	route('prepagas', 'routes/seo-prepagas.tsx'),
	route('prepagas/:slug', 'routes/seo-prepagas-slug.tsx'),

	// Silo 2 — Obras sociales (derivación, cambio, afiliación, aportes)
	route('obras-sociales', 'routes/seo-obras-sociales.tsx'),
	route('obras-sociales/:slug', 'routes/seo-obras-sociales-slug.tsx'),

	// Silo 3 — Guías, recursos y cotizador
	route('guias', 'routes/seo-guias.tsx'),
	route('guias/cotizador-de-aportes', 'routes/seo-cotizador.tsx'),
	route('guias/:slug', 'routes/seo-guias-slug.tsx'),

	route('sitemap.xml', 'routes/sitemap.xml.ts'),
	route('robots.txt', 'routes/robots.txt.ts'),
	route('indexnow.txt', 'routes/indexnow.txt.ts'),
	route('api/health', 'routes/api.health.ts'),
	route('api/*', 'routes/api.$.ts'),
] satisfies RouteConfig;
