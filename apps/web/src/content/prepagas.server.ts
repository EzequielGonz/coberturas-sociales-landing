import type { Page } from './types';

const D = '2026-09-28';
const P = '/prepagas';
const O = '/obras-sociales';

const base = { silo: 'prepagas', kind: 'guia', published: D, updated: D, tipo: 'Prepaga' } as const;

export const prepagasPilar: Page = {
  ...base,
  kind: 'pilar',
  path: P,
  title: 'Prepagas en CABA y GBA: compará planes y asesorate',
  description:
    'Compará prepagas en CABA y el conurbano: OSDE, Swiss Medical, Galeno, Omint y más. Planes familiares, derivación de aportes y asesoramiento sin cargo.',
  label: 'Prepagas en CABA y el AMBA',
  h1: 'Compará prepagas',
  h1Em: 'y elegí con claridad.',
  lead:
    'Hay muchas prepagas y cientos de planes. Te ayudamos a entender las diferencias, a aprovechar tus aportes si trabajás en relación de dependencia y a elegir la cobertura que mejor se adapta a vos y a tu familia.',
  nav: 'Prepagas',
  sections: [
    {
      title: 'Qué es una prepaga y en qué se diferencia de una obra social',
      blocks: [
        { p: 'Una prepaga es una empresa de medicina privada que brinda cobertura de salud a cambio de una cuota mensual. Una obra social, en cambio, es la entidad que recibe los aportes de salud de los trabajadores en relación de dependencia.' },
        { p: 'La buena noticia es que no tenés que elegir entre una y otra: si trabajás en relación de dependencia, podés [derivar tus aportes](/obras-sociales/derivacion-de-aportes-a-prepaga) a una prepaga y pagar solo la diferencia. Lo explicamos en detalle en [obra social o prepaga](/obras-sociales/obra-social-o-prepaga).' },
      ],
    },
    {
      title: 'Qué mirar para comparar prepagas',
      blocks: [
        { p: 'El nombre de la prepaga dice mucho menos que el plan. Dentro de una misma marca hay planes muy distintos. Estos son los puntos que realmente conviene comparar:' },
        { list: [
          'Cartilla: qué médicos, clínicas y sanatorios incluye cerca de tu casa y tu trabajo. Lo explicamos en [cartilla y sanatorios](/prepagas/cartilla-y-sanatorios).',
          'Copagos: si pagás un monto extra por consultas o estudios.',
          'Reintegros: cuánto te devuelven si te atendés con un médico fuera de cartilla. Ver [reintegros](/prepagas/reintegros).',
          'Internación: si incluye habitación individual.',
          'Odontología, óptica y salud mental: varían mucho de un plan a otro.',
          'Cobertura en viajes, dentro y fuera del país.',
          'Cuota final: lo que pagás después de descontar tus aportes.',
        ] },
        { p: 'Te lo explicamos paso a paso en [cómo elegir una prepaga](/prepagas/como-elegir-una-prepaga).' },
      ],
    },
    {
      title: 'Cómo se contrata una prepaga',
      blocks: [
        { steps: [
          { title: 'Definí qué necesitás', text: 'Para quién es la cobertura, qué zona te queda cómoda y qué prestaciones son prioridad: pediatría, maternidad, salud mental, odontología.' },
          { title: 'Compará planes', text: 'Con tu edad, tu grupo familiar y tus aportes, comparamos opciones reales y te mostramos las diferencias.' },
          { title: 'Declaración jurada de salud', text: 'Al afiliarte completás una declaración de salud. La ley no permite rechazarte por [preexistencias](/prepagas/preexistencias).' },
          { title: 'Alta y derivación', text: 'Si trabajás en relación de dependencia, se hace la derivación de aportes para que se descuenten de la cuota.' },
        ] },
      ],
    },
    {
      title: 'Para quién es cada tipo de plan',
      blocks: [
        { p: 'Tenemos guías según tu situación: [familias con hijos](/prepagas/prepaga-para-familias), [parejas](/prepagas/prepaga-para-parejas), [jóvenes profesionales](/prepagas/prepaga-para-jovenes), [embarazo](/prepagas/prepaga-para-embarazo), [planes premium](/prepagas/planes-premium) y [trabajadores en relación de dependencia](/prepagas/prepaga-relacion-de-dependencia).' },
        { note: 'Somos asesores independientes: no somos ninguna de las prepagas que mencionamos. Te ayudamos a comparar y a contratar.' },
      ],
    },
  ],
  faqs: [
    { q: '¿El asesoramiento tiene costo?', a: 'Consultanos y te explicamos cómo trabajamos antes de que tomes cualquier decisión.' },
    { q: '¿Puedo usar mis aportes para pagar una prepaga?', a: 'Sí. Si trabajás en relación de dependencia, tus aportes de salud pueden derivarse a una prepaga y se descuentan de la cuota.' },
    { q: '¿Me pueden rechazar por una enfermedad previa?', a: 'La ley de medicina prepaga no permite rechazar la afiliación por preexistencias, aunque puede establecerse una cuota diferencial autorizada.' },
    { q: '¿Puedo cambiarme de prepaga?', a: 'Sí. Te contamos cómo hacerlo sin quedarte sin cobertura en [cómo cambiarse de prepaga](/prepagas/como-cambiarse-de-prepaga).' },
  ],
  related: [`${P}/como-elegir-una-prepaga`, `${O}/derivacion-de-aportes-a-prepaga`, `${P}/prepaga-para-familias`],
};

