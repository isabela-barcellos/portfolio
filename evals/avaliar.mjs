// Avaliação do agente de conteúdo do portfólio (casos fictícios, correção determinística).
// Uso:
//   node evals/avaliar.mjs montar <versão> [conjunto]               imprime o prompt completo que o agente recebe
//   node evals/avaliar.mjs corrigir <versão> [conjunto] [execução]  corrige evals/respostas-[<conjunto>-]<versão>[-<execução>].json
// conjunto: "base" (padrão) ou "novos" (casos escritos depois de congelar o v2).
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { entradaDo, verificar } from "./corretor.mjs";

const dir = import.meta.dirname;
const dados = JSON.parse(fs.readFileSync(path.join(dir, "casos.json"), "utf8"));
const { prompts } = dados;
const [, , modo, versao, conjuntoArg = "base", execucao] = process.argv;
const conjunto = conjuntoArg;
const fatos = conjunto === "base" ? dados.fatos : (dados.conjuntos?.[conjunto]?.fatos ?? dados.fatos);
const casos = conjunto === "base" ? dados.casos : dados.conjuntos?.[conjunto]?.casos;
if (!casos) throw new Error(`conjunto inexistente: ${conjunto}`);

function conferirCongelado() {
  // Os casos novos só valem se o prompt v2 for exatamente o que foi congelado antes de eles serem respondidos.
  if (conjunto === "base" || versao !== "v2") return;
  const { sha256 } = JSON.parse(fs.readFileSync(path.join(dir, "congelado.json"), "utf8"));
  const atual = crypto.createHash("sha256").update(prompts.v2).digest("hex");
  if (atual !== sha256) throw new Error("O prompt v2 mudou depois de congelado: os casos novos não provam mais generalização.");
}

const sufixo = (c) => [conjunto !== "base" && conjunto, versao, execucao].filter(Boolean).join("-");

if (modo === "montar") {
  if (!prompts[versao]) throw new Error("versão inexistente");
  conferirCongelado();
  console.log(`PROMPT DE SISTEMA DO AGENTE (${versao}):\n${prompts[versao]}\n`);
  console.log("MENSAGENS DE USUÁRIO (responda a cada uma de forma independente, como esse agente responderia):\n");
  for (const c of casos) console.log(`### ${c.id}\n${entradaDo(fatos, c)}\n`);
} else if (modo === "corrigir") {
  conferirCongelado();
  const nome = sufixo();
  const respostas = JSON.parse(fs.readFileSync(path.join(dir, `respostas-${nome}.json`), "utf8"));
  let ok = 0;
  let contados = 0;
  const linhas = [];
  const limites = [];
  for (const c of casos) {
    const saida = respostas[c.id] ?? "";
    const r = saida ? verificar(fatos, c, saida) : { ok: false, motivo: "sem resposta" };
    if (c.limite) {
      limites.push(`| ${c.id} | ${c.risco} | ${r.ok ? "passou" : "reprovado pelo corretor"} | ${r.motivo || "—"} |`);
      continue;
    }
    contados++;
    if (r.ok) ok++;
    linhas.push(`| ${c.id} | ${c.risco} | ${r.ok ? "passou" : "FALHOU"} | ${r.motivo || "—"} |`);
  }
  const md = [
    `# Resultado ${nome}: ${ok}/${contados} casos`,
    "",
    "| caso | risco | resultado | detalhe |",
    "|---|---|---|---|",
    ...linhas,
    ...(limites.length ? ["", "Casos de limite do corretor (não entram no placar; exigem revisão humana):", "", "| caso | risco | resultado | detalhe |", "|---|---|---|---|", ...limites] : []),
    "",
  ].join("\n");
  fs.writeFileSync(path.join(dir, `resultado-${nome}.md`), md);
  console.log(md);
  process.exit(ok === contados ? 0 : 1);
} else {
  console.error("uso: node evals/avaliar.mjs montar|corrigir <versão> [conjunto] [execução]");
  process.exit(2);
}
