import type { Photo as PhotoData } from "../media";

type Props = {
  photo: PhotoData;
  sizes: string;
  className?: string;
  eager?: boolean;
};

export function Photo({ photo, sizes, className, eager = false }: Props) {
  const base = `/media/${photo.name}`;
  return (
    <img
      src={`${base}-800.webp`}
      srcSet={`${base}-800.webp 800w, ${base}.webp ${photo.w}w`}
      sizes={sizes}
      width={photo.w}
      height={photo.h}
      alt={photo.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`block h-full w-full object-cover ${className ?? ""}`}
    />
  );
}
