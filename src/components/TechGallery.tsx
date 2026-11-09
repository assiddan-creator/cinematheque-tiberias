import { gallery } from "../content";

export function TechGallery() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {gallery.map((item) => (
        <figure key={item.src} className="border border-gold/20 bg-stone">
          <div className="aspect-[16/10] bg-void">
            <img src={item.src} alt="" className="h-full w-full object-contain" />
          </div>
          <figcaption className="p-3">
            <span className="block text-ivory">{item.title}</span>
            <span className="mt-1 block text-sm text-silver">{item.caption}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
