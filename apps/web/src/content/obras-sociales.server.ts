import type { Page } from './types';

const D = '2026-09-28';
const O = '/obras-sociales';
const P = '/prepagas';

const base = { silo: 'obras-sociales', kind: 'guia', published: D, updated: D, tipo: 'Obra social' } as const;

export const obrasPilar: Page = {
  ...base,
  kind: 'pilar',
  path: O,
  title: 'Obras sociales en CABA y GBA: cambio, afiliación y aportes',
  description:
    'Todo sobre obras sociales en relación de dependencia: cómo elegir, cambiarte, afiliar a tu familia y derivar tus aportes a una prepaga en el AMBA.',
  label: 'Obras sociales en CABA y el AMBA',
  h1: 'Obras sociales:',
  h1Em: 'elegí dónde van tus aportes.',
  lead:
    'Si trabajás en relación de dependencia, todos los meses una parte de tu sueldo va a tu cobertura de salud. Te explicamos cómo elegir la obra social, cómo cambiarte y cómo usar tus aportes en una prepaga.',
  nav: 'Obras sociales',
  sections: [
    {
      title: 'Qué es una obra social',
      blocks: [
        { p: 'Las obras sociales son las entidades que brindan cobertura de salud a los trabajadores en relación de dependencia y a su grupo familiar. Se financian con un aporte que se descuenta del sueldo y una contribución que paga el empleador.' },
        { p: 'Todas deben cubrir, como mínimo, el [Programa Médico Obligatorio](/obras-sociales/que-cubre-el-pmo). A partir de ahí, la calidad de la cartilla y de los servicios varía mucho de una a otra.' },
      ],
    },
    {
      title: 'Tus aportes, tu elección',
      blocks: [
        { p: 'No estás obligado a quedarte en la obra social que te asignaron al entrar a trabajar. Podés elegir otra o [derivar tus aportes a una prepaga](/obras-sociales/derivacion-de-aportes-a-prepaga) y pagar solo la diferencia.' },
        { list: [
          'Si empezás un trabajo: [afiliación al empezar a trabajar](/obras-sociales/afiliacion-trabajo-nuevo).',
          'Si querés cambiarte: [cambio de obra social](/obras-sociales/cambio-de-obra-social).',
          'Si querés sumar a tu familia: [grupo familiar y unificación de aportes](/obras-sociales/sumar-grupo-familiar).',
          'Si querés saber cuánto aportás: [cuánto se aporta a la obra social](/obras-sociales/cuanto-se-aporta).',
        ] },
      ],
    },
    {
      title: 'Obra social o prepaga',
      blocks: [
        { p: 'No es una elección excluyente. Muchas personas en relación de dependencia usan sus aportes para acceder a una prepaga. Te explicamos las diferencias en [obra social o prepaga](/obras-sociales/obra-social-o-prepaga).' },
        { note: 'Las normas sobre elección y cambio de cobertura se modificaron en los últimos años. Te confirmamos el procedimiento vigente para tu caso.' },
      ],
    },
  ],
  faqs: [
    { q: '¿Puedo elegir mi obra social?', a: 'Sí. Los trabajadores en relación de dependencia pueden elegir su cobertura entre las opciones habilitadas, con las reglas vigentes para el cambio.' },
    { q: '¿Mi familia puede usar mi obra social?', a: 'Sí. Tu grupo familiar puede incorporarse como adherente con tus aportes.' },
    { q: '¿Puedo pasar mis aportes a una prepaga?', a: 'Sí, mediante la derivación de aportes. Pagás la diferencia entre tus aportes y el valor del plan.' },
  ],
  related: [`${O}/derivacion-de-aportes-a-prepaga`, `${O}/cambio-de-obra-social`, `${O}/obra-social-o-prepaga`],
};

