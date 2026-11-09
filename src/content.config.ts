import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Os cases ficam em content/cases/*.md (fora de src/, para revisão fácil).
// `rascunho: true` tira o case do build, então nada sai sem aprovação.
const cases = defineCollection({
  loader: glob({ pattern: "*.md", base: "./content/cases" }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    contexto: z.string(),
    resumo_curto: z.string().optional(), // 1 linha para o card (cai no `resumo` se faltar)
    selo: z.string().optional(), // etiqueta curta do card, ex.: "1º lugar · NEXT 2026"
    capa: z.string().optional(), // arquivo em src/assets/<slug>/ usado como capa do card
    capa_texto: z.string().optional(), // título de impacto para cases sem imagem
    icone: z.string().default("sparkles"), // ícone da capa de texto (nome em Icon.astro)
    resultado_destaque: z.string().optional(), // omitido quando não há resultado formal
    papel: z.string().optional(), // omitido quando o papel individual não deve ser citado
    stack: z.array(z.string()).max(5).default([]),
    ordem: z.number().default(99),
    categoria: z.enum(["faculdade", "empresa"]).default("faculdade"), // agrupa os cards da Home
    producao: z.string().url().optional(),
    rotulo_producao: z.string().default("Abrir o app"), // ex.: "Abrir o site" quando a entrega não é um app
    repositorio: z.string().url().optional(),
    galeria: z.array(z.object({ arquivo: z.string(), alt: z.string(), legenda: z.string() })).default([]),
    rascunho: z.boolean().default(false),
  }),
});

export const collections = { cases };
