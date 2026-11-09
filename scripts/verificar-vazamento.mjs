// Falha o build se algo sensível aparecer no que vai ser publicado (dist/) ou nos conteúdos (content/, src/).
// Uso: npm run verificar   (roda depois do build; no Vercel faz parte do buildCommand)
import fs from "node:fs";
import path from "node:path";

// VERIFICAR_RAIZ permite apontar para outra pasta (usado pelos testes do próprio verificador).
const raiz = process.env.VERIFICAR_RAIZ ? path.resolve(process.env.VERIFICAR_RAIZ) : path.resolve(import.meta.dirname, "..");
const alvos = ["dist", "content", "src", "public"].map((d) => path.join(raiz, d)).filter(fs.existsSync);
const textoExt = new Set([".html", ".css", ".js", ".mjs", ".json", ".md", ".mdx", ".astro", ".ts", ".txt", ".svg", ".xml", ".webmanifest"]);
const imagemExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

// E-mails permitidos no site (o público, de contato).
const emailsOk = new Set(["isabelabarcellos0812@gmail.com"]);

// Dados pessoais específicos (telefone, bairro etc.) NÃO ficam no código: vêm de um arquivo local fora do git,
// `_entrada-privada/padroes-privados.txt`, uma expressão regular por linha (linhas com # são comentários).
// Sem o arquivo (ex.: no build da Vercel), valem só as regras genéricas abaixo.
const privados = [];
const arquivoPrivado = path.join(raiz, "_entrada-privada", "padroes-privados.txt");
if (fs.existsSync(arquivoPrivado)) {
  for (const linha of fs.readFileSync(arquivoPrivado, "utf8").split(/\r?\n/)) {
    const l = linha.trim();
    if (l && !l.startsWith("#")) privados.push(["dado pessoal (padrão privado)", new RegExp(l, "i")]);
  }
}

const regras = [
  ...privados,
  ["celular brasileiro", /\(?\b\d{2}\)?[\s.-]?9[\s.-]?\d{4}[\s.-]?\d{4}\b/],
  ["chave/segredo genérico", /(api[_-]?key|secret|passw(or)?d|senha)\s*[:=]\s*["'][^"'\s]{6,}["']/i],
  ["token GitHub", /\bgh[pousr]_[A-Za-z0-9]{30,}\b/],
  ["chave AWS", /\bAKIA[0-9A-Z]{16}\b/],
  ["chave sk-", /\bsk-[A-Za-z0-9_-]{20,}\b/],
  ["JWT", /\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{10,}\b/],
  ["chave privada", /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ["caminho local", /C:\\Users\\|\/Users\/|OneDrive/],
  ["URL local/interna", /\b(localhost|127\.0\.0\.1|10\.0\.2\.2|192\.168\.\d+\.\d+)\b/],
  ["arquivo de ambiente", /\.env(\.|\b)/],
];

const problemas = [];
const ignorar = (f) => f.includes(`${path.sep}node_modules${path.sep}`) || f.includes(`${path.sep}.astro${path.sep}`);

function* arquivos(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (ignorar(p)) continue;
    if (e.isDirectory()) yield* arquivos(p);
    else yield p;
  }
}

for (const alvo of alvos) {
  for (const f of arquivos(alvo)) {
    const ext = path.extname(f).toLowerCase();
    const rel = path.relative(raiz, f);
    if (rel.startsWith(`scripts${path.sep}`)) continue;
    if (imagemExt.has(ext)) {
      // EXIF/GPS: JPEGs com bloco Exif (APP1) são recusados; PNG/WebP gerados pelo build não carregam isso.
      const b = fs.readFileSync(f);
      if (ext.startsWith(".jp") && b.includes(Buffer.from("Exif\0\0"))) problemas.push([rel, "metadados EXIF na imagem"]);
      continue;
    }
    if (!textoExt.has(ext)) continue;
    const t = fs.readFileSync(f, "utf8");
    for (const [nome, re] of regras) {
      // `localhost` em dist/ ou src/ é um problema; em content/ idem. .env só importa fora de docs.
      if (re.test(t)) problemas.push([rel, nome]);
    }
    // Notas de revisão (comentários HTML) vazam para a página publicada: devem ficar no frontmatter YAML (#).
    if (ext === ".html" && /<!--(?!\s*\[if)[\s\S]*?-->/.test(t.replace(/<!--\s*-->/g, ""))) problemas.push([rel, "comentário HTML publicado (use # no frontmatter)"]);
    if (ext === ".md" && rel.startsWith("content") && /<!--/.test(t)) problemas.push([rel, "comentário HTML no corpo do case (vaza no HTML)"]);
    // O CSP do vercel.json bloqueia script embutido: o menu/botões quebrariam só em produção.
    if (ext === ".html" && /<script(?![^>]*\bsrc=)[^>]*>\s*\S/.test(t)) problemas.push([rel, "<script> embutido (bloqueado pelo CSP)"]);
    for (const m of t.matchAll(/[\w.+-]+@[\w-]+\.[\w.-]+/g)) {
      const e = m[0].toLowerCase();
      if (!emailsOk.has(e) && !/\.(png|webp|jpg|svg|css|js)$/.test(e) && !e.startsWith("2x@")) problemas.push([rel, `e-mail não autorizado: ${e}`]);
    }
  }
}

if (problemas.length) {
  console.error("\nVERIFICAÇÃO DE VAZAMENTO FALHOU:");
  for (const [arq, motivo] of problemas) console.error(`  - ${arq}: ${motivo}`);
  console.error("\nCorrija ou remova antes de publicar.\n");
  process.exit(1);
}
console.log(`Verificação de vazamento ok (${alvos.map((a) => path.basename(a)).join(", ")}).`);
