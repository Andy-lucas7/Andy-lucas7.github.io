export const portfolioData = {
  personal: {
    name: "Lucas Andrey",
    role: "Full Stack Developer & Data Engineer",
    status: "TRABALHANDO NA NATURA",
    bio: "Gosto de explorar e projetar coisas que não tentei antes. Se não sei, posso aprender.",
    location: "Remoto",
    stats: [
      { label: "Foco Atual", value: "Databricks & Analytics" },
      { label: "Projetos no GitHub", value: "30+" },
      { label: "Soluções Entregues", value: "E2E" },
      { label: "Aprendizado", value: "Contínuo" }
    ]
  },

  projects: [
    {
      id: "project-1",
      title: "Minishell",
      subtitle: "Reimplementação do Bash em C",
      description: "Criação de um shell próprio para executar comandos, gerenciar processos, redirecionamentos e variáveis de ambiente na linguagem C.",
      tags: ["C", "Unix", "System Programming"],
      metrics: "Projeto da 42",
      gradient: "from-cyan-500/20 to-blue-600/10",
      featured: true,
      repoUrl: "https://github.com/Andy-lucas7/minishell-42"
    },
    {
      id: "project-2",
      title: "Piscine Mobile",
      subtitle: "Projetos Mobile Nativos/Cross-platform",
      description: "Série de aplicativos desenvolvidos durante a piscina de mobile da 42, explorando arquiteturas modernas para criar apps responsivos e eficientes.",
      tags: ["Mobile", "Flutter", "UI/UX", "Java"],
      metrics: "Bootcamp Intensivo",
      gradient: "from-purple-500/20 to-pink-500/10",
      featured: true,
      repoUrl: "https://github.com/Andy-lucas7/Piscine_mobile-42"
    },
    {
      id: "project-3",
      title: "Study.io",
      subtitle: "Plataforma de Organização de Estudos",
      description: "Aplicação focada em rastrear o progresso de aprendizado, organizar notas e gerenciar metas educacionais com uma interface intuitiva.",
      tags: ["React", "JavaScript", "TypeScript", "Postgres"],
      metrics: "Full Stack",
      gradient: "from-emerald-500/20 to-teal-500/10",
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
