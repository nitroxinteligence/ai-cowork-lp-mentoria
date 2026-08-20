import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Factory,
  Layers3,
  Megaphone,
  Mic,
  MicOff,
  PanelsTopLeft,
  Play,
  RefreshCcw,
  Route,
  ShieldCheck,
  Target,
  UserCog,
  Video,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  flushLeadDraft,
  getOrCreateLeadDraft,
  persistLeadDraft,
  startLeadDraftSync,
  submitLeadApplication,
  subscribeToLeadDraftSync,
} from './lib/leadApplicationDraft';
import { getMentorOnboardingSteps, mentorOnboardingOpening } from './data/mentorOnboardingForm';
import {
  flushMentorOnboardingDraft,
  getOrCreateMentorOnboardingDraft,
  persistMentorOnboardingDraft,
  startMentorOnboardingSync,
  submitMentorOnboarding,
  subscribeToMentorOnboardingSync,
} from './lib/mentorOnboardingDraft';

const HERO_VIDEO_ENABLED = false;
const THANK_YOU_PATH = '/parabens';
const MENTOR_ONBOARDING_PATH = '/mentorado';
const THANK_YOU_ACCESS_KEY = 'ai-cowork:thank-you-access:v1';
const WHATSAPP_MESSAGE = 'Olá! Preenchi minha candidatura para a primeira turma do AI COWORK e gostaria de receber mais informações sobre os próximos passos.';
const WHATSAPP_URL = `https://wa.me/5581982986181?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

function normalizePathname(pathname) {
  return pathname.replace(/\/+$/, '') || '/';
}

function hasThankYouAccess() {
  try {
    const access = JSON.parse(window.sessionStorage.getItem(THANK_YOU_ACCESS_KEY));
    return Boolean(access?.applicationId && access?.submittedAt);
  } catch {
    return false;
  }
}

function grantThankYouAccess(applicationId) {
  window.sessionStorage.setItem(THANK_YOU_ACCESS_KEY, JSON.stringify({
    applicationId,
    submittedAt: new Date().toISOString(),
  }));
}

function resolvePathname() {
  const requestedPathname = normalizePathname(window.location.pathname);

  if (requestedPathname === THANK_YOU_PATH && !hasThankYouAccess()) {
    window.history.replaceState({}, '', '/');
    return '/';
  }

  return requestedPathname;
}

const sessions = [
  {
    code: 'S1',
    date: '10 SET',
    title: 'Da conversa solta à direção profissional',
    body: 'Você entende o que a IA já consegue fazer, aprende a escolher o modo certo para cada trabalho e começa a dirigir com objetivo, contexto, critérios e limites.',
    icon: Target,
  },
  {
    code: 'S2',
    date: '20 SET',
    title: 'Especialistas digitais',
    body: 'Você aprende a configurar papéis com função, competência, fontes, processo e padrão de qualidade ligados ao seu trabalho real.',
    icon: UserCog,
  },
  {
    code: 'S3',
    date: '30 SET',
    title: 'Time digital e produção em cadeia',
    body: 'Você coordena especialistas para que pesquisa, análise, estratégia, criação e revisão deixem de acontecer em conversas desconectadas.',
    icon: Workflow,
  },
  {
    code: 'S4',
    date: '10 OUT',
    title: 'Automação e delegação',
    body: 'Você diferencia automação comum, etapa com IA e agente. Também aprende a conectar tarefas recorrentes a ferramentas autorizadas.',
    icon: Zap,
  },
  {
    code: 'S5',
    date: '20 OUT',
    title: 'Construção com IA',
    body: 'Você cria uma página, apresentação, dashboard, protótipo, calculadora, pequeno aplicativo ou outro ativo útil e entende os limites.',
    icon: PanelsTopLeft,
  },
  {
    code: 'S6',
    date: '30 OUT',
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
  { day: '10', month: 'SET', code: 'S1' },
  { day: '20', month: 'SET', code: 'S2' },
  { day: '30', month: 'SET', code: 'S3' },
  { day: '10', month: 'OUT', code: 'S4' },
  { day: '20', month: 'OUT', code: 'S5' },
  { day: '30', month: 'OUT', code: 'S6' },
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
    answer: 'Serão seis encontros ao vivo pelo Google Meet, com duas horas cada, realizados a cada 10 dias entre 10 de setembro e 30 de outubro. As gravações ficarão disponíveis por um ano. Se você perder um encontro, deverá acompanhar a gravação antes da sessão seguinte.',
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

const personas = [
  {
    title: 'Empresários e empreendedores',
    body: 'Para quem já conduz uma operação e quer reduzir dependência manual, acelerar decisões e transformar processos recorrentes em fluxos orientados por IA.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Profissionais e empreendedores do marketing digital',
    body: 'Para quem precisa conectar pesquisa, estratégia, criação, aquisição, vendas e entrega sem continuar operando cada etapa em conversas isoladas.',
    icon: Megaphone,
  },
  {
    title: 'Profissionais em transição ou potencialização de carreira',
    body: 'Para quem quer combinar a experiência que já possui com novas capacidades e construir uma forma mais valiosa de atuar, decidir e produzir.',
    icon: Route,
  },
  {
    title: 'Líderes e especialistas da indústria',
    body: 'Para líderes, engenheiros, analistas, profissionais de staff, diretores e executivos da indústria que querem aplicar IA a operações, projetos, análises e decisões complexas.',
    icon: Factory,
  },
];

const outcomes = [
  {
    title: 'Protocolo pessoal de direção',
    body: 'Um padrão para definir objetivo, contexto, restrições, referências, formato e qualidade antes de delegar trabalho à IA.',
    icon: Target,
  },
  {
    title: 'Especialistas digitais adaptados à sua realidade',
    body: 'Papéis configurados e testados para funções relevantes do seu trabalho, negócio ou rotina pessoal.',
    icon: UserCog,
  },
  {
    title: 'Fluxo coordenado de produção',
    body: 'Uma forma de passar trabalho entre pesquisa, análise, estratégia, criação e revisão sem recomeçar em cada janela.',
    icon: Workflow,
  },
  {
    title: 'Automação ou fluxo assistido viável',
    body: 'Uma primeira rotina para reduzir etapas manuais quando houver acesso, segurança e condição técnica, ou o desenho correto do que falta para implementar.',
    icon: Zap,
  },
  {
    title: 'Ativo funcional construído com IA',
    body: 'Uma página, apresentação, dashboard, protótipo, calculadora, pequeno aplicativo ou outro ativo ligado ao seu objetivo.',
    icon: PanelsTopLeft,
  },
  {
    title: 'Sistema pessoal AI COWORK',
    body: 'Especialistas, contextos, fluxos, ferramentas, critérios de revisão e um plano de expansão organizados para continuar crescendo depois da turma.',
    icon: Layers3,
  },
];

const founderBenefits = [
  '6 encontros online e ao vivo',
  'orientação direta comigo',
  'laboratórios aplicados aos trabalhos da turma',
  'correção coletiva dos casos que ajudam o grupo',
  'gravações disponíveis por um ano',
  'grupo privado no WhatsApp',
  'Meus especialistas digitais',
  'possível encontro extra, se a turma precisar',
  'plano pessoal de expansão do time digital',
  'meus agentes, minhas skills, minhas ferramentas',
  'área de membros com materiais e gravações',
  'R$ 500 de cashback',
];

const sessionVideos = [
  null,
  'https://tjnokoaeieywclhzlyte.supabase.co/storage/v1/object/sign/Interno/video-3.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83ZjYyMjIzMy0xY2QyLTQ1YjktYTRmZi1lNThlOWQyMDRmZGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbnRlcm5vL3ZpZGVvLTMubXA0Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzAyMjYzOCwiZXhwIjoyMTMzOTE4NjM4fQ.wWJuHwBZ0tLovrbCGGz11D3e-ny2fPayh0rXUOJ6gzs',
  null,
  'https://tjnokoaeieywclhzlyte.supabase.co/storage/v1/object/sign/Interno/video-1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83ZjYyMjIzMy0xY2QyLTQ1YjktYTRmZi1lNThlOWQyMDRmZGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbnRlcm5vL3ZpZGVvLTEubXA0Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzAyMjY5MCwiZXhwIjoyMTMzOTE4NjkwfQ.eVysx2Ir_2_4yL6UBNi3QhkXSYUzCmIBpPfFCKghH-c',
  null,
  'https://tjnokoaeieywclhzlyte.supabase.co/storage/v1/object/sign/Interno/video-2.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83ZjYyMjIzMy0xY2QyLTQ1YjktYTRmZi1lNThlOWQyMDRmZGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbnRlcm5vL3ZpZGVvLTIubXA0Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzAyMjczMSwiZXhwIjoyMTMzOTE4NzMxfQ.g_fqLMi1DhOXEyipLtlRJuIsa7vQNva93G19K736tUE',
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
  const [floatingCtaVisible, setFloatingCtaVisible] = useState(false);
  const [founderBenefitsVisible, setFounderBenefitsVisible] = useState(false);
  const [pathname, setPathname] = useState(resolvePathname);
  const applicationTriggerRef = useRef(null);
  const restoreApplicationFocusRef = useRef(false);

  const closeApplication = () => {
    restoreApplicationFocusRef.current = true;
    setApplicationOpen(false);
  };

  useEffect(() => {
    const stopLeadSync = startLeadDraftSync();
    const stopMentorOnboardingSync = startMentorOnboardingSync();
    return () => {
      stopLeadSync?.();
      stopMentorOnboardingSync?.();
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => setPathname(resolvePathname());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const preventContextMenu = (event) => event.preventDefault();
    document.addEventListener('contextmenu', preventContextMenu);
    return () => document.removeEventListener('contextmenu', preventContextMenu);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && applicationOpen) closeApplication();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [applicationOpen]);

  useEffect(() => {
    document.body.style.overflow = applicationOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [applicationOpen]);

  useEffect(() => {
    const hero = document.getElementById('inicio');
    if (!hero) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setFloatingCtaVisible(!entry.isIntersecting);
    });

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const founderSection = document.getElementById('turma-fundadora');
    if (!founderSection) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setFounderBenefitsVisible(entry.isIntersecting);
    });

    observer.observe(founderSection);
    return () => observer.disconnect();
  }, []);

  const openApplication = (event) => {
    applicationTriggerRef.current = event?.currentTarget instanceof HTMLElement
      ? event.currentTarget
      : document.activeElement;
    restoreApplicationFocusRef.current = false;
    setApplicationOpen(true);
  };

  const showThankYouPage = (applicationId) => {
    grantThankYouAccess(applicationId);
    window.history.pushState({}, '', THANK_YOU_PATH);
    restoreApplicationFocusRef.current = false;
    setApplicationOpen(false);
    setPathname(THANK_YOU_PATH);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  if (pathname === THANK_YOU_PATH) return <ThankYouPage />;
  if (pathname === MENTOR_ONBOARDING_PATH) return <MentorOnboardingPage />;

  return (
    <div className="site-shell">
      <Hero onApply={openApplication} ctaShimmerActive={!floatingCtaVisible} />
      <AnimatePresence>
        {floatingCtaVisible && !founderBenefitsVisible && <FloatingApplicationCTA onApply={openApplication} />}
      </AnimatePresence>
      <main>
        <ManualProcessSection />
        <TrajectorySection />
        <AudienceSection />
        <ChangeDetailsSection />
        <ExperienceSection />
        <ApplicationSection />
        <FounderBenefitsSection onApply={openApplication} />
        <FAQSection />
      </main>
      <Footer />
      <AnimatePresence
        onExitComplete={() => {
          if (!restoreApplicationFocusRef.current) return;
          applicationTriggerRef.current?.focus();
          restoreApplicationFocusRef.current = false;
        }}
      >
        {applicationOpen && (
          <ApplicationModal
            onSubmitted={showThankYouPage}
            onClose={closeApplication}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingApplicationCTA({ onApply }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.aside
      className="application-cta application-cta--floating"
      aria-label="Candidatura"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <ApplicationCTAButton onApply={onApply} shimmerActive />
    </motion.aside>
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

function ApplicationCTAButton({ onApply, shimmerActive = false }) {
  return (
    <button
      className={`application-cta__button${shimmerActive ? ' is-shimmer-active' : ''}`}
      type="button"
      onClick={onApply}
    >
      <span className="application-cta__action">
        <span>GARANTIR MINHA VAGA</span>
        <ArrowUpRight className="application-cta__hover-arrow" size={18} strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="application-cta__details" aria-hidden="true">
        <span>15 VAGAS PRIMEIRA TURMA</span>
        <span>ABERTO ATÉ 30 DE AGOSTO</span>
      </span>
    </button>
  );
}

function Hero({ onApply, ctaShimmerActive }) {
  const reduceMotion = useReducedMotion();

  return (
    <header className="hero" id="inicio">
      <picture className="hero__media" aria-hidden="true">
        <source
          media="(max-width: 480px)"
          srcSet="/images/hero/ai-cowork-hero-mobile-1080x1920.webp"
        />
        <source
          media="(max-width: 1020px)"
          srcSet="/images/hero/ai-cowork-hero-tablet-1536x2048.webp"
        />
        <source
          media="(max-width: 1440px)"
          srcSet="/images/hero/ai-cowork-hero-laptop-1440x900.webp"
        />
        <source
          media="(max-width: 1920px)"
          srcSet="/images/hero/ai-cowork-hero-desktop-1920x1080.webp"
        />
        <img
          src="/images/hero/ai-cowork-hero-ultrawide-2560x1080.webp"
          alt=""
          width="2560"
          height="1080"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className="hero__media-scrim" aria-hidden="true" />
      <div className="hero__content container">
        <motion.div
          className="hero__copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <BrandLogo className="hero__brand" />
          <div className="hero__facts" aria-label="Informações da primeira turma">
            <Clock3 size={17} aria-hidden="true" />
            <span className="hero__facts-text">
              <span>6 ENCONTROS</span>
              <span>15 VAGAS EXCLUSIVAS</span>
            </span>
          </div>
          <h1>Você ainda está fazendo com as mãos o <span className="mesh-text mesh-text--on-dark">trabalho que já poderia fazer com IA.</span></h1>
          <div className="hero__lead">
            <p>
              No <span className="hero__lead-brand">AI COWORK</span>, você vai <span className="hero__lead-highlight">aprender a identificar o que pode ser automatizado, criar especialistas digitais</span> para diferentes funções e <span className="hero__lead-highlight">fazer a IA trabalhar com você e para você.</span>
            </p>
          </div>
          <div className="application-cta application-cta--hero">
            <ApplicationCTAButton onApply={onApply} shimmerActive={ctaShimmerActive} />
          </div>
        </motion.div>

        {HERO_VIDEO_ENABLED && (
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
          </motion.div>
        )}

      </div>
    </header>
  );
}

function ManualProcessSection() {
  return (
    <section className="manual-process-section" aria-labelledby="manual-process-title">
      <picture className="manual-process-section__media" aria-hidden="true">
        <source media="(max-width: 480px)" srcSet="/images/ai-cowork-manual-process-mobile-1080x1920.webp" />
        <source media="(max-width: 1020px)" srcSet="/images/ai-cowork-manual-process-tablet-1536x2048.webp" />
        <source media="(max-width: 1920px)" srcSet="/images/ai-cowork-manual-process-desktop-2048x1152.webp" />
        <img
          src="/images/ai-cowork-manual-process-ultrawide-2560x1080.webp"
          alt=""
          width="2560"
          height="1080"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div className="container manual-process-section__layout">
        <div className="manual-process-section__copy">
          <h2 id="manual-process-title">Você pode até utilizar IA. Mas o <span className="mesh-text mesh-text--on-dark">processo inteiro ainda volta para você.</span></h2>
          <div className="manual-process-section__body">
            <p>Você abre o ChatGPT, explica o problema, recebe uma resposta razoável e percebe que faltou contexto. Então corrige a informação, ajusta o tom, confere os fatos, copia o conteúdo para outro lugar e termina o trabalho manualmente.</p>
            <p>Na próxima demanda, começa praticamente do zero.</p>
            <p>Pensa num relatório que volta todo mês. Você procura arquivos, cruza dados, tenta entender o que mudou, escreve a análise, monta a apresentação e revisa tudo antes da reunião. A IA talvez ajude numa etapa, mas o processo continua dependendo de você para lembrar, organizar, pedir, corrigir e juntar as partes.</p>
            <p>O mesmo acontece com reuniões que não viram próximos passos, pesquisas que ninguém tem tempo de começar, ideias esperando uma sprint e rotinas que consomem horas porque nunca foram transformadas em fluxo.</p>
            <p>O problema está visível: a IA entrou na sua tela, mas ainda não entrou na forma como o trabalho avança.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrajectorySection() {
  return (
    <section className="section section--trajectory" id="trajetoria">
      <div className="container trajectory-intro trajectory-intro--centered">
        <div className="section-heading section-heading--wide">
          <h2 className="trajectory-name"><span className="mesh-text mesh-text--on-dark">MATEUS PAZ</span></h2>
        </div>
        <div className="trajectory-intro__text prose">
          <p>Especialista em IA. Minha trajetória começou no Nordeste, passou por design, audiovisual, lançamentos, marketing, desenvolvimento de software e construção de empresas.</p>
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

function AudienceSection() {
  return (
    <section className="section audience-section" aria-labelledby="audience-title">
      <div className="container">
        <h2 id="audience-title">Para quem é o <span className="mesh-text">AI COWORK</span></h2>
        <div className="audience-grid">
          {personas.map(({ title, body, icon: Icon }) => (
            <article className="audience-card" key={title}>
              <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChangeDetailsSection() {
  return (
    <>
      <section className="section section--change section--change-details">
        <div className="container">
          <div className="capabilities">
            <div className="capabilities__intro">
              <h3>O que você vai <span className="mesh-text">aprender a fazer</span></h3>
              <p>A IA deixa de ser uma janela onde você faz perguntas e passa a funcionar como uma estrutura de trabalho sob sua direção.</p>
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

function ExperienceSection() {
  return (
    <>
      <section className="section section--experience" id="experiencia">
        <div className="container experience-statement">
          <h2>
            <span className="experience-statement__line">FERRAMENTA É COMMODITY.</span>
            <span className="experience-statement__line mesh-text">SABER CONDUZIR A IA</span>
            <span className="experience-statement__line mesh-text">É A CHAVE-MESTRA.</span>
          </h2>
        </div>
      </section>
      <CohortSection />
      <JourneySection />
      <OutcomesSection />
    </>
  );
}

function CohortSection() {
  return (
    <section className="cohort-section" aria-labelledby="cohort-title">
      <div className="container cohort-section__content">
        <div className="cohort-section__heading">
          <div>
            <h2 id="cohort-title">
              <span>Uma turma pequena.</span>
              <span>Seis encontros.</span>
              <span className="mesh-text mesh-text--on-dark">Trabalho aplicado.</span>
            </h2>
          </div>
          <div className="cohort-section__summary">
            <p>Online, ao vivo e com apenas 15 vagas. Encontros a cada 10 dias, com duas horas de duração, para construir especialistas digitais, fluxos e uma operação pessoal de IA conectada ao seu trabalho real.</p>
            <dl>
              <div>
                <dt><Video size={18} strokeWidth={1.7} aria-hidden="true" /><span>Onde</span></dt>
                <dd>Google Meet</dd>
              </div>
              <div>
                <dt><Clock3 size={18} strokeWidth={1.7} aria-hidden="true" /><span>Horário</span></dt>
                <dd>A definir</dd>
              </div>
              <div>
                <dt><CalendarDays size={18} strokeWidth={1.7} aria-hidden="true" /><span>Candidaturas</span></dt>
                <dd>Até 30 de agosto</dd>
              </div>
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
        </div>
      </div>
    </section>
  );
}

function JourneySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="journey-showcase" aria-labelledby="journey-title">
      <div className="container journey-showcase__masthead">
        <h2 id="journey-title"><span className="mesh-text mesh-text--on-dark">O percurso</span></h2>
        <p>Uma progressão a cada 10 dias: primeiro você aprende a dirigir. Depois, constrói, conecta e consolida sua própria operação.</p>
      </div>
      <div className="container journey-showcase__sessions">
        {sessions.map(({ code, date, title, body }, index) => (
          <article
            className={`journey-session${sessionVideos[index] ? '' : ' journey-session--text-only journey-session--checklist-right'}`}
            key={code}
          >
            <div className="journey-session__copy">
              <span className="journey-session__meta">{code} · {date}</span>
              <h3>{title}</h3>
              {sessionVideos[index] && <div className="journey-session__divider" aria-hidden="true" />}
              <p><CheckCircle2 size={20} strokeWidth={1.7} aria-hidden="true" />{body}</p>
            </div>
            {sessionVideos[index] && (
              <div className="journey-session__visual">
                <video
                  src={sessionVideos[index]}
                  autoPlay={!reduceMotion}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function OutcomesSection() {
  return (
    <section className="section outcomes-section" aria-labelledby="outcomes-title">
      <div className="container outcomes-layout">
        <div className="outcomes-intro">
          <h2 id="outcomes-title">Em 2 meses você aprenderá <span className="mesh-text mesh-text--on-dark">como fazer a IA trabalhar para você com 100% de autonomia</span></h2>
        </div>
        <div className="outcomes-list">
          {outcomes.map(({ title, body, icon: Icon }, index) => (
            <article className="outcome-card" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplicationSection() {
  return (
    <section className="section section--application" id="candidatura">
      <div className="container application-grid">
        <div>
          <h2>A <span className="mesh-text mesh-text--on-dark">primeira turma</span> terá 15 vagas.</h2>
        </div>
        <div className="application-copy prose">
          <p>Escolhi uma turma pequena porque quero acompanhar de perto como cada participante está usando a IA, onde está travando e quais funções fazem mais sentido para o seu trabalho.</p>
          <p>Preencher o formulário não garante a vaga. Vamos analisar a aderência ao programa, a disponibilidade para participar e a composição da turma.</p>
          <p>Se sua candidatura fizer sentido, minha equipe entra em contato, explica o investimento e orienta os próximos passos.</p>
        </div>
      </div>
    </section>
  );
}

function FounderBenefitsSection({ onApply }) {
  return (
    <section className="section founder-benefits-section" id="turma-fundadora" aria-labelledby="founder-benefits-title">
      <div className="container founder-benefits-section__content">
        <h2 id="founder-benefits-title">Tudo o que acompanha a <span className="mesh-text mesh-text--on-dark">Turma Fundadora</span></h2>

        <picture className="founder-benefits-section__visual">
          <source
            media="(min-width: 1800px)"
            srcSet="/images/founder-cohort/ai-cowork-founder-kit-approved-ultrawide-2560x1440.webp"
          />
          <source
            media="(min-width: 1024px)"
            srcSet="/images/founder-cohort/ai-cowork-founder-kit-approved-desktop-2400x1600.webp"
          />
          <source
            media="(min-width: 761px)"
            srcSet="/images/founder-cohort/ai-cowork-founder-kit-approved-tablet-2048x1536.webp"
          />
          <img
            src="/images/founder-cohort/ai-cowork-founder-kit-approved-mobile-1600x1350.webp"
            alt="Composição dos materiais e da área de membros da Turma Fundadora do AI COWORK"
            width="1600"
            height="1350"
            sizes="(min-width: 1800px) 820px, (min-width: 1024px) 680px, (min-width: 761px) calc(100vw - 6rem), 94vw"
            loading="lazy"
            decoding="async"
          />
        </picture>

        <div className="founder-benefits-card">
          <ul>
            {founderBenefits.map((benefit) => (
              <li key={benefit}>
                <span className="founder-benefits-card__check" aria-hidden="true">
                  <CheckCircle2 size={19} strokeWidth={1.8} />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <button className="founder-benefits-card__cta" type="button" onClick={onApply}>
            <span>QUERO UMA VAGA</span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </button>
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

function MentorOnboardingPage() {
  const initialDraftRef = useRef(null);
  if (!initialDraftRef.current) initialDraftRef.current = getOrCreateMentorOnboardingDraft();

  const draftRef = useRef(initialDraftRef.current.draft);
  const [stepIndex, setStepIndex] = useState(initialDraftRef.current.draft.currentStep);
  const [values, setValues] = useState(initialDraftRef.current.draft.values);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [syncState, setSyncState] = useState({ status: 'idle' });
  const reduceMotion = useReducedMotion();
  const steps = getMentorOnboardingSteps(values);
  const activeStepIndex = Math.min(stepIndex, steps.length - 1);
  const currentStep = steps[activeStepIndex];

  useEffect(() => {
    if (stepIndex !== activeStepIndex) setStepIndex(activeStepIndex);
  }, [activeStepIndex, stepIndex]);

  useEffect(() => subscribeToMentorOnboardingSync(setSyncState), []);

  const saveDraft = (nextValues, nextStep = activeStepIndex) => {
    const nextDraft = {
      ...draftRef.current,
      currentStep: nextStep,
      values: nextValues,
    };
    draftRef.current = persistMentorOnboardingDraft(nextDraft);
    return nextDraft;
  };

  const updateValue = (name, value) => {
    const nextValues = { ...draftRef.current.values, [name]: value };
    setValues(nextValues);
    saveDraft(nextValues);
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setSubmitError('');
  };

  const validateFields = (step) => {
    const nextErrors = {};

    step.fields.forEach((field) => {
      if (field.required === false) return;
      if (isMentorOnboardingValueEmpty(values[field.name], field)) nextErrors[field.name] = 'Responda este campo para continuar.';
    });

    return nextErrors;
  };

  const focusFirstError = (step, nextErrors) => {
    const firstInvalidField = step.fields.find((field) => nextErrors[field.name]);
    if (firstInvalidField) {
      window.requestAnimationFrame(() => {
        const fieldElement = document.getElementById(`mentor-field-${firstInvalidField.name}`)
          || document.querySelector(`[name="${firstInvalidField.name}"]`);
        fieldElement?.focus();
      });
    }
  };

  const validateStep = (step = currentStep) => {
    const nextErrors = validateFields(step);

    setErrors(nextErrors);
    focusFirstError(step, nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateAllSteps = () => {
    for (const [index, step] of steps.entries()) {
      const nextErrors = validateFields(step);
      if (Object.keys(nextErrors).length > 0) {
        setStepIndex(index);
        setErrors(nextErrors);
        focusFirstError(step, nextErrors);
        return false;
      }
    }

    setErrors({});
    return true;
  };

  const goToStep = (nextIndex) => {
    setStepIndex(nextIndex);
    setErrors({});
  };

  const handleNext = (event) => {
    event.preventDefault();
    if (!validateStep()) return;
    const nextStep = Math.min(activeStepIndex + 1, steps.length - 1);
    const draft = saveDraft(draftRef.current.values, nextStep);
    void flushMentorOnboardingDraft(draft).catch(() => undefined);
    goToStep(nextStep);
    scrollMentorOnboardingFormToTop(reduceMotion);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateAllSteps()) return;
    scrollMentorOnboardingFormToTop(reduceMotion);
    setSubmitting(true);
    setSubmitError('');

    try {
      const draft = saveDraft(draftRef.current.values, activeStepIndex);
      await submitMentorOnboarding(draft);
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error.message || 'Não foi possível enviar o formulário. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const syncMessage = {
    error: 'Rascunho salvo neste dispositivo; sincronização pendente.',
    idle: initialDraftRef.current.restored
      ? 'Rascunho recuperado neste dispositivo.'
      : 'Seu progresso será salvo automaticamente.',
    offline: 'Sem internet — progresso salvo neste dispositivo.',
    saved: 'Progresso salvo.',
    submitting: 'Enviando respostas...',
    syncing: 'Salvando progresso...',
    submitted: 'Respostas enviadas.',
  }[syncState.status] || 'Seu progresso será salvo automaticamente.';

  if (submitted) return <MentorOnboardingSubmitted />;

  return (
    <div className="mentor-onboarding-page">
      <header className="mentor-onboarding-hero">
        <div className="container">
          <div className="mentor-onboarding-hero__content">
            <BrandLogo className="mentor-onboarding-hero__logo" />
            <h1>Assista ao vídeo antes de começar.</h1>
            <figure className="mentor-onboarding-video">
              <div className="mentor-onboarding-video__placeholder" role="img" aria-label="Placeholder para o vídeo">
                <Play size={28} fill="currentColor" aria-hidden="true" />
              </div>
            </figure>
          </div>
        </div>
      </header>

      <main className="mentor-onboarding-main">
        <div className="container">
          <div className="mentor-onboarding-intro">
            <h4 className="mentor-onboarding-intro__copy">
              {mentorOnboardingOpening.map((paragraphText, index) => (
                <span key={paragraphText}>
                  {paragraphText}
                </span>
              ))}
            </h4>
          </div>

          <div className="mentor-onboarding-layout">
            <aside className="mentor-onboarding-sidebar" aria-label="Etapas do formulário">
              <div className="mentor-onboarding-sidebar__heading">
                <span>Seu percurso</span>
                <strong>{String(activeStepIndex + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</strong>
              </div>
              <ol className="mentor-onboarding-steps">
                {steps.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = index === activeStepIndex;
                  const isCompleted = index < activeStepIndex;
                  const StepIcon = isCompleted ? CheckCircle2 : Icon;

                  return (
                    <li key={item.id}>
                      <div
                        className={`mentor-onboarding-step${isActive ? ' mentor-onboarding-step--active' : ''}${isCompleted ? ' mentor-onboarding-step--complete' : ''}${index > activeStepIndex ? ' mentor-onboarding-step--locked' : ''}`}
                        aria-current={isActive ? 'step' : undefined}
                        aria-disabled={index > activeStepIndex ? 'true' : undefined}
                      >
                        <span className="mentor-onboarding-step__number">{item.number}</span>
                        <span className="mentor-onboarding-step__label">{item.label}</span>
                        <span className="mentor-onboarding-step__icon" aria-hidden="true">
                          <StepIcon size={15} strokeWidth={1.8} />
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </aside>

            <section className="mentor-onboarding-card" aria-labelledby="mentor-onboarding-step-title">
              <div className="mentor-onboarding-card__header">
                <div className="mentor-onboarding-card__meta">
                  <span>Etapa {currentStep.number}</span>
                  <span>{currentStep.label}</span>
                </div>
                <h2 id="mentor-onboarding-step-title">{currentStep.title}</h2>
                <p>{currentStep.description}</p>
                <div className="mentor-onboarding-progress" role="progressbar" aria-label="Progresso do formulário" aria-valuemin="1" aria-valuemax={steps.length} aria-valuenow={activeStepIndex + 1}>
                  <i style={{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }} />
                </div>
              </div>

              <form className="mentor-onboarding-form" onSubmit={activeStepIndex < steps.length - 1 ? handleNext : handleSubmit} noValidate>
                <div className="mentor-onboarding-fields">
                  {currentStep.fields.map((field) => (
                    <MentorOnboardingField
                      error={errors[field.name]}
                      field={field}
                      key={field.name}
                      onChange={(value) => updateValue(field.name, value)}
                      values={values}
                      value={values[field.name] ?? ''}
                    />
                  ))}
                </div>

                <div className="mentor-onboarding-actions">
                  <button
                    className="mentor-onboarding-back"
                    type="button"
                    onClick={() => goToStep(Math.max(activeStepIndex - 1, 0))}
                    disabled={activeStepIndex === 0}
                  >
                    <ArrowLeft size={17} aria-hidden="true" />
                    Voltar
                  </button>

                  {activeStepIndex < steps.length - 1 ? (
                    <button className="mentor-onboarding-next" type="submit">
                      Próxima etapa
                      <ArrowRight size={17} aria-hidden="true" />
                    </button>
                  ) : (
                    <button className="mentor-onboarding-next" type="submit" disabled={submitting}>
                      {submitting ? 'Enviando...' : 'Finalizar formulário'}
                      {!submitting && <Check size={17} aria-hidden="true" />}
                    </button>
                  )}
                </div>
                <p className={`mentor-onboarding-sync mentor-onboarding-sync--${syncState.status}`} aria-live="polite">
                  <span aria-hidden="true" />
                  {syncMessage}
                </p>
                {submitError && <p className="mentor-onboarding-submit-error" role="alert">{submitError}</p>}
              </form>
            </section>
          </div>
        </div>
      </main>

      <footer className="mentor-onboarding-footer">
        <div className="container mentor-onboarding-footer__content">
          <BrandLogo />
          <p>AI COWORK · IA trabalhando com você e para você.</p>
        </div>
      </footer>
    </div>
  );
}

function isMentorOnboardingValueEmpty(value, field) {
  if (field.type === 'availability') {
    return !value || typeof value !== 'object' || field.dates.some((date) => !value[date]);
  }
  if (field.type === 'ranking') return !Array.isArray(value) || value.length < field.limit;
  if (Array.isArray(value)) return value.length === 0;
  if (value && typeof value === 'object' && Array.isArray(value.selected)) return value.selected.length === 0;
  if (value && typeof value === 'object' && typeof value.value === 'string') return !value.value.trim();
  if (typeof value === 'number') return false;
  return !String(value ?? '').trim();
}

function selectedOptions(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === 'object' && Array.isArray(value.selected)) return value.selected;
  if (value && typeof value === 'object' && typeof value.value === 'string') return [value.value];
  if (typeof value === 'string') return [value];
  return [];
}

function normalizeMultiOptionValue(value) {
  if (Array.isArray(value)) return { selected: value, other: '' };
  if (value && typeof value === 'object' && Array.isArray(value.selected)) {
    return { selected: value.selected, other: value.other || '' };
  }
  return { selected: [], other: '' };
}

function isOtherOption(option) {
  return option === 'Outro' || option === 'Outra';
}

function scrollMentorOnboardingFormToTop(reduceMotion) {
  window.requestAnimationFrame(() => {
    document.querySelector('.mentor-onboarding-card')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  });
}

function MentorOnboardingSubmitted() {
  return (
    <div className="mentor-onboarding-page">
      <main className="mentor-onboarding-main">
        <div className="container mentor-onboarding-submitted">
          <h1>Obrigado por compartilhar seu ponto de partida.</h1>
          <p>Suas respostas foram registradas. Vou usá-las para preparar os encontros e acompanhar o seu processo com mais contexto.</p>
        </div>
      </main>
      <footer className="mentor-onboarding-footer">
        <div className="container mentor-onboarding-footer__content">
          <BrandLogo />
          <p>AI COWORK · IA trabalhando com você e para você.</p>
        </div>
      </footer>
    </div>
  );
}

function MentorOnboardingField({ field, value, values, onChange, error }) {
  const inputId = `mentor-field-${field.name}`;
  const errorId = `${inputId}-error`;

  if (field.type === 'radio') {
    const selectedOption = value && typeof value === 'object' ? value.value : value;
    const otherValue = value && typeof value === 'object' ? value.other || '' : '';
    const otherOption = field.options.find((option) => isOtherOption(option));

    return (
      <fieldset className={`mentor-onboarding-field mentor-onboarding-field--options mentor-onboarding-field--radio${error ? ' mentor-onboarding-field--error' : ''}`} aria-describedby={error ? errorId : undefined} aria-required={field.required}>
        <legend>{field.label}</legend>
        {field.helper && <p className="mentor-onboarding-field__helper">{field.helper}</p>}
        <div className="mentor-onboarding-option-list">
          {field.options.map((option) => (
            <label className={selectedOption === option ? 'mentor-onboarding-option mentor-onboarding-option--selected' : 'mentor-onboarding-option'} key={option}>
              <input
                type="radio"
                name={field.name}
                value={option}
                checked={selectedOption === option}
                onChange={() => onChange(isOtherOption(option) ? { value: option, other: otherValue } : option)}
              />
              <span className="mentor-onboarding-option__circle" aria-hidden="true"><Check size={12} /></span>
              <span>{option}</span>
            </label>
          ))}
        </div>
        {otherOption && selectedOption === otherOption && (
          <div className="mentor-onboarding-other-field">
            <label htmlFor={`${inputId}-other`}>Descreva sua outra opção</label>
            <input
              id={`${inputId}-other`}
              type="text"
              value={otherValue}
              placeholder="Escreva outra possibilidade..."
              onChange={(event) => onChange({ value: otherOption, other: event.target.value })}
            />
          </div>
        )}
        {error && <span className="mentor-onboarding-field-error" id={errorId}>{error}</span>}
      </fieldset>
    );
  }

  if (field.type === 'checkboxes') {
    const selection = normalizeMultiOptionValue(value);
    const selectedValues = selection.selected;
    const otherOption = field.options.find((option) => isOtherOption(option));
    return (
      <fieldset className={`mentor-onboarding-field mentor-onboarding-field--options mentor-onboarding-field--checkboxes${error ? ' mentor-onboarding-field--error' : ''}`} aria-describedby={error ? errorId : undefined} aria-required={field.required}>
        <legend>{field.label}</legend>
        {field.helper && <p className="mentor-onboarding-field__helper">{field.helper}</p>}
        <div className="mentor-onboarding-option-list">
          {field.options.map((option) => {
            const checked = selectedValues.includes(option);
            return (
              <label className={checked ? 'mentor-onboarding-option mentor-onboarding-option--selected' : 'mentor-onboarding-option'} key={option}>
                <input
                  type="checkbox"
                  name={`${field.name}[]`}
                  value={option}
                  checked={checked}
                  onChange={() => onChange({
                    selected: checked ? selectedValues.filter((item) => item !== option) : [...selectedValues, option],
                    other: selection.other,
                  })}
                />
                <span className="mentor-onboarding-option__circle" aria-hidden="true"><Check size={12} /></span>
                <span>{option}</span>
              </label>
            );
          })}
        </div>
        {otherOption && selectedValues.includes(otherOption) && (
          <div className="mentor-onboarding-other-field">
            <label htmlFor={`${inputId}-other`}>Descreva sua outra opção</label>
            <input
              id={`${inputId}-other`}
              type="text"
              value={selection.other}
              placeholder="Escreva outra possibilidade..."
              onChange={(event) => onChange({ selected: selectedValues, other: event.target.value })}
            />
          </div>
        )}
        {error && <span className="mentor-onboarding-field-error" id={errorId}>{error}</span>}
      </fieldset>
    );
  }

  if (field.type === 'ranking') {
    const selectedValues = Array.isArray(value) ? value : [];
    const sourceOptions = selectedOptions(values[field.sourceField]);
    const options = sourceOptions.length > 0 ? sourceOptions : (field.options || []);

    return (
      <fieldset className={`mentor-onboarding-field mentor-onboarding-field--ranking${error ? ' mentor-onboarding-field--error' : ''}`} aria-describedby={error ? errorId : undefined} aria-required={field.required}>
        <legend>{field.label}</legend>
        <p className="mentor-onboarding-field__helper">Escolha as três atividades mais importantes e ordene-as da primeira para a terceira.</p>
        <div className="mentor-onboarding-ranking-list">
          {Array.from({ length: field.limit }, (_, index) => {
            const currentValue = selectedValues[index] || '';
            return (
              <label className="mentor-onboarding-ranking" key={`${field.name}-${index}`}>
                <span>{index + 1}º</span>
                <select
                  id={index === 0 ? inputId : undefined}
                  value={currentValue}
                  disabled={options.length === 0}
                  onChange={(event) => {
                    const nextValues = [...selectedValues];
                    nextValues[index] = event.target.value;
                    onChange(nextValues.filter(Boolean));
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                >
                  <option value="">{options.length === 0 ? 'Selecione na pergunta anterior' : 'Escolha uma atividade'}</option>
                  {options.map((option) => (
                    <option key={option} value={option} disabled={selectedValues.includes(option) && option !== currentValue}>{option}</option>
                  ))}
                </select>
              </label>
            );
          })}
        </div>
        {error && <span className="mentor-onboarding-field-error" id={errorId}>{error}</span>}
      </fieldset>
    );
  }

  if (field.type === 'scale') {
    return (
      <fieldset className={`mentor-onboarding-field mentor-onboarding-field--scale${error ? ' mentor-onboarding-field--error' : ''}`} aria-describedby={error ? errorId : undefined} aria-required={field.required}>
        <legend>{field.label}</legend>
        <div className="mentor-onboarding-scale-list">
          {Array.from({ length: field.max - field.min + 1 }, (_, index) => {
            const scaleValue = field.min + index;
            const selected = value === scaleValue;
            return (
              <button
                className={selected ? 'mentor-onboarding-scale mentor-onboarding-scale--selected' : 'mentor-onboarding-scale'}
                type="button"
                aria-pressed={selected}
                key={scaleValue}
                onClick={() => onChange(scaleValue)}
              >
                <strong>{scaleValue}</strong>
                <span>{field.scaleLabels[scaleValue]}</span>
              </button>
            );
          })}
        </div>
        {error && <span className="mentor-onboarding-field-error" id={errorId}>{error}</span>}
      </fieldset>
    );
  }

  if (field.type === 'availability') {
    const selectedValues = value && typeof value === 'object' ? value : {};
    return (
      <fieldset className={`mentor-onboarding-field mentor-onboarding-field--availability${error ? ' mentor-onboarding-field--error' : ''}`} aria-describedby={error ? errorId : undefined} aria-required={field.required}>
        <legend>{field.label}</legend>
        <div className="mentor-onboarding-availability">
          {field.dates.map((date) => (
            <fieldset className="mentor-onboarding-availability__row" key={date}>
              <legend>{date}</legend>
              <div className="mentor-onboarding-availability__options">
                {field.options.map((option) => {
                  const selected = selectedValues[date] === option;
                  return (
                    <label className={selected ? 'mentor-onboarding-option mentor-onboarding-option--selected' : 'mentor-onboarding-option'} key={option}>
                      <input
                        type="radio"
                        name={`${field.name}-${date}`}
                        value={option}
                        checked={selected}
                        onChange={() => onChange({ ...selectedValues, [date]: option })}
                      />
                      <span className="mentor-onboarding-option__circle" aria-hidden="true"><Check size={12} /></span>
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
        {error && <span className="mentor-onboarding-field-error" id={errorId}>{error}</span>}
      </fieldset>
    );
  }

  return (
    <div className={`mentor-onboarding-field${error ? ' mentor-onboarding-field--error' : ''}`}>
      {field.type === 'textarea' ? (
        <>
          <div className="mentor-onboarding-field__label-row">
            <label htmlFor={inputId}>{field.label}</label>
            <DictationButton value={value} onChange={onChange} />
          </div>
          {field.helper && <p className="mentor-onboarding-field__helper">{field.helper}</p>}
          <textarea
            id={inputId}
            rows={field.rows || 5}
            value={value}
            placeholder={field.placeholder}
            onChange={(event) => onChange(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-required={field.required}
            aria-describedby={error ? errorId : undefined}
          />
        </>
      ) : (
        <>
          <label htmlFor={inputId}>{field.label}</label>
          {field.helper && <p className="mentor-onboarding-field__helper">{field.helper}</p>}
          <input
            id={inputId}
            type={field.type || 'text'}
            value={value}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            inputMode={field.inputMode}
            maxLength={field.maxLength}
            onChange={(event) => onChange(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-required={field.required}
            aria-describedby={error ? errorId : undefined}
          />
        </>
      )}
      {error && <span className="mentor-onboarding-field-error" id={errorId}>{error}</span>}
    </div>
  );
}

function DictationButton({ value, onChange }) {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const Recognition = typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;
  const supported = Boolean(Recognition);

  useEffect(() => () => recognitionRef.current?.abort(), []);

  const toggleDictation = () => {
    if (!supported) return;
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new Recognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript || '')
        .join(' ')
        .trim();
      if (!transcript) return;
      const separator = String(value || '').trim() ? ' ' : '';
      onChange(`${value || ''}${separator}${transcript}`);
    };
    recognition.onend = () => {
      recognitionRef.current = null;
      setListening(false);
    };
    recognition.onerror = () => {
      recognitionRef.current = null;
      setListening(false);
    };
    recognitionRef.current = recognition;
    setListening(true);

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setListening(false);
    }
  };

  return (
    <span className="mentor-onboarding-dictation-control">
      <button
        className={`mentor-onboarding-dictation${listening ? ' mentor-onboarding-dictation--active' : ''}`}
        type="button"
        onClick={toggleDictation}
        disabled={!supported}
        data-tooltip={supported ? (listening ? 'Parar ditado' : 'Ditar resposta') : 'Ditado indisponível neste navegador'}
        aria-label={supported ? (listening ? 'Parar ditado' : 'Iniciar ditado') : 'Ditado não disponível neste navegador'}
      >
        {listening ? <MicOff size={15} aria-hidden="true" /> : <Mic size={15} aria-hidden="true" />}
      </button>
      {listening && (
        <span className="mentor-onboarding-dictation-waveform" role="status" aria-label="Ditado ativo">
          {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
        </span>
      )}
    </span>
  );
}

function ApplicationModal({ onClose, onSubmitted }) {
  const initialDraftRef = useRef(null);
  if (!initialDraftRef.current) initialDraftRef.current = getOrCreateLeadDraft();

  const draftRef = useRef(initialDraftRef.current.draft);
  const [step, setStep] = useState(initialDraftRef.current.draft.currentStep);
  const [values, setValues] = useState(initialDraftRef.current.draft.values);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [syncState, setSyncState] = useState({ status: 'idle' });
  const dialogRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const current = steps[step];

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  useEffect(() => subscribeToLeadDraftSync(setSyncState), []);

  const saveDraft = (nextValues, nextStep = step) => {
    const nextDraft = {
      ...draftRef.current,
      currentStep: nextStep,
      values: nextValues,
    };
    draftRef.current = persistLeadDraft(nextDraft);
    return nextDraft;
  };

  const update = (name, value) => {
    const nextValues = { ...draftRef.current.values, [name]: value };
    setValues(nextValues);
    saveDraft(nextValues);
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setSubmitError('');
  };

  const validate = () => {
    const nextErrors = {};
    current.fields.forEach((field) => {
      if (!String(values[field.name] ?? '').trim()) nextErrors[field.name] = 'Responda este campo para continuar.';
    });
    setErrors(nextErrors);
    const firstInvalidField = current.fields.find((field) => nextErrors[field.name]);
    if (firstInvalidField) {
      window.requestAnimationFrame(() => {
        const fieldElement = document.getElementById(`field-${firstInvalidField.name}`)
          || document.querySelector(`[name="${firstInvalidField.name}"]`);
        fieldElement?.focus();
      });
    }
    return !firstInvalidField;
  };

  const next = (event) => {
    event.preventDefault();
    if (!validate()) return;
    setErrors({});
    const nextStep = Math.min(step + 1, steps.length - 1);
    setStep(nextStep);
    const draft = saveDraft(draftRef.current.values, nextStep);
    void flushLeadDraft(draft).catch(() => undefined);
  };

  const previous = () => {
    const previousStep = Math.max(step - 1, 0);
    setStep(previousStep);
    const draft = saveDraft(draftRef.current.values, previousStep);
    void flushLeadDraft(draft).catch(() => undefined);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError('');

    try {
      const draft = saveDraft(draftRef.current.values, step);
      await submitLeadApplication(draft);
      onSubmitted(draft.id);
    } catch (error) {
      setSubmitError(error.message || 'Não foi possível enviar a candidatura. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const syncMessage = {
    error: 'Salvo neste dispositivo; sincronização pendente.',
    idle: initialDraftRef.current.restored
      ? 'Rascunho recuperado neste dispositivo.'
      : 'Seu progresso será salvo automaticamente.',
    offline: 'Sem internet — progresso salvo neste dispositivo.',
    saved: 'Progresso salvo.',
    submitting: 'Enviando candidatura...',
    syncing: 'Salvando...',
  }[syncState.status] || 'Seu progresso será salvo automaticamente.';

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

        <form className="application-form" onSubmit={submit} noValidate>
              <div className="form-progress" aria-label={`Etapa ${step + 1} de ${steps.length}`}>
                <div className="form-progress__meta">
                  <span>Etapa {step + 1} de {steps.length}</span>
                  <strong>{current.label}</strong>
                </div>
                <div className="form-progress__track"><i style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
                <p className={`form-sync-status form-sync-status--${syncState.status}`} aria-live="polite">
                  <span aria-hidden="true" />
                  {syncMessage}
                </p>
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
                      onCommit={() => void flushLeadDraft(draftRef.current).catch(() => undefined)}
                      value={values[field.name] ?? ''}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="form-actions">
                {step > 0 ? (
                  <button className="form-back" onClick={previous} type="button">
                    <ArrowLeft size={17} /> Voltar
                  </button>
                ) : <span />}
                {step < steps.length - 1 ? (
                  <button className="form-next" onClick={next} type="button">
                    <span>Continuar</span>
                    <ArrowRight className="form-next__hover-arrow" size={17} aria-hidden="true" />
                  </button>
                ) : (
                  <button className="form-next" type="submit" disabled={submitting}>
                    <span>{submitting ? 'Enviando...' : 'Aplicar para uma das 15 vagas'}</span>
                    <ArrowRight className="form-next__hover-arrow" size={17} aria-hidden="true" />
                  </button>
                )}
              </div>
              {submitError && (
                <p className="form-submit-error" role="alert">
                  {submitError}
                </p>
              )}
        </form>
      </motion.div>
    </motion.div>
  );
}

function FormField({ field, value, onChange, onCommit, error }) {
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
              <input
                type="radio"
                name={field.name}
                value={option}
                checked={value === option}
                onChange={() => {
                  onChange(option);
                  window.setTimeout(onCommit, 0);
                }}
              />
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
        <textarea id={inputId} value={value} placeholder={field.placeholder} onChange={handleChange} onBlur={onCommit} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} rows={4} />
      ) : (
        <input id={inputId} type={field.type} value={value} autoComplete={field.autoComplete} inputMode={field.inputMode} maxLength={field.maxLength} placeholder={field.placeholder} onChange={handleChange} onBlur={onCommit} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />
      )}
      {error && <span className="field-error" id={errorId}>{error}</span>}
    </div>
  );
}

function ThankYouPage() {
  return (
    <main className="thank-you-page">
      <section className="thank-you-page__content" aria-labelledby="thank-you-title">
        <h1 className="mesh-text mesh-text--on-dark" id="thank-you-title">
          Parabéns por tomar essa decisão extremamente importante na sua carreira pessoal e profissional.
        </h1>
        <div className="thank-you-page__copy">
          <p>Minha equipe vai analisar suas respostas e, caso exista aderência com a proposta da primeira turma, entraremos em contato pelo WhatsApp ou pelo e-mail informado.</p>
          <p>A candidatura não garante uma vaga. A entrada depende da aderência ao programa, da disponibilidade para participar e das 15 vagas da turma.</p>
          <strong>Fique atento às mensagens nos próximos dias.</strong>
        </div>
        <a className="thank-you-page__cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          <WhatsAppIcon />
          Falar com a equipe no WhatsApp
        </a>
      </section>
    </main>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="thank-you-page__whatsapp-icon" viewBox="0 0 360 362" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M307.546 52.5655C273.709 18.685 228.706 0.017 180.756 0C81.951 0 1.538 80.404 1.504 179.235C1.487 210.829 9.746 241.667 25.432 268.844L0 361.736L95.024 336.811C121.203 351.096 150.683 358.616 180.679 358.625H180.756C279.544 358.625 359.966 278.212 360 179.381C360.017 131.483 341.392 86.455 307.546 52.574V52.566ZM180.756 328.354H180.696C153.966 328.346 127.744 321.16 104.865 307.589L99.424 304.358L43.034 319.149L58.083 264.168L54.542 258.53C39.63 234.809 31.749 207.391 31.766 179.244C31.801 97.104 98.633 30.271 180.817 30.271C220.61 30.288 258.015 45.802 286.145 73.967C314.276 102.123 329.755 139.562 329.738 179.364C329.703 261.513 262.871 328.346 180.756 328.346V328.354ZM262.475 216.777C257.997 214.534 235.978 203.704 231.869 202.209C227.761 200.713 224.779 199.966 221.796 204.452C218.814 208.939 210.228 219.029 207.615 222.011C205.002 225.002 202.389 225.372 197.911 223.128C193.434 220.885 179.003 216.158 161.891 200.902C148.578 189.024 139.587 174.362 136.975 169.875C134.362 165.389 136.7 162.965 138.934 160.739C140.945 158.728 143.412 155.505 145.655 152.892C147.899 150.279 148.638 148.406 150.133 145.423C151.629 142.432 150.881 139.82 149.764 137.576C148.646 135.333 139.691 113.287 135.952 104.323C132.316 95.591 128.621 96.777 125.879 96.631C123.266 96.502 120.284 96.476 117.293 96.476C114.302 96.476 109.454 97.594 105.346 102.08C101.238 106.566 89.669 117.404 89.669 139.441C89.669 161.478 105.716 182.785 107.959 185.776C110.202 188.767 139.544 234.001 184.469 253.408C195.153 258.023 203.498 260.782 210.004 262.845C220.731 266.257 230.494 265.776 238.212 264.624C246.816 263.335 264.71 253.786 268.44 243.326C272.17 232.866 272.17 223.893 271.053 222.028C269.936 220.163 266.945 219.037 262.467 216.794L262.475 216.777Z"
      />
    </svg>
  );
}

export default App;
