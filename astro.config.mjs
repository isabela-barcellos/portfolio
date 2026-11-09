import { defineConfig } from "astro/config";

// Site 100% estático: sem API, sem variáveis de ambiente, nada sensível no bundle.
export default defineConfig({
  output: "static",
  // Endereço público: usado nas metatags de compartilhamento (og:image exige URL absoluta). Trocar se o domínio mudar.
  site: "https://portifolio-six-pi-27.vercel.app",
  // O CSP (vercel.json) só aceita script de arquivo próprio: nada de <script> embutido na página.
  vite: { build: { assetsInlineLimit: 0 } },
});
