import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  compactNavigation,
  domains,
  experience,
  method,
  navigation,
  pillars,
  profile,
  selectedWork,
  verticalEstate,
  workflow,
} from './content';
import './styles.css';

function Arrow({ direction = 'right' }) {
  return (
    <span className={`arrow arrow--${direction}`} aria-hidden="true">
      {direction === 'down' ? '↓' : '↗'}
    </span>
  );
}

function SectionMarker({ number, children, light = false }) {
  return (
    <p className={`section-marker${light ? ' section-marker--light' : ''}`}>
      <span>{number}</span>
      {children}
    </p>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Mateus Paz, voltar ao início">
        <span className="wordmark__mark" aria-hidden="true">M/P</span>
        <span>Mateus Paz</span>
      </a>
      <nav className="site-nav" aria-label="Navegação principal">
        {navigation.map((item) => (
          <a key={item.label} href={item.href}>{item.label}</a>
        ))}
      </nav>
    </header>
  );
}

function CompactHeader({ visible }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="compact-nav"
          aria-label="Navegação fixa"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -24, scale: 0.98 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.38 }}
        >
          <a className="compact-nav__mark" href="#top" aria-label="Voltar ao início">M/P</a>
          <div className="compact-nav__links">
            {compactNavigation.map((item) => (
              <a key={item.label} href={item.href}>{item.label}</a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

function WorkflowConsole() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = workflow[activeIndex];
  const progress = activeIndex / (workflow.length - 1);

  return (
    <div className="workflow-console" style={{ '--trace-progress': progress }}>
      <div className="workflow-console__topline">
        <span>Como o trabalho avança</span>
        <span>Decisão humana em todas as etapas</span>
      </div>
      <ol className="workflow-console__steps" aria-label="Fluxo de construção do produto">
        {workflow.map((step, index) => (
          <li key={step.id}>
            <button
              type="button"
              className="workflow-step"
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
            >
              <span className="workflow-step__index">{String(index + 1).padStart(2, '0')}</span>
              <span>{step.label}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="workflow-console__rail" aria-hidden="true"><span /></div>
      <div className="workflow-console__readout" aria-live="polite" aria-atomic="true">
        <p>{active.label}</p>
        <h2>{active.title}</h2>
        <p>{active.description}</p>
      </div>
      <p className="workflow-console__hint">Use o mouse, toque ou Tab para percorrer o fluxo.</p>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <SiteHeader />
      <div className="hero__grid shell">
        <div className="hero__copy hero-enter">
          <p className="kicker">Recife, Brasil · Remoto · PJ</p>
          <h1 id="hero-title">Transformo processos confusos em produtos de IA que uma equipe consegue usar, testar e evoluir.</h1>
          <p className="hero__lead">
            Sou Mateus Paz, AI Product &amp; Automation Engineer. Trabalho entre produto, backend e automação para tirar um MVP do papel, conectar APIs e dados, testar o que foi construído e deixar a próxima equipe com contexto para continuar.
          </p>
          <blockquote className="hero__quote">
            <p>Codex e Claude Code aceleram minha execução. As decisões, a revisão e a responsabilidade pelo sistema continuam comigo.</p>
          </blockquote>
          <div className="hero__actions">
            <a className="button button--light" href="#trabalho">Ver projetos <Arrow direction="down" /></a>
            <a className="button button--outline" href="/curriculo/">Ver currículo <Arrow /></a>
          </div>
          <a className="text-link text-link--light" href={`mailto:${profile.email}`}>
            Falar sobre uma oportunidade <Arrow />
          </a>
        </div>
        <div className="hero__system hero-enter hero-enter--late">
          <WorkflowConsole />
        </div>
      </div>
    </section>
  );
}

function ValueSection() {
  return (
    <section className="section section--paper value-section" id="proposta" aria-labelledby="value-title">
      <div className="shell">
        <SectionMarker number="02">Proposta</SectionMarker>
        <div className="section-intro section-intro--split">
          <h2 id="value-title">Primeiro eu entendo o trabalho. Depois decido onde a IA entra.</h2>
          <div className="prose-large">
            <p>Antes de abrir o editor, eu converso com as pessoas envolvidas, acompanho o processo e separo o problema real da primeira solução que apareceu.</p>
            <p>Quando faz sentido usar IA, eu construo o MVP, conecto dados e serviços, testo o comportamento e preparo a continuidade técnica.</p>
          </div>
        </div>
        <div className="pillar-grid">
          {pillars.map((pillar) => (
            <article className="pillar" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FluvOSCase() {
  const item = selectedWork.fluvos;

  return (
    <article className="featured-case">
      <div className="featured-case__header">
        <h3>{item.name}</h3>
        <p className="status-tag"><span aria-hidden="true" />{item.status}</p>
      </div>
      <div className="featured-case__copy featured-case__copy--wide">
        <p className="case-category">{item.category}</p>
        <h4>{item.title}</h4>
        <p className="case-summary">{item.summary}</p>
        <dl className="case-facts">
          <div>
            <dt>Meu papel</dt>
            <dd>{item.role}</dd>
          </div>
          <div>
            <dt>Resultado que posso publicar</dt>
            <dd>{item.result}</dd>
          </div>
        </dl>
      </div>
      <div className="case-deep-dive" id="fluvos-arquitetura">
        <div className="case-deep-dive__intro">
          <h4>App e WhatsApp trabalham sobre a mesma rotina.</h4>
          <p>{item.problem}</p>
        </div>
        <div className="architecture-map" role="img" aria-label="Fluxo do FluvOS entre aplicativo, agente no WhatsApp, organização, foco e próximo ciclo">
          {['App ou WhatsApp', 'Agente de IA', 'Organização', 'Foco', 'Próximo ciclo'].map((label, index) => (
            <div className="architecture-node" key={label}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
        <div className="case-deep-dive__columns case-deep-dive__columns--two">
          <div>
            <h5>O que construí</h5>
            <ul className="plain-list">
              {item.built.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
          <div>
            <h5>Stack pública confirmada</h5>
            <p>{item.stack}</p>
            <p className="case-note">TypeScript é usado com apoio de agentes. Arquitetura, revisão e validação continuam sob minha responsabilidade.</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function SupportingCases() {
  return (
    <div className="supporting-cases">
      {selectedWork.supporting.map((item) => (
        <article className="supporting-case" key={item.name}>
          <div className="supporting-case__top">
            <h3>{item.name}</h3>
            <p className="status-tag status-tag--small"><span aria-hidden="true" />{item.status}</p>
          </div>
          <p className="case-category">{item.category}</p>
          <h4>{item.title}</h4>
          <p>{item.summary}</p>
          <dl className="supporting-case__result">
            <dt>Resultado que posso publicar</dt>
            <dd>{item.result}</dd>
          </dl>
          <p className="availability-note">{item.availability}</p>
        </article>
      ))}
    </div>
  );
}

function VerticalEstateProof() {
  return (
    <article className="vertical-proof">
      <div className="vertical-proof__copy">
        <p className="case-category">{verticalEstate.context}</p>
        <h3>{verticalEstate.name}</h3>
        <h4>{verticalEstate.title}</h4>
        <p>{verticalEstate.text}</p>
        <p className="vertical-proof__result">{verticalEstate.result}</p>
      </div>
      <ol className="system-map" aria-label="Arquitetura pública simplificada do Vertical Estate">
        {verticalEstate.nodes.map((node, index) => (
          <li key={node.label}>
            <span className="system-map__index">{String(index + 1).padStart(2, '0')}</span>
            <div><strong>{node.label}</strong><span>{node.detail}</span></div>
            {index < verticalEstate.nodes.length - 1 && <span className="system-map__connector" aria-hidden="true">→</span>}
          </li>
        ))}
      </ol>
    </article>
  );
}

function WorkSection() {
  return (
    <section className="section section--ink" id="trabalho" aria-labelledby="work-title">
      <div className="shell">
        <SectionMarker number="03" light>Trabalhos</SectionMarker>
        <div className="section-intro section-intro--work">
          <h2 id="work-title">Projetos que precisavam funcionar de verdade.</h2>
          <p>Produto próprio, software para uma operação especializada e MVP entregue para outra equipe continuar.</p>
        </div>
        <FluvOSCase />
        <VerticalEstateProof />
        <SupportingCases />
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section className="section section--paper" id="metodo" aria-labelledby="method-title">
      <div className="shell">
        <SectionMarker number="04">Como trabalho</SectionMarker>
        <div className="section-intro section-intro--split">
          <div>
            <h2 id="method-title">Como eu trabalho com agentes de código.</h2>
            <p className="intro-note">A ferramenta acelera partes do trabalho. O julgamento técnico continua humano.</p>
          </div>
          <p className="prose-large">Uso Codex e Claude Code para ler contexto, implementar, documentar e explorar alternativas. Isso funciona porque eu especifico, reviso e testo cada entrega.</p>
        </div>
        <ol className="method-list">
          {method.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function DomainsSection() {
  return (
    <section className="section section--rule" aria-labelledby="domains-title">
      <div className="shell">
        <SectionMarker number="05">Sistemas</SectionMarker>
        <div className="section-intro section-intro--compact">
          <h2 id="domains-title">Onde esse trabalho já aparece.</h2>
        </div>
        <div className="domain-grid">
          {domains.map((domain) => (
            <article key={domain.title}>
              <h3>{domain.title}</h3>
              <p>{domain.text}</p>
              <p className="domain-grid__related"><strong>Experiências relacionadas</strong>{domain.related}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="section section--paper" id="experiencia" aria-labelledby="experience-title">
      <div className="shell">
        <SectionMarker number="06">Experiência</SectionMarker>
        <div className="section-intro section-intro--compact">
          <h2 id="experience-title">Produto, tecnologia e negócio nunca foram áreas separadas para mim.</h2>
        </div>
        <ol className="experience-list">
          {experience.map((item) => (
            <li key={item.company}>
              <p className="experience-list__period">{item.period}</p>
              <div className="experience-list__role">
                <h3>{item.company}</h3>
                <p>{item.role}</p>
              </div>
              <p className="experience-list__description">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section section--ink about" id="sobre" aria-labelledby="about-title">
      <div className="shell about__grid">
        <div className="about__copy">
          <SectionMarker number="07" light>Sobre</SectionMarker>
          <h2 id="about-title">Aprendo rápido, decido com clareza e faço o trabalho avançar.</h2>
          <div className="about__body">
            <p>Comecei a trabalhar com design gráfico aos 16 anos. Depois vieram edição de vídeo, desenvolvimento, agência e produtos próprios. Essa mistura ainda define como eu penso: interface, tecnologia e objetivo de negócio precisam conversar.</p>
            <p>Também gosto de trabalhar com gente. Já liderei equipes, conduzi clientes e organizei projetos quando a direção ainda não estava clara. Sou autodidata, busco boas referências por conta própria e prefiro tomar uma decisão com contexto a deixar um problema parado.</p>
            <p>Hoje concentro essa experiência em produtos, agentes e automações com IA. Minha base manual está em Python, SQL, APIs e system design. No full stack, uso agentes de código com revisão e responsabilidade técnica.</p>
            <p>Estou em Recife e busco oportunidades remotas, preferencialmente em regime PJ. Viagens e encontros ocasionais são possíveis.</p>
          </div>
        </div>
        <figure className="portrait">
          <img
            src="/images/mateus-paz-professional-v1.jpg"
            width="1024"
            height="1536"
            alt="Mateus Paz em um escritório, usando camisa preta e óculos"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}

function ResumeSection() {
  return (
    <section className="section section--resume" aria-labelledby="resume-title">
      <div className="shell resume-callout">
        <div><h2 id="resume-title">Experiência, projetos e competências em uma página pronta para leitura e impressão.</h2></div>
        <div className="resume-callout__action">
          <p>O currículo fica no próprio site e abre por um link direto.</p>
          <a className="button button--dark" href="/curriculo/">Ver currículo completo <Arrow /></a>
        </div>
      </div>
    </section>
  );
}

function CopyEmailButton() {
  const [message, setMessage] = useState('Copiar email');
  const copied = message === 'Email copiado';

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setMessage('Email copiado');
      window.setTimeout(() => setMessage('Copiar email'), 2200);
    } catch {
      setMessage('Use o link de email');
    }
  }

  return (
    <motion.button
      type="button"
      className={`copy-email__button${copied ? ' is-copied' : ''}`}
      onClick={copyEmail}
      animate={copied ? { scale: [1, 0.96, 1.03, 1] } : { scale: 1 }}
      transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
      aria-live="polite"
    >
      <span aria-hidden="true">{copied ? '✓' : '⧉'}</span>
      {message}
    </motion.button>
  );
}

function ContactSection() {
  return (
    <section className="contact" id="contato" aria-labelledby="contact-title">
      <div className="shell contact__layout">
        <div>
          <SectionMarker number="08" light>Contato</SectionMarker>
          <h2 id="contact-title">Se o problema ainda está confuso, posso ajudar a dar forma e construir o primeiro sistema.</h2>
          <p className="contact__intro">Procuro oportunidades remotas como AI Product &amp; Automation Engineer em startups e equipes de produto.</p>
        </div>
        <div className="contact__actions">
          <div className="contact-email">
            <a className="contact-link" href={`mailto:${profile.email}`}>
              <span>Email</span><strong>{profile.email}</strong><Arrow />
            </a>
            <CopyEmailButton />
          </div>
          <a className="contact-link" href={profile.linkedin}>
            <span>LinkedIn</span><strong>/in/mateus-paz-6206a5413</strong><Arrow />
          </a>
          <a className="contact-link" href={profile.github}>
            <span>GitHub</span><strong>@nitroxinteligence</strong><Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <p>Mateus Paz<br /><span>AI Product &amp; Automation Engineer</span></p>
        <p>Recife · Remoto · PJ</p>
        <a href="#top">Voltar ao início <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}

export default function App() {
  const [compactNavVisible, setCompactNavVisible] = useState(false);

  useEffect(() => {
    const trigger = document.getElementById('compact-nav-trigger');
    if (!trigger) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      setCompactNavVisible(trigger.getBoundingClientRect().top < 100);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Pular para o conteúdo principal</a>
      <CompactHeader visible={compactNavVisible} />
      <Hero />
      <div id="compact-nav-trigger" className="compact-nav-trigger" aria-hidden="true" />
      <main id="main-content" tabIndex="-1">
        <ValueSection />
        <WorkSection />
        <MethodSection />
        <DomainsSection />
        <ExperienceSection />
        <AboutSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
