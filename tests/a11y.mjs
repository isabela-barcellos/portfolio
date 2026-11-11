// Teste de acessibilidade e segurança de conteúdo sobre o build (dist/).
// Sobe um servidor estático local que aplica o MESMO CSP do vercel.json e confere, em 2 temas e 3 larguras:
//   1. axe-core (WCAG 2 A/AA e boas práticas) sem violações;
//   2. sem rolagem horizontal;
//   3. sem violação de CSP no console (o que quebraria só em produção).
// Rodar: npm run build && npm run test:a11y      (localmente: CHROME_PATH aponta para o Chrome instalado)
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { chromium } from "playwright-core";

const require = createRequire(import.meta.url);
const raiz = path.resolve(import.meta.dirname, "..");
const dist = path.join(raiz, "dist");
if (!fs.existsSync(dist)) { console.error("Rode `npm run build` antes."); process.exit(2); }

const csp = JSON.parse(fs.readFileSync(path.join(raiz, "vercel.json"), "utf8")).headers[0].headers.find((h) => h.key === "Content-Security-Policy").value;
const axeSrc = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const tipos = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".pdf": "application/pdf", ".txt": "text/plain" };

const servidor = http.createServer((req, res) => {
  let rel = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let arq = path.join(dist, rel);
  if (rel.endsWith("/")) arq = path.join(arq, "index.html");
  else if (!path.extname(arq) && fs.existsSync(arq + "/index.html")) arq = path.join(arq, "index.html");
  if (!arq.startsWith(dist) || !fs.existsSync(arq) || fs.statSync(arq).isDirectory()) {
    res.writeHead(404, { "content-type": tipos[".html"], "content-security-policy": csp });
    const f404 = path.join(dist, "404.html");
    return res.end(fs.existsSync(f404) ? fs.readFileSync(f404) : "404");
  }
  res.writeHead(200, { "content-type": tipos[path.extname(arq)] ?? "application/octet-stream", "content-security-policy": csp });
  fs.createReadStream(arq).pipe(res);
});
await new Promise((ok) => servidor.listen(0, "127.0.0.1", ok));
const base = `http://127.0.0.1:${servidor.address().port}`;

// Páginas: tudo que o build gerou (menos 404, testado à parte).
const paginas = ["/"];
for (const d of fs.readdirSync(path.join(dist, "projetos"))) paginas.push(`/projetos/${d}/`);
paginas.push("/como-foi-feito/", "/pagina-que-nao-existe/");

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const falhas = [];
let verificacoes = 0;

for (const tema of ["light", "dark"]) {
  for (const largura of [360, 768, 1280]) {
    // Contexto A (com CSP): detecta violações e rolagem horizontal.
    const ctxA = await browser.newContext({ viewport: { width: largura, height: 800 } });
    // Contexto B (CSP contornado só para injetar o axe): acessibilidade.
    const ctxB = await browser.newContext({ viewport: { width: largura, height: 800 }, bypassCSP: true });
    // O tema vem da escolha salva pelo botão (o padrão do site é o escuro), não da preferência do sistema.
    for (const c of [ctxA, ctxB]) await c.addInitScript((t) => { try { localStorage.setItem("tema", t); } catch {} }, tema);
    const a = await ctxA.newPage();
    const b = await ctxB.newPage();
    const violacoes = [];
    a.on("console", (m) => /Content Security Policy|Refused to/i.test(m.text()) && violacoes.push(m.text().slice(0, 140)));
    // Nenhuma requisição a terceiros em tempo de execução (fontes, scripts, estilos, imagens).
    const externos = new Set();
    a.on("request", (r) => { const u = r.url(); if (!u.startsWith(base) && !u.startsWith("data:") && !u.startsWith("blob:")) externos.add(new URL(u).origin); });
    for (const rota of paginas) {
      const id = `${rota} [${tema}, ${largura}px]`;
      await a.goto(base + rota, { waitUntil: "networkidle" });
      verificacoes++;
      if (await a.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)) falhas.push(`${id}: rolagem horizontal`);
      await b.goto(base + rota, { waitUntil: "networkidle" });
      await b.addScriptTag({ content: axeSrc });
      const r = await b.evaluate(() => axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"] }));
      verificacoes++;
      for (const v of r.violations) {
        // O link "Ir para o conteúdo" fica fora da tela de propósito até receber foco.
        const nos = v.nodes.filter((n) => !n.target.join(" ").includes(".skip"));
        if (nos.length) falhas.push(`${id}: axe ${v.id} (${v.impact}) x${nos.length}: ${v.help}`);
      }
    }
    if (externos.size) falhas.push(`${tema}, ${largura}px: requisições a terceiros: ${[...externos].join(", ")}`);
    if (violacoes.length) falhas.push(`${tema}, ${largura}px: violações de CSP: ${[...new Set(violacoes)].join(" ; ")}`);
    // Promessa do rodapé ("sem cookies nem análise; só a escolha de tema"): o teste a sustenta.
    const cookies = await ctxA.cookies();
    if (cookies.length) falhas.push(`${tema}, ${largura}px: cookies encontrados: ${cookies.map((c) => c.name).join(", ")}`);
    const chaves = await a.evaluate(() => Object.keys(localStorage));
    if (chaves.some((k) => k !== "tema")) falhas.push(`${tema}, ${largura}px: localStorage com chaves além de "tema": ${chaves.join(", ")}`);
    await ctxA.close();
    await ctxB.close();
  }
}
await browser.close();
servidor.close();

if (falhas.length) {
  console.error(`\nTESTE DE ACESSIBILIDADE/CSP FALHOU (${falhas.length}):`);
  for (const f of falhas) console.error("  - " + f);
  process.exit(1);
}
console.log(`Acessibilidade e CSP ok: ${paginas.length} páginas, 2 temas, 3 larguras (${verificacoes} verificações).`);
