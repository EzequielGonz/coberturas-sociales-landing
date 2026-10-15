import { data } from 'react-router';
import { INDEXNOW_KEY } from '@/constants/brand';

/**
 * Archivo de verificación de IndexNow (Bing, Yandex, Seznam, Naver…).
 * Se usa junto con el script `scripts/indexnow.mjs`, que avisa a los buscadores
 * cada vez que se publican o actualizan páginas.
 */
export function loader() {
	if (!INDEXNOW_KEY) throw data(null, { status: 404 });
	return new Response(INDEXNOW_KEY, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' },
	});
}
