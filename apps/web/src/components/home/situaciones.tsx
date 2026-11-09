import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/constants/brand';
import { track } from '@/lib/track';

// Las mismas situaciones que las piezas de redes (COMPARAR, 65, MONO, FAMILIA, PLAN),
// con el texto ya publicado. Información general: cada caso se analiza en particular.
const situaciones = [
  { pregunta: '¿Otra vez aumentó la cuota?', respuesta: 'Antes de pagar el aumento, compará: qué plan tenés, qué usás de verdad y qué opciones hay para tu edad y tu zona.', mensaje: 'Hola, me aumentó la cuota y quiero comparar opciones.' },
  { pregunta: '¿Cumplís 65?', respuesta: 'Si tenés más de 10 años en la misma prepaga, al cumplir 65 no te pueden aumentar por edad.', mensaje: 'Hola, cumplo 65 y quiero revisar mi cobertura.' },
  { pregunta: '¿Sos monotributista?', respuesta: 'Una parte de la cuota del monotributo va a una obra social. Revisá a cuál, si sumaste a tu familia y qué cartilla tenés cerca.', mensaje: 'Hola, soy monotributista y quiero revisar mi obra social.' },
  { pregunta: '¿Querés sumar a tu familia?', respuesta: 'Puede convenir o no: depende de la edad, los aportes y lo que usa cada uno.', mensaje: 'Hola, quiero ver si me conviene sumar a mi familia a la cobertura.' },
  { pregunta: '¿Tenés una enfermedad previa?', respuesta: 'Por la ley de prepagas, una enfermedad preexistente no puede ser motivo de rechazo. Lo que sí puede cambiar es el valor de la cuota.', mensaje: 'Hola, tengo una enfermedad previa y quiero consultar opciones de cobertura.' },
];

export function Situaciones() {
  return (
    <section className="seccion situaciones" id="situaciones">
      <div className="contenedor situaciones-grid">
        <div className="situaciones-cabeza">
          <h2 className="revela">¿Te pasa alguna de estas?</h2>
          <p className="seccion-bajada">Son las consultas que más recibimos. Información general: cada caso se analiza en particular.</p>
        </div>
        <ul className="situaciones-lista">
          {situaciones.map(s => (
            <li key={s.pregunta}>
              <h3>{s.pregunta}</h3>
              <p>{s.respuesta}</p>
              <a href={whatsappUrl(s.mensaje)} target="_blank" rel="noopener noreferrer" onClick={() => track('click_whatsapp', { origen: `situacion:${s.pregunta}` })}>
                <MessageCircle size={16} strokeWidth={1.9} aria-hidden="true" /> Consultar
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
