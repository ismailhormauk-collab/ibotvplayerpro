import Link from "next/link";
import { Fragment } from "react";

const TOKEN = /\{\{link:([^|{}]+)\|([^{}]+)\}\}/g;

/**
 * Renders a paragraph string, converting `{{link:/href|anchor text}}` tokens
 * into real <Link> elements so article prose can carry genuine internal links.
 */
export default function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    const [, href, label] = match;
    const isExternal = /^https?:\/\//.test(href);
    parts.push(
      isExternal ? (
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E50914] hover:text-[#ff2732] underline underline-offset-2 transition-colors"
        >
          {label}
        </a>
      ) : (
        <Link
          key={key++}
          href={href}
          className="text-[#E50914] hover:text-[#ff2732] underline underline-offset-2 transition-colors"
        >
          {label}
        </Link>
      )
    );
    lastIndex = TOKEN.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return <>{parts}</>;
}
