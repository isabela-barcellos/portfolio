// Casos de teste do verificador de vazamento (o "guardrail" que bloqueia o deploy).
// Cada caso monta uma mini-pasta de projeto, roda o verificador e confere se ele reprova (ou aprova) como esperado.
// Rodar: npm run test:verificador
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const script = path.resolve(import.meta.dirname, "..", "scripts", "verificar-vazamento.mjs");

function rodar(arquivos) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "verif-"));
  try {
    for (const [rel, conteudo] of Object.entries(arquivos)) {
      const p = path.join(dir, rel);
      fs.mkdirSync(path.dirname(p), { recursive: true });
      fs.writeFileSync(p, conteudo);
    }
    return spawnSync(process.execPath, [script], { env: { ...process.env, VERIFICAR_RAIZ: dir }, encoding: "utf8" });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// [nome, arquivos, deve reprovar?, trecho esperado na saída]
const casos = [
  ["página limpa passa", { "public/a.html": "<p>Olá, sou a Isabela.</p>" }, false],
  ["e-mail público autorizado passa", { "public/a.html": "<a href='mailto:isabelabarcellos0812@gmail.com'>e-mail</a>" }, false],
  ["celular brasileiro é barrado", { "public/a.txt": "ligue (11) 9 1234-5678" }, true, "celular"],
  ["e-mail não autorizado é barrado", { "public/a.txt": "contato: fulano@empresa.com" }, true, "e-mail não autorizado"],
  ["token do GitHub é barrado", { "src/a.ts": "const t = 'ghp_" + "a".repeat(36) + "';" }, true, "token GitHub"],
  ["JWT é barrado", { "src/a.ts": "const j = 'eyJhbGciOiJIUzI1NiJ9aaaaaaaa.eyJzdWIiOiIxMjM0NTY3ODkwIn0aaaa.SflKxwRJSMeKKF2QT4fw';" }, true, "JWT"],
  ["chave privada é barrada", { "src/a.txt": "-----BEGIN RSA PRIVATE KEY-----" }, true, "chave privada"],
  ["senha em código é barrada", { "src/a.ts": "const senha = 'abc12345';" }, true, "segredo"],
  ["caminho local é barrado", { "dist/a.html": "<p>C:\\Users\\alguem\\projeto</p>" }, true, "caminho local"],
  ["script embutido no HTML é barrado (CSP)", { "dist/a.html": "<script>alert(1)</script>" }, true, "script"],
  ["script externo passa", { "dist/a.html": "<script type=\"module\" src=\"/_astro/x.js\"></script>" }, false],
  ["comentário HTML publicado é barrado", { "dist/a.html": "<!-- nota interna -->" }, true, "comentário"],
  ["comentário HTML no corpo de um case é barrado", { "content/cases/x.md": "---\ntitulo: x\n---\n<!-- nota -->\ntexto" }, true, "comentário"],
  ["comentário no frontmatter do case passa", { "content/cases/x.md": "---\ntitulo: x\n# nota interna\n---\ntexto" }, false],
  ["JPEG com EXIF é barrado", { "public/foto.jpg": Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe1, 0x00, 0x10]), Buffer.from("Exif\0\0"), Buffer.alloc(20)]) }, true, "EXIF"],
];

for (const [nome, arquivos, deveReprovar, trecho] of casos) {
  test(nome, () => {
    const r = rodar(arquivos);
    if (deveReprovar) {
      assert.equal(r.status, 1, `deveria reprovar, mas saiu com ${r.status}: ${r.stdout}${r.stderr}`);
      if (trecho) assert.match(r.stderr + r.stdout, new RegExp(trecho, "i"));
    } else {
      assert.equal(r.status, 0, `deveria passar, mas reprovou: ${r.stdout}${r.stderr}`);
    }
  });
}
