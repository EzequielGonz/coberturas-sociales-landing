import type { Page } from './types';

/**
 * Páginas por prepaga y comparativas.
 *
 * Cuidado: solo datos generales y estables de cada marca. No publicar precios
 * ni nombres de planes sin verificarlos, porque cambian seguido. Si el asesor
 * tiene convenio con alguna marca, se puede sumar en `extra`.
 */

const D = '2026-09-28';
const P = '/prepagas';

type Marca = {
  slug: string;
  nombre: string;
  perfil: string;
  /** Para quién suele ser una buena opción (orientativo). */
  paraQuien: string[];
  extra?: string[];
  status?: 'publicado' | 'borrador';
};

export const marcas: Marca[] = [
  {
    slug: 'osde',
    nombre: 'OSDE',
    perfil: 'OSDE es una de las prepagas con más afiliados del país y una red de prestadores muy amplia en CABA, el conurbano y el interior. Tiene planes que van del segmento medio al alto, con diferencias importantes de cartilla y reintegros entre uno y otro.',
    paraQuien: ['Quienes buscan una red amplia en todo el AMBA.', 'Familias que valoran variedad de sanatorios y pediatras.', 'Personas que viajan seguido dentro del país.'],
  },
  {
    slug: 'swiss-medical',
    nombre: 'Swiss Medical',
    perfil: 'Swiss Medical es una de las principales prepagas del país y forma parte de un grupo de salud con centros médicos y sanatorios propios, además de su red de prestadores. Ofrece planes de nivel medio y alto.',
    paraQuien: ['Quienes quieren resolver consultas y estudios en centros propios.', 'Familias que priorizan una cartilla amplia en CABA y zona norte.', 'Personas que buscan planes altos con buenos reintegros.'],
  },
  {
    slug: 'galeno',
    nombre: 'Galeno',
    perfil: 'Galeno es una prepaga con fuerte presencia en el AMBA y cuenta con los Sanatorios de la Trinidad como red propia, con sedes en la Ciudad y en el conurbano. Tiene planes de distintos niveles.',
    paraQuien: ['Quienes viven cerca de un Sanatorio de la Trinidad.', 'Familias que buscan maternidad y pediatría en sanatorios de la red.', 'Personas que quieren un plan medio con buena cobertura de internación.'],
  },
  {
    slug: 'omint',
    nombre: 'Omint',
    perfil: 'Omint es una prepaga orientada principalmente al segmento medio-alto y alto, reconocida por planes con libre elección de prestadores y reintegros. Suele elegirse por ejecutivos y familias que priorizan comodidad y atención personalizada.',
    paraQuien: ['Quienes quieren planes premium con buenos reintegros.', 'Ejecutivos y profesionales con aportes altos.', 'Familias que valoran la atención personalizada.'],
  },
  {
    slug: 'medife',
    nombre: 'Medifé',
    perfil: 'Medifé es una prepaga con planes de distintos niveles y una red de prestadores en CABA, el conurbano y otras regiones. Suele considerarse cuando se busca un buen equilibrio entre cobertura y cuota.',
    paraQuien: ['Quienes buscan una cuota equilibrada con buena cartilla.', 'Jóvenes profesionales que derivan sus aportes.', 'Familias que priorizan la relación precio-cobertura.'],
  },
  {
    slug: 'sancor-salud',
    nombre: 'Sancor Salud',
    perfil: 'Sancor Salud nació en Sunchales, Santa Fe, y hoy tiene una red de prestadores de alcance nacional, con presencia en CABA y el conurbano. Ofrece planes de distintos niveles.',
    paraQuien: ['Quienes viajan o tienen familia en el interior.', 'Personas que buscan un plan medio con red nacional.', 'Familias que comparan relación precio-cobertura.'],
  },
  {
    slug: 'medicus',
    nombre: 'Medicus',
    perfil: 'Medicus es una prepaga con larga trayectoria en Buenos Aires y planes de nivel medio y alto. Suele compararse con otras prepagas tradicionales del segmento.',
    paraQuien: ['Quienes buscan una prepaga tradicional de Buenos Aires.', 'Familias que priorizan planes medios y altos.', 'Personas con médicos de confianza en su cartilla.'],
  },
  {
    slug: 'avalian',
    nombre: 'Avalian',
    perfil: 'Avalian es la prepaga antes conocida como ACA Salud, vinculada al movimiento cooperativo. Tiene red nacional y planes de distintos niveles.',
    paraQuien: ['Quienes buscan un plan medio con red nacional.', 'Personas que comparan alternativas de precio-cobertura.', 'Familias con integrantes en distintas provincias.'],
  },
  {
    slug: 'plan-de-salud-hospital-italiano',
    nombre: 'Plan de Salud del Hospital Italiano',
    perfil: 'El Plan de Salud del Hospital Italiano brinda atención en el Hospital Italiano de Buenos Aires, en el Hospital Italiano de San Justo y en su red de centros. Es una opción muy valorada por quienes quieren atenderse dentro del sistema del hospital.',
    paraQuien: ['Quienes quieren atenderse en el Hospital Italiano.', 'Personas que viven o trabajan cerca de Almagro o de San Justo.', 'Familias que valoran tener todo en un mismo sistema.'],
  },
  {
    slug: 'plan-medico-hospital-aleman',
    nombre: 'Plan Médico del Hospital Alemán',
    perfil: 'El Plan Médico del Hospital Alemán ofrece atención en el Hospital Alemán de Buenos Aires y en su red de centros. Se orienta a quienes buscan una cobertura centrada en un hospital de alta complejidad.',
    paraQuien: ['Quienes quieren atenderse en el Hospital Alemán.', 'Personas que viven o trabajan en Recoleta, Barrio Norte o zonas cercanas.', 'Quienes priorizan un hospital de alta complejidad como centro de referencia.'],
  },
];

