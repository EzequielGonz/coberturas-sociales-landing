import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { type ConfigAnalitica, scriptGa, scriptGtm, scriptPixel } from '@/lib/analitica';
import { capturarEnNavegador, enlaceConReferencia, esEnlaceWhatsapp, referenciaActual } from '@/lib/atribucion';
import { track } from '@/lib/track';

/**
 * Etiquetas de verificación y analítica en el <head>. Cada una aparece solo si
 * su variable de entorno está cargada y con formato válido (ver lib/analitica.ts).
 */
export function AnaliticaHead({ config }: { config: ConfigAnalitica }) {
	return (
		<>
			{config.googleVerification && <meta name="google-site-verification" content={config.googleVerification} />}
			{config.bingVerification && <meta name="msvalidate.01" content={config.bingVerification} />}
			{config.metaDomainVerification && <meta name="facebook-domain-verification" content={config.metaDomainVerification} />}
			{config.gtmId && <script dangerouslySetInnerHTML={{ __html: scriptGtm(config.gtmId) }} />}
			{config.gaId && <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.gaId}`} />}
			{config.gaId && <script dangerouslySetInnerHTML={{ __html: scriptGa(config.gaId) }} />}
			{config.metaPixelId && <script dangerouslySetInnerHTML={{ __html: scriptPixel(config.metaPixelId) }} />}
		</>
	);
}

/**
 * Medición en el navegador:
 *  - guarda las etiquetas utm_* y fbclid al llegar (30 minutos);
 *  - en cada clic a WhatsApp suma «(ref: …)» al mensaje prellenado y registra
 *    click_whatsapp (si el botón ya lo registró, no se cuenta dos veces);
 *  - avisa al píxel de Meta cada cambio de página interno (GA4 lo toma solo).
 */
export function MedicionCliente() {
	const { pathname } = useLocation();
	const primera = useRef(true);

	useEffect(() => {
		capturarEnNavegador();
		const alClic = (evento: MouseEvent) => {
			const destino = evento.target instanceof Element ? evento.target.closest('a[href]') : null;
			if (!(destino instanceof HTMLAnchorElement) || !esEnlaceWhatsapp(destino.href)) return;
			destino.href = enlaceConReferencia(destino.href, referenciaActual());
			if (evento.type === 'click' || evento.button === 1) track('click_whatsapp', { origen: window.location.pathname });
		};
		document.addEventListener('click', alClic);
		document.addEventListener('auxclick', alClic);
		return () => {
			document.removeEventListener('click', alClic);
			document.removeEventListener('auxclick', alClic);
		};
	}, []);

	useEffect(() => {
		if (primera.current) {
			primera.current = false;
			return;
		}
		const w = window as Window & { fbq?: (...args: unknown[]) => void };
		if (typeof w.fbq === 'function') w.fbq('track', 'PageView');
	}, [pathname]);

	return null;
}