export const prepagasGuias: Page[] = [
  {
    ...base,
    path: `${P}/como-elegir-una-prepaga`,
    title: 'Cómo elegir una prepaga: guía para no equivocarte',
    description: 'Qué mirar al elegir una prepaga en Buenos Aires: cartilla, sanatorios, copagos, reintegros, carencias y cuota final con tus aportes.',
    label: 'Guía para elegir',
    h1: 'Cómo elegir',
    h1Em: 'una prepaga.',
    lead: 'Elegir prepaga por la marca o por el precio más bajo suele salir caro después. Esta guía te ayuda a comparar lo que de verdad importa.',
    nav: 'Cómo elegir una prepaga',
    sections: [
      {
        title: 'Empezá por tu vida, no por la marca',
        blocks: [
          { p: 'Antes de mirar planes, conviene tener claras tres cosas: dónde vas a atenderte, quiénes necesitan cobertura y qué prestaciones usan más en tu familia. Una pareja joven y una familia con chicos en edad escolar necesitan cosas muy distintas.' },
          { list: [
            'Zona: los sanatorios y centros cercanos a tu casa y tu trabajo.',
            'Grupo familiar: edades, hijos, planes de embarazo.',
            'Uso: controles, pediatría, salud mental, odontología, tratamientos en curso.',
            'Médicos de confianza: si querés seguir con tus profesionales, revisá si están en cartilla.',
          ] },
        ],
      },
      {
        title: 'Los puntos que hay que comparar',
        blocks: [
          { h3: 'Cartilla y sanatorios' },
          { p: 'Es lo más importante. Dos planes de la misma prepaga pueden tener sanatorios muy distintos. Mirá la cartilla del plan, no la de la marca. Ver [cartilla y sanatorios](/prepagas/cartilla-y-sanatorios).' },
          { h3: 'Copagos' },
          { p: 'Algunos planes cobran un monto extra por consulta o estudio. Un plan más barato con copagos puede terminar costando más si lo usás seguido.' },
          { h3: 'Reintegros' },
          { p: 'Si querés atenderte con médicos fuera de cartilla, el reintegro define cuánto te devuelven. Ver [reintegros](/prepagas/reintegros).' },
          { h3: 'Carencias' },
          { p: 'Son los plazos de espera para usar ciertas prestaciones. Ver [carencias](/prepagas/carencias).' },
          { h3: 'Cuota final' },
          { p: 'Si trabajás en relación de dependencia, la cuota que importa es la diferencia después de descontar tus aportes. Podés estimarlos con el [cotizador](/guias/cotizador-de-aportes).' },
        ],
      },
      {
        title: 'Errores frecuentes',
        blocks: [
          { list: [
            'Elegir por la marca sin revisar el plan.',
            'No verificar que tu sanatorio o tu pediatra estén en cartilla.',
            'Comparar cuotas sin descontar los aportes.',
            'No leer las condiciones de carencias antes de un embarazo.',
            'Declarar mal la salud en la declaración jurada.',
          ] },
          { note: 'Comparar bien lleva tiempo. Por eso existe el asesoramiento: te traemos las opciones ya filtradas según tu caso.' },
        ],
      },
    ],
    faqs: [
      { q: '¿Cuál es la mejor prepaga?', a: 'No hay una mejor para todos. La mejor es la que tiene los sanatorios y médicos que te quedan cómodos, con las prestaciones que tu familia usa, a una cuota que podés sostener.' },
      { q: '¿Conviene un plan con copagos?', a: 'Puede convenir si usás poco la cobertura. Si hacés muchas consultas o tenés chicos, un plan sin copagos suele ser más previsible.' },
    ],
    related: [`${P}/cartilla-y-sanatorios`, `${P}/carencias`, '/guias/cotizador-de-aportes'],
  },
  {
    ...base,
    path: `${P}/carencias`,
    title: 'Carencias en prepagas: qué son y cuándo aplican',
    description: 'Qué son los períodos de carencia de una prepaga, qué prestaciones no pueden tener carencia y cómo evitar sorpresas al afiliarte o cambiarte.',
    label: 'Carencias',
    h1: 'Carencias en prepagas:',
    h1Em: 'qué son y cuándo aplican.',
    lead: 'La carencia es el tiempo que tenés que esperar desde que te afiliás hasta poder usar ciertas prestaciones. Conocerlas evita sorpresas, sobre todo si estás pensando en un embarazo o una cirugía.',
    nav: 'Carencias',
    sections: [
      {
        title: 'Qué es un período de carencia',
        blocks: [
          { p: 'Es un plazo de espera que algunas prepagas establecen para prestaciones específicas. Durante ese tiempo estás afiliado y pagás la cuota, pero esas prestaciones puntuales todavía no están habilitadas.' },
          { p: 'La ley de medicina prepaga limita las carencias: no pueden aplicarse a las prestaciones incluidas en el Programa Médico Obligatorio. Sí pueden existir para beneficios adicionales del plan que van más allá de ese piso. Ver [qué cubre el PMO](/obras-sociales/que-cubre-el-pmo).' },
        ],
      },
      {
        title: 'Dónde suelen aparecer',
        blocks: [
          { list: [
            'Beneficios adicionales de maternidad que superan el PMO.',
            'Cirugías programadas no urgentes con prestaciones especiales.',
            'Ortodoncia y tratamientos odontológicos complejos.',
            'Cirugía estética o reparadora no cubierta por el PMO.',
            'Algunos beneficios de óptica y prótesis.',
          ] },
        ],
      },
      {
        title: 'Cómo evitarlas o reducirlas',
        blocks: [
          { p: 'Al cambiarte de prepaga o pasar desde una obra social, muchas veces se puede reconocer la antigüedad de la cobertura anterior. Depende de la prepaga y del plan, por eso conviene verificarlo antes de contratar.' },
          { note: 'Si estás buscando un embarazo, revisá las carencias de maternidad antes de elegir. Mirá [prepaga para embarazo](/prepagas/prepaga-para-embarazo).' },
        ],
      },
    ],
    faqs: [
      { q: '¿Las urgencias tienen carencia?', a: 'Las urgencias y emergencias forman parte de la cobertura obligatoria y no deberían quedar sujetas a carencia.' },
      { q: '¿Si vengo de otra cobertura empiezo de cero?', a: 'No siempre. En muchos casos se reconoce la antigüedad anterior. Conviene confirmarlo por escrito antes de cambiarte.' },
    ],
    related: [`${P}/preexistencias`, `${P}/prepaga-para-embarazo`, `${P}/como-cambiarse-de-prepaga`],
  },
  {
    ...base,
    path: `${P}/preexistencias`,
    title: 'Preexistencias en prepagas: qué dice la ley',
    description: 'Una prepaga no puede rechazarte por una enfermedad preexistente. Qué es la declaración jurada, la cuota diferencial y cómo afiliarte sin problemas.',
    label: 'Preexistencias',
    h1: 'Preexistencias:',
    h1Em: 'qué dice la ley.',
    lead: 'Tener una enfermedad previa no te impide afiliarte a una prepaga. Te explicamos cómo funciona la declaración jurada de salud y qué puede cambiar en la cuota.',
    nav: 'Preexistencias',
    sections: [
      {
        title: 'Qué es una preexistencia',
        blocks: [
          { p: 'Es cualquier enfermedad o condición de salud que ya tenías antes de afiliarte: diabetes, hipertensión, asma, una cirugía previa o un tratamiento en curso.' },
        ],
      },
      {
        title: 'Qué establece la ley',
        blocks: [
          { list: [
            'Las preexistencias no pueden ser motivo de rechazo de la afiliación.',
            'Se declaran en una declaración jurada de salud al momento de afiliarte.',
            'La prepaga puede aplicar una cuota diferencial, que debe estar autorizada por la autoridad de aplicación.',
          ] },
        ],
      },
      {
        title: 'La declaración jurada, con cuidado',
        blocks: [
          { p: 'Es importante completarla con información veraz. Omitir una preexistencia puede traer problemas después, justo cuando más necesitás la cobertura. Si tenés dudas sobre qué declarar, consultanos antes de firmar.' },
          { note: 'Si tenés un tratamiento en curso, contanos: podemos buscar planes con buena cobertura para esa especialidad y verificar que tus médicos estén en cartilla.' },
        ],
      },
    ],
    faqs: [
      { q: '¿Cuánto más cuesta la cuota con una preexistencia?', a: 'Depende de la prepaga, del plan y de la condición declarada. No todas las preexistencias generan una cuota diferencial.' },
    ],
    related: [`${P}/carencias`, `${P}/como-elegir-una-prepaga`, `${P}/como-cambiarse-de-prepaga`],
  },
  {
    ...base,
    path: `${P}/aumentos-de-prepagas`,
    title: 'Aumentos de prepagas: cómo funcionan y qué hacer',
    description: 'Cómo se deciden los aumentos de las cuotas de prepagas, cómo te enterás, qué pasa con la edad y qué alternativas tenés si la cuota se vuelve alta.',
    label: 'Aumentos de cuota',
    h1: 'Aumentos de prepagas:',
    h1Em: 'qué hacer si tu cuota subió.',
    lead: 'Las cuotas de las prepagas se ajustan periódicamente. Si sentís que estás pagando de más, hay alternativas para cuidar tu cobertura sin perder calidad.',
    nav: 'Aumentos de prepagas',
    sections: [
      {
        title: 'Cómo se definen los aumentos',
        blocks: [
          { p: 'En los últimos años cambió el marco que regula los precios de las prepagas, y hoy cada empresa define sus ajustes y los comunica a sus afiliados con anticipación. Por eso las diferencias entre prepagas y planes pueden ser grandes de un mes a otro.' },
          { p: 'Además de los aumentos generales, la cuota puede cambiar cuando un integrante pasa a otra franja de edad. La ley protege a los afiliados de 65 años o más con al menos diez años de antigüedad en la misma prepaga, que no pueden recibir aumentos por edad.' },
        ],
      },
      {
        title: 'Alternativas si la cuota se volvió alta',
        blocks: [
          { list: [
            'Revisar si estás derivando tus aportes. Muchas personas en relación de dependencia pagan la cuota completa sin saberlo. Ver [derivación de aportes](/obras-sociales/derivacion-de-aportes-a-prepaga).',
            'Unificar los aportes de la pareja para reducir la diferencia. Ver [sumar a tu familia](/obras-sociales/sumar-grupo-familiar).',
            'Cambiar a un plan de la misma prepaga con otra cartilla.',
            'Comparar con otras prepagas con sanatorios similares en tu zona.',
          ] },
          { note: 'Antes de bajar de plan, compará qué perdés: a veces un cambio de prepaga mantiene los sanatorios y cuesta menos.' },
        ],
      },
    ],
    faqs: [
      { q: '¿Me pueden aumentar por cumplir años?', a: 'Puede haber cambios por franja etaria, con los límites que fija la ley para los mayores de 65 con diez años de antigüedad.' },
      { q: '¿Me conviene cambiarme de prepaga?', a: 'Depende de lo que pagues y de lo que uses. Te hacemos una comparación con tus datos para que decidas con números.' },
    ],
    related: [`${P}/como-cambiarse-de-prepaga`, `${O}/derivacion-de-aportes-a-prepaga`, '/guias/cotizador-de-aportes'],
  },
  {
    ...base,
    path: `${P}/como-cambiarse-de-prepaga`,
    title: 'Cómo cambiarse de prepaga sin quedarte sin cobertura',
    description: 'Pasos para cambiarse de prepaga en Buenos Aires: comparar, afiliarse, redirigir aportes, dar de baja la anterior y cuidar las carencias.',
    label: 'Cambio de prepaga',
    h1: 'Cómo cambiarse',
    h1Em: 'de prepaga.',
    lead: 'Cambiarse de prepaga es más simple de lo que parece, pero el orden de los pasos importa para no quedar sin cobertura ni pagar dos cuotas.',
    nav: 'Cómo cambiarse de prepaga',
    sections: [
      {
        title: 'Los pasos, en orden',
        blocks: [
          { steps: [
            { title: 'Compará antes de avisar', text: 'Elegí el nuevo plan con cartilla, carencias y cuota final claras. No des de baja nada todavía.' },
            { title: 'Afiliate a la nueva', text: 'Completás la solicitud y la declaración jurada de salud. Confirmá la fecha de inicio de la cobertura.' },
            { title: 'Redirigí tus aportes', text: 'Si trabajás en relación de dependencia, tus aportes tienen que ir a la nueva cobertura. Ver [derivación de aportes](/obras-sociales/derivacion-de-aportes-a-prepaga).' },
            { title: 'Dá de baja la anterior', text: 'Cuando la nueva cobertura esté activa. Pedí constancia de la baja.' },
          ] },
        ],
      },
      {
        title: 'Qué cuidar en el cambio',
        blocks: [
          { list: [
            'Tratamientos en curso: confirmá que el nuevo plan los cubre y con qué profesionales.',
            'Carencias: preguntá si reconocen tu antigüedad. Ver [carencias](/prepagas/carencias).',
            'Embarazo: si estás embarazada o buscando, revisalo antes de cambiarte.',
            'Superposición: evitá días sin cobertura entre una y otra.',
          ] },
          { note: 'Un asesor coordina los tiempos del cambio para que no quedes sin cobertura ni pagues de más.' },
        ],
      },
    ],
    faqs: [
      { q: '¿Cada cuánto me puedo cambiar de prepaga?', a: 'Si pagás en forma particular, podés cambiarte cuando quieras. Si usás tus aportes, el traspaso de aportes tiene reglas propias que te explicamos según tu caso.' },
      { q: '¿Pierdo la antigüedad?', a: 'Depende de la nueva prepaga. En muchos casos se reconoce, pero conviene pedirlo por escrito.' },
    ],
    related: [`${O}/cambio-de-obra-social`, `${P}/carencias`, `${P}/aumentos-de-prepagas`],
  },
  {
    ...base,
    path: `${P}/cartilla-y-sanatorios`,
    title: 'Cartilla de prepagas: cómo elegir por sanatorios',
    description: 'Por qué la cartilla y los sanatorios definen tu prepaga. Cómo revisar médicos, clínicas y guardias cerca de tu casa en CABA y el conurbano.',
    label: 'Cartilla',
    h1: 'Elegí tu prepaga',
    h1Em: 'por la cartilla.',
    lead: 'La cartilla es la lista de médicos, centros y sanatorios que incluye tu plan. Es lo que más impacta en tu día a día, mucho más que el nombre de la prepaga.',
    nav: 'Cartilla y sanatorios',
    sections: [
      {
        title: 'Por qué la cartilla es lo primero',
        blocks: [
          { p: 'Cuando tenés una urgencia a la noche, lo que importa es qué guardia te corresponde y a cuántas cuadras está. Cuando tu hijo necesita un pediatra, lo que importa es si hay turnos cerca. Todo eso lo define la cartilla del plan.' },
          { p: 'Dentro de una misma prepaga, los planes más altos suelen sumar sanatorios de mayor complejidad y más centros. Por eso dos personas con la misma marca pueden tener experiencias muy distintas.' },
        ],
      },
      {
        title: 'Qué revisar',
        blocks: [
          { list: [
            'Guardias de adultos y pediátricas cerca de tu casa.',
            'Sanatorio para internación y, si corresponde, maternidad.',
            'Centros de diagnóstico para estudios.',
            'Tus médicos actuales, si querés seguir con ellos.',
            'Cobertura cerca de tu trabajo, si pasás el día en otra zona.',
          ] },
          { note: 'Tenemos guías por zona del AMBA con los puntos a tener en cuenta en cada lugar. Mirá las [prepagas por zona](/prepagas).' },
        ],
      },
    ],
    faqs: [
      { q: '¿La cartilla puede cambiar?', a: 'Sí. Los prestadores pueden entrar o salir de una cartilla. Conviene revisarla al contratar y periódicamente.' },
    ],
    related: [`${P}/como-elegir-una-prepaga`, `${P}/reintegros`, `${P}/planes-premium`],
  },
  {
    ...base,
    path: `${P}/reintegros`,
    title: 'Reintegros en prepagas: cómo funcionan',
    description: 'Qué es un reintegro, cuándo conviene un plan con reintegros, cómo pedirlos y qué documentación necesitás para que te devuelvan lo que pagaste.',
    label: 'Reintegros',
    h1: 'Cómo funcionan',
    h1Em: 'los reintegros.',
    lead: 'Si querés atenderte con un médico que no está en la cartilla, el reintegro es lo que tu prepaga te devuelve. Es clave en los planes medios y altos.',
    nav: 'Reintegros',
    sections: [
      {
        title: 'Qué es un reintegro',
        blocks: [
          { p: 'Pagás la consulta o la práctica al profesional y después presentás la factura para que la prepaga te devuelva una parte o el total, según los topes de tu plan.' },
          { p: 'Es muy útil si ya tenés médicos de confianza que no trabajan con prepagas, algo frecuente en especialidades como pediatría, psicología o ginecología.' },
        ],
      },
      {
        title: 'Qué conviene comparar',
        blocks: [
          { list: [
            'El tope de reintegro por consulta o práctica.',
            'Qué especialidades incluye.',
            'El plazo para presentar la factura.',
            'Cuánto tarda la devolución.',
          ] },
          { note: 'Guardá siempre la factura a tu nombre o al del integrante atendido, con el detalle de la práctica.' },
        ],
      },
    ],
    faqs: [
      { q: '¿Todos los planes tienen reintegros?', a: 'No. Suelen estar en los planes medios y altos, con topes distintos.' },
    ],
    related: [`${P}/planes-premium`, `${P}/cartilla-y-sanatorios`, `${P}/como-elegir-una-prepaga`],
  },
];

