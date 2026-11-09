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
        <span className="arrow" aria-hidden="true">
          ←
        </span>
      ) : null}
      <span className="sr-only"> (נפתח בחלון חדש)</span>
    </a>
  );
}
