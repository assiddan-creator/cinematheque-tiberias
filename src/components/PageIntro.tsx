import type { ReactNode } from "react";
import { container } from "../ui";

export function PageIntro({ title, lede, children }: { title: string; lede: string; children?: ReactNode }) {
  return (
    <header className={`${container} py-10 lg:py-14`}>
      <h1 className="display-section max-w-3xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-silver">{lede}</p>
      {children}
    </header>
  );
}
