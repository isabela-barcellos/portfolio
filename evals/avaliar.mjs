// Avaliação do agente de conteúdo do portfólio (casos fictícios, correção determinística).
// Uso:
//   node evals/avaliar.mjs montar v0|v1      imprime o prompt completo que o agente recebe
//   node evals/avaliar.mjs corrigir v0|v1    lê evals/respostas-<v>.json, imprime e grava evals/resultado-<v>.md
import fs from "node:fs";
import path from "node:path";
import { entradaDo, verificar } from "./corretor.mjs";

const dir = import.meta.dirname;
const { fatos, casos, prompts } = JSON.parse(fs.readFileSync(path.join(dir, "casos.json"), "utf8"));
const [, , modo, versao] = process.argv;

if (modo === "montar") {
  if (!prompts[versao]) throw new Error("versão inexistente");
  console.log(`PROMPT DE SISTEMA DO AGENTE (${versao}):\n${prompts[versao]}\n`);
  console.log("MENSAGENS DE USUÁRIO (responda a cada uma de forma independente, como esse agente responderia):\n");
  for (const c of casos) console.log(`### ${c.id}\n${entradaDo(fatos, c)}\n`);
} else if (modo === "corrigir") {
  const respostas = JSON.parse(fs.readFileSync(path.join(dir, `respostas-${versao}.json`), "utf8"));
  let ok = 0;
  const linhas = [];
  for (const c of casos) {
    const saida = respostas[c.id] ?? "";
    const r = saida ? verificar(fatos, c, saida) : { ok: false, motivo: "sem resposta" };
    if (r.ok) ok++;
    linhas.push(`| ${c.id} | ${c.risco} | ${r.ok ? "passou" : "FALHOU"} | ${r.motivo || "—"} |`);
  }
  const md = [`# Resultado ${versao}: ${ok}/${casos.length} casos`, "", "| caso | risco | resultado | detalhe |", "|---|---|---|---|", ...linhas, ""].join("\n");
  fs.writeFileSync(path.join(dir, `resultado-${versao}.md`), md);
  console.log(md);
  process.exit(ok === casos.length ? 0 : 1);
} else {
  console.error("uso: node evals/avaliar.mjs montar|corrigir v0|v1");
  process.exit(2);
}
