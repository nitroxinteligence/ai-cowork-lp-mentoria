import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleDot,
  Clock3,
  PanelsTopLeft,
  Play,
  RefreshCcw,
  ShieldCheck,
  Target,
  UserCog,
  Users,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const sessions = [
  {
    code: 'S1',
    date: '05 SET',
    title: 'Da conversa solta à direção profissional',
    body: 'Você entende o que a IA já consegue fazer, aprende a escolher o modo certo para cada trabalho e começa a dirigir com objetivo, contexto, critérios e limites.',
    icon: Target,
  },
  {
    code: 'S2',
    date: '12 SET',
    title: 'Especialistas digitais',
    body: 'Você aprende a configurar papéis com função, competência, fontes, processo e padrão de qualidade ligados ao seu trabalho real.',
    icon: UserCog,
  },
  {
    code: 'S3',
    date: '19 SET',
    title: 'Time digital e produção em cadeia',
    body: 'Você coordena especialistas para que pesquisa, análise, estratégia, criação e revisão deixem de acontecer em conversas desconectadas.',
    icon: Workflow,
  },
  {
    code: 'S4',
    date: '26 SET',
    title: 'Automação e delegação',
    body: 'Você diferencia automação comum, etapa com IA e agente. Também aprende a conectar tarefas recorrentes a ferramentas autorizadas.',
    icon: Zap,
  },
  {
    code: 'S5',
    date: '03 OUT',
    title: 'Construção com IA',
    body: 'Você cria uma página, apresentação, dashboard, protótipo, calculadora, pequeno aplicativo ou outro ativo útil e entende os limites.',
    icon: PanelsTopLeft,
  },
  {
    code: 'S6',
    date: '10 OUT',
    title: 'Seu sistema AI COWORK',
    body: 'Você organiza especialistas, fluxos e ativos, define o que pode ser assistido ou automatizado e sai com um plano de expansão.',
    icon: RefreshCcw,
  },
];

const trajectory = [
  {
    period: 'Origem',
    title: 'Olinda, Pernambuco',
    body: 'Nasci em uma família de poucos recursos. Foi ali que persistência, disciplina e responsabilidade deixaram de ser discurso e se tornaram condição para avançar.',
  },
  {
    period: 'Aos 16 anos',
    title: 'Design, vídeo e código',
    body: 'Comecei criando peças, editando vídeos e desenvolvendo pequenos códigos. Aprendi de forma autodidata, por cursos, projetos próprios e repetição prática.',
  },
  {
    period: 'Aos 21 anos',
    title: 'Mercado digital em Florianópolis',
    body: 'Mudei de Olinda para trabalhar em uma agência de lançamentos. Em quatro meses intensos, participei de operações com grandes especialistas e entendi como estratégia, comunicação e execução se conectam.',
  },
  {
    period: 'Na volta',
    title: 'Agência, equipe e desenvolvimento',
    body: 'De volta a Pernambuco, abri uma agência full service e formei uma equipe. Ao mesmo tempo, aprofundei meus estudos em software, trabalhei por um ano e meio como desenvolvedor e continuei construindo projetos como freelancer.',
  },
  {
    period: 'A virada',
    title: 'IA antes do mercado amadurecer',
    body: 'Comecei com as primeiras versões do ChatGPT, avancei para Claude e agentes de código. Na Formação Lendária, aprofundei o método e fechei um projeto de R$ 18 mil para construir um time de agentes de IA para uma operação americana.',
  },
  {
    period: 'Hoje',
    title: 'De projetos reais ao AI COWORK',
    body: 'Depois de criar agentes, sistemas, softwares e operações comerciais com IA em projetos próprios, na Vertical Partners e na Vertical Estate, reuni essa experiência em uma mentoria para ensinar outras pessoas a construir capacidade real com IA.',
  },
];

const cohortDates = [
  { day: '05', month: 'SET', code: 'S1' },
  { day: '12', month: 'SET', code: 'S2' },
  { day: '19', month: 'SET', code: 'S3' },
  { day: '26', month: 'SET', code: 'S4' },
  { day: '03', month: 'OUT', code: 'S5' },
  { day: '10', month: 'OUT', code: 'S6' },
];

