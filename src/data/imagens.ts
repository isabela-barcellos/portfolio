import type { ImageMetadata } from "astro";

// Imagens dos cases: src/assets/<slug>/<arquivo> (otimizadas em WebP no build).
const todas = import.meta.glob<{ default: ImageMetadata }>("/src/assets/*/*.{png,jpg,jpeg,webp}", { eager: false });

export function imagemDoCase(slug: string, arquivo: string) {
  const carregar = todas[`/src/assets/${slug}/${arquivo}`];
  if (!carregar) throw new Error(`Imagem não encontrada: src/assets/${slug}/${arquivo}`);
  return carregar();
}
