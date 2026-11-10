import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// Sitemap gerado no build a partir dos cases publicados (rascunho: true fica de fora).
export const GET: APIRoute = async ({ site }) => {
  const base = site!;
  const cases = await getCollection("cases", (c) => !c.data.rascunho);
  const caminhos = ["/", ...cases.sort((a, b) => a.data.ordem - b.data.ordem).map((c) => `/projetos/${c.id}/`), "/como-foi-feito/", "/en/"];
  const urls = caminhos.map((p) => `  <url><loc>${new URL(p, base).href}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