const byName = (slug: string) => marcas.find(m => m.slug === slug)!;

function marcaToPage(m: Marca): Page {
  const comparativas = COMPARATIVAS.filter(c => c.a === m.slug || c.b === m.slug).map(c => `${P}/${c.slug}`);
  return {
    silo: 'prepagas',
    kind: 'marca',
    status: m.status ?? 'publicado',
    tipo: 'Prepaga',
    published: D,
    updated: D,
    path: `${P}/${m.slug}`,
    title: `${m.nombre}: planes, cartilla y cómo afiliarte en AMBA`.length <= 62
      ? `${m.nombre}: planes, cartilla y cómo afiliarte en AMBA`
      : `${m.nombre}: cómo afiliarte en AMBA`,
    description: `Todo sobre ${m.nombre} en CABA y GBA: qué ofrece, para quién conviene, cómo derivar tus aportes y cómo afiliarte con asesoramiento sin cargo.`.slice(0, 160),
    label: 'Prepagas en CABA y GBA',
    h1: m.nombre,
    h1Em: 'planes, cartilla y afiliación.',
    lead: `Si estás pensando en afiliarte a ${m.nombre}, te ayudamos a entender qué plan te conviene, cómo usar tus aportes y cómo se compara con otras opciones en tu zona.`,
    nav: m.nombre,
    sections: [
      {
        title: `Qué es ${m.nombre}`,
        blocks: [{ p: m.perfil }, ...(m.extra ?? []).map(text => ({ p: text }))],
      },
      {
        title: `Para quién suele convenir ${m.nombre}`,
        blocks: [
          { list: m.paraQuien },
          { p: 'Es orientativo: lo que define si te conviene es la cartilla del plan en tu zona, tu grupo familiar y la cuota final con tus aportes.' },
        ],
      },
      {
        title: 'Qué revisar antes de elegir un plan',
        blocks: [
          { list: [
            'Los sanatorios y guardias del plan cerca de tu casa. Ver [cartilla y sanatorios](/prepagas/cartilla-y-sanatorios).',
            'Si tiene copagos y cuáles son los topes de [reintegros](/prepagas/reintegros).',
            'Las [carencias](/prepagas/carencias) para beneficios adicionales.',
            'La cuota final después de descontar tus aportes.',
          ] },
        ],
      },
      {
        title: `Cómo afiliarte a ${m.nombre} usando tus aportes`,
        blocks: [
          { p: `Si trabajás en relación de dependencia, podés derivar tus aportes a ${m.nombre} y pagar solo la diferencia. Te explicamos el trámite en [derivación de aportes](/obras-sociales/derivacion-de-aportes-a-prepaga).` },
          { steps: [
            { title: 'Nos contás tu situación', text: 'Edad, grupo familiar, zona y si trabajás en relación de dependencia.' },
            { title: 'Te mostramos planes', text: `Comparamos los planes de ${m.nombre} con otras opciones con sanatorios similares en tu zona.` },
            { title: 'Te acompañamos en el alta', text: 'Solicitud, declaración jurada de salud y derivación de aportes.' },
          ] },
          { note: `${FIRM_DISCLAIMER} ${m.nombre} es una marca de su titular.` },
        ],
      },
    ],
    faqs: [
      { q: `¿Puedo pagar ${m.nombre} con mis aportes?`, a: 'Si trabajás en relación de dependencia, en general sí: tus aportes se descuentan de la cuota. Te confirmamos las condiciones del plan que elijas.' },
      { q: `¿${m.nombre} me puede rechazar por una enfermedad previa?`, a: 'La ley no permite rechazar la afiliación por preexistencias, aunque puede aplicarse una cuota diferencial autorizada.' },
      { q: '¿Cuánto cuesta?', a: 'Depende del plan, de las edades del grupo familiar y de tus aportes. Pedinos una cotización con tus datos.' },
    ],
    related: [...comparativas, `${P}/como-elegir-una-prepaga`, '/obras-sociales/derivacion-de-aportes-a-prepaga'],
  };
}

