# Portfólio — Isabela Barcellos Freire

Site estático em [Astro](https://astro.build) com design system próprio, textos curtos e detalhes só ao clicar. Foi construído por orquestração de agentes de IA (Claude Code e Maestri) com validação humana, e o próprio repositório mostra o método: verificações automáticas decidem o que pode ir ao ar.

Site: https://portifolio-six-pi-27.vercel.app

## O que tem aqui

- **Páginas:** Home, cinco cases (`/projetos/<slug>/`), "Como foi feito" e 404.
- **Conteúdo separado do código:** cada case é um arquivo em `content/cases/*.md`, validado por um esquema (`src/content.config.ts`). `rascunho: true` tira o case do build.
- **Design system:** tokens de cor, tipografia e espaçamento (`src/styles/`, com a documentação e os tokens em `design-system/`). **Tema escuro por padrão** (azul-noite com rosa como marca) e tema claro pelo botão do topo, com contraste conferido por cálculo e pelo teste de acessibilidade.
- **Sem back-end e sem variáveis de ambiente.** Nada sensível entra no bundle.

## Rodar

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # gera dist/
```

## Testes

```bash
npm run test:verificador   # 15 casos do verificador de vazamento (rápido, sem navegador)
npm run build && npm run test:a11y   # acessibilidade, rolagem horizontal e CSP
npm test                   # os dois
```

O teste de acessibilidade usa `playwright-core` e precisa de um Chrome/Chromium. Localmente, aponte `CHROME_PATH` para o seu Chrome.

**Estado do CI:** o workflow (`.github/workflows/ci.yml`) roda esses mesmos passos, mas **ainda não rodou com sucesso**: o GitHub não chegou a iniciar o job, por uma restrição na conta da autora que ainda será resolvida. Até ficar verde, não há selo de CI neste repositório. Enquanto isso, os testes passam na máquina da autora e o verificador de vazamento roda em cada build da Vercel.

## Segurança e privacidade (o que o build garante)

- **`npm run verificar`** roda no build da Vercel e **reprova a publicação** se encontrar: celular brasileiro, e-mail não autorizado, tokens (GitHub, AWS, `sk-`, JWT), chaves privadas, senhas em código, caminhos locais, EXIF em fotos, `<script>` embutido (o CSP o bloquearia) e comentários HTML publicados.
- Dados pessoais específicos (telefone, bairro) **não ficam no código**: o verificador os lê de `_entrada-privada/padroes-privados.txt`, que está no `.gitignore`. Por isso, **na CI e em clones públicos valem só as regras genéricas**; os padrões pessoais só valem na máquina de quem tem esse arquivo.
- O verificador procura por padrões: reduz o risco, mas não prova que não há dado sensível. Um scanner dedicado de segredos (por exemplo o gitleaks) deve rodar antes de cada publicação grande, como segunda camada.
- **CSP restritiva e cabeçalhos de segurança** em `vercel.json` (`script-src 'self'`, sem iframes, sem câmera/microfone).
- A decisão está registrada em [`docs/adr/0001-site-estatico-csp-e-verificacao.md`](docs/adr/0001-site-estatico-csp-e-verificacao.md).

## Estrutura

```
content/cases/     um arquivo por case (frontmatter validado + texto)
src/pages/         Home, case, "Como foi feito", 404
src/components/    Carousel, ProjectCard, Icon, SectionHeader
src/data/          perfil, trajetória, competências
scripts/           verificador de vazamento
tests/             testes do verificador e de acessibilidade/CSP
```

## Deploy

Vercel, plano gratuito: cada push na `main` gera um deploy. O `buildCommand` (`vercel.json`) roda `npm run build && npm run verificar`.

## Limites conhecidos

- O conteúdo dos cases de empresa (Safra, Nibo) descreve só o escopo autorizado, sem arquitetura nem dados internos.
- Não há métricas além das que já são verdadeiras (por exemplo, o 1º lugar no NEXT 2026). O ECOA ainda não foi validado em aparelho físico nem com usuários; está descrito como próximo passo.
- O teste de acessibilidade cobre regras automáticas (axe). Não substitui a revisão manual com leitor de tela.
