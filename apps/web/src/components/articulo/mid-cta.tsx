import { CTA } from '@/constants/cta';
import { ContactButtons } from './contact-buttons';

export function MidCta({ whatsappMessage, origen }: { whatsappMessage: string; origen: string }) {
  return (
    <aside className="doc-cta" aria-label="Asesoramiento">
      <p className="doc-cta-title">{CTA.mid.title}</p>
      <p className="doc-cta-text">{CTA.mid.text}</p>
      <div className="doc-cta-actions">
        <ContactButtons whatsappMessage={whatsappMessage} origen={origen} formLabel={CTA.mid.formLabel} callLabel={CTA.mid.callLabel} />
      </div>
    </aside>
  );
}
