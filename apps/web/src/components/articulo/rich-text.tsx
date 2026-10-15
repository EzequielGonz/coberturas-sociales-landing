import type { ReactNode } from 'react';
import { Link } from 'react-router';

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Texto con enlaces del tipo [texto](/ruta). Las rutas internas navegan sin recargar. */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(LINK_PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) parts.push(text.slice(cursor, index));
    const [, label, href] = match;
    parts.push(
      href.startsWith('/') ? (
        <Link key={index} to={href} prefetch="intent">{label}</Link>
      ) : (
        <a key={index} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
      ),
    );
    cursor = index + match[0].length;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}
