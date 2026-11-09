import { gallery } from "../content";

export function TechGallery() {
  return (
    <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {gallery.map((item) => (
        <figure key={item.src}>
          <div className="hinge aspect-[16/10] bg-ink">
            <img src={item.src} alt={item.alt ?? `סקיצה: ${item.title}`} width={480} height={300} loading="lazy" decoding="async" className={`h-full w-full bg-ink ${item.alt ? "object-cover" : "object-contain"}`} />
          </div>
          <figcaption className="border-b border-[var(--line)] py-3">
            <span className="block font-semibold">{item.title}</span>
            <span className="mt-1 block text-sm text-muted">{item.caption}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
