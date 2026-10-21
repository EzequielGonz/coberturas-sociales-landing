import {
	data,
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
} from 'react-router';
import type { Route } from './+types/root';
import stylesheet from '@/index.css?url';
import articulosStylesheet from '@/styles/articulos.css?url';
// Ajustes del 21/10 (CTA por sección, WhatsApp, nombre de la firma). Va último para prevalecer.
import ajustesStylesheet from '@/styles/ajustes.css?url';
import { publicOrigin } from '@/lib/site-origin.server';
import { VERIFICATION } from '@/constants/brand';
import { HorizonsPreviewScripts } from './horizons-preview-scripts';
import { useEffect } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { WhatsAppAction } from '@/components/whatsapp-action';

const logo = 'https://horizons-cdn.hostinger.com/151eeb22-3829-49b1-ac75-b50202e69fd3/7a57f98a8bf0d1bd90419ea1ea9eb502.png';

// Se vuelve a ejecutar en cada cambio de página: si no, al volver a la home con
// la navegación interna, las secciones con animación quedaban invisibles.
function RevealObserver() {
	const { pathname } = useLocation();
	useEffect(() => {
		const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
		document.querySelectorAll('.reveal:not(.is-visible)').forEach(element => observer.observe(element));
		return () => observer.disconnect();
	}, [pathname]);
	return null;
}

export const links: Route.LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet },
	{ rel: 'stylesheet', href: articulosStylesheet },
	{ rel: 'stylesheet', href: ajustesStylesheet },
	{ rel: 'icon', href: logo, type: 'image/png' },
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap',
	},
];

/**
 * Publishes the site's public origin, which `seo()` reads to build canonical and
 * `og:url` tags, and advertises the sitemap to crawlers that read response
 * headers rather than HTML.
 *
 * A `meta` export can only reach server data through `matches`, and the `headers`
 * export cannot see loader data at all, so both have to travel this way.
 */
export function loader({ request }: Route.LoaderArgs) {
	const origin = publicOrigin(request);

	return data(
		{ origin },
		{ headers: { Link: `<${origin}/sitemap.xml>; rel="sitemap"; type="application/xml"` } },
	);
}

/**
 * A page route that exports `headers` replaces this one, so merge `parentHeaders`
 * there rather than returning only that route's own headers.
 */
export function headers({ loaderHeaders }: Route.HeadersArgs) {
	return loaderHeaders;
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es-AR">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{VERIFICATION.google && <meta name="google-site-verification" content={VERIFICATION.google} />}
				{VERIFICATION.bing && <meta name="msvalidate.01" content={VERIFICATION.bing} />}
				<Meta />
				<Links />
				<HorizonsPreviewScripts />
			</head>
			<body>
				<div id="root">{children}</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <><RevealObserver /><SiteHeader /><main><Outlet /></main><SiteFooter /><WhatsAppAction className="floating-whatsapp" label="Consultar por WhatsApp" /></>;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = 'Oops!';
	let details = 'An unexpected error occurred.';
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error';
		details =
			error.status === 404
				? 'The requested page could not be found.'
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main>
			<h1>{message}</h1>
			<p>{details}</p>
			{stack ? (
				<pre>
					<code>{stack}</code>
				</pre>
			) : null}
		</main>
	);
}
