export const profile = {
  name: 'Mateus Paz',
  role: 'AI Product & Automation Engineer',
  location: 'Recife, Pernambuco',
  workModel: 'Remoto · PJ',
  email: 'matspaz.dev@gmail.com',
  github: 'https://github.com/nitroxinteligence',
  linkedin: 'https://www.linkedin.com/in/mateus-paz-6206a5413/',
  portfolio: 'https://crl.falamateus.com.br',
};

export const navigation = [
  { label: 'Trabalho', href: '#trabalho' },
  { label: 'Como trabalho', href: '#metodo' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Currículo', href: '/curriculo/' },
  { label: 'Contato', href: '#contato' },
];

export const compactNavigation = [
  { label: 'Trabalho', href: '#trabalho' },
  { label: 'Método', href: '#metodo' },
  { label: 'CV', href: '/curriculo/' },
  { label: 'Contato', href: '#contato' },
];

export const workflow = [
  {
    id: 'problema',
    label: 'Problema',
    title: 'Entender o trabalho antes de propor tecnologia',
    description:
      'Eu observo quem usa o processo, onde ele trava, quais dados existem e o que precisa mudar na prática.',
  },
  {
    id: 'arquitetura',
    label: 'Arquitetura',
    title: 'Dar forma ao sistema',
    description:
      'Defino fluxos, estados, ferramentas, limites, aprovações humanas e critérios de aceite.',
  },
  {
    id: 'mvp',
    label: 'MVP',
    title: 'Construir o primeiro sistema útil',
    description:
      'Uso agentes de código para ganhar velocidade, mas mantenho as decisões técnicas e o escopo sob minha responsabilidade.',
  },
  {
    id: 'validacao',
    label: 'Validação',
    title: 'Testar o que realmente foi construído',
    description:
      'Reviso o código, testo os fluxos e verifico o comportamento no ambiente em que o produto será usado.',
  },
  {
    id: 'handoff',
    label: 'Handoff',
    title: 'Deixar a próxima equipe pronta para continuar',
    description:
      'Organizo decisões, documentação, limites conhecidos e próximos passos para reduzir a dependência do autor do MVP.',
  },
];

export const pillars = [
  {
    title: 'Produto desde o início',
    text: 'Transformo requisitos espalhados em escopo, fluxo, interface e um MVP que pode ser testado por pessoas reais.',
  },
  {
    title: 'Agentes dentro do processo',
    text: 'Conecto contexto, ferramentas, dados, estados e aprovações humanas para a IA trabalhar dentro de uma operação existente.',
  },
  {
    title: 'Backend e integrações',
    text: 'Trabalho com Python, APIs, SQL, bancos de dados, autenticação e serviços que ligam o produto à operação.',
  },
  {
    title: 'Continuidade técnica',
    text: 'Registro decisões e limites para que outra pessoa consiga entender, revisar e evoluir o sistema.',
  },
];

export const selectedWork = {
  fluvos: {
    name: 'FluvOS',
    category: 'Produtividade · App e WhatsApp · IA aplicada',
    status: 'MVP funcional · Produto em evolução',
    title: 'Produtividade no app e no WhatsApp, dentro da mesma rotina.',
    summary:
      'FluvOS reúne tarefas, hábitos, sessões de foco, recompensas e recursos de IA em uma experiência mobile first. O produto também tem um agente de IA no WhatsApp, disponível 24 horas por dia para ajudar o usuário a organizar agenda, tarefas e rotina em tempo real.',
    role: 'Produto, UI/UX, arquitetura e desenvolvimento do MVP com agentes de código.',
    problem:
      'Quem tenta organizar a rotina costuma espalhar tarefas, hábitos, agenda e foco entre ferramentas diferentes. O FluvOS nasceu para reunir esse trabalho em um fluxo só, com acesso pelo app ou pelo WhatsApp.',
    built: [
      'fluxos mobile para tarefas, hábitos, foco e recompensas;',
      'estrutura de dados para o núcleo operacional do produto;',
      'agente de IA no WhatsApp para organização e acompanhamento em tempo real;',
      'integrações, documentação e base técnica para a continuidade do projeto.',
    ],
    stack:
      'Next.js · React · TypeScript com desenvolvimento assistido por agentes · Supabase/PostgreSQL · Capacitor · APIs · GitHub Actions',
    result:
      'MVP funcional e produto em evolução, com uma base técnica reorganizada para facilitar manutenção e continuidade.',
  },
  supporting: [
    {
      name: 'SaUvia',
      category: 'HealthTech · Médicos e pacientes · MVP',
      status: 'MVP aprovado · Handoff concluído',
      title: 'Um produto com experiências conectadas para paciente e profissional.',
      summary:
        'Fui responsável por produto, UI/UX e construção do MVP com agentes de código. Depois preparei o handoff e acompanhei a equipe que assumiu a finalização.',
      result: 'MVP aprovado e transferido para continuidade técnica.',
      availability: 'O case completo depende de imagens e documentação autorizadas.',
    },
    {
      name: 'Vision Prospect',
      category: 'SalesTech · Prospecção B2B e B2C · MVP',
      status: 'MVP aprovado · Handoff concluído',
      title: 'Uma estratégia comercial transformada em produto operável.',
      summary:
        'Estruturei o produto desde o primeiro fluxo, desenhei a experiência e construí o MVP full stack com apoio de agentes. O trabalho seguiu com handoff e colaboração junto ao desenvolvedor responsável pela finalização.',
      result: 'MVP aprovado, entregue e continuado por uma equipe técnica.',
      availability: 'O case completo depende de imagens e documentação autorizadas.',
    },
  ],
};

export const verticalEstate = {
  name: 'Vertical Estate',
  context: 'Produto em operação no mercado imobiliário',
  title: 'Agentes conectados a ferramentas, dados e decisões humanas.',
  text:
    'Trabalho na evolução de um produto que conecta CRM, conversas omnichannel, recomendação de imóveis, backend e integrações. A IA executa tarefas dentro de regras claras, com revisão humana nos pontos sensíveis.',
  result:
    'É um trabalho contínuo de produto e operação. Volumes, clientes e métricas permanecem confidenciais.',
  nodes: [
    { label: 'Canais', detail: 'Conversas e eventos operacionais' },
    { label: 'Agentes', detail: 'Contexto, regras e uso de ferramentas' },
    { label: 'Ferramentas', detail: 'Busca, agenda, CRM e mensageria' },
    { label: 'Dados', detail: 'Imóveis, contatos e estado do funil' },
    { label: 'Humano', detail: 'Revisão, exceções e decisão final' },
  ],
};

export const method = [
  {
    number: '01',
    title: 'Entendo o processo',
    text: 'Converso com as pessoas envolvidas, observo a operação e separo o problema real da primeira solução que apareceu.',
  },
  {
    number: '02',
    title: 'Defino o sistema',
    text: 'Transformo o contexto em fluxos, contratos, estados, limites e critérios de aceite.',
  },
  {
    number: '03',
    title: 'Organizo a execução',
    text: 'Quebro o trabalho em partes verificáveis e uso agentes para acelerar pesquisa, implementação e documentação.',
  },
  {
    number: '04',
    title: 'Reviso o resultado',
    text: 'Questiono arquitetura, dependências, segurança e legibilidade. Se a saída está errada, corrijo o código ou a especificação.',
  },
  {
    number: '05',
    title: 'Testo no ambiente real',
    text: 'Verifico fluxos, integrações e comportamento observável. Uma resposta convincente do modelo não prova que o sistema funciona.',
  },
  {
    number: '06',
    title: 'Preparo o handoff',
    text: 'Entrego contexto, decisões, documentação e próximos passos para a equipe continuar com autonomia.',
  },
];

export const domains = [
  {
    title: 'Revenue Operations e SalesTech',
    text: 'Agentes e sistemas para SDR, social selling, prospecção, vendas por WhatsApp, follow-up, CRM e organização do processo comercial.',
    related: 'Vision AI · IA Four Sales · Vision Prospect · Vertical Estate',
  },
  {
    title: 'GrowthTech e operações de conteúdo',
    text: 'Sistemas com agentes para pesquisa, estratégia, copy, criativos, campanhas e produção de conteúdo com aprovação humana.',
    related: 'Nitrox Intelligence · operação de e-commerce · Hermes',
  },
  {
    title: 'Produto e ferramentas internas',
    text: 'MVPs, aplicações e automações que conectam experiência do usuário, dados e operação interna.',
    related: 'FluvOS · SaUvia · AI COWORK',
  },
];

export const experience = [
  {
    period: '2026 até o momento',
    company: 'Vertical Partners / Vertical Estate',
    role: 'Fundador e AI Product & Automation Engineer',
    description:
      'Crio produtos e agentes de IA para a operação comercial imobiliária. O trabalho passa por produto, CRM, conversas omnichannel, integrações, recomendação de imóveis e backend.',
  },
  {
    period: '2025 a 2026',
    company: 'Vision AI / IA Four Sales',
    role: 'AI Automation Engineer e fundador de produto',
    description:
      'Construí agentes e automações para SDR, vendas por WhatsApp, social selling, prospecção, follow-up e CRM. A IA Four Sales seguiu com um sócio depois da minha saída da operação.',
  },
  {
    period: '2021 a 2024',
    company: 'Nitrox Intelligence',
    role: 'Fundador, estrategista e desenvolvedor',
    description:
      'Liderei uma agência que reunia estratégia, copy, tráfego pago, páginas, funis, design, código e automações em Python. Também conduzi pessoas, clientes e entregas em diferentes frentes ao mesmo tempo.',
  },
  {
    period: '2020 a 2021',
    company: 'Axtro Digital',
    role: 'Desenvolvedor e designer',
    description:
      'Trabalhei em Florianópolis principalmente com desenvolvimento, além de contribuir com design gráfico e edição de vídeo.',
  },
];

export const resume = {
  summary:
    'AI Product & Automation Engineer com experiência em software, produto, design e operações digitais. Constrói MVPs, agentes e automações para vendas, produtividade, saúde e processos internos. Trabalha com Python, APIs, SQL, bancos de dados e interfaces. Usa Codex e Claude Code para acelerar o desenvolvimento, mantendo sob sua responsabilidade arquitetura, revisão, testes, documentação e handoff.',
  experience: [
    {
      ...experience[0],
      location: 'Recife e remoto',
      bullets: [
        'Criou uma plataforma de IA para a operação comercial imobiliária, conectando CRM, conversas, dados de imóveis e agentes com ferramentas reais.',
        'Desenvolveu fluxos de atendimento, recomendação de imóveis, notas de pipeline e integrações com APIs, bancos de dados e mensageria.',
        'Atua entre produto, arquitetura, backend e experiência do usuário, com documentação contínua das decisões e da evolução do sistema.',
      ],
    },
    {
      ...experience[1],
      location: 'Remoto',
      bullets: [
        'Construiu agentes de IA para SDR, vendas por WhatsApp, social selling, BDR e prospecção ativa e passiva.',
        'Desenvolveu a IA Four Sales como SaaS e CRM com agentes, funil, follow-ups e automações comerciais.',
        'Criou MVPs e integrações, preparou handoffs e colaborou com desenvolvedores responsáveis pela continuidade.',
      ],
    },
    {
      ...experience[2],
      location: 'Recife',
      bullets: [
        'Liderou uma agência com atuação em estratégia, copy, tráfego pago, páginas de vendas, funis, design e implementação técnica.',
        'Desenvolveu aplicações e automações em Python para reduzir trabalho manual e conectar marketing, vendas e operação.',
        'Liderou equipes, conduziu clientes e coordenou projetos desde o diagnóstico até a entrega.',
      ],
    },
    {
      ...experience[3],
      location: 'Florianópolis',
      bullets: [
        'Atuou principalmente em desenvolvimento de software, com contribuições em design gráfico e edição de vídeo.',
        'Trabalhou perto das áreas de produto e comunicação visual para transformar necessidades em entregas.',
      ],
    },
  ],
  projects: [
    {
      name: 'FluvOS',
      title: 'Produtividade com IA no app e no WhatsApp',
      description:
        'Produto mobile first que combina tarefas, hábitos, foco, recompensas e um agente de IA no WhatsApp disponível 24 horas por dia. Atuação em produto, UI/UX, arquitetura e desenvolvimento do MVP com agentes de código.',
    },
    {
      name: 'SaUvia',
      title: 'SaaS para médicos e pacientes',
      description:
        'MVP com experiências conectadas para acompanhamento profissional e registro do paciente. Responsável pelo produto, UI/UX, construção full stack assistida e handoff para a equipe que seguiu com o projeto.',
    },
    {
      name: 'Vision Prospect',
      title: 'Prospecção B2B e B2C',
      description:
        'Aplicação criada para a operação da Vision AI. Responsável pelo primeiro MVP, incluindo produto, UI/UX e desenvolvimento full stack assistido por agentes.',
    },
  ],
  skills: [
    {
      label: 'Base técnica',
      value: 'Python · SQL · APIs REST · PostgreSQL/Supabase · system design · autenticação · integrações · Git · Docker · CI/CD operacional',
    },
    {
      label: 'IA aplicada',
      value: 'LLM APIs · agentes · uso de ferramentas · workflows · RAG e retrieval · contexto · human in the loop · automação',
    },
    {
      label: 'Produto',
      value: 'discovery · definição de escopo · MVP desde o início · UI/UX · documentação · handoff · trabalho com clientes',
    },
    {
      label: 'Liderança e execução',
      value: 'liderança de equipes · comunicação com clientes · aprendizado autodidata · proatividade · decisão objetiva · busca ativa de referências e oportunidades',
    },
    {
      label: 'Desenvolvimento com agentes',
      value: 'OpenAI Codex · Anthropic Claude Code · revisão de código gerado · decomposição de tarefas · validação de entregas',
    },
  ],
  education: {
    course: 'Análise e Desenvolvimento de Sistemas',
    institution: 'UniFBV',
    period: '2017 a 2020',
    note: 'Trajetória acadêmica complementada por estudo autodidata e aplicação prática.',
  },
  languages: [
    { language: 'Português', level: 'Nativo' },
    { language: 'Inglês', level: 'Básico, em desenvolvimento' },
  ],
};
