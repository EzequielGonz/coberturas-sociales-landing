import type { Page } from './types';

/**
 * Páginas locales (solo AMBA). Cada zona tiene datos propios para no ser una
 * página duplicada. Para potenciarlas, sumá en `extra` información real del
 * asesor en esa zona (atención presencial, clientes, testimonios).
 * Los sanatorios se nombran solo como referencia geográfica: la cartilla de
 * cada plan define cuáles están incluidos.
 */

type Zona = {
  slug: string;
  nombre: string;
  en: string;
  region: 'CABA' | 'Zona Norte' | 'Zona Oeste' | 'Zona Sur';
  lugares: string[];
  perfil: string;
  sanatorios?: string[];
  extra?: string[];
  status?: 'publicado' | 'borrador';
};

export const zonas: Zona[] = [
  { slug: 'caba', nombre: 'CABA', en: 'en CABA', region: 'CABA', lugares: ['Palermo', 'Belgrano', 'Recoleta', 'Núñez', 'Caballito', 'Villa Urquiza', 'Colegiales', 'Villa Devoto', 'Almagro', 'Puerto Madero'], perfil: 'La Ciudad concentra la mayor oferta de sanatorios, clínicas y centros médicos del país. Eso amplía las opciones, pero también hace que las diferencias entre cartillas sean más grandes: dos planes pueden darte acceso a sanatorios muy distintos.', sanatorios: ['Hospital Italiano de Buenos Aires', 'Hospital Alemán', 'Sanatorio Otamendi', 'Sanatorio de la Trinidad Palermo', 'Clínica y Maternidad Suizo Argentina'] },
  { slug: 'palermo', nombre: 'Palermo', en: 'en Palermo', region: 'CABA', lugares: ['Palermo Soho', 'Palermo Hollywood', 'Palermo Chico', 'Las Cañitas', 'Palermo Nuevo'], perfil: 'Palermo es uno de los barrios con más centros de salud privados de la Ciudad, con sanatorios de alta complejidad y maternidades muy elegidas por familias jóvenes.', sanatorios: ['Sanatorio de la Trinidad Palermo', 'Sanatorio Mater Dei', 'Clínica Bazterrica'] },
  { slug: 'belgrano', nombre: 'Belgrano', en: 'en Belgrano', region: 'CABA', lugares: ['Belgrano R', 'Belgrano C', 'Barrio Chino', 'Bajo Belgrano'], perfil: 'Belgrano combina zonas residenciales con mucha vida comercial sobre Cabildo. Muchas familias del barrio priorizan pediatría y guardias cercanas, además de centros de diagnóstico sobre los ejes principales.', sanatorios: ['Clínica Zabala'] },
  { slug: 'recoleta', nombre: 'Recoleta', en: 'en Recoleta', region: 'CABA', lugares: ['Recoleta', 'Barrio Norte', 'Plaza Francia'], perfil: 'Recoleta y Barrio Norte reúnen algunos de los sanatorios y hospitales privados más tradicionales de Buenos Aires, lo que hace que los planes medios y altos tengan mucho peso en la zona.', sanatorios: ['Hospital Alemán', 'Sanatorio Otamendi', 'Clínica y Maternidad Suizo Argentina'] },
  { slug: 'nunez', nombre: 'Núñez', en: 'en Núñez', region: 'CABA', lugares: ['Núñez', 'Saavedra', 'Coghlan'], perfil: 'Núñez y Saavedra están en el límite norte de la Ciudad, cerca de Vicente López. Muchas personas de la zona combinan centros de CABA y de zona norte, por eso conviene una cartilla que cubra ambos lados de la General Paz.', sanatorios: ['CEMIC (sede Saavedra)'] },
  { slug: 'caballito', nombre: 'Caballito', en: 'en Caballito', region: 'CABA', lugares: ['Caballito', 'Parque Centenario', 'Primera Junta'], perfil: 'Caballito es el centro geográfico de la Ciudad y tiene muy buena conexión con Almagro, donde se concentran varios centros de alta complejidad.', sanatorios: ['Hospital Italiano de Buenos Aires (Almagro)'] },
  { slug: 'villa-urquiza', nombre: 'Villa Urquiza', en: 'en Villa Urquiza', region: 'CABA', lugares: ['Villa Urquiza', 'Villa Pueyrredón', 'Parque Chas'], perfil: 'Villa Urquiza creció mucho en los últimos años con familias jóvenes. Guardia pediátrica cercana y buena cobertura de maternidad suelen ser las prioridades al elegir plan.' },
  { slug: 'vicente-lopez', nombre: 'Vicente López', en: 'en Vicente López', region: 'Zona Norte', lugares: ['Olivos', 'Florida', 'Munro', 'La Lucila', 'Villa Martelli', 'Vicente López'], perfil: 'Vicente López limita con la Ciudad, y sus vecinos suelen atenderse tanto en centros de zona norte como en CABA. Una cartilla que cubra los dos lados de la General Paz es muy valorada.', sanatorios: ['Clínica Olivos'] },
  { slug: 'san-isidro', nombre: 'San Isidro', en: 'en San Isidro', region: 'Zona Norte', lugares: ['San Isidro', 'Martínez', 'Acassuso', 'Beccar', 'Boulogne', 'Villa Adelina'], perfil: 'San Isidro es uno de los partidos con más oferta de salud privada de zona norte, con sanatorios de alta complejidad y maternidades muy consultadas.', sanatorios: ['Sanatorio de la Trinidad San Isidro', 'Sanatorio Las Lomas'] },
  { slug: 'san-fernando', nombre: 'San Fernando', en: 'en San Fernando', region: 'Zona Norte', lugares: ['San Fernando', 'Victoria', 'Virreyes'], perfil: 'San Fernando está entre San Isidro y Tigre. Muchas familias de la zona eligen planes con sanatorios en San Isidro y guardias cercanas a Panamericana.' },
  { slug: 'tigre', nombre: 'Tigre y Nordelta', en: 'en Tigre y Nordelta', region: 'Zona Norte', lugares: ['Nordelta', 'Tigre centro', 'Don Torcuato', 'General Pacheco', 'Benavídez', 'Rincón de Milberg'], perfil: 'En Tigre y Nordelta vive una gran cantidad de familias en barrios cerrados. Las distancias hacen que tener guardia y centros cerca sea tan importante como el sanatorio de referencia.' },
  { slug: 'pilar', nombre: 'Pilar', en: 'en Pilar', region: 'Zona Norte', lugares: ['Pilar centro', 'Del Viso', 'Manzanares', 'Presidente Derqui', 'Villa Rosa', 'Fátima'], perfil: 'Pilar creció con muchas familias en barrios cerrados y countries. Por la distancia a la Ciudad, la cobertura local de guardia, pediatría e internación es clave.', sanatorios: ['Hospital Universitario Austral'] },
  { slug: 'escobar', nombre: 'Escobar', en: 'en Escobar', region: 'Zona Norte', lugares: ['Belén de Escobar', 'Maquinista Savio', 'Ingeniero Maschwitz', 'Garín'], perfil: 'Escobar sumó muchas familias en los últimos años. Conviene revisar qué centros del plan quedan en la zona y cuáles en Pilar o Tigre, para no depender siempre de viajar.' },
  { slug: 'moron', nombre: 'Morón y Castelar', en: 'en Morón y Castelar', region: 'Zona Oeste', lugares: ['Morón', 'Castelar', 'Haedo', 'El Palomar', 'Villa Sarmiento'], perfil: 'Morón y Castelar son el centro de la zona oeste, con buena oferta de clínicas y centros médicos y conexión rápida a la Ciudad por el Acceso Oeste.' },
  { slug: 'ituzaingo', nombre: 'Ituzaingó', en: 'en Ituzaingó', region: 'Zona Oeste', lugares: ['Ituzaingó', 'Villa Udaondo', 'Parque Leloir'], perfil: 'Ituzaingó y Parque Leloir combinan barrios residenciales con zonas de casas quintas. Muchas familias buscan planes con sanatorios en Morón, Castelar o Ramos Mejía.' },
  { slug: 'hurlingham', nombre: 'Hurlingham', en: 'en Hurlingham', region: 'Zona Oeste', lugares: ['Hurlingham', 'William C. Morris', 'Villa Tesei'], perfil: 'Hurlingham está entre Morón y San Miguel. Al elegir plan, conviene revisar qué guardias quedan cerca y qué sanatorios de la zona oeste incluye la cartilla.' },
  { slug: 'tres-de-febrero', nombre: 'Tres de Febrero', en: 'en Tres de Febrero', region: 'Zona Oeste', lugares: ['Caseros', 'Ciudadela', 'Santos Lugares', 'Sáenz Peña', 'Ciudad Jardín'], perfil: 'Tres de Febrero limita con la Ciudad, y sus vecinos suelen combinar centros de CABA y del oeste. Una cartilla con buena presencia a ambos lados de la General Paz suele ser la más cómoda.' },
  { slug: 'la-matanza', nombre: 'Ramos Mejía y San Justo', en: 'en Ramos Mejía y San Justo', region: 'Zona Oeste', lugares: ['Ramos Mejía', 'San Justo', 'Villa Luzuriaga', 'Lomas del Mirador'], perfil: 'Ramos Mejía y San Justo concentran buena parte de la oferta de salud privada de La Matanza, con centros de alta complejidad muy consultados en la zona oeste.', sanatorios: ['Hospital Italiano de San Justo', 'Sanatorio de la Trinidad Ramos Mejía'] },
  { slug: 'san-martin', nombre: 'San Martín', en: 'en San Martín', region: 'Zona Norte', lugares: ['San Martín centro', 'Villa Ballester', 'San Andrés', 'Villa Lynch'], perfil: 'San Martín limita con la Ciudad y con Vicente López. Muchos vecinos de Villa Ballester y San Andrés buscan planes con centros en zona norte y en CABA.' },
  { slug: 'lomas-de-zamora', nombre: 'Lomas de Zamora', en: 'en Lomas de Zamora', region: 'Zona Sur', lugares: ['Lomas de Zamora', 'Banfield', 'Temperley', 'Turdera', 'Llavallol'], perfil: 'Lomas de Zamora, Banfield y Temperley son el centro de la zona sur, con clínicas y centros de diagnóstico sobre los principales ejes comerciales.' },
  { slug: 'almirante-brown', nombre: 'Adrogué y Almirante Brown', en: 'en Adrogué', region: 'Zona Sur', lugares: ['Adrogué', 'Burzaco', 'José Mármol', 'Longchamps', 'Rafael Calzada'], perfil: 'Adrogué es una de las zonas residenciales más tradicionales del sur. Las familias suelen buscar planes con guardia pediátrica cercana y sanatorios en Lomas o Temperley.' },
  { slug: 'canning', nombre: 'Canning y Esteban Echeverría', en: 'en Canning', region: 'Zona Sur', lugares: ['Canning', 'Monte Grande', 'Luis Guillón', 'El Jagüel'], perfil: 'Canning creció con barrios cerrados y familias jóvenes. Como en otras zonas de expansión, la cercanía de la guardia y los centros médicos pesa mucho al elegir.' },
  { slug: 'lanus', nombre: 'Lanús', en: 'en Lanús', region: 'Zona Sur', lugares: ['Lanús Este', 'Lanús Oeste', 'Remedios de Escalada', 'Valentín Alsina'], perfil: 'Lanús tiene muy buena conexión con la Ciudad, y muchos vecinos combinan centros locales con sanatorios de CABA. Conviene una cartilla que cubra las dos zonas.' },
  { slug: 'avellaneda', nombre: 'Avellaneda', en: 'en Avellaneda', region: 'Zona Sur', lugares: ['Avellaneda centro', 'Sarandí', 'Wilde', 'Piñeyro', 'Villa Domínico'], perfil: 'Avellaneda está a minutos de la Ciudad. Para muchos vecinos, tener sanatorios de CABA en la cartilla es tan importante como los centros locales.' },
  { slug: 'quilmes', nombre: 'Quilmes y Bernal', en: 'en Quilmes y Bernal', region: 'Zona Sur', lugares: ['Quilmes centro', 'Bernal', 'Quilmes Oeste', 'Ezpeleta', 'Don Bosco'], perfil: 'Quilmes y Bernal tienen una oferta de salud privada importante para la zona sur, con sanatorios de alta complejidad dentro del partido.', sanatorios: ['Sanatorio de la Trinidad Quilmes'] },
];