export const obrasGuias: Page[] = [
  {
    ...base,
    path: `${O}/derivacion-de-aportes-a-prepaga`,
    title: 'Derivación de aportes a prepaga: cómo funciona',
    description: 'Cómo derivar tus aportes de obra social a una prepaga si trabajás en relación de dependencia: requisitos, pasos, cuánto pagás y cómo sumar a tu familia.',
    label: 'Derivación de aportes',
    h1: 'Derivá tus aportes',
    h1Em: 'y pagá menos por tu prepaga.',
    lead: 'La derivación de aportes te permite usar lo que ya se descuenta de tu sueldo para pagar una prepaga. Es la forma más eficiente de acceder a una buena cobertura si trabajás en relación de dependencia.',
    nav: 'Derivación de aportes',
    sections: [
      {
        title: 'Qué es la derivación de aportes',
        blocks: [
          { p: 'Todos los meses se destina una parte de tu sueldo bruto a tu cobertura de salud: el aporte que se te descuenta y la contribución de tu empleador. La derivación hace que esos fondos vayan a la prepaga que elegiste, que los descuenta de la cuota.' },
          { p: 'Si tus aportes alcanzan el valor del plan, no pagás diferencia. Si no alcanzan, pagás solo la parte que falta.' },
        ],
      },
      {
        title: 'Cómo se hace',
        blocks: [
          { steps: [
            { title: 'Elegí el plan', text: 'Comparamos opciones según tus aportes, tu grupo familiar y tu zona.' },
            { title: 'Afiliación', text: 'Completás la solicitud de la prepaga y la declaración jurada de salud.' },
            { title: 'Trámite de opción', text: 'Se hace la opción para que tus aportes se dirijan a la nueva cobertura, según el procedimiento vigente.' },
            { title: 'Primeros meses', text: 'Los aportes pueden tardar en reflejarse. Mientras tanto, conviene tener claro cómo se factura la cuota para no pagar de más.' },
          ] },
          { note: 'Los mecanismos para que las prepagas reciban aportes se modificaron en los últimos años. El asesor te indica el circuito que corresponde para el plan que elijas.' },
        ],
      },
      {
        title: 'Cuánto vas a pagar',
        blocks: [
          { p: 'Depende de tu sueldo bruto, del valor del plan y de quiénes integran tu grupo familiar. Si tu pareja también trabaja en relación de dependencia, pueden sumar sus aportes. Ver [sumar a tu grupo familiar](/obras-sociales/sumar-grupo-familiar).' },
          { p: 'Podés hacer una estimación con el [cotizador de aportes](/guias/cotizador-de-aportes).' },
        ],
      },
    ],
    faqs: [
      { q: '¿Puedo derivar aportes a cualquier prepaga?', a: 'A las que estén habilitadas para recibirlos y con los planes que acepten derivación. Te decimos cuáles aplican a tu caso.' },
      { q: '¿Qué pasa si me aumentan el sueldo?', a: 'Tus aportes también suben, así que la diferencia a pagar puede bajar.' },
      { q: '¿Y si cambio de trabajo?', a: 'En general la opción se mantiene, pero conviene verificarlo. Ver [qué pasa si cambiás de trabajo](/obras-sociales/si-cambio-de-trabajo).' },
    ],
    related: [`${P}/prepaga-relacion-de-dependencia`, `${O}/cuanto-se-aporta`, '/guias/cotizador-de-aportes'],
  },
  {
    ...base,
    path: `${O}/cambio-de-obra-social`,
    title: 'Cómo cambiar de obra social: pasos y requisitos',
    description: 'Cómo cambiarte de obra social si trabajás en relación de dependencia: cuándo se puede, qué trámite hay que hacer y desde cuándo rige la nueva cobertura.',
    label: 'Cambio de obra social',
    h1: 'Cómo cambiar',
    h1Em: 'de obra social.',
    lead: 'Si no estás conforme con tu obra social, podés cambiarte. Te explicamos cómo funciona el trámite y qué conviene revisar antes.',
    nav: 'Cambio de obra social',
    sections: [
      {
        title: 'Quiénes pueden cambiarse',
        blocks: [
          { p: 'Los trabajadores en relación de dependencia pueden elegir su obra social y cambiarla, con las reglas de frecuencia y los plazos de vigencia que fija la normativa. Esas reglas cambiaron en los últimos años, así que conviene confirmar las vigentes antes de iniciar el trámite.' },
        ],
      },
      {
        title: 'El trámite',
        blocks: [
          { steps: [
            { title: 'Elegí la nueva cobertura', text: 'Una obra social o una prepaga que reciba aportes. Compará cartilla y prestaciones.' },
            { title: 'Hacé la opción', text: 'Se realiza el trámite de opción de cambio con tu identificación y los datos laborales.' },
            { title: 'Vigencia', text: 'La nueva cobertura rige desde la fecha que corresponda según la normativa. Hasta entonces, seguís con la anterior.' },
          ] },
        ],
      },
      {
        title: 'Antes de cambiarte',
        blocks: [
          { list: [
            'Revisá que tus médicos y tu sanatorio estén en la nueva cartilla.',
            'Si tenés un tratamiento en curso, confirmá cómo sigue.',
            'Si estás embarazada, evaluá los tiempos con cuidado.',
            'Pensá si te conviene directamente una prepaga. Ver [derivación de aportes](/obras-sociales/derivacion-de-aportes-a-prepaga).',
          ] },
          { note: 'Si pagás una prepaga aparte y tus aportes van a otra obra social, estás pagando dos veces. Revisalo.' },
        ],
      },
    ],
    faqs: [
      { q: '¿Cada cuánto me puedo cambiar?', a: 'La normativa fija una frecuencia para el cambio de obra social. Te indicamos la vigente al momento de tu consulta.' },
      { q: '¿Pierdo la cobertura mientras hago el cambio?', a: 'No debería: seguís cubierto por la anterior hasta que entra en vigencia la nueva.' },
    ],
    related: [`${O}/derivacion-de-aportes-a-prepaga`, `${P}/como-cambiarse-de-prepaga`, `${O}/obras-sociales-de-personal-de-direccion`],
  },
  {
    ...base,
    path: `${O}/afiliacion-trabajo-nuevo`,
    title: 'Obra social en un trabajo nuevo: cómo elegir',
    description: 'Si empezás a trabajar en relación de dependencia, podés elegir obra social o prepaga. Qué hacer los primeros días para no quedar en una cobertura que no usás.',
    label: 'Trabajo nuevo',
    h1: 'Empezás un trabajo nuevo:',
    h1Em: 'elegí tu cobertura.',
    lead: 'Cuando entrás a un trabajo en relación de dependencia, tus aportes van a una obra social. Si no elegís vos, te asignan una. Es el mejor momento para decidir.',
    nav: 'Afiliación al empezar a trabajar',
    sections: [
      {
        title: 'Qué pasa si no elegís',
        blocks: [
          { p: 'Los aportes se dirigen a la obra social que corresponde por defecto, generalmente la de la actividad o el convenio. Puede ser una buena cobertura o puede que no la uses nunca.' },
        ],
      },
      {
        title: 'Qué conviene hacer',
        blocks: [
          { list: [
            'Pedile a tu empleador los datos de la obra social asignada.',
            'Compará esa cobertura con otras opciones y con prepagas que reciban aportes.',
            'Si ya tenés prepaga, evaluá derivar los aportes para no pagar doble.',
            'Si tu pareja trabaja, piensen si les conviene unificar.',
          ] },
          { note: 'Contanos tu sueldo bruto aproximado y tu grupo familiar: te decimos qué opciones podés cubrir con tus aportes.' },
        ],
      },
    ],
    faqs: [
      { q: '¿Puedo elegir desde el primer día?', a: 'Las reglas de elección al ingresar cambiaron en los últimos años. Te confirmamos lo vigente para tu caso.' },
    ],
    related: [`${P}/prepaga-para-jovenes`, `${O}/derivacion-de-aportes-a-prepaga`, `${O}/cuanto-se-aporta`],
  },
  {
    ...base,
    path: `${O}/sumar-grupo-familiar`,
    title: 'Grupo familiar en obra social y prepaga: unificar aportes',
    description: 'Cómo sumar a tu pareja e hijos a tu cobertura y unificar aportes si los dos trabajan en relación de dependencia. Requisitos y documentación.',
    label: 'Grupo familiar',
    h1: 'Sumá a tu familia',
    h1Em: 'y unificá aportes.',
    lead: 'Tu pareja y tus hijos pueden estar en tu misma cobertura. Si los dos adultos trabajan en relación de dependencia, sumar aportes suele bajar mucho lo que pagan.',
    nav: 'Grupo familiar y unificación de aportes',
    sections: [
      {
        title: 'Quiénes pueden integrar el grupo familiar',
        blocks: [
          { list: [
            'Cónyuge o conviviente.',
            'Hijos, con las condiciones de edad y documentación que correspondan.',
            'Otros familiares a cargo, en algunos casos y con requisitos específicos.',
          ] },
        ],
      },
      {
        title: 'Unificación de aportes',
        blocks: [
          { p: 'Si los dos integrantes de la pareja trabajan en relación de dependencia, pueden unificar sus aportes en la misma cobertura. En lugar de dos coberturas separadas, los aportes de ambos se suman para pagar un plan familiar.' },
          { p: 'Podés estimar el total con el [cotizador de aportes](/guias/cotizador-de-aportes).' },
          { note: 'Unificar es uno de los cambios que más reduce la diferencia a pagar en planes familiares de prepaga.' },
        ],
      },
      {
        title: 'Documentación habitual',
        blocks: [
          { list: [
            'DNI de todos los integrantes.',
            'Acta de matrimonio o constancia de convivencia.',
            'Partidas de nacimiento de los hijos.',
            'Recibos de sueldo de quienes aportan.',
          ] },
        ],
      },
    ],
    faqs: [
      { q: '¿Tienen que estar casados para unificar?', a: 'No necesariamente: la convivencia acreditada suele ser suficiente. Te indicamos la documentación que pide la cobertura elegida.' },
    ],
    related: [`${P}/prepaga-para-familias`, `${P}/prepaga-para-parejas`, '/guias/cotizador-de-aportes'],
  },
  {
    ...base,
    path: `${O}/cuanto-se-aporta`,
    title: 'Cuánto se aporta a la obra social del sueldo',
    description: 'Qué porcentaje del sueldo se destina a la obra social, cuánto pone tu empleador y cómo se usa ese dinero si elegís una prepaga.',
    label: 'Aportes',
    h1: 'Cuánto se aporta',
    h1Em: 'a la obra social.',
    lead: 'Entender cuánto se destina a tu salud todos los meses te ayuda a saber qué cobertura podés tener sin pagar de más.',
    nav: 'Cuánto se aporta',
    sections: [
      {
        title: 'Aporte y contribución',
        blocks: [
          { list: [
            'Aporte del trabajador: un 3% del sueldo bruto se descuenta para la obra social.',
            'Contribución del empleador: el empleador suma un 6% sobre el sueldo bruto.',
          ] },
          { p: 'En total, cerca del 9% del sueldo bruto se destina a tu cobertura de salud. Una parte se deriva por ley a un fondo solidario del sistema, por eso el monto disponible para tu cobertura es algo menor.' },
        ],
      },
      {
        title: 'Cómo se usa si elegís una prepaga',
        blocks: [
          { p: 'Con la [derivación de aportes](/obras-sociales/derivacion-de-aportes-a-prepaga), ese dinero se descuenta de la cuota. Cuanto más alto el sueldo, más alto el aporte y menor la diferencia a pagar.' },
          { p: 'Hacé una estimación con el [cotizador de aportes](/guias/cotizador-de-aportes).' },
          { note: 'En tu recibo de sueldo figura el descuento de obra social. Con ese dato podemos cotizarte con precisión.' },
        ],
      },
    ],
    faqs: [
      { q: '¿El aguinaldo también aporta?', a: 'Sí, el aguinaldo también tiene aportes de obra social.' },
    ],
    related: [`${O}/derivacion-de-aportes-a-prepaga`, '/guias/cotizador-de-aportes', `${O}/sumar-grupo-familiar`],
  },
  {
    ...base,
    path: `${O}/obra-social-o-prepaga`,
    title: 'Obra social o prepaga: diferencias y cuál conviene',
    description: 'Diferencias entre obra social y prepaga, cómo se financian, qué cubren y por qué muchas personas en relación de dependencia combinan las dos.',
    label: 'Diferencias',
    h1: 'Obra social o prepaga:',
    h1Em: 'cuál te conviene.',
    lead: 'Es la pregunta más frecuente. La respuesta corta: si trabajás en relación de dependencia, no tenés que elegir una u otra. Podés usar tus aportes en una prepaga.',
    nav: 'Obra social o prepaga',
    sections: [
      {
        title: 'Las diferencias principales',
        blocks: [
          { h3: 'Obra social' },
          { p: 'Se financia con los aportes del sueldo. Brinda cobertura al trabajador y su familia sin una cuota adicional. La calidad varía mucho entre obras sociales.' },
          { h3: 'Prepaga' },
          { p: 'Es medicina privada con una cuota mensual. Suele ofrecer cartillas más amplias, más sanatorios a elegir, reintegros y servicios adicionales.' },
        ],
      },
      {
        title: 'Lo mejor de los dos mundos',
        blocks: [
          { p: 'Con la [derivación de aportes](/obras-sociales/derivacion-de-aportes-a-prepaga), tus aportes pagan parte o toda la cuota de una prepaga. Así accedés a la cobertura privada aprovechando lo que ya se descuenta de tu sueldo.' },
          { list: [
            'Si tu sueldo es alto, tus aportes pueden cubrir un plan medio o alto.',
            'Si son dos que aportan, pueden unificar y acceder a un plan familiar.',
            'Si pagás la prepaga aparte, revisá que tus aportes no se estén yendo a otro lado.',
          ] },
        ],
      },
    ],
    faqs: [
      { q: '¿Es mejor tener prepaga?', a: 'Depende de lo que necesites. Las prepagas suelen ofrecer más opciones de cartilla y servicios, pero hay obras sociales con muy buena cobertura.' },
    ],
    related: [`${O}/derivacion-de-aportes-a-prepaga`, `${P}/como-elegir-una-prepaga`, `${O}/que-cubre-el-pmo`],
  },
  {
    ...base,
    path: `${O}/obras-sociales-de-personal-de-direccion`,
    title: 'Obras sociales de personal de dirección: qué son',
    description: 'Qué son las obras sociales de personal de dirección, quiénes pueden elegirlas y por qué suelen usarse para acceder a planes de prepaga.',
    label: 'Personal de dirección',
    h1: 'Obras sociales',
    h1Em: 'de personal de dirección.',
    lead: 'Son obras sociales creadas para gerentes y personal jerárquico, y hoy tienen un rol importante en el acceso a planes de prepaga con aportes.',
    nav: 'Obras sociales de personal de dirección',
    sections: [
      {
        title: 'Qué son',
        blocks: [
          { p: 'Son obras sociales orientadas originalmente a personal de dirección y cargos jerárquicos de empresas. Muchas tienen convenios con prepagas o planes propios de nivel medio y alto.' },
          { p: 'En la práctica, suelen formar parte del circuito por el que tus aportes llegan a una prepaga, según el plan elegido.' },
        ],
      },
      {
        title: 'Cuándo te importa',
        blocks: [
          { list: [
            'Si querés derivar aportes a un plan de prepaga que trabaja con una de ellas.',
            'Si ocupás un cargo jerárquico y buscás una cobertura de nivel alto.',
            'Si tu empresa ya te ofrece una de estas opciones y querés compararla.',
          ] },
          { note: 'No hace falta que conozcas el circuito: el asesor te indica qué opción corresponde al plan que elegís.' },
        ],
      },
    ],
    faqs: [
      { q: '¿Tengo que ser gerente para elegirlas?', a: 'No necesariamente. Las condiciones dependen de la normativa vigente y de cada entidad. Consultanos con tu caso.' },
    ],
    related: [`${O}/derivacion-de-aportes-a-prepaga`, `${P}/planes-premium`, `${O}/cambio-de-obra-social`],
  },
  {
    ...base,
    path: `${O}/si-cambio-de-trabajo`,
    title: 'Qué pasa con tu obra social si cambiás de trabajo',
    description: 'Qué pasa con tu cobertura de salud si cambiás de trabajo o te quedás sin empleo: continuidad, período de cobertura y cómo mantener tu prepaga.',
    label: 'Cambio de empleo',
    h1: 'Cambiás de trabajo:',
    h1Em: 'qué pasa con tu cobertura.',
    lead: 'Un cambio laboral puede afectar tu cobertura de salud. Con algunos cuidados, podés mantener tu obra social o tu prepaga sin cortes.',
    nav: 'Si cambiás de trabajo',
    sections: [
      {
        title: 'Si pasás a otro empleo',
        blocks: [
          { p: 'En general podés mantener tu cobertura, pero conviene verificar que tus aportes sigan llegando al mismo lugar con el nuevo empleador. Si no lo revisás, pueden terminar en otra obra social.' },
        ],
      },
      {
        title: 'Si te quedás sin trabajo',
        blocks: [
          { p: 'La ley prevé que la cobertura de la obra social continúe por un tiempo después de terminada la relación laboral, con ciertas condiciones de antigüedad. Si tenías prepaga con aportes, podés seguir pagando la cuota completa en forma particular para no perder la antigüedad.' },
          { note: 'Contanos tu situación y te decimos cómo mantener la cobertura con el menor costo posible.' },
        ],
      },
      {
        title: 'Si pasás a ser monotributista',
        blocks: [
          { p: 'Tus aportes de salud pasan a ser parte del monotributo. También podés elegir cobertura y, en muchos casos, derivar esos aportes a una prepaga.' },
        ],
      },
    ],
    faqs: [
      { q: '¿Pierdo la antigüedad en la prepaga?', a: 'Si mantenés la afiliación sin interrupciones, no. Por eso conviene no dar de baja el plan durante el cambio.' },
    ],
    related: [`${O}/derivacion-de-aportes-a-prepaga`, `${O}/afiliacion-trabajo-nuevo`, `${P}/como-cambiarse-de-prepaga`],
  },
  {
    ...base,
    path: `${O}/que-cubre-el-pmo`,
    title: 'Qué cubre el PMO: la cobertura mínima obligatoria',
    description: 'Qué es el Programa Médico Obligatorio, qué prestaciones deben cubrir todas las obras sociales y prepagas y qué suman los planes superiores.',
    label: 'PMO',
    h1: 'Qué cubre',
    h1Em: 'el Programa Médico Obligatorio.',
    lead: 'El PMO es la cobertura mínima que toda obra social y prepaga debe brindar. Conocerlo te ayuda a entender qué pagás de más en cada plan.',
    nav: 'Qué cubre el PMO',
    sections: [
      {
        title: 'Qué es el PMO',
        blocks: [
          { p: 'El Programa Médico Obligatorio es un conjunto de prestaciones que todas las obras sociales y prepagas deben cubrir. Funciona como un piso: ningún plan puede ofrecer menos.' },
          { list: [
            'Consultas médicas y estudios de diagnóstico.',
            'Internación y cirugías.',
            'Atención del embarazo, el parto y el recién nacido.',
            'Urgencias y emergencias.',
            'Salud mental, odontología básica y medicamentos, con los alcances establecidos.',
          ] },
        ],
      },
      {
        title: 'Qué agregan los planes superiores',
        blocks: [
          { p: 'La diferencia entre planes no está en el PMO sino en lo que suman: mejor cartilla, más sanatorios, habitación individual, reintegros, menos copagos y mayores coberturas en odontología, óptica y medicamentos. Ver [cómo elegir una prepaga](/prepagas/como-elegir-una-prepaga).' },
          { note: 'Las prestaciones del PMO no pueden tener carencias. Ver [carencias](/prepagas/carencias).' },
        ],
      },
    ],
    faqs: [
      { q: '¿Una prepaga barata cubre lo mismo que una cara?', a: 'Las dos deben cubrir el PMO. La diferencia está en dónde, con quién y con qué comodidades te atendés.' },
    ],
    related: [`${P}/carencias`, `${O}/obra-social-o-prepaga`, `${P}/como-elegir-una-prepaga`],
  },
];
