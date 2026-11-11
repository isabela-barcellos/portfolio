// Roda o agente avaliado de forma isolada: um processo `claude -p` por caso, SEM ferramentas e numa pasta vazia
// (fora do repositório), então o agente não tem como ler as regras de correção, o corretor nem as respostas anteriores.
// Uso: node evals/rodar.mjs <versão> <conjunto> <execução>   -> grava evals/respostas-<conjunto>-<versão>-<execução>.json
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { entradaDo } from "./corretor.mjs";

const dir = import.meta.dirname;
const [, , versao, conjunto, execucao] = process.argv;
const dados = JSON.parse(fs.readFileSync(path.join(dir, "casos.json"), "utf8"));
const set = dados.conjuntos[conjunto];
if (!set || !dados.prompts[versao]) throw new Error("versão ou conjunto inexistente");
if (versao === "v2") {
  const { sha256 } = JSON.parse(fs.readFileSync(path.join(dir, "congelado.json"), "utf8"));
  if (crypto.createHash("sha256").update(dados.prompts.v2).digest("hex") !== sha256) throw new Error("prompt v2 mudou depois de congelado");
}
const vazia = fs.mkdtempSync(path.join(os.tmpdir(), "eval-vazia-"));
const respostas = {};
for (const c of set.casos) {
  const r = spawnSync("claude", ["-p", "--system-prompt", dados.prompts[versao], "--tools", "", "--disable-slash-commands", "--no-session-persistence", entradaDo(set.fatos, c)], { cwd: vazia, encoding: "utf8", shell: process.platform === "win32" });
  if (r.status !== 0) throw new Error(`falha em ${c.id}: ${r.stderr}`);
  respostas[c.id] = r.stdout.replace(/^Warning: this sign-in.*\n/m, "").trim();
  console.log("ok", c.id);
}
fs.writeFileSync(path.join(dir, `respostas-${conjunto}-${versao}-${execucao}.json`), JSON.stringify(respostas, null, 2) + "\n");
fs.rmSync(vazia, { recursive: true, force: true });
