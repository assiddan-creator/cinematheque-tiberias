import type { ReactNode } from "react";

export function PageIntro({
  title,
  lede,
  aside,
  children,
}: {
  title: string;
  lede: string;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="wrap grid gap-8 pb-10 pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-14 lg:pt-20">
      <div className="lg:col-span-8">
        <h1 className="display t-xl max-w-[14ch]">{title}</h1>
        <p className="mt-6 max-w-[40rem] text-[1.125rem] text-muted">{lede}</p>
        {children}
      </div>
      {aside ? <div className="lg:col-span-4 lg:self-end">{aside}</div> : null}
    </header>
  );
}
