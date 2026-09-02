export const profile = {
  name: 'Matheus da Paz',
  role: 'AI Product & Automation Engineer',
  location: 'Recife, Pernambuco',
  workModel: 'Remoto · PJ',
  email: 'nitroxinteligence@gmail.com',
  github: 'https://github.com/nitroxinteligence',
  portfolio: 'https://crl.falamateus.com.br',
};

export const navigation = [
  { label: 'Trabalho', href: '#trabalho' },
  { label: 'Como construo', href: '#metodo' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Currículo', href: '/curriculo/' },
  { label: 'Contato', href: '#contato' },
];

export const workflow = [
  {
    id: 'problema',
    label: 'Problema',
    title: 'Tornar a ambiguidade observável',
    description:
      'Mapeio usuário, operação, dados, restrições e o resultado que realmente precisa mudar antes de escolher tecnologia.',
  },
  {
    id: 'arquitetura',
    label: 'Arquitetura',
    title: 'Transformar contexto em contratos',
    description:
      'Defino fluxo, estados, ferramentas, limites, aprovações humanas e critérios de aceite para o sistema.',
  },
  {
    id: 'mvp',
    label: 'MVP',
    title: 'Construir o menor sistema útil',
    description:
      'Orquestro agentes de código para acelerar implementação, integrações e documentação sem terceirizar decisões.',
  },
  {
    id: 'validacao',
    label: 'Validação',
    title: 'Trocar convicção por evidência',
    description:
      'Reviso arquitetura, edge cases e segurança; depois testo fluxos e comportamento observável no ambiente real.',
  },
  {
    id: 'handoff',
    label: 'Handoff',
    title: 'Preparar a continuidade',
    description:
      'Entrego decisões, limites, documentação e próximos passos para uma equipe continuar sem depender do autor do MVP.',
  },
];

export const pillars = [
  {
    number: '01',
    title: 'Produto 0→1',
    text: 'Transformo requisitos dispersos em escopo, interface, fluxo e MVP utilizável.',
  },
  {
    number: '02',
    title: 'Agentes e automação',
    text: 'Estruturo agentes, ferramentas, dados, estados, aprovações humanas e integrações para processos reais.',
  },
  {
    number: '03',
    title: 'Backend e integrações',
    text: 'Trabalho com Python, APIs, SQL, bancos de dados, autenticação e serviços que conectam produto e operação.',
  },
  {
    number: '04',
    title: 'Handoff para engenharia',
    text: 'Organizo decisões, arquitetura, limites e documentação para reduzir a dependência de quem criou o protótipo.',
  },
];

export const selectedWork = {
  fluvos: {
    index: '01',
    name: 'FluvOS',
    category: 'Produto de produtividade · IA aplicada · Full product workflow',
    status: 'MVP funcional · Em evolução',
    title: 'Uma plataforma de produtividade que transforma rotina em um sistema de execução, foco e recompensa.',
    summary:
      'FluvOS reúne tarefas, hábitos, sessões de foco, recompensas e recursos de IA numa experiência mobile-first. Meu trabalho envolveu produto, arquitetura, interface e evolução técnica do MVP, com atenção à estrutura de dados e à continuidade do desenvolvimento.',
    role: 'Produto, UI/UX, arquitetura e desenvolvimento AI-native do MVP e de suas evoluções.',
    problem:
      'Ferramentas de produtividade normalmente fragmentam tarefas, hábitos e foco em aplicativos diferentes. O produto precisava transformar esses elementos em um fluxo único, compreensível e motivador.',
    built: [
      'experiência mobile-first para tarefas, hábitos, foco e recompensas;',
      'arquitetura de produto e estrutura de dados para o core operacional;',
      'integrações e recursos de IA incorporados ao fluxo do usuário;',
      'documentação e base técnica para continuidade do projeto.',
    ],
    stack:
      'Next.js · React · TypeScript com desenvolvimento assistido por agentes · Supabase/PostgreSQL · Capacitor · APIs · GitHub Actions',
    result:
      'MVP funcional e produto em evolução, com base técnica reorganizada para reduzir complexidade e facilitar continuidade.',
    repository: 'https://github.com/fluvosapp/fluvos-app',
  },
  supporting: [
    {
      index: '02',
      name: 'SaUvia',
      category: 'HealthTech · Médicos e pacientes · MVP',
      status: 'MVP aprovado · Handoff concluído',
      title: 'Duas experiências conectadas para registro do paciente e acompanhamento profissional.',
      summary:
        'Construção do MVP, produto, UI/UX e desenvolvimento full stack assistido por agentes, seguido de handoff e apoio à equipe responsável pela finalização.',
      result: 'MVP aprovado e transferido para continuidade técnica.',
      availability: 'Case profundo aguarda assets e documentação publicáveis.',
    },
    {
      index: '03',
      name: 'Vision Prospect',
      category: 'SalesTech · Prospecção B2B/B2C · MVP',
      status: 'MVP aprovado · Handoff concluído',
      title: 'Estratégia comercial transformada em fluxo operacional.',
      summary:
        'Responsável pelo 0→1 do MVP: estrutura do produto, UI/UX e desenvolvimento full stack assistido por agentes, seguido de handoff técnico e colaboração com a equipe responsável pela finalização.',
      result: 'MVP aprovado, entregue e continuado por uma equipe técnica.',
      availability: 'Case profundo aguarda assets e documentação publicáveis.',
    },
  ],
};

export const verticalEstate = {
  name: 'Vertical Estate',
  eyebrow: 'Prova técnica de apoio · Operação imobiliária',
  title: 'Agentes conectados a ferramentas reais, dados e decisões humanas.',
  text:
    'Produto em evolução contínua para a operação comercial imobiliária, conectando CRM, conversas omnichannel, recomendação de imóveis, backend e integrações. A arquitetura mantém ações sensíveis dentro de fluxos human-in-the-loop.',
  result:
    'Trabalho contínuo em produto e operação. Volumes, clientes e métricas permanecem sob confidencialidade.',
  nodes: [
    { label: 'Canais', detail: 'Conversas e eventos operacionais' },
    { label: 'Agentes', detail: 'Contexto, regras e tool calling' },
    { label: 'Ferramentas', detail: 'Busca, agenda, CRM e mensageria' },
    { label: 'Dados', detail: 'Imóveis, contatos e estado do funil' },
    { label: 'Humano', detail: 'Revisão, exceções e decisão final' },
  ],
};

export const method = [
  {
    number: '01',
    title: 'Entendo o processo',
    text: 'Mapeio usuário, operação, dados, restrições e o resultado que realmente precisa mudar.',
  },
  {
    number: '02',
    title: 'Defino sistema e critérios',
    text: 'Transformo o problema em arquitetura, contratos, estados, limites e critérios de aceite.',
  },
  {
    number: '03',
    title: 'Orquestro a execução',
    text: 'Divido o trabalho em tarefas verificáveis e uso agentes para acelerar pesquisa, implementação, documentação e análise.',
  },
  {
    number: '04',
    title: 'Reviso o que foi gerado',
    text: 'Questiono arquitetura, dependências, segurança, edge cases e legibilidade. Quando o agente erra, corrijo o código ou mudo a especificação.',
  },
  {
    number: '05',
    title: 'Valido no ambiente real',
    text: 'Testo fluxos, integrações e comportamento observável. Uma resposta convincente do modelo não prova que o sistema funciona.',
  },
  {
    number: '06',
    title: 'Preparo a continuidade',
    text: 'Entrego contexto, decisões, limitações, documentação e próximos passos para reduzir o custo de handoff.',
  },
];

export const domains = [
  {
    number: 'A',
    title: 'Revenue Operations e SalesTech',
    text: 'Agentes e sistemas para SDR, social selling, prospecção, vendas por WhatsApp, follow-up, CRM e organização do processo comercial.',
    related: 'Vision AI · IA Four Sales · Vision Prospect · Vertical Estate',
  },
  {
    number: 'B',
    title: 'GrowthTech e Content Operations',
    text: 'Sistemas multiagente para pesquisa, estratégia, copy, criativos, campanhas e produção de conteúdo com aprovação humana.',
    related: 'Nitrox Intelligence · operação de e-commerce · Hermes',
  },
  {
    number: 'C',
    title: 'Produto e Internal Tools',
    text: 'MVPs, aplicações e automações que conectam fluxo de usuário, dados e operação interna.',
    related: 'FluvOS · SaUvia · AI COWORK',
  },
];

export const experience = [
  {
    period: '2026 — atual',
    company: 'Vertical Partners / Vertical Estate',
    role: 'Fundador e AI Product & Automation Engineer',
    description:
      'Criação de produtos e agentes de IA para a operação comercial do mercado imobiliário. Atuação em produto, CRM, conversas omnichannel, integrações, recomendação de imóveis, backend e evolução da plataforma.',
  },
  {
    period: '2025 — 2026',
    company: 'Vision AI / IA Four Sales',
    role: 'AI Automation Engineer e fundador de produto',
    description:
      'Construção de agentes e automações para SDR, vendas por WhatsApp, social selling, prospecção, follow-up e CRM. IA Four Sales foi desenvolvido como SaaS e continuou com um sócio após minha saída da operação.',
  },
  {
    period: '2021 — 2024',
    company: 'Nitrox Intelligence',
    role: 'Fundador, estrategista e desenvolvedor',
    description:
      'Agência full service com atuação em estratégia, copy, tráfego pago, páginas, funis, design, código e automações em Python. A experiência consolidou minha capacidade de conectar implementação técnica a problemas comerciais.',
  },
  {
    period: '2020 — 2021',
    company: 'Axtro Digital',
    role: 'Desenvolvedor e designer',
    description:
      'Atuação em Florianópolis combinando desenvolvimento, design gráfico e edição de vídeo, com software como função principal.',
  },
];

export const resume = {
  summary:
    'AI Product & Automation Engineer com trajetória em desenvolvimento de software, produto, design e operações digitais. Constrói MVPs, agentes e automações aplicadas a vendas, produtividade, saúde e operações internas, conectando Python, APIs, SQL, bancos de dados e interfaces. Usa Codex e Claude Code para acelerar desenvolvimento full stack, mantendo sob sua responsabilidade arquitetura, revisão, testes, documentação e handoff para engenharia.',
  experience: [
    {
      ...experience[0],
      location: 'Recife/remoto',
      bullets: [
        'Criou uma plataforma de IA aplicada à operação comercial imobiliária, conectando CRM, conversas omnichannel, dados de imóveis e agentes com ferramentas reais.',
        'Desenvolveu fluxos de atendimento, recomendação de imóveis, notas de pipeline e integrações com APIs, bancos de dados e serviços de mensageria.',
        'Atuou entre produto, arquitetura, backend e experiência do usuário, levando protótipos a sistemas operacionais e documentando sua evolução.',
      ],
    },
    {
      ...experience[1],
      location: 'Remoto',
      bullets: [
        'Construiu agentes de IA para SDR, vendas por WhatsApp, social selling, BDR e prospecção ativa e passiva em projetos da Vision AI.',
        'Desenvolveu a IA Four Sales como SaaS/CRM com agentes, funil, follow-ups e automações comerciais; a operação continuou com um sócio após sua saída.',
        'Criou MVPs e integrações para transformar estratégias comerciais em fluxos executáveis, com participação em implementação e continuidade técnica.',
      ],
    },
    {
      ...experience[2],
      location: 'Recife',
      bullets: [
        'Liderou uma agência full service responsável por estratégia, copy, tráfego pago, páginas de vendas, funis, design e implementação técnica.',
        'Desenvolveu aplicações e automações em Python para reduzir trabalho manual e conectar marketing, vendas e operação.',
        'Coordenou projetos do diagnóstico à entrega, combinando execução técnica, visão de produto e relacionamento com clientes.',
      ],
    },
    {
      ...experience[3],
      location: 'Florianópolis',
      bullets: [
        'Atuou principalmente em desenvolvimento de software, com contribuições complementares em design gráfico e edição de vídeo.',
        'Trabalhou na interseção entre implementação, comunicação visual e necessidades do produto.',
      ],
    },
  ],
  projects: [
    {
      name: 'FluvOS',
      title: 'Plataforma de produtividade com IA',
      description:
        'Produto mobile-first que combina tarefas, hábitos, foco, recompensas e recursos de IA. Atuação em produto, UI/UX, arquitetura e desenvolvimento AI-native do MVP e de suas evoluções, incluindo reorganização da base técnica para facilitar continuidade.',
    },
    {
      name: 'SaUvia',
      title: 'SaaS para médicos e pacientes',
      description:
        'MVP com experiências conectadas para acompanhamento profissional e registro do paciente. Responsável pelo produto, UI/UX e construção full stack assistida por agentes, seguida de handoff e apoio à equipe responsável pela finalização.',
    },
    {
      name: 'Vision Prospect',
      title: 'Prospecção B2B e B2C',
      description:
        'Aplicação criada para a operação da Vision AI. Responsável pelo 0→1 do MVP, incluindo produto, UI/UX e desenvolvimento full stack assistido por agentes; realizou handoff para desenvolvedor sênior e colaborou até a finalização.',
    },
  ],
  skills: [
    {
      label: 'Base técnica',
      value: 'Python · SQL · APIs REST · PostgreSQL/Supabase · system design · autenticação · integrações · Git · Docker/CI/CD operacional',
    },
    {
      label: 'IA aplicada',
      value: 'LLM APIs · agentes · tool calling · workflows · RAG/retrieval · prompts e contexto · human-in-the-loop · automação',
    },
    {
      label: 'Produto',
      value: 'discovery · definição de escopo · MVP 0→1 · UI/UX · documentação · handoff · trabalho com clientes',
    },
    {
      label: 'AI-native development',
      value: 'OpenAI Codex · Anthropic Claude Code · revisão de código gerado · decomposição de tarefas · validação de entregas',
    },
  ],
  education: {
    course: 'Análise e Desenvolvimento de Sistemas',
    institution: 'UniFBV',
    period: '2017–2020',
    note: 'Trajetória acadêmica complementada por estudo autodidata e aplicação prática.',
  },
  languages: [
    { language: 'Português', level: 'Nativo' },
    { language: 'Inglês', level: 'Básico, em desenvolvimento' },
  ],
};