const faqs = [
  {
    question: 'Preciso saber programar?',
    answer: 'Não. O trabalho começa em linguagem natural, com processos bem descritos, contexto e critérios. Quando uma aplicação exigir código, você aprenderá a dirigir ferramentas de construção com IA e a reconhecer quando é necessário envolver um profissional técnico.',
  },
  {
    question: 'Já uso ChatGPT ou Claude. O que será diferente?',
    answer: 'A mentoria não ensina apenas a conversar melhor com um modelo. Você aprenderá a estruturar contexto, construir especialistas digitais, coordenar etapas, criar skills, automatizar tarefas possíveis e revisar o resultado com responsabilidade.',
  },
  {
    question: 'A mentoria serve para a minha área?',
    answer: 'A arquitetura é transversal e parte do seu trabalho real. As aplicações mudam conforme sua função, seus dados, os riscos envolvidos e as ferramentas autorizadas pela sua empresa.',
  },
  {
    question: 'Vou sair com tudo automatizado?',
    answer: 'Não. Você sairá com uma operação pessoal mais estruturada, especialistas digitais, padrões de trabalho e ao menos um fluxo aplicável quando houver viabilidade técnica e segurança. Processos críticos podem exigir TI, permissões e governança.',
  },
  {
    question: 'Como funcionam os encontros e as gravações?',
    answer: 'Serão seis encontros ao vivo pelo Google Meet, com duas horas cada, realizados semanalmente entre 5 de setembro e 10 de outubro. As gravações ficarão disponíveis por um ano. Se você perder um encontro, deverá acompanhar a gravação antes da sessão seguinte.',
  },
  {
    question: 'Haverá acompanhamento entre os encontros?',
    answer: 'Sim. A turma terá um grupo aberto no WhatsApp para comunicados, dúvidas livres e acompanhamento mais próximo durante o percurso.',
  },
  {
    question: 'O Mateus construirá tudo por mim?',
    answer: 'Não. Eu vou ensinar, demonstrar, orientar e corrigir. A proposta é que você aprenda a dirigir e manter sua própria estrutura de trabalho com IA, em vez de depender de uma operação feita por terceiros.',
  },
  {
    question: 'Como funcionam candidatura, investimento e garantia?',
    answer: 'As candidaturas ficam abertas até 30 de agosto. Depois da análise, os perfis aderentes serão chamados no WhatsApp para conhecer o investimento e as condições. A participação será formalizada por contrato, com certificado e garantia de sete dias.',
  },
];

const capabilities = [
  { label: 'dirigir a IA com objetivo, contexto, critérios e limites claros', icon: Target },
  { label: 'criar especialistas digitais adaptados ao seu trabalho', icon: UserCog },
  { label: 'combinar pesquisa, análise, estratégia, criação e revisão em um fluxo', icon: Workflow },
  { label: 'automatizar tarefas e etapas manuais quando isso for viável e seguro', icon: Zap },
  { label: 'criar páginas, apresentações, relatórios, dashboards e protótipos', icon: PanelsTopLeft },
  { label: 'revisar fatos, qualidade, riscos e decisões antes de usar o resultado', icon: ShieldCheck },
  { label: 'registrar aprendizados para o sistema melhorar em vez de recomeçar', icon: RefreshCcw },
];

