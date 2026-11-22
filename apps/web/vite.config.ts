import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import { AllowedEditorOrigins } from './plugins/horizons-runtime/editor-origins.js';
import horizonsRuntimePlugin from './plugins/horizons-runtime/vite-plugin-horizons-runtime.js';
import sessionJournalPlugin from './plugins/session-journal/vite-plugin-session-journal.js';
import editModeDevPlugin from './plugins/visual-editor/vite-plugin-edit-mode.js';
import inlineEditPlugin from './plugins/visual-editor/vite-plugin-react-inline-editor.js';
import devHeadersPlugin from './plugins/vite-plugin-dev-headers.js';
import horizonsLoggerPlugin from './plugins/vite-plugin-horizons-logger.js';
import iframeRouteRestorationPlugin from './plugins/vite-plugin-iframe-route-restoration.js';
import pocketbaseAuthPlugin from './plugins/vite-plugin-pocketbase-auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(__dirname, '../..');
const isDev = process.env.NODE_ENV !== 'production';

/**
 * Fecha (AAAA-MM-DD) del último commit que tocó estas rutas, para el `lastmod`
 * del sitemap. Si git no está disponible al compilar, la fecha del build.
 */
function fechaDeCambio(rutas: string[]): string {
	try {
		const salida = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...rutas], {
			cwd: __dirname,
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'ignore'],
		}).trim();
		if (/^\d{4}-\d{2}-\d{2}$/.test(salida)) return salida;
	} catch {
		// Sin git: se usa la fecha del build.
	}
	return new Date().toISOString().slice(0, 10);
}

export default defineConfig({
	define: {
		__FECHA_CONTENIDO__: JSON.stringify(fechaDeCambio(['src/content'])),
		__FECHA_PORTADA__: JSON.stringify(fechaDeCambio(['src/routes/home.tsx', 'src/components', 'src/constants'])),
	},
	server: {
		port: 3000,
		host: '::',
		cors: { origin: AllowedEditorOrigins },
		headers: {
			'Cross-Origin-Embedder-Policy': 'credentialless',
		},
		allowedHosts: ['.app-preview.com', '.app-preview.io'],
		fs: {
			strict: true,
			allow: [__dirname, path.join(monorepoRoot, 'node_modules')],
		},
	},
	preview: {
		port: 3000,
		host: '::',
		allowedHosts: ['.app-preview.com', '.app-preview.io'],
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	plugins: [
		horizonsLoggerPlugin(),
		...(isDev
			? [
				inlineEditPlugin(),
				editModeDevPlugin(),
				iframeRouteRestorationPlugin(),
				pocketbaseAuthPlugin(),
				sessionJournalPlugin(),
			]
			: []),
		horizonsRuntimePlugin(),
		devHeadersPlugin(),
		reactRouter(),
	],
});
