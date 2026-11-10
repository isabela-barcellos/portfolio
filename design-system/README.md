Sistema visual do portfólio: azul-noite como base, rosa como cor de marca e ciano como segundo acento. Tema **escuro por padrão**; o claro (rosa-névoa com rosa-escuro) entra pelo botão do topo. A paleta escura vem de uma referência visual de portfólio, com os valores medidos na imagem e os contrastes conferidos por cálculo (WCAG).

## Fundamentos de conteúdo

- Escreva em português do Brasil, na primeira pessoa do singular e na voz ativa: "Construí", "Reduzi", "Liderei". Frases curtas, uma ideia por frase.
- Títulos em caixa de frase ("Projetos"), nunca em caixa alta. Só os eyebrows (rótulo mono acima do título) aparecem em caixa alta, e isso é feito por CSS. O eyebrow complementa o título, não o repete.
- Sem emoji, sem exclamações, sem adjetivos de autopromoção. Prove com fatos.
- Todo projeto segue a ordem: problema, papel, decisões, resultado, aprendizados. O resultado traz métrica real com unidade e ponto de comparação; sem métrica real, descreva o resultado qualitativamente. **Nunca invente números.**
- Nomeie ferramentas exatamente como são escritas (PyTorch, scikit-learn, LangChain). Máximo de cinco tags de tecnologia por cartão.
- Na trajetória, cada cargo tem período, função e empresa, e de dois a quatro marcadores que começam com verbo no passado.
- Sem logotipo definido: escreva o nome da pessoa em fonte mono, peso 600. Não desenhe símbolo.

## Cor

- **Proporção 60/30/10.** ~60% fundo (`surface-100`), ~30% superfícies e texto (`surface-200`, `surface-300`, `ink`, `ink-muted`), ~10% acentos (rosa e ciano).
- Página em `surface-100`; cartões, navegação, painéis e faixa de tecnologias em `surface-200`; tags e regiões rebaixadas em `surface-300`.
- Texto principal em `ink`, secundário em `ink-muted`. Nenhum outro cinza para texto.
- **Dois acentos, papéis separados.**
  - **Rosa** (`brand` #ff4d94) só em **CTAs principais e detalhes de marca**: botão primário (hero, contato, "Falar comigo" do topo), anel da foto, barrinha sob os títulos h2, borda inferior das capas de texto e separadores "·" da faixa. Nada mais.
  - **Rosa suave** (`pink-soft` #ffb3d1; `accent` e `brand-ink` são aliases) para **texto rosa pequeno**: eyebrows (13px, caixa alta, mono), chips do hero, pílulas, números das estatísticas e ícone das capas de texto. Chips e capas usam `brand-tint` (ameixa #3a1830) de fundo.
  - **Ciano** (`link` #22d3ee no escuro, #0b6a80 no claro) para **links, botão ghost, "Ver detalhes", "Voltar ao topo", tags de tecnologia, ícones dos blocos de IA generativa, "+/–" dos acordeões, hover dos botões de ícone e anel de foco**.
- Texto sobre `brand` é sempre `on-brand`, que no escuro é a cor da página (#0f172a). Branco sobre #ff4d94 dá cerca de 3,2:1 e reprova; o `test:a11y` pega essa regressão.
- **O rosa é acento, não fundo.** Capas de texto usam `brand-tint` com título claro e borda inferior rosa.
- **Sem degradê.** A faixa de tecnologias é `surface-200` com 1px de `border` em cima e embaixo, texto em `ink` e separadores em `brand`; o botão de pausa usa `surface-300`, `border-strong` e ícone `ink`.
- `success`, `warning` e `danger` aparecem só em formulários e sempre com palavra ou ícone.

## Tipografia

- **Títulos e rótulos em IBM Plex Mono** (600 nos títulos), **corpo em IBM Plex Sans** para leitura longa. Hospedadas no próprio site via Fontsource, licença OFL (Mono e Sans em 400, 500 e 600, subconjunto latin), sem carregar nada do Google em tempo de execução.
- Hero em `display-xl` (48px), título de seção em `display-md` (28px), título de cartão em `title`, texto corrido em `body`, descrição de cartão em `body-sm`.
- Texto corrido nunca passa de `measure-max`.

## Espaço, formas e brilho

- Escala de 4px: `space-1` a `space-9`. Padding de cartão `space-5`; conteúdo centralizado até `container-max`.
- Cartões em `radius-lg` (16px) com borda de 1px em `border`; botões, tags e navegação em `radius-pill`.
- Navegação **flutuante em pílula**, com botão primário "Falar comigo" em telas largas.
- **Brilho (glow) moderado e estático** (`--glow`): botão primário, números, anel da foto e hover de cartões. Transições só quando o usuário não pede menos movimento (`prefers-reduced-motion`). A faixa de tecnologias para sozinha nesse caso, e há um botão de pausa.

## Estados e acessibilidade

- Foco: contorno sólido de 3px em `focus-ring` (`link`, ciano), com 2px de afastamento, em todo elemento interativo. Nunca remova.
- Texto passa 4,5:1 e bordas de controle e foco passam 3:1 nos dois temas. O teste `npm run test:a11y` verifica isso com o axe-core.
- Informação nunca é transmitida só pela cor: status leva palavra ou ícone.

## Iconografia

- Ícones de traço (estilo Lucide), grade de 24px, traço de 1,75px, `stroke="currentColor"`. 18px em botões, 20px ao lado de texto. Sem emoji.
- Não use imagens, personagens ou ilustrações da referência visual: ela é material de terceiros. Só a paleta e o clima foram aproveitados.