const steps = [
  {
    label: 'Você',
    fields: [
      { name: 'name', label: 'Nome completo', type: 'text', autoComplete: 'name', placeholder: 'Ex.: Ana Carolina Souza' },
      { name: 'whatsapp', label: 'WhatsApp', type: 'tel', autoComplete: 'tel', inputMode: 'tel', mask: 'phoneBR', maxLength: 15, placeholder: '(81) 99999-9999' },
      { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email', inputMode: 'email', placeholder: 'voce@empresa.com.br' },
      { name: 'role', label: 'Cargo e área de atuação', type: 'text', autoComplete: 'organization-title', placeholder: 'Ex.: Gerente de Marketing' },
      { name: 'company', label: 'Em qual empresa você trabalha?', type: 'text', autoComplete: 'organization', placeholder: 'Ex.: Nome da empresa' },
    ],
  },
  {
    label: 'Seu objetivo',
    fields: [
      {
        name: 'capacity',
        label: 'Qual capacidade gostaria de desenvolver primeiro?',
        type: 'radio',
        options: ['Pesquisar e analisar', 'Criar', 'Automatizar', 'Construir', 'Dirigir especialistas digitais'],
      },
      { name: 'outcome', label: 'O que você gostaria de conseguir fazer ao final dos dois meses?', type: 'textarea', placeholder: 'Ex.: estruturar um fluxo de pesquisa e análise para decisões estratégicas.' },
    ],
  },
  {
    label: 'Compromisso',
    fields: [
      {
        name: 'time',
        label: 'Quanto tempo por semana você consegue dedicar à prática?',
        type: 'radio',
        options: ['Até 2 horas', 'De 2 a 4 horas', 'Mais de 4 horas'],
      },
      {
        name: 'investment',
        label: 'Caso sua candidatura seja aprovada, você está preparado para investir em uma mentoria profissional?',
        type: 'radio',
        options: ['Sim', 'Preciso entender as condições', 'Não neste momento'],
      },
      { name: 'referral', label: 'Quem indicou você ou como conheceu o AI COWORK?', type: 'text', placeholder: 'Ex.: indicação, LinkedIn, Instagram ou evento' },
    ],
  },
];

function formatBrazilianPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (!digits) return '';
  if (digits.length < 3) return `(${digits}`;

  const areaCode = digits.slice(0, 2);
  const localNumber = digits.slice(2);
  const prefixLength = localNumber.length > 8 ? 5 : 4;
  const prefix = localNumber.slice(0, prefixLength);
  const suffix = localNumber.slice(prefixLength);

  return `(${areaCode}) ${prefix}${suffix ? `-${suffix}` : ''}`;
}

