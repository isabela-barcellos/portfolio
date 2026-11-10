// English version of the essentials (home only). Same facts as site.ts; nothing added.
// Case studies stay in Portuguese: the links below point to the Portuguese pages.
export const perfilEn = {
  titulo: "Developer · Generative AI",
  linhas: ["Front-end", "AI agents", "Computer vision"],
  posicionamento: "I build AI-powered products, from the interface to the agent, and I use agents to ship quality code.",
  foto: { alt: "Photo of Isabela Barcellos Freire smiling, wearing the NEXT event badge" },
};

export const faixaTechEn = [
  "Claude Code", "Maestri", "Prompt engineering", "Agents and tools", "MCP", "Azure AI Foundry",
  "MediaPipe", "TypeScript", "Angular", "React Native", "Next.js", "Python", "C# (.NET)",
];

export const numerosEn = [
  { valor: "1st", rotulo: "place at NEXT 2026 (FIAP challenge)" },
  { valor: "1", rotulo: "AI agent in production" },
  { valor: "2", rotulo: "company hackathons" },
  { valor: "3", rotulo: "university challenges (FIAP)" },
];

export const cvEn = { arquivo: "/Isabela-Barcellos-Freire-CV-EN.pdf", nome: "Isabela-Barcellos-Freire-CV-EN.pdf" };

export const mensagemContatoEn = {
  assunto: "Contact via portfolio",
  corpo: "Hi Isabela! I saw your portfolio and would like to talk about an opportunity.",
};

// "Generative AI in practice" blocks. The links go to the Portuguese case pages.
export const focoEn = [
  { icone: "bot", titulo: "Sales agent", linha: "In production, built at Safra IA Week.", href: "/projetos/safra-ia-week/" },
  { icone: "layout", titulo: "Design with AI", linha: "From chat to screen to code, in 1 day.", href: "/projetos/nibo-hackathon/" },
  { icone: "eye", titulo: "Computer vision", linha: "MediaPipe on the device, in ECOA.", href: "/projetos/ecoa/" },
  { icone: "workflow", titulo: "Orchestrated agents", linha: "Maestri and Claude Code every day.", href: "/como-foi-feito/" },
];

// Card texts per case id (order, cover and icon still come from the case frontmatter).
export const casosEn: Record<string, { titulo: string; linha: string; selo: string; capaTexto?: string }> = {
  "safra-ia-week": { titulo: "Safra IA Week", linha: "Sales AI agent, built in 1 week, now in production.", selo: "Hackathon · in production", capaTexto: "AI agent in production" },
  "nibo-hackathon": { titulo: "Nibo Hackathon", linha: "Chat that delivers the interactive screen and the matching code.", selo: "Hackathon · 1 day", capaTexto: "Design with AI in 1 day" },
  ecoa: { titulo: "Ecoa Fono", linha: "At-home speech therapy exercises, with voice guidance and a camera.", selo: "FIAP Challenge · 1st place at NEXT" },
  "rede-ancora": { titulo: "Rede Âncora", linha: "Parts compatible with the vehicle's license plate, for mechanics.", selo: "FIAP Challenge · 2nd year" },
  icr: { titulo: "ICR", linha: "Website with videos that explain exams and calm children.", selo: "FIAP Challenge · 1st year" },
};

export const trajetoriaEn = [
  {
    periodo: "Jun 2026 – present",
    funcao: "Junior Front-end Analyst III · remote",
    empresa: "Nibo",
    marcadores: [
      "Developed and maintained systems in Angular 22 and legacy SaaS systems.",
      "Started developing with Claude Code day to day, with human validation on Pull Requests.",
      "Orchestrate AI agents with Maestri, applying prompt engineering.",
      "Automated day-to-day tasks and processes.",
    ],
  },
  {
    periodo: "Jun 2025 – Apr 2026",
    funcao: "Junior Systems Analyst · Digital Channels",
    empresa: "Banco Safra",
    marcadores: [
      "Developed agents with generative AI: prompts, knowledge bases and tools.",
      "Maintained banking applications in C# (.NET) and Angular with TypeScript.",
      "Queried and modeled data in Oracle SQL and MongoDB, with caching in Redis.",
      "Monitored production systems with Dynatrace and Kibana; deployed via GitLab, GitCloud and OpenShift.",
    ],
  },
  {
    periodo: "Feb 2024 – Jun 2025",
    funcao: "IT Intern · Digital Channels",
    empresa: "Banco Safra",
    marcadores: [
      "Built screens in Angular, JavaScript and HTML, faithful to the layout and responsive.",
      "Maintained and developed in C#; queried Oracle databases as the work required.",
    ],
  },
];

export const competenciasEn = [
  { area: "Applied AI", itens: ["Generative AI", "Prompt engineering", "Agents and tools", "Maestri", "Claude Code", "MediaPipe", "Azure AI Foundry"] },
  { area: "Front-end and mobile", itens: ["Angular", "TypeScript", "JavaScript", "HTML", "CSS", "React Native", "Expo", "Figma"] },
  { area: "Back-end and data", itens: ["C# (.NET)", "Java", "Python", "Oracle SQL", "MongoDB", "Redis"] },
  { area: "Cloud and operations", itens: ["Microsoft Azure", "OpenShift", "GitLab", "Dynatrace", "Kibana"] },
  { area: "Education and languages", itens: ["FIAP · B.Sc. Software Engineering · 2023–2027", "English (pre-intermediate)", "Spanish (basic)"] },
];
