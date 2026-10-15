import { useId, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * Estimación de los aportes de salud derivables a una prepaga (relación de dependencia).
 * Aporte del trabajador 3% + contribución del empleador 6% sobre el sueldo bruto.
 * Una parte va al Fondo Solidario de Redistribución; como ese porcentaje varía,
 * se muestra un rango: entre DESCUENTO_MAX y DESCUENTO_MIN del 9%.
 * Ajustar estos valores si cambia la normativa.
 */
const TASA_TOTAL = 0.09;
const DESCUENTO_MIN = 0.1;
const DESCUENTO_MAX = 0.2;

const pesos = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
const parse = (value: string) => Number(value.replace(/\./g, '').replace(',', '.'));

export function Cotizador() {
  const uid = useId();
  const [sueldo, setSueldo] = useState('');
  const [pareja, setPareja] = useState('');

  const a = parse(sueldo);
  const b = pareja ? parse(pareja) : 0;
  const valido = a > 0 && (!pareja || b > 0);
  const total = valido ? (a + b) * TASA_TOTAL : 0;
  const desde = total * (1 - DESCUENTO_MAX);
  const hasta = total * (1 - DESCUENTO_MIN);

  return (
    <section className="doc-calc" aria-labelledby={`${uid}-titulo`}>
      <p className="doc-calc-title" id={`${uid}-titulo`}>Calculá tus aportes</p>
      <div className="form-row">
        <div className="field">
          <label htmlFor={`${uid}-a`}>Tu sueldo bruto mensual</label>
          <input id={`${uid}-a`} inputMode="numeric" placeholder="Ej: 2.500.000" value={sueldo} onChange={e => setSueldo(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor={`${uid}-b`}>Sueldo bruto de tu pareja <span className="optional">(opcional)</span></label>
          <input id={`${uid}-b`} inputMode="numeric" placeholder="Si van a unificar aportes" value={pareja} onChange={e => setPareja(e.target.value)} />
        </div>
      </div>
      <div className="doc-calc-result" aria-live="polite">
        {valido ? (
          <>
            <p className="doc-calc-total"><span>Aportes estimados para tu prepaga, por mes</span>{pesos.format(desde)} a {pesos.format(hasta)}</p>
            <p className="doc-calc-note">Es lo que se descontaría de la cuota. Si el plan cuesta menos, no pagás diferencia; si cuesta más, pagás solo lo que falta. Estimación orientativa.</p>
            <a className="button button-dark" href="#contacto">Quiero ver qué planes me cubre <ArrowUpRight size={18} /></a>
          </>
        ) : (
          <p className="doc-calc-note">Ingresá tu sueldo bruto para ver la estimación.</p>
        )}
      </div>
    </section>
  );
}