function App() {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [floatingNavVisible, setFloatingNavVisible] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setApplicationOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = applicationOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [applicationOpen]);

  useEffect(() => {
    const updateFloatingNav = () => {
      const hero = document.getElementById('inicio');
      if (!hero) return;
      setFloatingNavVisible(window.scrollY >= hero.offsetHeight - 120);
    };

    updateFloatingNav();
    window.addEventListener('scroll', updateFloatingNav, { passive: true });
    window.addEventListener('resize', updateFloatingNav);
    return () => {
      window.removeEventListener('scroll', updateFloatingNav);
      window.removeEventListener('resize', updateFloatingNav);
    };
  }, []);

  const openApplication = () => {
    setSubmitted(false);
    setApplicationOpen(true);
  };

  return (
    <div className="site-shell">
      <Hero onApply={openApplication} />
      <AnimatePresence>
        {floatingNavVisible && <FloatingNav onApply={openApplication} />}
      </AnimatePresence>
      <main>
        <TrajectorySection />
        <ChangeDetailsSection onApply={openApplication} />
        <ExperienceSection onApply={openApplication} />
        <AboutSection />
        <ApplicationSection onApply={openApplication} />
        <FAQSection />
      </main>
      <Footer />
      <AnimatePresence>
        {applicationOpen && (
          <ApplicationModal
            submitted={submitted}
            onSubmitted={() => setSubmitted(true)}
            onClose={() => setApplicationOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingNav({ onApply }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.nav
      className="floating-nav"
      aria-label="Navegação flutuante"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
    >
      <BrandLogo compact className="floating-nav__brand" href="#inicio" />
      <div className="floating-nav__links">
        <a href="#trajetoria">Minha trajetória</a>
        <a href="#experiencia">A turma</a>
        <a href="#mateus">Quem conduz</a>
      </div>
      <button type="button" onClick={onApply}>Candidatar-me</button>
    </motion.nav>
  );
}

function BrandLogo({ compact = false, className = '', href }) {
  const classes = [
    'brand-logo',
    compact ? 'brand-logo--compact' : '',
    className,
  ].filter(Boolean).join(' ');

  const logo = (
    <img
      src="/brand/ai-cowork-logo.webp?v=2"
      alt="AI COWORK"
      width="425"
      height="84"
    />
  );

  if (href) {
    return <a className={classes} href={href} aria-label="AI COWORK — voltar ao início">{logo}</a>;
  }

  return <div className={classes}>{logo}</div>;
}

function CTA({ children = 'Quero me candidatar', variant = 'light', onClick }) {
  return (
    <button className={`cta cta--${variant}`} onClick={onClick} type="button">
      <span>{children}</span>
      <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
    </button>
  );
}

function Hero({ onApply }) {
  const reduceMotion = useReducedMotion();

  return (
    <header className="hero" id="inicio">
      <div className="hero__content container">
        <motion.div
          className="hero__copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <BrandLogo className="hero__brand" />
          <h1><span className="mesh-text mesh-text--on-dark">Aprenda a usar IA de verdade</span> e de forma profissional.</h1>
          <p className="hero__lead">
            Pare de improvisar com ChatGPT e Claude. No AI COWORK, eu vou ensinar você a dirigir especialistas digitais, automatizar trabalho manual e ampliar o que consegue pesquisar, analisar, criar e executar com IA.
          </p>
          <div className="hero__actions">
            <CTA variant="mesh" onClick={onApply} />
          </div>
          <p className="hero__note">Candidaturas abertas até 30 de agosto.</p>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="video-placeholder" id="video">
            <button className="play-button" type="button" aria-label="Vídeo de apresentação ainda será inserido">
              <Play size={24} fill="currentColor" />
            </button>
          </div>
          <div className="hero__facts" aria-label="Informações da primeira turma">
            <span><Clock3 size={17} /> 6 encontros em 2 meses</span>
            <span><Users size={17} /> 15 vagas</span>
            <span><CircleDot size={17} /> Início em setembro</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

function TrajectorySection() {
  return (
    <section className="section section--trajectory" id="trajetoria">
      <div className="container trajectory-intro">
        <div className="section-heading section-heading--wide">
          <p className="section-index">Antes de tudo, você precisa me conhecer melhor...</p>
          <h2>Eu não cheguei até a IA por uma ferramenta. <span className="mesh-text">Cheguei por anos transformando ideias em trabalho real.</span></h2>
        </div>
        <div className="trajectory-intro__text prose">
          <p>Eu sou Mateus Paz, especialista em IA. Minha trajetória começou no Nordeste, passou por design, audiovisual, lançamentos, marketing, desenvolvimento de software e construção de empresas.</p>
          <p>Cada etapa me ensinou a mesma coisa: tecnologia só cria valor quando existe direção, execução e responsabilidade sobre o resultado.</p>
        </div>
      </div>
      <div className="container trajectory-layout">
        <div className="trajectory-photo">
          <img
            src="/images/mateus-paz-palestra-v2.webp"
            alt="Mateus Paz apresentando uma palestra sobre operação profissional com IA"
            loading="lazy"
            decoding="async"
          />
        </div>
        <ol className="trajectory-list">
          {trajectory.map((item) => (
            <li key={`${item.period}-${item.title}`}>
              <span className="trajectory-list__period">{item.period}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ChangeDetailsSection({ onApply }) {
  return (
    <>
      <section className="section section--change section--change-details">
        <div className="container">
          <div className="capabilities">
            <div className="capabilities__intro">
              <h3>O que você vai <span className="mesh-text">aprender a fazer</span></h3>
              <p>A IA deixa de ser uma janela onde você faz perguntas e passa a funcionar como uma estrutura de trabalho sob sua direção.</p>
              <CTA variant="blue" onClick={onApply}>Quero aprender a operar IA</CTA>
            </div>
            <ol className="capability-list">
              {capabilities.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <span className="capability-list__icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <p>{label}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <ExperienceSectionBoundary />
    </>
  );
}

function WorkModesSection() {
  return (
    <section className="section work-modes" aria-label="Comparação entre uso improvisado e operação profissional de IA">
      <div className="container">
        <div className="work-modes__grid">
          <ImprovisedUseGraph />
          <ProfessionalOperationGraph />
        </div>
      </div>
    </section>
  );
}

function ImprovisedUseGraph() {
  return (
    <figure className="work-graph work-graph--improvised">
      <figcaption className="work-graph__heading">
        <div>
          <span className="work-graph__number">01</span>
          <h3>Uso improvisado</h3>
          <p>Conversas isoladas que reiniciam a cada demanda.</p>
        </div>
        <span className="work-graph__status"><i aria-hidden="true" /> contexto se perde</span>
      </figcaption>

      <div className="work-graph__canvas">
        <svg viewBox="0 0 560 360" role="img" aria-labelledby="improvised-graph-title improvised-graph-description">
          <title id="improvised-graph-title">Gráfico de uso improvisado de IA</title>
          <desc id="improvised-graph-description">Duas conversas separadas seguem de demanda para pergunta e resposta. Entre elas, o contexto é descartado e o trabalho recomeça.</desc>
          <defs>
            <linearGradient id="improvised-node-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#101722" />
              <stop offset="1" stopColor="#080c12" />
            </linearGradient>
          </defs>

          <g className="work-graph__grid-lines" aria-hidden="true">
            <path d="M24 132H536M24 228H536" />
            <path d="M184 24V336M376 24V336" />
          </g>

          <g className="work-graph__conversation">
            <text className="work-graph__lane-label" x="30" y="38">CONVERSA 01</text>
            <path className="work-graph__edge work-graph__edge--muted" d="M145 82H220M335 82H415" />
            <path className="work-graph__edge work-graph__edge--signal" d="M145 82H220M335 82H415" />
            <rect className="work-graph__node" x="30" y="54" width="115" height="56" rx="10" />
            <rect className="work-graph__node" x="220" y="54" width="115" height="56" rx="10" />
            <rect className="work-graph__node" x="415" y="54" width="115" height="56" rx="10" />
            <text className="work-graph__node-text" x="87.5" y="87">demanda</text>
            <text className="work-graph__node-text" x="277.5" y="87">pergunta</text>
            <text className="work-graph__node-text" x="472.5" y="87">resposta</text>
          </g>

          <path className="work-graph__reset-line" d="M472 112C472 154 88 154 88 220" />
          <g className="work-graph__reset-label">
            <rect x="205" y="152" width="150" height="38" rx="19" />
            <text x="280" y="176">contexto descartado</text>
          </g>

          <g className="work-graph__conversation work-graph__conversation--second">
            <text className="work-graph__lane-label" x="30" y="242">CONVERSA 02</text>
            <path className="work-graph__edge work-graph__edge--muted" d="M145 286H220M335 286H415" />
            <path className="work-graph__edge work-graph__edge--signal" d="M145 286H220M335 286H415" />
            <rect className="work-graph__node" x="30" y="258" width="115" height="56" rx="10" />
            <rect className="work-graph__node" x="220" y="258" width="115" height="56" rx="10" />
            <rect className="work-graph__node" x="415" y="258" width="115" height="56" rx="10" />
            <text className="work-graph__node-text" x="87.5" y="291">nova demanda</text>
            <text className="work-graph__node-text" x="277.5" y="291">outro chat</text>
            <text className="work-graph__node-text" x="472.5" y="291">nova resposta</text>
          </g>
        </svg>
      </div>

      <div className="work-graph__result">
        <span>Memória operacional</span>
        <strong>não acumula</strong>
      </div>
    </figure>
  );
}

function ProfessionalOperationGraph() {
  return (
    <figure className="work-graph work-graph--professional">
      <figcaption className="work-graph__heading">
        <div>
          <span className="work-graph__number">02</span>
          <h3>Operação profissional</h3>
          <p>Um sistema dirigido, conectado e cumulativo.</p>
        </div>
        <span className="work-graph__status"><i aria-hidden="true" /> contexto permanece</span>
      </figcaption>

      <div className="work-graph__canvas">
        <svg viewBox="0 0 560 360" role="img" aria-labelledby="professional-graph-title professional-graph-description">
          <title id="professional-graph-title">Gráfico de operação profissional com IA</title>
          <desc id="professional-graph-description">Você dirige o trabalho, fornece contexto a especialistas de pesquisa, análise e criação e revisa o resultado com crivo humano.</desc>
          <defs>
            <linearGradient id="professional-node-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#0d2f5b" />
              <stop offset="0.55" stopColor="#0a2343" />
              <stop offset="1" stopColor="#071528" />
            </linearGradient>
            <linearGradient id="professional-review-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#eaf4ff" />
              <stop offset="1" stopColor="#9edcf4" />
            </linearGradient>
          </defs>

          <g className="work-graph__grid-lines" aria-hidden="true">
            <path d="M24 132H536M24 228H536" />
            <path d="M140 24V336M306 24V336M446 24V336" />
          </g>

          <g className="work-graph__professional-edges" aria-hidden="true">
            <path className="work-graph__edge work-graph__edge--base" d="M130 180H165" />
            <path className="work-graph__edge work-graph__edge--base" d="M295 180C322 180 318 76 345 76M295 180H345M295 180C322 180 318 284 345 284" />
            <path className="work-graph__edge work-graph__edge--base" d="M455 76C482 76 474 180 490 180M455 180H490M455 284C482 284 474 180 490 180" />
          </g>
          <g className="work-graph__professional-signals" aria-hidden="true">
            <path className="work-graph__edge work-graph__edge--signal" d="M130 180H165" />
            <path className="work-graph__edge work-graph__edge--signal" d="M295 180C322 180 318 76 345 76M295 180H345M295 180C322 180 318 284 345 284" />
            <path className="work-graph__edge work-graph__edge--signal" d="M455 76C482 76 474 180 490 180M455 180H490M455 284C482 284 474 180 490 180" />
          </g>

          <g className="work-graph__professional-node work-graph__professional-node--direction">
            <rect x="20" y="143" width="110" height="74" rx="11" />
            <text className="work-graph__node-kicker" x="75" y="170">VOCÊ</text>
            <text className="work-graph__node-title" x="75" y="197">direção</text>
          </g>
          <g className="work-graph__professional-node work-graph__professional-node--context">
            <rect x="165" y="143" width="130" height="74" rx="11" />
            <text className="work-graph__node-title" x="230" y="174">contexto</text>
            <text className="work-graph__node-meta" x="230" y="197">fontes · critérios</text>
          </g>

          <g className="work-graph__specialist-node">
            <rect x="345" y="48" width="110" height="56" rx="10" />
            <text x="400" y="81">pesquisa</text>
          </g>
          <g className="work-graph__specialist-node">
            <rect x="345" y="152" width="110" height="56" rx="10" />
            <text x="400" y="185">análise</text>
          </g>
          <g className="work-graph__specialist-node">
            <rect x="345" y="256" width="110" height="56" rx="10" />
            <text x="400" y="289">criação</text>
          </g>

          <g className="work-graph__review-node">
            <rect x="490" y="143" width="50" height="74" rx="11" />
            <circle cx="515" cy="168" r="5" />
            <text x="515" y="190">crivo</text>
            <text x="515" y="206">humano</text>
          </g>
        </svg>
      </div>

      <div className="work-graph__result">
        <span>Contexto + critérios + revisão</span>
        <strong>capacidade acumulada</strong>
      </div>
    </figure>
  );
}

function ExperienceSectionBoundary() {
  return <div className="section-divider" aria-hidden="true" />;
}

function ExperienceSection({ onApply }) {
  return (
    <>
      <section className="section section--experience" id="experiencia">
        <div className="container experience-statement">
          <h2>Ferramenta muda. <span className="mesh-text">Saber dirigir o trabalho continua valendo.</span></h2>
        </div>
      </section>
      <CohortSection onApply={onApply} />
      <JourneySection />
    </>
  );
}

function CohortSection({ onApply }) {
  return (
    <section className="cohort-section" aria-labelledby="cohort-title">
      <div className="container cohort-section__content">
        <div className="cohort-section__heading">
          <div>
            <p className="cohort-badge">Primeira turma · setembro de 2026</p>
            <h2 id="cohort-title">
              <span>Uma turma pequena.</span>
              <span>Seis encontros.</span>
              <span className="mesh-text mesh-text--on-dark">Trabalho aplicado.</span>
            </h2>
          </div>
          <div className="cohort-section__summary">
            <p>Online, ao vivo e com apenas 15 vagas. Encontros semanais de duas horas para construir especialistas digitais, fluxos e uma operação pessoal de IA conectada ao seu trabalho real.</p>
            <dl>
              <div><dt>Onde</dt><dd>Google Meet</dd></div>
              <div><dt>Horário</dt><dd>A definir</dd></div>
              <div><dt>Candidaturas</dt><dd>Até 30 de agosto</dd></div>
            </dl>
          </div>
        </div>

        <div className="cohort-calendar" aria-label="Calendário dos seis encontros">
          {cohortDates.map((date, index) => (
            <div className={index === 0 ? 'cohort-date cohort-date--first' : 'cohort-date'} key={`${date.day}-${date.month}`}>
              <strong>{date.day}</strong>
              <span>{date.month} · {date.code}</span>
            </div>
          ))}
        </div>
        <div className="cohort-section__footer">
          <p>2 horas por encontro · online e ao vivo</p>
          <CTA variant="mesh" onClick={onApply}>Quero me candidatar</CTA>
        </div>
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section className="journey-section" aria-labelledby="journey-title">
      <div className="container journey-section__layout">
        <div className="journey-section__title">
          <h2 id="journey-title" className="mesh-text mesh-text--on-dark">O percurso</h2>
          <p>Uma progressão semanal: primeiro você aprende a dirigir. Depois, constrói, conecta e consolida sua própria operação.</p>
        </div>
        <ol className="journey-list">
          {sessions.map(({ code, date, title, body }) => (
            <li key={code}>
              <span>{code}</span>
              <div>
                <strong>{title}</strong>
                <small>{date}</small>
              </div>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section section--about" id="mateus">
      <div className="container about-grid">
        <div className="about-visual">
          <img
            className="about-visual__frame"
            src="/images/mateus-paz-estudio-v2.webp"
            alt="Retrato de Mateus Paz, especialista em inteligência artificial"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="about-copy">
          <p className="section-index">Quem conduz</p>
          <h2>Eu criei o <span className="mesh-text">AI COWORK</span> porque usar IA como uma caixa de respostas já ficou pequeno demais.</h2>
          <div className="prose prose--about">
            <p>Eu sou Mateus Paz, especialista em IA.</p>
            <p>No meu trabalho, eu uso IA para pesquisar, analisar dados, organizar conhecimento, criar conteúdo, construir agentes, automatizar tarefas e tirar produtos e sistemas do papel.</p>
            <p>Durante a primeira turma, eu vou abrir o meu processo, demonstrar o que já construí e explicar as decisões por trás de cada uso. Também vou mostrar onde a IA falha, quando uma automação não deveria rodar sozinha e por que o crivo humano ainda é a parte mais importante desse sistema.</p>
          </div>
          <div className="fit-grid">
            <div>
              <CheckCircle2 size={20} aria-hidden="true" />
              <h3>Faz sentido para você se...</h3>
              <p>Já usa ou experimentou IA, mas sente que ainda está improvisando e quer ampliar sua capacidade profissional.</p>
            </div>
            <div>
              <X size={20} aria-hidden="true" />
              <h3>Provavelmente não faz se...</h3>
              <p>Quer uma automação completa feita por mim, procura uma fórmula sem prática ou pretende ignorar segurança e critério.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApplicationSection({ onApply }) {
  return (
    <section className="section section--application" id="candidatura">
      <div className="container application-grid">
        <div>
          <p className="section-index">Candidatura</p>
          <h2>O <span className="mesh-text">primeiro cohort do AI COWORK</span> terá 15 vagas.</h2>
        </div>
        <div className="application-copy prose">
          <p>Escolhi uma turma pequena porque quero acompanhar de perto como cada participante está usando a IA, onde está travando e quais funções fazem mais sentido para o seu trabalho.</p>
          <p>Preencher o formulário não garante a vaga. Vamos analisar a aderência ao programa, a disponibilidade para participar e a composição da turma.</p>
          <p>Se sua candidatura fizer sentido, minha equipe entra em contato, explica o investimento e orienta os próximos passos.</p>
          <CTA variant="blue" onClick={onApply}>Quero enviar minha candidatura</CTA>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="section section--faq" id="faq">
      <div className="container faq-layout">
        <div className="faq-heading">
          <p className="section-index">Perguntas frequentes</p>
          <h2>O que você precisa saber antes de se candidatar.</h2>
          <p>Sem promessa mágica, sem dependência de uma ferramenta e sem automação no escuro.</p>
        </div>
        <div className="faq-list">
          {faqs.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__mesh" aria-hidden="true" />
      <div className="container footer__content">
        <BrandLogo href="#inicio" />
        <div className="footer__statement">
          <p className="mesh-text mesh-text--on-dark">IA trabalhando</p>
          <strong className="mesh-text mesh-text--on-dark">com você e para você.</strong>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© 2026 AI COWORK. Todos os direitos reservados.</span>
        <div className="footer__legal">
          <a href="#politica-de-privacidade">Política de Privacidade</a>
          <a href="#termos-de-uso">Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
}

function ApplicationModal({ onClose, onSubmitted, submitted }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const dialogRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const current = steps[step];

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  const update = (name, value) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    current.fields.forEach((field) => {
      if (!String(values[field.name] ?? '').trim()) nextErrors[field.name] = 'Responda este campo para continuar.';
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const next = (event) => {
    event.preventDefault();
    if (!validate()) return;
    setErrors({});
    setStep((currentStep) => Math.min(currentStep + 1, steps.length - 1));
  };

  const submit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmitted(values);
  };

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        className="application-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Candidatura para o AI COWORK"
        ref={dialogRef}
        tabIndex={-1}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.985 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.38 }}
      >
        <button className="modal-close" onClick={onClose} type="button" aria-label="Fechar candidatura">
          <X size={21} />
        </button>

        {submitted ? (
          <ThankYou onClose={onClose} />
        ) : (
          <form className="application-form" onSubmit={submit} noValidate>
              <div className="form-progress" aria-label={`Etapa ${step + 1} de ${steps.length}`}>
                <div className="form-progress__meta">
                  <span>Etapa {step + 1} de {steps.length}</span>
                  <strong>{current.label}</strong>
                </div>
                <div className="form-progress__track"><i style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  className="form-fields"
                  key={step}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -18 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  {current.fields.map((field) => (
                    <FormField
                      error={errors[field.name]}
                      field={field}
                      key={field.name}
                      onChange={(value) => update(field.name, value)}
                      value={values[field.name] ?? ''}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="form-actions">
                {step > 0 ? (
                  <button className="form-back" onClick={() => setStep((currentStep) => currentStep - 1)} type="button">
                    <ArrowLeft size={17} /> Voltar
                  </button>
                ) : <span />}
                {step < steps.length - 1 ? (
                  <button className="form-next" onClick={next} type="button">
                    Continuar <ArrowRight size={17} />
                  </button>
                ) : (
                  <button className="form-next" type="submit">
                    Aplicar para uma das 15 vagas <ArrowRight size={17} />
                  </button>
                )}
              </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

function FormField({ field, value, onChange, error }) {
  const inputId = `field-${field.name}`;
  const errorId = `${inputId}-error`;
  const handleChange = (event) => {
    const nextValue = field.mask === 'phoneBR'
      ? formatBrazilianPhone(event.target.value)
      : event.target.value;
    onChange(nextValue);
  };

  if (field.type === 'radio') {
    return (
      <fieldset className={`field field--options${error ? ' field--error' : ''}`} aria-describedby={error ? errorId : undefined}>
        <legend>{field.label}</legend>
        <div className="option-list">
          {field.options.map((option) => (
            <label className={value === option ? 'option option--selected' : 'option'} key={option}>
              <input type="radio" name={field.name} value={option} checked={value === option} onChange={() => onChange(option)} />
              <span className="option__circle"><Check size={12} /></span>
              <span>{option}</span>
            </label>
          ))}
        </div>
        {error && <span className="field-error" id={errorId}>{error}</span>}
      </fieldset>
    );
  }

  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label htmlFor={inputId}>{field.label}</label>
      {field.type === 'textarea' ? (
        <textarea id={inputId} value={value} placeholder={field.placeholder} onChange={handleChange} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} rows={4} />
      ) : (
        <input id={inputId} type={field.type} value={value} autoComplete={field.autoComplete} inputMode={field.inputMode} maxLength={field.maxLength} placeholder={field.placeholder} onChange={handleChange} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />
      )}
      {error && <span className="field-error" id={errorId}>{error}</span>}
    </div>
  );
}

function ThankYou({ onClose }) {
  return (
    <div className="thank-you">
      <div className="thank-you__icon"><Check size={28} /></div>
      <p>Candidatura registrada nesta demonstração</p>
      <h2>Recebi sua candidatura para o AI COWORK.</h2>
      <p>Minha equipe vai analisar suas respostas e, caso exista aderência com a proposta da primeira turma, entraremos em contato pelo WhatsApp ou pelo e-mail informado.</p>
      <p>A candidatura não garante a vaga. A entrada depende da aderência ao programa, da disponibilidade para participar e das 15 vagas da turma.</p>
      <strong>Fique atento às mensagens nos próximos dias.</strong>
      <button type="button" onClick={onClose}>Voltar para a página</button>
      <small>O envio está em modo de demonstração até a integração do destino final do formulário.</small>
    </div>
  );
}

export default App;
