import type { ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  arrow?: boolean;
};

export function ExternalLink({ href, className, children, arrow }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      {arrow ? (
        <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M14 8H3M7.5 3.5 3 8l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ) : null}
      <span className="sr-only"> (נפתח בחלון חדש)</span>
    </a>
  );
}