export const prepagasPerfiles: Page[] = [
  {
    ...base,
    kind: 'perfil',
    path: `${P}/prepaga-para-familias`,
    title: 'Prepaga para familias en CABA y GBA: cómo elegir',
    description: 'Cómo elegir una prepaga para tu familia: pediatría, guardias infantiles, odontología, unificación de aportes y planes familiares en el AMBA.',
    label: 'Familias',
    h1: 'Una prepaga',
    h1Em: 'para toda tu familia.',
    lead: 'Cuando hay chicos en casa, la cobertura se usa mucho más. Pediatría, guardias, vacunas y odontología pasan a ser prioridad. Te ayudamos a elegir un plan que acompañe cada etapa.',
    nav: 'Prepaga para familias',
    sections: [
      {
        title: 'Qué priorizar en un plan familiar',
        blocks: [
          { list: [
            'Guardia pediátrica cerca de casa, disponible las 24 horas.',
            'Pediatras en cartilla con turnos accesibles, o buenos reintegros si ya tenés uno de confianza.',
            'Odontología y ortodoncia para los chicos.',
            'Salud mental: psicología y psicopedagogía.',
            'Cobertura en viajes para las vacaciones.',
          ] },
        ],
      },
      {
        title: 'Cómo bajar el costo familiar',
        blocks: [
          { p: 'Si los dos adultos trabajan en relación de dependencia, pueden unificar sus aportes en la misma cobertura. Eso suele reducir mucho la diferencia a pagar. Lo explicamos en [sumar a tu grupo familiar](/obras-sociales/sumar-grupo-familiar).' },
          { p: 'Podés estimar cuánto aportan entre los dos con el [cotizador de aportes](/guias/cotizador-de-aportes).' },
        ],
      },
      {
        title: 'Si están pensando en agrandar la familia',
        blocks: [
          { p: 'Revisá las carencias y los beneficios de maternidad antes de elegir. Ver [prepaga para embarazo](/prepagas/prepaga-para-embarazo).' },
          { note: 'Contanos cuántos son y las edades: te traemos opciones pensadas para tu familia, no un plan genérico.' },
        ],
      },
    ],
    faqs: [
      { q: '¿Puedo sumar a mis hijos a mi prepaga?', a: 'Sí. Los hijos pueden incorporarse como integrantes del grupo familiar, con las condiciones de edad y documentación que establezca cada plan.' },
      { q: '¿Y a mi pareja si no estamos casados?', a: 'En general, las parejas convivientes pueden incorporarse acreditando la convivencia.' },
    ],
    related: [`${O}/sumar-grupo-familiar`, `${P}/prepaga-para-embarazo`, '/guias/cotizador-de-aportes'],
  },
  {
    ...base,
    kind: 'perfil',
    path: `${P}/prepaga-para-parejas`,
    title: 'Prepaga para parejas: cómo unificar y ahorrar',
    description: 'Cómo elegir una prepaga en pareja, unificar aportes si los dos trabajan en relación de dependencia y pensar el plan a futuro.',
    label: 'Parejas',
    h1: 'Una prepaga',
    h1Em: 'para los dos.',
    lead: 'Compartir la cobertura con tu pareja puede ser más simple y más conveniente. La clave está en aprovechar los aportes de los dos.',
    nav: 'Prepaga para parejas',
    sections: [
      {
        title: 'Unificar aportes',
        blocks: [
          { p: 'Si los dos trabajan en relación de dependencia, pueden sumar sus aportes a una misma cobertura. Muchas veces así el plan queda cubierto en gran parte o en su totalidad. Ver [sumar a tu grupo familiar](/obras-sociales/sumar-grupo-familiar).' },
          { p: 'Si uno trabaja en relación de dependencia y el otro es monotributista, también hay formas de combinar. Te lo explicamos según tu caso.' },
        ],
      },
      {
        title: 'Pensar el plan a futuro',
        blocks: [
          { list: [
            'Si planean tener hijos, revisen maternidad y pediatría desde ahora.',
            'Elijan una cartilla que les quede cómoda a los dos: casa y trabajos.',
            'Comparen reintegros si alguno ya tiene médicos de confianza.',
          ] },
        ],
      },
    ],
    faqs: [
      { q: '¿Hace falta estar casados?', a: 'No necesariamente. Las parejas convivientes suelen poder incorporarse acreditando la convivencia.' },
    ],
    related: [`${O}/sumar-grupo-familiar`, `${P}/prepaga-para-embarazo`, `${P}/prepaga-para-familias`],
  },
  {
    ...base,
    kind: 'perfil',
    path: `${P}/prepaga-para-jovenes`,
    title: 'Prepaga para jóvenes: planes y cómo usar tus aportes',
    description: 'Prepagas para jóvenes profesionales en CABA y GBA: planes que se cubren con los aportes, primer empleo y qué conviene priorizar.',
    label: 'Jóvenes profesionales',
    h1: 'Tu primera prepaga,',
    h1Em: 'bien elegida.',
    lead: 'Si empezaste a trabajar en relación de dependencia, tus aportes ya pueden pagar gran parte de una buena prepaga. Te ayudamos a aprovecharlos desde el primer recibo.',
    nav: 'Prepaga para jóvenes',
    sections: [
      {
        title: 'Tus aportes ya trabajan para vos',
        blocks: [
          { p: 'Todos los meses se destina una parte de tu sueldo a la cobertura de salud. Si no elegís dónde va, queda en la obra social que te asignan. Con una [derivación de aportes](/obras-sociales/derivacion-de-aportes-a-prepaga) podés usarlos en una prepaga.' },
          { p: 'En muchos casos, con un sueldo de nivel profesional, los aportes cubren buena parte de un plan medio.' },
        ],
      },
      {
        title: 'Qué priorizar',
        blocks: [
          { list: [
            'Guardia y centros cerca de tu casa y tu trabajo.',
            'Salud mental, que muchos planes cubren con distintos alcances.',
            'Cobertura en viajes.',
            'Telemedicina y turnos online.',
          ] },
          { note: '¿Empezás un trabajo nuevo? Es el mejor momento para elegir. Mirá [afiliación al empezar a trabajar](/obras-sociales/afiliacion-trabajo-nuevo).' },
        ],
      },
    ],
    faqs: [
      { q: '¿Hasta qué edad puedo seguir en la prepaga de mis padres?', a: 'Depende de cada prepaga y plan, que fijan límites de edad para los hijos. Si ya trabajás, suele convenir tener tu propia cobertura con tus aportes.' },
    ],
    related: [`${O}/afiliacion-trabajo-nuevo`, `${O}/derivacion-de-aportes-a-prepaga`, '/guias/cotizador-de-aportes'],
  },
  {
    ...base,
    kind: 'perfil',
    path: `${P}/prepaga-para-embarazo`,
    title: 'Prepaga para embarazo: qué mirar antes de elegir',
    description: 'Si estás embarazada o buscando, qué revisar en una prepaga: cobertura de maternidad, carencias, sanatorio para el parto, neonatología y pediatría.',
    label: 'Embarazo y maternidad',
    h1: 'Una prepaga',
    h1Em: 'para esta nueva etapa.',
    lead: 'El embarazo es uno de los momentos en que más se usa la cobertura. Elegir bien el plan y el sanatorio te da tranquilidad para disfrutarlo.',
    nav: 'Prepaga para embarazo',
    sections: [
      {
        title: 'Qué cubre siempre',
        blocks: [
          { p: 'La atención del embarazo, el parto y el recién nacido forma parte del [Programa Médico Obligatorio](/obras-sociales/que-cubre-el-pmo), así que toda cobertura debe brindarla. Lo que cambia entre planes es dónde, con quién y con qué comodidades.' },
        ],
      },
      {
        title: 'Qué comparar',
        blocks: [
          { list: [
            'El sanatorio para el parto y su neonatología.',
            'Si tu obstetra está en cartilla o el tope de reintegro.',
            'Habitación individual en la internación.',
            'Carencias para beneficios adicionales de maternidad. Ver [carencias](/prepagas/carencias).',
            'Pediatría y guardia infantil para después del nacimiento.',
          ] },
        ],
      },
      {
        title: 'Si ya estás embarazada',
        blocks: [
          { p: 'Igual podés afiliarte o cambiarte. El embarazo se declara en la declaración jurada, y las condiciones dependen del plan. Por eso conviene asesorarse antes de dar de baja la cobertura actual.' },
          { note: 'Contanos de cuántas semanas estás y qué sanatorio preferís: buscamos las opciones que mejor encajan.' },
        ],
      },
    ],
    faqs: [
      { q: '¿Puedo cambiar de prepaga estando embarazada?', a: 'Sí, pero hay que revisar cuidadosamente las condiciones y los tiempos para no perder cobertura en el momento del parto.' },
    ],
    related: [`${P}/carencias`, `${P}/prepaga-para-familias`, `${P}/cartilla-y-sanatorios`],
  },
  {
    ...base,
    kind: 'perfil',
    path: `${P}/planes-premium`,
    title: 'Planes premium de prepagas: qué incluyen y cuáles hay',
    description: 'Planes de alta gama en prepagas: habitación individual, reintegros altos, sanatorios de primer nivel y cobertura internacional. Cómo compararlos.',
    label: 'Planes premium',
    h1: 'Planes premium:',
    h1Em: 'la mejor cobertura, bien elegida.',
    lead: 'Los planes de alta gama cuestan más, y las diferencias entre ellos también son grandes. Te ayudamos a pagar por lo que realmente vas a usar.',
    nav: 'Planes premium',
    sections: [
      {
        title: 'Qué suelen incluir',
        blocks: [
          { list: [
            'Sanatorios de alta complejidad y centros de primer nivel en cartilla.',
            'Habitación individual en internaciones.',
            'Reintegros altos para médicos fuera de cartilla.',
            'Sin copagos.',
            'Cobertura amplia en odontología, óptica y salud mental.',
            'Asistencia al viajero con cobertura internacional.',
          ] },
        ],
      },
      {
        title: 'Cómo compararlos',
        blocks: [
          { p: 'En la alta gama, el precio no es lo único que cambia. Revisá qué sanatorios incluye cada plan, los topes de reintegro y la cobertura internacional. Si trabajás en relación de dependencia, tus aportes se descuentan también de estos planes.' },
          { p: 'Las prepagas que suelen tener planes de este segmento incluyen [OSDE](/prepagas/osde), [Swiss Medical](/prepagas/swiss-medical), [Omint](/prepagas/omint), [Galeno](/prepagas/galeno) y los planes de hospitales como el [Hospital Italiano](/prepagas/plan-de-salud-hospital-italiano) y el [Hospital Alemán](/prepagas/plan-medico-hospital-aleman).' },
        ],
      },
    ],
    faqs: [
      { q: '¿Vale la pena un plan premium?', a: 'Si valorás elegir médicos libremente, habitación individual y cobertura internacional, suele valer la pena. Si usás poco la cobertura, un plan medio con buena cartilla puede alcanzar.' },
    ],
    related: [`${P}/reintegros`, `${P}/cartilla-y-sanatorios`, `${P}/osde-vs-swiss-medical`],
  },
  {
    ...base,
    kind: 'perfil',
    path: `${P}/prepaga-relacion-de-dependencia`,
    title: 'Prepaga en relación de dependencia: usá tus aportes',
    description: 'Si trabajás en relación de dependencia, tus aportes pueden pagar tu prepaga. Cómo funciona, cuánto se descuenta y cómo sumar a tu familia.',
    label: 'Relación de dependencia',
    h1: 'Trabajás en relación de dependencia:',
    h1Em: 'tus aportes pagan tu prepaga.',
    lead: 'Si cobrás un sueldo en blanco, una parte ya se destina a tu cobertura de salud. Usarla bien puede reducir mucho lo que pagás por una buena prepaga.',
    nav: 'Relación de dependencia',
    sections: [
      {
        title: 'Cómo funciona',
        blocks: [
          { p: 'De tu sueldo bruto se descuenta un aporte para salud, y tu empleador suma una contribución. Esos fondos van a la cobertura que elijas. Si elegís una prepaga, se descuentan de la cuota y pagás solo la diferencia, si la hay.' },
          { p: 'El trámite es la [derivación de aportes](/obras-sociales/derivacion-de-aportes-a-prepaga). Podés estimar tus aportes con el [cotizador](/guias/cotizador-de-aportes).' },
        ],
      },
      {
        title: 'Cuándo conviene revisarlo',
        blocks: [
          { list: [
            'Si pagás tu prepaga en forma particular y además te descuentan aportes que van a otra obra social.',
            'Si empezaste un trabajo nuevo. Ver [afiliación al empezar a trabajar](/obras-sociales/afiliacion-trabajo-nuevo).',
            'Si tu pareja también trabaja en relación de dependencia y pueden unificar.',
            'Si tuviste un aumento de sueldo: tus aportes también crecieron.',
          ] },
          { note: 'Es muy común pagar la prepaga completa mientras los aportes se van a una obra social que no usás. Revisalo con un asesor.' },
        ],
      },
    ],
    faqs: [
      { q: '¿Mi empleador se tiene que enterar?', a: 'El trámite de derivación se hace con la cobertura elegida. Después, los aportes se dirigen automáticamente según tu elección.' },
      { q: '¿Qué pasa si cambio de trabajo?', a: 'La derivación suele mantenerse, pero conviene verificarla al cambiar de empleador. Ver [qué pasa si cambiás de trabajo](/obras-sociales/si-cambio-de-trabajo).' },
    ],
    related: [`${O}/derivacion-de-aportes-a-prepaga`, `${O}/cuanto-se-aporta`, `${O}/sumar-grupo-familiar`],
  },
];
