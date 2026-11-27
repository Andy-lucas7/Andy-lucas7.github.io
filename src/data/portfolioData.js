// Seções navegáveis, na ordem em que aparecem na página
export const sections = [
  { id: "hero", label: "Início" },
  { id: "projects", label: "Projetos" },
  { id: "tech", label: "Tecnologias" },
  { id: "contact", label: "Contato" }
];

export const portfolioData = {
  personal: {
    name: "Lucas Andrey",
    role: "Full Stack Developer & Data Engineer",
    status: "TRABALHANDO NA NATURA",
    bio: "\"Gosto de explorar e projetar coisas que não tentei antes. Se não sei, posso aprender.\" - Lucas Andrey, 2026",
    location: "Remoto",
    stats: [
      { label: "Foco Atual", value: "Databricks & Analytics" },
      { label: "Projetos no GitHub", value: "30+" },
      { label: "Soluções Entregues", value: "E2E" },
      { label: "Aprendizado", value: "Contínuo" }
    ]
  },

  // `variant` define a paleta do PixelCard; `flagship` ocupa a linha de destaque do bento
  projects: [
    {
      id: "prismview",
      title: "PrismView",
      subtitle: "Wallpapers vivos para Windows",
      description: "Transforma o desktop do Windows em um lugar vivo: wallpapers animados, widgets de vidro e cenas 3D criados no próprio Studio e exibidos por um motor nativo leve, que roda atrás dos ícones sem pesar no PC.",
      tags: ["Rust", "wgpu / DX12", "Tauri", "React", "Three.js", "WGSL"],
      metrics: "200 mil partículas em tempo real",
      family: "Família Prism",
      variant: "prism",
      flagship: true,
      featured: true,
      repoUrl: "https://github.com/Andy-lucas7/PrismView"
    },
    {
      id: "prismlock",
      title: "PrismLock",
      subtitle: "Tela de bloqueio óptica para Android",
      description: "Estúdio para criar telas de bloqueio, telas iniciais e widgets no Android com efeito de vidro líquido em 120Hz, papéis de parede em vídeo, profundidade 3D na foto e textos dinâmicos com hora, clima e bateria.",
      tags: ["Kotlin", "Jetpack Compose", "AGSL", "ML Kit", "Android"],
      metrics: "Vidro líquido AGSL a 120Hz",
      family: "Família Prism",
      variant: "prism",
      flagship: true,
      featured: true,
      repoUrl: "https://github.com/Andy-lucas7/PrismLock"
    },
    {
      id: "minishell",
      title: "Minishell",
      subtitle: "Reimplementação do Bash em C",
      description: "Criação de um shell próprio para executar comandos, gerenciar processos, redirecionamentos e variáveis de ambiente na linguagem C.",
      tags: ["C", "Unix", "System Programming"],
      metrics: "Projeto da 42",
      variant: "green",
      featured: true,
      repoUrl: "https://github.com/Andy-lucas7/minishell-42"
    },
    {
      id: "piscine-mobile",
      title: "Piscine Mobile",
      subtitle: "Projetos Mobile Nativos/Cross-platform",
      description: "Série de aplicativos desenvolvidos durante a piscina de mobile da 42, explorando arquiteturas modernas para criar apps responsivos e eficientes.",
      tags: ["Mobile", "Flutter", "UI/UX", "Java"],
      metrics: "Bootcamp Intensivo",
      variant: "blue",
      featured: true,
      repoUrl: "https://github.com/Andy-lucas7/Piscine_mobile-42"
    },
    {
      id: "study-io",
      title: "Study.io",
      subtitle: "Plataforma de Organização de Estudos",
      description: "Aplicação focada em rastrear o progresso de aprendizado, organizar notas e gerenciar metas educacionais com uma interface intuitiva.",
      tags: ["React", "JavaScript", "TypeScript", "Postgres"],
      metrics: "Full Stack",
      variant: "indigo",
      featured: true,
      repoUrl: "https://github.com/Andy-lucas7/study.io"
    }
  ],

  techCategories: [
    {
      name: "Engenharia de Dados & Cloud",
      skills: ["Databricks", "AWS", "Python", "SQL", "Postgres"]
    },
    {
      name: "Frontend & Mobile",
      skills: ["React", "JavaScript", "TypeScript", "Flutter", "Java"]
    },
    {
      name: "Sistemas & Arquitetura",
      skills: ["C", "Rust", "Unix", "Git", "Arquitetura de Software"]
    }
  ],

  socialLinks: [
    { name: "GitHub", url: "https://github.com/Andy-lucas7", icon: "Github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/lucas-andrey7/", icon: "Linkedin" },
    { name: "Email", url: "mailto:lucasandrey109@gmail.com", icon: "Mail" }
  ]
};
