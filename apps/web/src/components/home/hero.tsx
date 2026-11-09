import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { whatsappUrl } from '@/constants/brand';
import { track } from '@/lib/track';
import { MessageCircle, RotateCcw } from 'lucide-react';

/*
 * Portada: cuatro preguntas rápidas arman el perfil de cobertura. La credencial de la
 * derecha se completa en vivo y, al terminar, la consulta va a WhatsApp ya redactada,
 * así el asesor arranca sabiendo aportes, grupo, zona y edad. Sin precios ni marcas.
 */
type Clave = 'aportes' | 'grupo' | 'zona' | 'edad';
type Paso = { clave: Clave; etiqueta: string; pregunta: string; opciones: string[] };

const PASOS: Paso[] = [
  { clave: 'aportes', etiqueta: 'Aportes', pregunta: '¿Cómo aportás hoy?', opciones: ['Relación de dependencia', 'Monotributo', 'Particular, sin aportes'] },
  { clave: 'grupo', etiqueta: 'Grupo', pregunta: '¿Para quiénes es la cobertura?', opciones: ['Solo para mí', 'Pareja', 'Familia con hijos'] },
  { clave: 'zona', etiqueta: 'Zona', pregunta: '¿Dónde vivís?', opciones: ['CABA', 'GBA Norte', 'GBA Oeste', 'GBA Sur'] },
  { clave: 'edad', etiqueta: 'Edad', pregunta: '¿Qué edad tenés?', opciones: ['Hasta 35', '36 a 50', '51 a 64', '65 o más'] },
];

type Respuestas = Partial<Record<Clave, string>>;

const FRASE: Record<string, string> = {
  'Relación de dependencia': 'trabajo en relación de dependencia',
  Monotributo: 'soy monotributista',
  'Particular, sin aportes': 'no tengo aportes',
  'Solo para mí': 'la cobertura es solo para mí',
  Pareja: 'es para mi pareja y para mí',
  'Familia con hijos': 'es para mi familia con hijos',
  'Hasta 35': 'tengo hasta 35 años',
  '36 a 50': 'tengo entre 36 y 50 años',
  '51 a 64': 'tengo entre 51 y 64 años',
  '65 o más': 'tengo 65 años o más',
};

function mensaje(r: Respuestas) {
  const partes = [r.aportes && FRASE[r.aportes], r.grupo && FRASE[r.grupo], r.zona && `vivo en ${r.zona}`, r.edad && FRASE[r.edad]].filter(Boolean);
  if (!partes.length) return 'Hola, quiero comparar coberturas médicas.';
  const ultima = partes.pop();
  return `Hola, quiero comparar coberturas: ${partes.length ? `${partes.join(', ')} y ${ultima}` : ultima}.`;
}

// Lo que el asesor va a revisar, según cada respuesta (mismos criterios que las piezas de redes).
function revisaremos(r: Respuestas) {
  const lista: string[] = [];
  if (r.aportes === 'Relación de dependencia') lista.push('Cuánto de la cuota pueden cubrir tus aportes.');
  if (r.aportes === 'Monotributo') lista.push('Qué obra social tenés por el monotributo y si conviene cambiarla.');
  if (r.aportes === 'Particular, sin aportes') lista.push('Planes para contratar de forma particular.');
  if (r.grupo && r.grupo !== 'Solo para mí') lista.push('Si conviene sumar a tu grupo y cómo se unifican los aportes.');
  if (r.zona) lista.push(`Cartilla, guardias y especialistas cerca, en ${r.zona}.`);
  if (r.edad === '65 o más') lista.push('Tu antigüedad: con más de 10 años en la misma prepaga, a los 65 no te pueden aumentar por edad.');
  return lista;
}

