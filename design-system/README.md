Sistema visual de um portfólio profissional para vagas de IA: sóbrio, legível e orientado a evidências. Azul-marinho como base, azul-petróleo como destaque, cinzas azulados como neutros. Dois temas: claro (padrão) e escuro.

## Fundamentos de conteúdo

- Escreva em português do Brasil, na primeira pessoa do singular e na voz ativa: "Construí", "Reduzi", "Liderei". Frases curtas, uma ideia por frase.
- Títulos em caixa de frase ("Projetos selecionados"), nunca em caixa alta. Só os eyebrows (`label-mono`) aparecem em caixa alta, e isso é feito por CSS.
- Sem emoji, sem exclamações, sem adjetivos de autopromoção ("apaixonado", "incrível", "expert"). Prove com fatos.
- Todo projeto segue a mesma ordem: problema, abordagem, stack, resultado, link. O resultado traz métrica real com unidade e ponto de comparação ("Latência p95: 1,8 s para 0,9 s"). Sem métrica real, descreva o resultado qualitativamente. Nunca invente números.
- Nomeie ferramentas e modelos exatamente como são escritos (PyTorch, scikit-learn, LangChain). Máximo de cinco tags de stack por cartão.
- Na trajetória, cada cargo tem período, função, empresa e de dois a quatro marcadores que começam com verbo no passado e terminam em resultado.
- Sem logotipo definido: escreva o nome da pessoa em `display-md`, peso 600, em `ink`. Não desenhe símbolo.

## Fundamentos visuais

**Cor**
- Página em `surface-100`; cartões, navegação e painéis em `surface-200`; tags e regiões rebaixadas em `surface-300`.
- Texto principal em `ink`, secundário em `ink-muted`. Nenhum outro cinza para texto.
- `brand` é a cor de ação: botão primário, links e valores de métrica. Texto sobre `brand` é `on-brand`, nunca branco literal.
- `accent` é só destaque (eyebrows, nome da empresa, estado ativo). Não use `accent` como fundo de botão.
- `brand-tint` e `accent-tint` são fundos de tags; o texto sobre eles é `brand` e `accent`.
- `success`, `warning` e `danger` aparecem só em formulários e sempre com palavra ou ícone junto.
- Sem gradientes. Sem fundos decorativos coloridos atrás de seções inteiras.

**Tipografia**
- IBM Plex Sans (`sans`) para títulos e texto; IBM Plex Mono (`mono`) para eyebrows, tags, períodos e números de métricas. Carregue as duas pelo Google Fonts (pesos 400, 500, 600 da Sans; 400, 500 da Mono) antes de usar `bundle.css`.
- Hero em `display-xl`; título de página em `display-lg`; título de seção em `display-md`; título de cartão em `title`; texto corrido em `body`; descrição de cartão em `body-sm`.
- Texto corrido nunca passa de `measure-max`.

**Espaço e layout**
- Escala de 4px: `space-1` a `space-9`. Padding de cartão `space-5`; espaço entre cartões `space-6`; espaço entre seções `space-9` no desktop e `space-8` no mobile.
- Conteúdo centralizado com largura máxima `container-max` e margem lateral `space-5`.
- Grade de projetos: 3 colunas no desktop, 2 no tablet, 1 no mobile.

**Formas, bordas e sombras**
- Cartões em `radius-lg`, botões e campos em `radius-md`, tags em `radius-sm`.
- Cartão: fundo `surface-200`, borda de 1px em `border`, `shadow-card`. No hover, `shadow-pop`. Sem faixa colorida na lateral do cartão.
- Controles têm borda em `border-strong`; `border` nunca é o único limite de um controle.

**Estados**
- Foco: contorno sólido de 3px em `focus-ring`, com 2px de afastamento, em todo elemento interativo. Nunca remova.
- Hover do primário: `brand-strong`. Hover do secundário: preenchimento `surface-300`. Hover do ghost: `brand-tint`.
- Desabilitado: fundo `surface-300`, texto `ink-muted`, cursor `not-allowed`.

**Acessibilidade**
- Texto passa 4,5:1 sobre as superfícies nomeadas na nota de cada token, nos dois temas. Bordas de controle e anel de foco passam 3:1.
- Informação nunca é transmitida só pela cor: status leva palavra ou ícone.

## Iconografia

- Ícones de traço (estilo Lucide), 24px de grade, traço de 1,75px, pontas e junções arredondadas, `stroke="currentColor"`, `fill="none"`. Tamanho de 18px dentro de botões e de 20px ao lado de texto.
- O ícone herda a cor do texto ao redor. Ícone isolado que carrega significado leva `aria-label`; ícone decorativo leva `aria-hidden="true"`.
- Sem emoji e sem ícones preenchidos. Nenhum ativo gráfico (logotipo, foto) foi fornecido: o sistema não inclui imagens.

## Componentes

Os componentes são classes CSS em `components/bundle.css`, com prefixo `pf-`, que usam apenas tokens. Cada um tem guia e preview: Button, Tag, ProjectCard, MetricStat, TimelineItem e SectionHeader. Monte páginas combinando SectionHeader, ProjectCard em grade e TimelineItem em lista, dentro de um contêiner `pf-container`.

Seções sugeridas da página: hero (nome, função, uma frase de posicionamento, dois botões), projetos selecionados, trajetória, competências (tags agrupadas por área) e contato.
