import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CTA } from '@/constants/cta';
import type { ConsultaTipo } from '@/content/types';
import { WhatsAppAction } from '@/components/whatsapp-action';
import { submitLead } from '@/lib/leads';
import { track } from '@/lib/track';

type Fields = { nombre: string; apellido: string; telefono: string; email: string; busqueda: string; destinatario: string; personas: string; actual: string; situacion: string; zona: string; detalle: string };
type SelectName = 'busqueda' | 'destinatario' | 'actual' | 'situacion' | 'zona';

const options: Record<SelectName, string[]> = {
  busqueda: ['Obra social', 'Prepaga', 'No estoy seguro/a', 'Quiero comparar opciones'],
  destinatario: ['Para mí', 'Para mí y mi pareja', 'Para mi familia', 'Para otra persona'],
  actual: ['Sí, quiero cambiarme', 'No, actualmente no tengo', 'Estoy evaluando opciones', 'Otro'],
  situacion: ['Relación de dependencia', 'Monotributista', 'Autónomo / particular', 'Otra'],
  zona: ['CABA', 'Zona norte', 'Zona oeste', 'Zona sur', 'Otra zona'],
};

const required: (keyof Fields)[] = ['nombre', 'apellido', 'telefono', 'email', 'busqueda', 'destinatario', 'personas', 'actual', 'situacion', 'zona'];

type Props = { tipo: ConsultaTipo; origen: string; whatsappMessage: string };

/**
 * Formulario de los artículos: mismo diseño y campos que el de la home, más
 * situación laboral y zona (para calificar la consulta) y la página de origen.
 * Usa id="contacto" para que los botones "Quiero asesorarme" y el WhatsApp
 * sin número configurado lleven acá, igual que en la home.
 */
export function LeadForm({ tipo, origen, whatsappMessage }: Props) {
  const initial: Fields = { nombre: '', apellido: '', telefono: '', email: '', busqueda: tipo, destinatario: '', personas: '', actual: '', situacion: '', zona: '', detalle: '' };
  const [form, setForm] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const update = (name: keyof Fields, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
    if (status === 'error') setStatus('idle');
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Partial<Record<keyof Fields, string>> = {};
    required.forEach(key => { if (!form[key].trim()) next[key] = 'Completá este campo para continuar.'; });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Ingresá un email válido.';
    if (form.telefono && form.telefono.replace(/\D/g, '').length < 8) next.telefono = 'Ingresá un teléfono válido.';
    if (form.personas && (!Number.isInteger(Number(form.personas)) || Number(form.personas) < 1)) next.personas = 'Ingresá al menos una persona.';
    setErrors(next);
    if (Object.keys(next).length) { document.getElementById(`lead-${Object.keys(next)[0]}`)?.focus(); return; }
    setStatus('sending');
    try {
      await submitLead({ ...form, nombre: form.nombre.trim(), apellido: form.apellido.trim(), telefono: form.telefono.trim(), email: form.email.trim(), detalle: form.detalle.trim(), origen });
      track('lead_enviado', { origen, busqueda: form.busqueda });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const id = (name: keyof Fields) => `lead-${name}`;
  const errorProps = (name: keyof Fields) => ({ 'aria-invalid': Boolean(errors[name]), 'aria-describedby': errors[name] ? `${id(name)}-error` : undefined });

  const input = (name: keyof Fields, label: string, type = 'text', autoComplete?: string) => (
    <div className="field">
      <label htmlFor={id(name)}>{label}</label>
      <input id={id(name)} name={name} type={type} value={form[name]} min={type === 'number' ? 1 : undefined} autoComplete={autoComplete} {...errorProps(name)} onChange={e => update(name, e.target.value)} />
      <span className="field-error" id={`${id(name)}-error`}>{errors[name]}</span>
    </div>
  );

  const select = (name: SelectName, label: string) => (
    <div className="field">
      <label htmlFor={id(name)}>{label}</label>
      <select id={id(name)} name={name} value={form[name]} {...errorProps(name)} onChange={e => update(name, e.target.value)}>
        <option value="" disabled>Seleccioná una opción</option>
        {options[name].map(option => <option value={option} key={option}>{option}</option>)}
      </select>
      <span className="field-error" id={`${id(name)}-error`}>{errors[name]}</span>
    </div>
  );

  return (
    <section className="form-section section-pad" id="contacto">
      <div className="container form-layout">
        <div className="form-intro">
          <p className="eyebrow">{CTA.form.label}</p>
          <h2>{CTA.form.title} <em>{CTA.form.titleEm}</em></h2>
          <p>{CTA.form.intro}</p>
          <div className="form-aside"><span className="aside-rule" /><p>{CTA.form.aside}</p></div>
        </div>
        <div className="form-panel">
          {status === 'success' ? (
            <div className="form-success" role="status">
              <CheckCircle2 size={40} strokeWidth={1.5} />
              <h3>{CTA.form.successTitle}</h3>
              <p>{CTA.form.successText}</p>
              <button type="button" className="underlined-link" onClick={() => { setStatus('idle'); setForm(initial); }}>Hacer otra consulta <ArrowUpRight size={18} /></button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="form-row">{input('nombre', 'Nombre', 'text', 'given-name')}{input('apellido', 'Apellido', 'text', 'family-name')}</div>
              <div className="form-row">{input('telefono', 'Número de teléfono', 'tel', 'tel')}{input('email', 'Email', 'email', 'email')}</div>
              <div className="form-row">{select('busqueda', '¿Qué estás buscando?')}{select('destinatario', '¿Para quién es la cobertura?')}</div>
              <div className="form-row">{input('personas', '¿Cuántas personas necesitan cobertura?', 'number')}{select('actual', '¿Ya tenés una cobertura actualmente?')}</div>
              <div className="form-row">{select('situacion', 'Situación laboral')}{select('zona', '¿Dónde vivís?')}</div>
              <div className="field">
                <label htmlFor={id('detalle')}>Contanos brevemente qué estás buscando <span className="optional">(opcional)</span></label>
                <textarea id={id('detalle')} name="detalle" rows={4} value={form.detalle} onChange={e => update('detalle', e.target.value)} placeholder="Por ejemplo: quiero derivar mis aportes a una prepaga, sumar a mi familia o cambiarme de plan." />
              </div>
              {status === 'error' && <p className="field-error" role="alert">No pudimos enviar tu consulta. Intentá nuevamente o escribinos por WhatsApp.</p>}
              <button className="button button-dark form-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : CTA.form.submit} <ArrowUpRight size={18} /></button>
            </form>
          )}
          <div className="form-other"><span>{CTA.form.other}</span><WhatsAppAction className="underlined-link" message={whatsappMessage} /></div>
        </div>
      </div>
    </section>
  );
}
