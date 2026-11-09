# ADR 0001 — Site estático, CSP restritiva e verificação de vazamento no build

- **Status:** aceita
- **Data:** 2026-11-09

## Contexto
O portfólio mostra trabalho de empresas e de faculdade. O risco principal não é disponibilidade, é **publicar sem querer** algo sensível (telefone, credencial, caminho local, material sob confidencialidade). O conteúdo é produzido com ajuda de agentes de IA, então a checagem não pode depender só de revisão visual.

## Decisão
1. **Site 100% estático** (Astro), sem back-end e sem variáveis de ambiente: não há segredo para vazar nem API para atacar.
2. **CSP restritiva** na publicação (`script-src 'self'`, sem iframes). Em contrapartida, não pode haver `<script>` embutido; o build gera só scripts de arquivo próprio.
3. **Verificador de vazamento no build** (`npm run verificar`) que falha o deploy. Dados pessoais específicos ficam em arquivo fora do git, não no código.
4. **Teste de acessibilidade e CSP** sobre o build, com o mesmo CSP de produção, para achar o que só quebraria na publicação.
5. **Conteúdo em arquivos separados do código**, com esquema validado, e `rascunho: true` para segurar um case sem apagá-lo.

## Alternativas consideradas
- **Revisão manual antes de cada deploy:** barata, mas falha justamente quando o texto vem de agentes e passa depressa.
- **Scanner de segredos pronto (gitleaks) como única barreira:** não pega telefone, bairro, EXIF nem comentários HTML. Fica como camada adicional, não como substituto.
- **Site dinâmico com CMS:** mais flexível, mas cria superfície de ataque e segredos a proteger sem necessidade para um portfólio.

## Consequências
- (+) O que vai ao ar passa por regras repetíveis; um defeito vira falha de build, não incidente.
- (+) O CSP detectou, antes da publicação, um script embutido que quebraria o menu só em produção.
- (−) O verificador é por padrões: ele reduz o risco, mas não prova ausência de dado sensível.
- (−) Qualquer biblioteca externa em tempo de execução exige rever o CSP.
