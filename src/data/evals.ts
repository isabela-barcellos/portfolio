import fs from "node:fs";
import path from "node:path";

// Os placares vêm dos arquivos gerados pelo corretor (evals/resultado-*.md): uma única fonte da verdade
// para as duas páginas. Se um arquivo faltar ou mudar de formato, o build falha (não publica número inventado).
export function placar(nome: string): { ok: number; total: number; texto: string } {
  const t = fs.readFileSync(path.resolve("evals", `resultado-${nome}.md`), "utf8");
  const m = t.match(/(\d+)\/(\d+) casos/);
  if (!m) throw new Error(`placar não encontrado em evals/resultado-${nome}.md`);
  return { ok: Number(m[1]), total: Number(m[2]), texto: `${m[1]}/${m[2]}` };
}

export const execucoesNovosV2 = ["novos-v2-1", "novos-v2-2", "novos-v2-3"];
