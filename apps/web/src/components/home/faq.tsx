import { ArrowUpRight, Plus } from 'lucide-react';
import { WhatsAppAction } from '@/components/whatsapp-action';
const faqs = [
  ['¿Qué diferencia hay entre una obra social y una prepaga?', 'Son dos formas de acceder a cobertura médica con características y modalidades diferentes. Podemos ayudarte a conocer las alternativas disponibles para tu situación.'],
  ['¿Puedo cambiar mi cobertura?', 'Es posible evaluar un cambio de cobertura. Las alternativas dependen de tu situación actual y de las condiciones de cada opción.'],
  ['¿Puedo buscar una cobertura para mi familia?', 'Sí. Podés contarnos cuántas personas necesitan cobertura y qué aspectos son importantes para tu grupo familiar.'],
  ['¿Puedo consultar si actualmente no tengo cobertura?', 'Sí. No necesitás contar con una cobertura actual para consultar por las opciones disponibles.'],
  ['¿Me pueden ayudar a comparar opciones?', 'Sí. Podemos orientarte para conocer diferentes obras sociales y prepagas y evaluar qué alternativas se adaptan a lo que buscás.'],
  ['¿El asesoramiento tiene algún costo?', 'Esta información estará disponible próximamente. Consultanos para conocer las condiciones del asesoramiento.'],
];
export function Faq() {
  return <><section className="faq-section section-pad" id="preguntas"><div className="container faq-layout"><div className="reveal"><p className="eyebrow">Preguntas frecuentes</p><h2>Respuestas claras para <em>elegir mejor.</em></h2><p className="section-lead">Si tenés otra pregunta, estamos para escucharte.</p><WhatsAppAction className="underlined-link" /></div><div className="faq-items reveal">{faqs.map(([question,answer])=><details key={question}><summary><span>{question}</span><Plus size={20} strokeWidth={1.6}/></summary><p>{answer}</p></details>)}</div></div></section><section className="final-cta"><div className="container final-cta-inner reveal"><div><p className="eyebrow">El próximo paso es más simple de lo que pensás</p><h2>Encontrá una cobertura que <em>se adapte a vos.</em></h2><p>Contanos qué necesitás y te ayudamos a conocer las alternativas disponibles.</p></div><div className="final-actions"><a className="button button-light" href="#contacto">Quiero asesorarme <ArrowUpRight size={18}/></a><WhatsAppAction className="button button-outline-light" /></div></div></section></>;
}