function Credencial({ respuestas }: { respuestas: Respuestas }) {
  return (
    <div className="credencial">
      <div className="credencial-cabeza">
        <img src="/logo-marca.png" alt="" width="240" height="222" />
        <span>Compara Tu Obra Social</span>
      </div>
      <p className="credencial-titulo">Tu perfil de cobertura</p>
      <dl className="credencial-datos">
        {PASOS.map(paso => (
          <div key={paso.clave} className={respuestas[paso.clave] ? 'is-completo' : ''}>
            <dt>{paso.etiqueta}</dt>
            <dd>{respuestas[paso.clave] ? <span key={respuestas[paso.clave]} className="credencial-valor">{respuestas[paso.clave]}</span> : <span className="credencial-vacio" />}</dd>
          </div>
        ))}
      </dl>
      <span className="credencial-cinta" aria-hidden="true" />
    </div>
  );
}

// Credencial 3D: se carga con la primera interacción (mover el mouse, tocar, desplazar o
// usar el teclado), así no compite con la carga ni con las mediciones de velocidad.
// Sin WebGL o con «reducir movimiento» queda la credencial HTML.
function useCredencial3D(lienzo: React.RefObject<HTMLCanvasElement | null>, visual: React.RefObject<HTMLDivElement | null>, respuestas: Respuestas) {
  const api = useRef<{ actualizar: (c: { etiqueta: string; valor?: string }[]) => void; destruir: () => void } | null>(null);
  const ultimas = useRef(respuestas);
  ultimas.current = respuestas;
  const campos = (r: Respuestas) => PASOS.map(p => ({ etiqueta: p.etiqueta, valor: r[p.clave] }));

  useEffect(() => {
    const canvas = lienzo.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelado = false;
    const eventos = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'pointermove', 'keydown'] as const;
    const iniciar = async () => {
      eventos.forEach(e => window.removeEventListener(e, iniciar));
      if (cancelado || api.current) return;
      const prueba = document.createElement('canvas');
      if (!prueba.getContext('webgl2') && !prueba.getContext('webgl')) return;
      const [THREE, { RoomEnvironment }, { RoundedBoxGeometry }, { crearCredencial }] = await Promise.all([
        import('three'),
        import('three/examples/jsm/environments/RoomEnvironment.js'),
        import('three/examples/jsm/geometries/RoundedBoxGeometry.js'),
        import('@/lib/credencial-3d'),
      ]);
      const logo = new Image();
      logo.src = '/logo-marca.png';
      await Promise.all([logo.decode(), document.fonts.load('800 40px Manrope'), document.fonts.load('600 20px Manrope')]);
      if (cancelado) return;
      try {
        api.current = crearCredencial(THREE, RoomEnvironment, RoundedBoxGeometry, canvas, logo);
        api.current.actualizar(campos(ultimas.current));
        requestAnimationFrame(() => visual.current?.classList.add('is-3d'));
        window.setTimeout(() => visual.current?.classList.add('is-3d-listo'), 1200);
      } catch {
        // si no se puede crear el contexto 3D, queda la credencial HTML
      }
    };
    eventos.forEach(e => window.addEventListener(e, iniciar, { passive: true, once: true }));
    return () => {
      cancelado = true;
      eventos.forEach(e => window.removeEventListener(e, iniciar));
      api.current?.destruir();
      api.current = null;
    };
  }, []);

  useEffect(() => { api.current?.actualizar(campos(respuestas)); }, [respuestas]);
}

