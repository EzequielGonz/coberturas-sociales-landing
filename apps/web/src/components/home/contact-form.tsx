import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { WhatsAppAction } from '@/components/whatsapp-action';
import { submitLead } from '@/lib/leads';
import { track } from '@/lib/track';

type Fields = { nombre: string; apellido: string; telefono: string; email: string; busqueda: string; destinatario: string; personas: string; actual: string; detalle: string };
const initial: Fields = { nombre: '', apellido: '', telefono: '', email: '', busqueda: '', destinatario: '', personas: '', actual: '', detalle: '' };
const options = {
  busqueda: ['Obra social', 'Prepaga', 'No estoy seguro/a', 'Quiero comparar opciones'],
  destinatario: ['Para mí', 'Para mí y mi pareja', 'Para mi familia', 'Para otra persona'],
  actual: ['Sí, quiero cambiarme', 'No, actualmente no tengo', 'Estoy evaluando opciones', 'Otro'],
};

export function ContactForm() {
  const [form, setForm] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [success, setSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);
  const update = (name: keyof Fields, value: string) => { setForm(prev => ({ ...prev, [name]: value })); setErrors(prev => ({ ...prev, [name]: undefined })); };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Partial<Record<keyof Fields, string>> = {};
    const required: (keyof Fields)[] = ['nombre','apellido','telefono','email','busqueda','destinatario','personas','actual'];
    required.forEach(key => { if (!form[key].trim()) next[key] = 'Completá este campo para continuar.'; });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Ingresá un email válido.';
    if (form.telefono && form.telefono.replace(/\D/g, '').length < 8) next.telefono = 'Ingresá un teléfono válido.';
    if (form.personas && (!Number.isInteger(Number(form.personas)) || Number(form.personas) < 1)) next.personas = 'Ingresá al menos una persona.';
    setErrors(next);
    if (Object.keys(next).length) { document.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus(); return; }
    // Envío configurable en lib/leads.ts (Supabase, webhook o ninguno).
    setSendError(false);
    try { await submitLead({ ...form, origen: '/' }); track('lead_enviado', { origen: '/', busqueda: form.busqueda }); } catch { setSendError(true); return; }
    setSuccess(true);
  };
  const input = (name: keyof Fields, label: string, type = 'text', placeholder = '') => <div className="field"><label htmlFor={name}>{label}</label><input id={name} name={name} type={type} value={form[name]} placeholder={placeholder} min={type === 'number' ? 1 : undefined} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} onChange={e => update(name, e.target.value)} /><span className="field-error" id={`${name}-error`}>{errors[name]}</span></div>;
  const select = (name: 'busqueda' | 'destinatario' | 'actual', label: string) => <div className="field"><label htmlFor={name}>{label}</label><select id={name} name={name} value={form[name]} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} onChange={e => update(name,e.target.value)}><option value="" disabled>Seleccioná una opción</option>{options[name].map(option => <option value={option} key={option}>{option}</option>)}</select><span className="field-error" id={`${name}-error`}>{errors[name]}</span></div>;
  return <section className="form-section section-pad" id="contacto"><div className="container form-layout"><div className="form-intro reveal"><p className="eyebrow">Empecemos por vos</p><h2>Contanos qué cobertura <em>estás buscando.</em></h2><p>Completá algunos datos y podremos orientarte según tu situación.</p><div className="form-aside"><span className="aside-rule"/><p>Elegir una cobertura médica no tiene por qué ser complicado. Estamos para ayudarte a dar el primer paso.</p></div></div><div className="form-panel reveal">{success ? <div className="form-success" role="status"><CheckCircle2 size={40} strokeWidth={1.5}/><h3>Gracias por contactarnos.</h3><p>Recibimos tu consulta y podremos orientarte sobre las opciones disponibles.</p><button type="button" className="underlined-link" onClick={() => { setSuccess(false); setForm(initial); }}>Hacer otra consulta <ArrowUpRight size={18}/></button></div> : <form onSubmit={submit} noValidate><div className="form-row">{input('nombre','Nombre')}{input('apellido','Apellido')}</div><div className="form-row">{input('telefono','Número de teléfono','tel')}{input('email','Email','email')}</div>{select('busqueda','¿Qué estás buscando?')}{select('destinatario','¿Para quién es la cobertura?')}<div className="form-row">{input('personas','¿Cuántas personas necesitan cobertura?','number')}{select('actual','¿Ya tenés una cobertura actualmente?')}</div><div className="field"><label htmlFor="detalle">Contanos brevemente qué estás buscando <span className="optional">(opcional)</span></label><textarea id="detalle" name="detalle" rows={4} value={form.detalle} onChange={e => update('detalle',e.target.value)} placeholder="Por ejemplo: quiero cambiarme de prepaga, buscar una cobertura para mi familia o conocer otras opciones." /></div>{sendError && <p className="field-error" role="alert">No pudimos enviar tu consulta. Intentá nuevamente o escribinos por WhatsApp.</p>}<button className="button button-dark form-submit" type="submit">Quiero recibir asesoramiento <ArrowUpRight size={18}/></button></form>}<div className="form-other"><span>También podés consultarnos directamente por WhatsApp.</span><WhatsAppAction className="underlined-link" message="Hola, prefiero hacer la consulta por WhatsApp: quiero comparar coberturas." /></div></div></div></section>;
}
