import { Link } from 'react-router';
import { WhatsAppAction } from '@/components/whatsapp-action';

// Recibo de sueldo ilustrativo: solo los conceptos, sin importes ni datos personales.
const filas = [
  { concepto: 'Sueldo básico', ancho: '34%' },
  { concepto: 'Jubilación 11 %', ancho: '20%' },
  { concepto: 'Ley 19.032 3 %', ancho: '9%' },
  { concepto: 'Obra social 3 %', ancho: '9%', destacada: true },
  { concepto: 'Neto a cobrar', ancho: '28%', total: true },
];

function Recibo() {
  return (
    <div className="recibo-escena" aria-hidden="true">
      <div className="recibo">
        <div className="recibo-cabeza">
          <span>Recibo de haberes</span>
          <span className="recibo-periodo" />
        </div>
        <div className="recibo-filas">
          {filas.map(fila => (
            <div key={fila.concepto} className={`recibo-fila${fila.destacada ? ' is-destacada' : ''}${fila.total ? ' is-total' : ''}`}>
              <span className="recibo-concepto">{fila.concepto}</span>
              <span className="recibo-importe" style={{ width: fila.ancho }} />
              {fila.destacada && <span className="recibo-marcador" />}
            </div>
          ))}
        </div>
      </div>
      <svg className="recibo-flecha" viewBox="0 0 220 160" focusable="false">
        <defs>
          <linearGradient id="flecha-degrade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00807a" />
            <stop offset="1" stopColor="#a8e05f" />
          </linearGradient>
        </defs>
        <path className="recibo-flecha-trazo" pathLength="1" d="M8 20 C 90 20, 120 60, 140 100 S 180 150, 210 146" />
      </svg>
      <div className="mini-credencial">
        <img src="/logo-marca.png" alt="" width="240" height="222" loading="lazy" />
        <span>La cobertura que elijas</span>
      </div>
    </div>
  );
}

export function Aportes() {
  return (
    <section className="seccion aportes" id="aportes">
      <div className="contenedor aportes-grid">
        <div className="aportes-texto">
          <h2 className="revela">Tu 3 % puede ir a la cobertura que elijas</h2>
          <p className="seccion-bajada">Si trabajás en relación de dependencia, el 3 % de tu sueldo va a una obra social, y la podés elegir. Sumado a lo que aporta tu empleador, puede cubrir parte de la cuota de una prepaga.</p>
          <p className="aportes-nota">Si sos monotributista, una parte de la cuota del monotributo ya va a una obra social. También se puede revisar.</p>
          <div className="seccion-acciones">
            <WhatsAppAction className="boton boton-pino" label="Quiero derivar mis aportes" message="Hola, quiero saber cómo derivar mis aportes a una prepaga." />
            <Link className="enlace-guia" to="/guias/cotizador-de-aportes" prefetch="intent">Calculá tus aportes</Link>
          </div>
        </div>
        <Recibo />
      </div>
    </section>
  );
}