const FIRM_DISCLAIMER = 'Somos asesores independientes: no somos la prepaga ni hablamos en su nombre.';

type Comparativa = { slug: string; a: string; b: string };

const COMPARATIVAS: Comparativa[] = [
  { slug: 'osde-vs-swiss-medical', a: 'osde', b: 'swiss-medical' },
  { slug: 'galeno-vs-swiss-medical', a: 'galeno', b: 'swiss-medical' },
  { slug: 'osde-vs-galeno', a: 'osde', b: 'galeno' },
];

function comparativaToPage(c: Comparativa): Page {
  const a = byName(c.a);
  const b = byName(c.b);
  return {
    silo: 'prepagas',
    kind: 'comparativa',
    tipo: 'Quiero comparar opciones',
    published: D,
    updated: D,
    path: `${P}/${c.slug}`,
    title: `${a.nombre} vs ${b.nombre}: cuál conviene en AMBA`,
    description: `${a.nombre} o ${b.nombre}: diferencias, para quién conviene cada una y cómo compararlas según tu zona, tu familia y tus aportes en CABA y GBA.`,
    label: 'Comparativas',
    h1: `${a.nombre} vs ${b.nombre}:`,
    h1Em: 'cuál te conviene.',
    lead: `Son dos de las prepagas más consultadas. No hay una mejor en general: depende de tu zona, del plan y de lo que necesita tu familia. Te mostramos cómo compararlas.`,
    nav: `${a.nombre} vs ${b.nombre}`,
    sections: [
      { title: a.nombre, blocks: [{ p: a.perfil }, { list: a.paraQuien }] },
      { title: b.nombre, blocks: [{ p: b.perfil }, { list: b.paraQuien }] },
      {
        title: 'Cómo compararlas de verdad',
        blocks: [
          { p: 'Comparar marcas en general sirve de poco, porque dentro de cada una hay planes muy distintos. La comparación útil es plan contra plan, con estos criterios:' },
          { list: [
            'Sanatorios y guardias de cada plan en tu zona.',
            'Copagos y topes de reintegro.',
            'Maternidad, pediatría y salud mental, si son prioridad.',
            'Cobertura en viajes.',
            'Cuota final para tu grupo familiar, con tus aportes descontados.',
          ] },
          { note: 'Pedinos la comparación con tus datos: te mostramos planes equivalentes de las dos, lado a lado.' },
        ],
      },
    ],
    faqs: [
      { q: `¿Qué es más caro, ${a.nombre} o ${b.nombre}?`, a: 'Depende del plan y de las edades del grupo familiar. Hay planes de ambas en rangos parecidos; por eso conviene comparar plan contra plan.' },
      { q: '¿Puedo cambiarme de una a otra?', a: 'Sí. Te explicamos cómo hacerlo sin quedarte sin cobertura en [cómo cambiarse de prepaga](/prepagas/como-cambiarse-de-prepaga).' },
    ],
    related: [`${P}/${a.slug}`, `${P}/${b.slug}`, `${P}/como-elegir-una-prepaga`],
  };
}

export const marcaPages: Page[] = marcas.map(marcaToPage);
export const comparativaPages: Page[] = COMPARATIVAS.map(comparativaToPage);
