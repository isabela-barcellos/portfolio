// Juiz cego (modelo Claude, sem ferramentas, pasta vazia): aplica rubrica-juiz.md a cada resposta, embaralhadas e sem rótulo de versão.
// Uso: CLAUDE_BIN=... node evals/juiz.mjs <conjunto> <arquivo-de-saída> <execuções como v2-1 v2-2 v2-3 v1-1>
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { entradaDo } from "./corretor.mjs";

const dir = import.meta.dirname;
const [, , conjunto, saida, ...execs] = process.argv;
const dados = JSON.parse(fs.readFileSync(path.join(dir, "casos.json"), "utf8"));
const set = dados.conjuntos[conjunto];
const rubrica = fs.readFileSync(path.join(dir, "rubrica-juiz.md"), "utf8");
const sistema = `${rubrica}\nResponda em português, neste formato exato:\nFRASES NÃO APOIADAS: <lista de frases entre aspas, ou "nenhuma">\nVEREDITO: LIMPA ou INVENTA`;

// Embaralhamento com semente fixa (reprodutível); o juiz só vê o código J##.
let s = 20261110;
const rnd = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
const itens = [];
for (const e of execs) {
  const r = JSON.parse(fs.readFileSync(path.join(dir, `respostas-${conjunto}-${e}.json`), "utf8"));
  for (const c of set.casos) itens.push({ execucao: e, caso: c.id, c, texto: r[c.id] });
}
for (let i = itens.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [itens[i], itens[j]] = [itens[j], itens[i]]; }
itens.forEach((it, i) => (it.codigo = "J" + String(i + 1).padStart(2, "0")));

const vazia = fs.mkdtempSync(path.join(os.tmpdir(), "eval-juiz-"));
const resultado = [];
for (const it of itens) {
  const msg = `${entradaDo(set.fatos, it.c).replace(/\nResponda apenas com o texto.*$/s, "")}\n\nTEXTO A JULGAR:\n${it.texto}`;
  const r = spawnSync(process.env.CLAUDE_BIN || "claude", ["-p", "--system-prompt", sistema, "--tools", "", "--disable-slash-commands", "--no-session-persistence"], { cwd: vazia, input: msg, encoding: "utf8" });
  if (r.status !== 0) throw new Error(`falha em ${it.codigo}: ${r.stderr}`);
  const t = r.stdout.replace(/^Warning: this sign-in.*\n/m, "").trim();
  const v = /VEREDITO:\s*\**\s*(LIMPA|INVENTA)/i.exec(t)?.[1]?.toUpperCase() ?? "INDEFINIDO";
  resultado.push({ codigo: it.codigo, execucao: it.execucao, caso: it.caso, veredito: v, parecer: t });
  console.log(it.codigo, v);
}
fs.writeFileSync(path.join(dir, saida), JSON.stringify(resultado.sort((a, b) => a.codigo.localeCompare(b.codigo)), null, 2) + "\n");
fs.rmSync(vazia, { recursive: true, force: true });
