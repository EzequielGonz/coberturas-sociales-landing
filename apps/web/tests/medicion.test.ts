import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CLAVE_ALMACEN,
  DURACION_MS,
  agregarReferencia,
  armarReferencia,
  capturar,
  codigoRed,
  enlaceConReferencia,
  leerEtiquetas,
  leerGuardada,
  leerReferencia,
  redDelReferer,
} from '../src/lib/atribucion';
import { configAnalitica } from '../src/lib/analitica';
import { fechaMasReciente } from '../src/lib/fechas';

// Datos ficticios: ningún nombre ni teléfono real.

function almacenFalso() {
  const datos = new Map<string, string>();
  return { getItem: (k: string) => datos.get(k) ?? null, setItem: (k: string, v: string) => void datos.set(k, v), datos };
}

test('etiquetas: lee utm_* y fbclid, y descarta lo demás', () => {
  const a = leerEtiquetas('?utm_source=instagram&utm_medium=historia&utm_campaign=art&utm_content=0112&utm_term=moto&fbclid=IwAR_ficticio&otro=1');
  assert.deepEqual(a, { utm_source: 'instagram', utm_medium: 'historia', utm_campaign: 'art', utm_content: '0112', utm_term: 'moto', fbclid: 'IwAR_ficticio' });
  assert.equal(leerEtiquetas('?q=hola'), null);
  assert.equal(leerEtiquetas(''), null);
});

test('etiquetas: se limpian caracteres raros y se acortan', () => {
  const a = leerEtiquetas(`?utm_campaign=${encodeURIComponent('<script>alert(1)</script>')}&utm_content=${'x'.repeat(300)}`);
  assert.equal(a?.utm_campaign, 'scriptalert1script');
  assert.equal(a?.utm_content?.length, 100);
});

test('referencia: red, campaña y pieza', () => {
  assert.equal(armarReferencia({ utm_source: 'instagram', utm_campaign: 'art', utm_content: '0112' }), 'IG-ART-0112');
  assert.equal(armarReferencia({ utm_source: 'Facebook', utm_campaign: 'perfil' }), 'FB-PERFIL');
  assert.equal(armarReferencia({ utm_source: 'tiktok', utm_content: 'r03' }), 'TT-X-R03');
  assert.equal(armarReferencia({ utm_source: 'ig', utm_campaign: 'Black-Friday 2026' }), 'IG-BLACKFRIDAY2');
  assert.equal(armarReferencia({ utm_source: 'newsletter' }), 'NEWS');
  assert.equal(armarReferencia(null), 'WEB');
});

test('referencia: sin etiquetas, fbclid es Meta y el referer da la red', () => {
  assert.equal(codigoRed({ fbclid: 'abc' }), 'MT');
  assert.equal(codigoRed({ referer_red: 'instagram' }), 'IG');
  assert.equal(codigoRed({ referer_red: 'google' }), 'GO');
  assert.equal(codigoRed({}), 'WEB');
});

test('referencia: armar y leer son inversos', () => {
  for (const a of [
    { utm_source: 'instagram', utm_campaign: 'art', utm_content: '0112' },
    { utm_source: 'youtube', utm_content: 's07' },
    { utm_source: 'facebook', utm_campaign: 'perfil' },
    {},
  ]) {
    const ref = armarReferencia(a);
    const leida = leerReferencia(`Hola (ref: ${ref})`)!;
    assert.equal(armarReferencia({ utm_source: leida.red, utm_campaign: leida.campana ?? undefined, utm_content: leida.pieza ?? undefined }), ref);
  }
});

test('mensaje de WhatsApp: la referencia va al final y una sola vez', () => {
  assert.equal(agregarReferencia('Hola, quiero consultar.', 'IG-ART-0112'), 'Hola, quiero consultar. (ref: IG-ART-0112)');
  assert.equal(agregarReferencia('Hola (ref: FB-PERFIL)', 'IG-ART'), 'Hola (ref: FB-PERFIL)');
  assert.equal(agregarReferencia('', 'WEB'), 'Hola, quiero hacer una consulta. (ref: WEB)');
});

test('enlace de WhatsApp: suma la referencia al texto sin tocar el número', () => {
  const url = enlaceConReferencia(`https://wa.me/5491100000000?text=${encodeURIComponent('Hola, vi "Plan de ahorro" en su web')}`, 'IG-PLAN-R01');
  const u = new URL(url);
  assert.equal(u.pathname, '/5491100000000');
  assert.equal(u.searchParams.get('text'), 'Hola, vi "Plan de ahorro" en su web (ref: IG-PLAN-R01)');
  assert.ok(!url.includes('+'));
  assert.equal(enlaceConReferencia('https://www.instagram.com/perfil/', 'IG'), 'https://www.instagram.com/perfil/');
  const api = new URL(enlaceConReferencia('https://api.whatsapp.com/send?phone=5491100000000&text=Hola', 'WEB'));
  assert.equal(api.searchParams.get('text'), 'Hola (ref: WEB)');
});