const D = '2026-09-28';
const P = '/prepagas';

const lista = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`;

function zonaToPage(z: Zona): Page {
  const vecinas = zonas.filter(o => o.region === z.region && o.slug !== z.slug).slice(0, 2);
  return {
    silo: 'prepagas',
    kind: 'zona',
    status: z.status ?? 'publicado',
    tipo: 'Prepaga',
    published: D,
    updated: D,
    path: `${P}/${z.slug}`,
    title: `Prepagas y obras sociales ${z.en}`,
    description: `Compará prepagas y obras sociales ${z.en}: ${lista(z.lugares.slice(0, 3))}. Planes familiares, derivación de aportes y asesoramiento sin cargo.`.slice(0, 160),
    label: `Prepagas en ${z.region}`,
    h1: 'Prepagas y obras sociales',
    h1Em: `${z.en}.`,
    lead: `Te ayudamos a elegir una cobertura médica ${z.en}, con los sanatorios y guardias que te quedan cerca y usando tus aportes si trabajás en relación de dependencia.`,
    nav: z.nombre,
    sections: [
      {
        title: `Cobertura médica ${z.en}`,
        blocks: [
          { p: z.perfil },
          { p: `Asesoramos a personas y familias de ${lista(z.lugares)}.` },
          ...(z.extra ?? []).map(text => ({ p: text })),
        ],
      },
      ...(z.sanatorios?.length
        ? [{
            title: 'Centros de referencia en la zona',
            blocks: [
              { p: 'Algunos centros de salud privados que suelen tenerse en cuenta en la zona son:' },
              { list: z.sanatorios },
              { p: 'Que un centro esté en la zona no significa que esté en tu plan: la cartilla de cada plan define cuáles incluye. Ver [cartilla y sanatorios](/prepagas/cartilla-y-sanatorios).' },
            ],
          }]
        : []),
      {
        title: `Qué mirar al elegir prepaga ${z.en}`,
        blocks: [
          { list: [
            'Guardia de adultos y pediátrica cerca de tu casa.',
            'Sanatorio para internación y maternidad incluido en el plan.',
            'Centros de diagnóstico para estudios sin viajar.',
            'Cobertura cerca de tu trabajo, si trabajás en otra zona.',
            'La cuota final con tus aportes descontados.',
          ] },
        ],
      },
      {
        title: 'Cómo te ayudamos',
        blocks: [
          { steps: [
            { title: 'Nos contás tu situación', text: 'Edades, grupo familiar, si trabajás en relación de dependencia y qué centros preferís.' },
            { title: 'Comparamos opciones', text: 'Planes de distintas prepagas con buena cartilla en tu zona, con la cuota final estimada.' },
            { title: 'Te acompañamos en el alta', text: 'Afiliación, declaración jurada y [derivación de aportes](/obras-sociales/derivacion-de-aportes-a-prepaga).' },
          ] },
          { note: 'Somos asesores independientes: comparamos opciones de distintas prepagas y obras sociales.' },
        ],
      },
    ],
    faqs: [
      { q: `¿Qué prepaga conviene ${z.en}?`, a: 'Depende de los centros que te queden cómodos, de tu grupo familiar y de tus aportes. Te armamos una comparación con tus datos.' },
      { q: '¿Puedo usar mis aportes?', a: 'Si trabajás en relación de dependencia, sí: se derivan a la prepaga y pagás solo la diferencia.' },
    ],
    related: [...vecinas.map(v => `${P}/${v.slug}`), `${P}/como-elegir-una-prepaga`],
  };
}

export const zonaPages: Page[] = zonas.map(zonaToPage);
