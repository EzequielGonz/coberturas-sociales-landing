import type { Block } from '@/content/types';
import { RichText } from './rich-text';

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if ('p' in block) return <p key={index}><RichText text={block.p} /></p>;
        if ('h3' in block) return <h3 key={index}>{block.h3}</h3>;
        if ('note' in block) return <p className="doc-note" key={index}><RichText text={block.note} /></p>;
        if ('list' in block) {
          return (
            <ul className="doc-list" key={index}>
              {block.list.map(item => <li key={item}><RichText text={item} /></li>)}
            </ul>
          );
        }
        return (
          <ol className="doc-steps" key={index}>
            {block.steps.map((step, stepIndex) => (
              <li key={step.title}>
                <span className="step-marker" aria-hidden="true">{stepIndex + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p><RichText text={step.text} /></p>
                </div>
              </li>
            ))}
          </ol>
        );
      })}
    </>
  );
}
