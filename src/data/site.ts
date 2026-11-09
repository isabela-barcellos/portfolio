// Fonte do conteúdo do site. Espelha content/*.md (que é a versão para revisão).
export const perfil = {
  nome: "Isabela Barcellos Freire",
  titulo: "Desenvolvedora · IA Generativa",
  linhas: ["Front-end", "Agentes de IA", "Visão computacional"], // faixas curtas do hero (fatos, não slogan)
  // Frase sugerida pelo Avaliador e aprovada pela Isabela (09/11/2026). Também vira a descrição do link compartilhado.
  posicionamento: "Desenvolvo produtos com IA, da interface ao agente, e uso agentes para entregar código com qualidade.",
  linkedin: "https://www.linkedin.com/in/isabela-barcellos-freire/",
  github: "https://github.com/isabela-barcellos",
  email: "isabelabarcellos0812@gmail.com",
  foto: { alt: "Foto de Isabela Barcellos Freire sorrindo, com o crachá do evento NEXT" },
};

// Faixa de tecnologias (todas constam no CV).
export const faixaTech = [
  "Claude Code", "Maestri", "Engenharia de prompt", "Agentes e tools", "MCP", "Azure AI Foundry",
  "MediaPipe", "TypeScript", "Angular", "React Native", "Next.js", "Python", "C# (.NET)",
];

// Números verificáveis (CV e histórico do projeto).
export const numeros = [
  { valor: "1º", rotulo: "lugar no NEXT 2026 (challenge FIAP)" },
  { valor: "1", rotulo: "agente de IA em produção" },
  { valor: "2", rotulo: "hackathons em empresa" },
  { valor: "3", rotulo: "challenges da faculdade (FIAP)" },
];

export const cv = { arquivo: "/Isabela-Barcellos-Freire-CV.pdf", nome: "Isabela-Barcellos-Freire-CV.pdf" };

// Mensagem pronta para o botão "Falar comigo" (e-mail com assunto e corpo preenchidos).
export const mensagemContato = {
  assunto: "Contato pelo portfólio",
  corpo: "Olá, Isabela! Vi o seu portfólio e gostaria de conversar sobre uma oportunidade.",
};

// Blocos curtos "IA generativa na prática": cada um vem de um fato do CV ou de um case.
export const foco = [
  { icone: "bot", titulo: "Agente de vendas", linha: "Em produção, construído no Safra IA Week.", href: "/projetos/safra-ia-week/" },
  { icone: "layout", titulo: "Design com IA + MCP", linha: "Tela e código no padrão, em 1 dia.", href: "/projetos/nibo-hackathon/" },
  { icone: "eye", titulo: "Visão computacional", linha: "MediaPipe no aparelho, no ECOA.", href: "/projetos/ecoa/" },
  { icone: "workflow", titulo: "Agentes orquestrados", linha: "Maestri e Claude Code no dia a dia.", href: "/como-foi-feito/" },
];

export const trajetoria = [
  {
    periodo: "jun/2026 – atual",
    funcao: "Analista Jr. III de Front-end · remoto",
    empresa: "Nibo",
    marcadores: [
      "Desenvolvi e mantive sistemas em Angular 22 e sistemas legados SaaS.",
      "Passei a desenvolver com Claude Code no dia a dia, com validação humana nos Pull Requests.",
      "Orquestro agentes de IA com Maestri, aplicando engenharia de prompt.",
      "Automatizei atividades e processos do dia a dia.",
    ],
  },
  {
    periodo: "jun/2025 – abr/2026",
    funcao: "Analista Jr. de Sistemas · Canais Digitais",
    empresa: "Banco Safra",
    marcadores: [
      "Desenvolvi agentes com IA generativa: prompts, bases de conhecimento e tools.",
      "Mantive aplicações bancárias em C# (.NET) e Angular com TypeScript.",
      "Consultei e modelei dados em Oracle SQL e MongoDB, com cache em Redis.",
      "Monitorei sistemas em produção com Dynatrace e Kibana; fiz deploy via GitLab, GitCloud e OpenShift.",
    ],
  },
  {
    periodo: "fev/2024 – jun/2025",
    funcao: "Estagiária de TI · Canais Digitais",
    empresa: "Banco Safra",
    marcadores: [
      "Construí telas em Angular, JavaScript e HTML, aderentes ao layout e responsivas.",
      "Mantive e desenvolvi em C#; consultei bancos Oracle conforme as demandas.",
    ],
  },
];

export const competencias = [
  { area: "IA aplicada", itens: ["IA generativa", "Engenharia de prompt", "Agentes e tools", "Maestri", "Claude Code", "MediaPipe", "Azure AI Foundry"] },
  { area: "Front-end e mobile", itens: ["Angular", "TypeScript", "JavaScript", "HTML", "CSS", "React Native", "Expo", "Figma"] },
  { area: "Back-end e dados", itens: ["C# (.NET)", "Java", "Python", "Oracle SQL", "MongoDB", "Redis"] },
  { area: "Cloud e operação", itens: ["Microsoft Azure", "OpenShift", "GitLab", "Dynatrace", "Kibana"] },
  { area: "Formação e idiomas", itens: ["FIAP · Eng. de Software · 2023–2027", "Inglês (pré-intermediário)", "Espanhol (básico)"] },
];

