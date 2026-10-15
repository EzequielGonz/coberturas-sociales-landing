import type { Page } from './types';

const D = '2026-09-28';
const base = { silo: 'guias', kind: 'guia', published: D, updated: D, tipo: 'Quiero comparar opciones' } as const;

export const cotizadorPage: Page = {
  ...base,
  kind: 'herramienta',
  path: '/guias/cotizador-de-aportes',
  title: 'Cotizador de aportes: cuánto podés derivar a tu prepaga',
  description: 'Calculá cuánto de tu sueldo se destina a tu cobertura de salud y cuánto podrías derivar a una prepaga, solo o sumando los aportes de tu pareja.',
  label: 'Cotizador',
  h1: 'Cuánto podés derivar',
  h1Em: 'a tu prepaga.',
  lead: 'Ingresá tu sueldo bruto y, si corresponde, el de tu pareja. Te mostramos una estimación de los aportes de salud que pueden descontarse de la cuota de una prepaga.',
  nav: 'Cotizador de aportes',
  sections: [
    {
      title: 'Cómo se calcula',
      blocks: [
        { p: 'Cerca del 9% del sueldo bruto se destina a la cobertura de salud: un 3% que aporta el trabajador y un 6% que contribuye el empleador. Una parte de ese total va a un fondo solidario del sistema, por eso la estimación muestra un rango.' },
        { p: 'Más detalle en [cuánto se aporta a la obra social](/obras-sociales/cuanto-se-aporta) y en [derivación de aportes](/obras-sociales/derivacion-de-aportes-a-prepaga).' },
      ],
    },
    {
      title: 'Qué hacer con el resultado',
      blocks: [
        { p: 'El monto estimado es lo que se descontaría de la cuota. Con ese dato, tu grupo familiar y tu zona, podemos mostrarte qué planes quedan cubiertos y cuánta diferencia pagarías en cada uno.' },
        { note: 'Es una estimación orientativa. El monto exacto depende de tu recibo de sueldo y de la normativa vigente.' },
      ],
    },
  ],
  faqs: [
    { q: '¿Sirve si soy monotributista?', a: 'No: el monotributo tiene un componente de salud distinto. Consultanos y te decimos cómo usarlo.' },
  ],
  related: ['/obras-sociales/derivacion-de-aportes-a-prepaga', '/obras-sociales/sumar-grupo-familiar', '/prepagas/prepaga-relacion-de-dependencia'],
};

export const guiaPages: Page[] = [
  {
    ...base,
    path: '/guias/glosario',
    title: 'Glosario de prepagas y obras sociales',
    description: 'Qué significan aportes, derivación, carencia, preexistencia, copago, reintegro, cartilla, PMO y otros términos de la cobertura médica.',
    label: 'Glosario',
    h1: 'Glosario de',
    h1Em: 'cobertura médica.',
    lead: 'Las palabras de las prepagas y obras sociales pueden confundir. Acá las explicamos en lenguaje simple.',
    nav: 'Glosario',
    sections: [
      {
        title: 'Términos frecuentes',
        blocks: [
          { h3: 'Aportes' }, { p: 'La parte de tu sueldo que se destina a tu cobertura de salud, junto con la contribución de tu empleador. Ver [cuánto se aporta](/obras-sociales/cuanto-se-aporta).' },
          { h3: 'Derivación de aportes' }, { p: 'El trámite para que tus aportes vayan a una prepaga. Ver [derivación de aportes](/obras-sociales/derivacion-de-aportes-a-prepaga).' },
          { h3: 'Unificación de aportes' }, { p: 'Sumar los aportes de dos integrantes de la pareja en una misma cobertura. Ver [grupo familiar](/obras-sociales/sumar-grupo-familiar).' },
          { h3: 'Diferencia' }, { p: 'Lo que pagás de tu bolsillo cuando tus aportes no alcanzan el valor del plan.' },
          { h3: 'Cartilla' }, { p: 'La lista de médicos, centros y sanatorios que incluye tu plan. Ver [cartilla y sanatorios](/prepagas/cartilla-y-sanatorios).' },
          { h3: 'Copago' }, { p: 'Un monto adicional que se paga al usar ciertas prestaciones, como consultas o estudios.' },
          { h3: 'Reintegro' }, { p: 'Lo que la prepaga te devuelve si te atendés fuera de cartilla. Ver [reintegros](/prepagas/reintegros).' },
          { h3: 'Carencia' }, { p: 'El plazo de espera para usar ciertos beneficios adicionales. Ver [carencias](/prepagas/carencias).' },
          { h3: 'Preexistencia' }, { p: 'Una condición de salud previa a la afiliación. Ver [preexistencias](/prepagas/preexistencias).' },
          { h3: 'Declaración jurada de salud' }, { p: 'El formulario donde informás tu estado de salud al afiliarte.' },
          { h3: 'PMO' }, { p: 'El Programa Médico Obligatorio, la cobertura mínima de todas las obras sociales y prepagas. Ver [qué cubre el PMO](/obras-sociales/que-cubre-el-pmo).' },
          { h3: 'Superintendencia de Servicios de Salud' }, { p: 'El organismo nacional que regula y controla a obras sociales y prepagas.' },
        ],
      },
    ],
    related: ['/guias/documentos-para-afiliarte', '/prepagas', '/obras-sociales'],
  },
  {
    ...base,
    path: '/guias/documentos-para-afiliarte',
    title: 'Qué documentos necesitás para afiliarte a una prepaga',
    description: 'Lista de documentación para afiliarte a una prepaga o cambiar de obra social: DNI, recibo de sueldo, vínculos familiares y declaración jurada.',
    label: 'Documentación',
    h1: 'Qué documentos necesitás',
    h1Em: 'para afiliarte.',
    lead: 'Tener los papeles a mano hace que el alta sea rápida. Esta es la documentación que suele pedirse.',
    nav: 'Documentos para afiliarte',
    sections: [
      {
        title: 'Para el titular',
        blocks: [{ list: ['DNI.', 'Último recibo de sueldo, si trabajás en relación de dependencia.', 'CUIL.', 'Constancia de monotributo, si corresponde.', 'Declaración jurada de salud completa.'] }],
      },
      {
        title: 'Para el grupo familiar',
        blocks: [
          { list: ['DNI de cada integrante.', 'Acta de matrimonio o constancia de convivencia.', 'Partidas de nacimiento de los hijos.', 'Recibo de sueldo de tu pareja, si van a unificar aportes.'] },
          { note: 'Si te falta algo, no te preocupes: te decimos cómo conseguirlo.' },
        ],
      },
    ],
    related: ['/obras-sociales/sumar-grupo-familiar', '/guias/glosario', '/obras-sociales/derivacion-de-aportes-a-prepaga'],
  },
];