test('referer: solo redes y buscadores externos', () => {
  assert.equal(redDelReferer('https://l.instagram.com/?u=x', 'www.ejemplo.com'), 'instagram');
  assert.equal(redDelReferer('https://lm.facebook.com/l.php', 'www.ejemplo.com'), 'facebook');
  assert.equal(redDelReferer('https://www.google.com.ar/', 'www.ejemplo.com'), 'google');
  assert.equal(redDelReferer('https://www.ejemplo.com/guias', 'www.ejemplo.com'), null);
  assert.equal(redDelReferer('https://ejemplo.com/', 'www.ejemplo.com'), null);
  assert.equal(redDelReferer('https://otro-sitio.com/', 'www.ejemplo.com'), null);
  assert.equal(redDelReferer('', 'www.ejemplo.com'), null);
});

test('almacenamiento: 30 minutos, renovables; etiquetas nuevas reemplazan a las viejas', () => {
  const almacen = almacenFalso();
  const t0 = 1_000_000;
  capturar({ search: '?utm_source=instagram&utm_campaign=art', referer: '', hostPropio: 'www.ejemplo.com', almacen, ahora: t0 });
  // Página interna 20 minutos después, sin etiquetas: sigue y se renueva.
  const despues = capturar({ search: '', referer: 'https://www.ejemplo.com/', hostPropio: 'www.ejemplo.com', almacen, ahora: t0 + 20 * 60_000 });
  assert.equal(despues?.utm_campaign, 'art');
  assert.ok(leerGuardada(almacen, t0 + 45 * 60_000));
  // Vencida.
  assert.equal(leerGuardada(almacen, t0 + 20 * 60_000 + DURACION_MS + 1), null);
  // Etiquetas nuevas.
  capturar({ search: '?utm_source=facebook', referer: '', hostPropio: 'www.ejemplo.com', almacen, ahora: t0 + 50 * 60_000 });
  assert.equal(leerGuardada(almacen, t0 + 50 * 60_000)?.utm_source, 'facebook');
});

test('almacenamiento: sin etiquetas usa la red del referer; datos rotos o bloqueados no fallan', () => {
  const almacen = almacenFalso();
  assert.deepEqual(capturar({ search: '', referer: 'https://l.instagram.com/', hostPropio: 'www.ejemplo.com', almacen, ahora: 1 }), { referer_red: 'instagram' });
  almacen.datos.set(CLAVE_ALMACEN, '{roto');
  assert.equal(leerGuardada(almacen, 2), null);
  const bloqueado = { getItem: () => { throw new Error('bloqueado'); }, setItem: () => { throw new Error('bloqueado'); } };
  assert.deepEqual(capturar({ search: '?utm_source=ig', referer: '', hostPropio: 'x', almacen: bloqueado, ahora: 1 }), { utm_source: 'ig' });
  assert.equal(capturar({ search: '', referer: '', hostPropio: 'x', almacen: null, ahora: 1 }), null);
});

test('analítica: solo se carga lo que tiene formato válido; con GTM no se duplica GA4', () => {
  assert.deepEqual(configAnalitica({}), { gtmId: null, gaId: null, metaPixelId: null, googleVerification: null, bingVerification: null, metaDomainVerification: null });
  const c = configAnalitica({ NEXT_PUBLIC_GA_ID: 'G-ABC1234', NEXT_PUBLIC_META_PIXEL_ID: '123456789012', NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: 'abcDEF123_-xyz' });
  assert.equal(c.gaId, 'G-ABC1234');
  assert.equal(c.metaPixelId, '123456789012');
  assert.equal(c.googleVerification, 'abcDEF123_-xyz');
  assert.equal(configAnalitica({ NEXT_PUBLIC_GA_ID: "G-1');alert(1)//" }).gaId, null);
  assert.equal(configAnalitica({ NEXT_PUBLIC_META_PIXEL_ID: '12ab' }).metaPixelId, null);
  const conGtm = configAnalitica({ NEXT_PUBLIC_GTM_ID: 'GTM-AB12CD', NEXT_PUBLIC_GA_ID: 'G-ABC1234' });
  assert.equal(conGtm.gtmId, 'GTM-AB12CD');
  assert.equal(conGtm.gaId, null);
});

test('sitemap: lastmod es la fecha más reciente válida', () => {
  assert.equal(fechaMasReciente('2026-09-28', '2026-11-20'), '2026-11-20');
  assert.equal(fechaMasReciente('2026-11-21', '2026-11-20'), '2026-11-21');
  assert.equal(fechaMasReciente('', 'no-es-fecha', '2026-10-01'), '2026-10-01');
  assert.equal(fechaMasReciente(undefined), undefined);
});
