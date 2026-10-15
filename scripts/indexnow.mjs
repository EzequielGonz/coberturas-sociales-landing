#!/usr/bin/env node
/**
 * Avisa a los buscadores que usan IndexNow (Bing, Yandex, Seznam, Naver…) que
 * hay páginas nuevas o actualizadas, para que las indexen en horas y no semanas.
 *
 * Requisitos: dominio publicado y INDEXNOW_KEY completado en
 * apps/web/src/constants/brand.ts (el sitio sirve la clave en /indexnow.txt).
 *
 * Uso:
 *   node scripts/indexnow.mjs https://www.comparatuobrasocial.com.ar
 *   node scripts/indexnow.mjs https://www.comparatuobrasocial.com.ar /prepagas/osde   (solo esas URLs)
 *
 * Google no usa IndexNow: para Google, enviá el sitemap en Search Console.
 */
const [origin, ...paths] = process.argv.slice(2);
if (!origin) {
  console.error('Indicá el dominio: node scripts/indexnow.mjs https://www.comparatuobrasocial.com.ar');
  process.exit(1);
}
const base = origin.replace(/\/+$/, '');

const keyResponse = await fetch(`${base}/indexnow.txt`);
if (!keyResponse.ok) {
  console.error('No se encontró /indexnow.txt. Completá INDEXNOW_KEY en constants/brand.ts y publicá el sitio.');
  process.exit(1);
}
const key = (await keyResponse.text()).trim();

let urlList = paths.map(path => `${base}${path.startsWith('/') ? path : `/${path}`}`);
if (!urlList.length) {
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(base).host, key, keyLocation: `${base}/indexnow.txt`, urlList }),
});

console.log(`IndexNow: ${response.status} ${response.statusText} — ${urlList.length} URL(s) enviadas.`);
if (response.status >= 400) process.exit(1);