export function Hero() {
  const [respuestas, setRespuestas] = useState<Respuestas>({});
  const [paso, setPaso] = useState(0);
  const visual = useRef<HTMLDivElement>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);
  useCredencial3D(lienzo, visual, respuestas);
  const listo = paso >= PASOS.length;
  const actual = PASOS[Math.min(paso, PASOS.length - 1)];

  const elegir = (opcion: string) => {
    setRespuestas(previas => ({ ...previas, [actual.clave]: opcion }));
    window.setTimeout(() => setPaso(p => Math.min(p + 1, PASOS.length)), 180);
  };
  const reiniciar = () => { setRespuestas({}); setPaso(0); };

  // La credencial se inclina apenas siguiendo el puntero (solo con mouse).
  const inclinar = (evento: PointerEvent<HTMLDivElement>) => {
    const el = visual.current;
    if (!el || evento.pointerType !== 'mouse') return;
    const caja = el.getBoundingClientRect();
    const x = (evento.clientX - caja.left) / caja.width - 0.5;
    const y = (evento.clientY - caja.top) / caja.height - 0.5;
    el.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`);
  };
  const soltar = () => { visual.current?.style.setProperty('--rx', '0deg'); visual.current?.style.setProperty('--ry', '0deg'); };

  return (
    <section className="portada" id="inicio">
      <div className="contenedor portada-grid">
        <div className="portada-texto">
          <h1>Compará prepagas y obras sociales con un asesor</h1>
          <p className="portada-bajada">Respondé cuatro preguntas y mandanos tu perfil por WhatsApp. Comparamos las opciones para tu edad, tu zona, tu familia y tus aportes.</p>

          <div className="perfil" aria-live="polite">
            <div className="perfil-progreso" aria-hidden="true">
              {PASOS.map((p, i) => <span key={p.clave} className={i < paso ? 'is-hecho' : i === paso ? 'is-actual' : ''} />)}
            </div>
            {!listo ? (
              <div className="perfil-paso" key={actual.clave}>
                <p className="perfil-pregunta" id="perfil-pregunta">{actual.pregunta}</p>
                <div className="perfil-opciones" role="group" aria-labelledby="perfil-pregunta">
                  {actual.opciones.map(opcion => (
                    <button key={opcion} type="button" className={respuestas[actual.clave] === opcion ? 'is-elegida' : ''} aria-pressed={respuestas[actual.clave] === opcion} onClick={() => elegir(opcion)}>
                      {opcion}
                    </button>
                  ))}
                </div>
                <div className="perfil-pie">
                  {paso > 0 && <button type="button" className="perfil-atras" onClick={() => setPaso(paso - 1)}>Volver</button>}
                  <a className="perfil-directo" href={whatsappUrl('Hola, quiero comparar coberturas médicas.')} target="_blank" rel="noopener noreferrer" onClick={() => track('click_whatsapp', { origen: 'portada:directo' })}>Prefiero escribir sin responder</a>
                </div>
              </div>
            ) : (
              <div className="perfil-paso perfil-final">
                <p className="perfil-pregunta">Listo. Esto es lo que vamos a revisar con vos:</p>
                <ul className="perfil-resumen">
                  {revisaremos(respuestas).map(item => <li key={item}>{item}</li>)}
                </ul>
                <div className="perfil-acciones">
                  <a className="boton boton-pino" href={whatsappUrl(mensaje(respuestas))} target="_blank" rel="noopener noreferrer" onClick={() => track('click_whatsapp', { origen: 'portada:perfil', ...respuestas } as Record<string, string>)}>
                    <MessageCircle size={18} strokeWidth={1.9} aria-hidden="true" /> Enviar mi perfil por WhatsApp
                  </a>
                  <button type="button" className="perfil-atras" onClick={reiniciar}><RotateCcw size={15} aria-hidden="true" /> Empezar de nuevo</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="portada-visual" ref={visual} onPointerMove={inclinar} onPointerLeave={soltar} aria-hidden="true">
          <svg className="cinta" viewBox="0 0 600 640" focusable="false">
            <defs>
              <linearGradient id="cinta-degrade" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#00807a" />
                <stop offset=".55" stopColor="#3fb98a" />
                <stop offset="1" stopColor="#a8e05f" />
              </linearGradient>
            </defs>
            <path className="cinta-trazo" pathLength="1" d="M-40 560 C 120 520, 170 380, 300 330 S 520 250, 650 70" />
            <path className="cinta-hilo" pathLength="1" d="M-40 610 C 140 560, 200 430, 320 390 S 540 300, 660 130" />
          </svg>
          <Credencial respuestas={respuestas} />
          <canvas className="credencial-3d" ref={lienzo} />
        </div>
      </div>
    </section>
  );
}
