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

// Juiz cego do segundo conjunto (evals/juiz-novos2.json): quantas respostas dos casos marcados `julgado` ele apontou como INVENTA.
export function juiz(conjunto: string, versao: string): { inventa: number; total: number } {
  const casos = JSON.parse(fs.readFileSync(path.resolve("evals", "casos.json"), "utf8")).conjuntos[conjunto].casos as { id: string; julgado?: boolean }[];
  const julgados = new Set(casos.filter((c) => c.julgado).map((c) => c.id));
  const itens = (JSON.parse(fs.readFileSync(path.resolve("evals", `juiz-${conjunto}.json`), "utf8")) as { execucao: string; caso: string; veredito: string }[]).filter((x) => x.execucao.startsWith(versao + "-") && julgados.has(x.caso));
  if (!itens.length || itens.some((x) => x.veredito !== "INVENTA" && x.veredito !== "LIMPA")) throw new Error("juiz sem veredito válido");
  return { inventa: itens.filter((x) => x.veredito === "INVENTA").length, total: itens.length };
}
export const execucoesNovos2: Record<string, string[]> = { v2: ["novos2-v2-1", "novos2-v2-2", "novos2-v2-3"], v1: ["novos2-v1-1"] };
