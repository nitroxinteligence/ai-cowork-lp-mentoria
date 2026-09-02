import { useState } from 'react';
import {
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

function SectionLabel({ number, children, light = false }) {
  return (
    <p className={`section-label${light ? ' section-label--light' : ''}`}>
      <span>{number}</span>
      {children}
    </p>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Matheus da Paz — voltar ao início">
        <span className="wordmark__mark" aria-hidden="true">M/</span>
        <span>Matheus da Paz</span>
      </a>
      <nav className="site-nav" aria-label="Navegação principal">
        {navigation.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function WorkflowConsole() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = workflow[activeIndex];
  const progress = (activeIndex / (workflow.length - 1)) * 100;

  return (
    <div className="workflow-console" style={{ '--trace-progress': `${progress}%` }}>
      <div className="workflow-console__topline">
        <span>TRACE / PRODUCT DELIVERY</span>
        <span>HUMAN IN CONTROL</span>
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
      <div className="workflow-console__rail" aria-hidden="true">
        <span />
      </div>
      <div className="workflow-console__readout" aria-live="polite" aria-atomic="true">
        <p>{active.label} / {String(activeIndex + 1).padStart(2, '0')}</p>
        <h2>{active.title}</h2>
        <p>{active.description}</p>
      </div>
      <p className="workflow-console__hint">Passe, toque ou use Tab para percorrer o sistema.</p>
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
          <h1 id="hero-title">Transformo problemas de negócio em produtos e automações com IA que funcionam fora da demonstração.</h1>
          <p className="hero__lead">
            Sou Matheus da Paz, AI Product &amp; Automation Engineer. Conecto produto, backend, agentes, integrações e design para construir MVPs funcionais — e organizo arquitetura, documentação e handoff para que uma equipe de engenharia consiga continuar.
          </p>
          <p className="hero__specialization">
            Codex e Claude Code aceleram minha execução. As decisões, a revisão e a responsabilidade pelo sistema continuam comigo.
          </p>
          <div className="hero__actions">
            <a className="button button--light" href="#trabalho">Ver trabalhos selecionados <Arrow direction="down" /></a>
            <a className="button button--outline" href="/curriculo/">Ver currículo <Arrow /></a>
          </div>
          <a className="text-link text-link--light" href={`mailto:${profile.email}`}>
            Falar sobre uma oportunidade <Arrow />
          </a>
          <p className="availability">Disponível para oportunidades remotas em produto e automação com IA. Viagens e encontros ocasionais são possíveis.</p>
        </div>
        <div className="hero__system hero-enter hero-enter--late">
          <WorkflowConsole />
        </div>
      </div>
      <div className="hero__footer shell" aria-hidden="true">
        <span>PRODUCT</span><span>BACKEND</span><span>AGENTS</span><span>INTEGRATIONS</span><span>HANDOFF</span>
      </div>
    </section>
  );
}

function ValueSection() {
  return (
    <section className="section section--paper" aria-labelledby="value-title">
      <div className="shell">
        <SectionLabel number="01">Proposta de valor</SectionLabel>
        <div className="section-intro section-intro--split">
          <h2 id="value-title">Da ideia ambígua ao sistema que outra equipe consegue operar.</h2>
          <div className="prose-large">
            <p>Meu trabalho começa antes do código. Eu entendo o processo, delimito o problema, desenho o fluxo e escolho onde a IA realmente cria valor. Depois construo o MVP, conecto dados e serviços, valido o comportamento e preparo a continuidade.</p>
            <p>Não vendo “IA” como uma camada decorativa. Construo sistemas em que produto, automação e engenharia precisam funcionar juntos.</p>
          </div>
        </div>
        <div className="pillar-grid">
          {pillars.map((pillar) => (
            <article className="pillar" key={pillar.number}>
              <span className="pillar__number">{pillar.number}</span>
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
        <div>
          <p className="case-index">CASE {item.index} / PRINCIPAL</p>
          <h3>{item.name}</h3>
        </div>
        <p className="status-tag"><span aria-hidden="true" />{item.status}</p>
      </div>
      <div className="featured-case__layout">
        <div className="featured-case__copy">
          <p className="case-category">{item.category}</p>
          <h4>{item.title}</h4>
          <p className="case-summary">{item.summary}</p>
          <dl className="case-facts">
            <div>
              <dt>Meu papel</dt>
              <dd>{item.role}</dd>
            </div>
            <div>
              <dt>Resultado publicável</dt>
              <dd>{item.result}</dd>
            </div>
          </dl>
          <div className="case-actions">
            <a className="button button--dark" href={item.repository}>Ver código público <Arrow /></a>
            <a className="text-link" href="#fluvos-arquitetura">Ver decisões e arquitetura <Arrow direction="down" /></a>
          </div>
        </div>
        <figure className="case-figure">
          <img
            src="/images/fluvos/fluvos-system-desktop.jpg"
            width="1440"
            height="1000"
            alt="Design system real do FluvOS com fluxos Hoje, Agenda e Listas exibidos em três telas mobile"
            loading="lazy"
            decoding="async"
          />
          <figcaption>Registro real do design system do FluvOS · agosto de 2026</figcaption>
        </figure>
      </div>

      <div className="case-deep-dive" id="fluvos-arquitetura">
        <div className="case-deep-dive__intro">
          <p className="case-index">PROBLEMA → SISTEMA → CONTINUIDADE</p>
          <h4>Como tarefas, hábitos, foco e recompensa viram um fluxo único.</h4>
          <p>{item.problem}</p>
        </div>
        <div className="architecture-map" role="img" aria-label="Fluxo do FluvOS: entrada por tarefas e hábitos, motor de foco, conclusão, recompensa e aprendizado para o próximo ciclo">
          {['Tarefas + hábitos', 'Sessão de foco', 'Conclusão', 'Recompensa', 'Próximo ciclo'].map((label, index) => (
            <div className="architecture-node" key={label}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
        <div className="case-deep-dive__columns">
          <div>
            <h5>O que construí</h5>
            <ul className="plain-list">
              {item.built.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
          <div>
            <h5>Stack pública confirmada</h5>
            <p>{item.stack}</p>
            <p className="case-note">TypeScript é usado com desenvolvimento assistido por agentes; arquitetura, revisão e validação permanecem sob minha responsabilidade.</p>
          </div>
          <figure className="mobile-proof">
            <img
              src="/images/fluvos/fluvos-system-mobile.jpg"
              width="390"
              height="844"
              alt="Versão mobile real do design system do FluvOS mostrando o início do fluxo Hoje, Agenda e Listas"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Leitura mobile do mesmo sistema.</figcaption>
          </figure>
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
            <p className="case-index">CASE {item.index}</p>
            <p className="status-tag status-tag--small"><span aria-hidden="true" />{item.status}</p>
          </div>
          <p className="case-category">{item.category}</p>
          <h3>{item.name}</h3>
          <h4>{item.title}</h4>
          <p>{item.summary}</p>
          <dl className="supporting-case__result">
            <dt>Resultado publicável</dt>
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
        <p className="case-index">{verticalEstate.eyebrow}</p>
        <h3>{verticalEstate.name}</h3>
        <h4>{verticalEstate.title}</h4>
        <p>{verticalEstate.text}</p>
        <p className="vertical-proof__result">{verticalEstate.result}</p>
      </div>
      <ol className="system-map" aria-label="Arquitetura pública simplificada do Vertical Estate">
        {verticalEstate.nodes.map((node, index) => (
          <li key={node.label}>
            <span className="system-map__index">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{node.label}</strong>
              <span>{node.detail}</span>
            </div>
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
        <SectionLabel number="02" light>Trabalhos selecionados</SectionLabel>
        <div className="section-intro section-intro--work">
          <h2 id="work-title">Produtos que exigiram mais do que uma boa demo.</h2>
          <p>Produto próprio, software para uma operação especializada e MVP entregue para continuidade técnica — sempre com estado, papel e limite explícitos.</p>
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
        <SectionLabel number="03">Como construo</SectionLabel>
        <div className="section-intro section-intro--split">
          <div>
            <h2 id="method-title">AI-native development sem terceirizar o julgamento.</h2>
            <p className="intro-note">Ferramenta específica muda. A capacidade de transformar ambiguidade em software verificável permanece.</p>
          </div>
          <p className="prose-large">Uso Codex e Claude Code como ambientes de execução: eles ampliam leitura de contexto, velocidade de implementação e capacidade de explorar alternativas. Isso só funciona quando existe uma pessoa responsável por especificar, revisar e testar.</p>
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
        <SectionLabel number="04">Sistemas e domínios</SectionLabel>
        <div className="section-intro section-intro--compact">
          <h2 id="domains-title">IA aplicada onde produto encontra operação.</h2>
        </div>
        <div className="domain-grid">
          {domains.map((domain) => (
            <article key={domain.number}>
              <span className="domain-grid__number">{domain.number}</span>
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
        <SectionLabel number="05">Experiência</SectionLabel>
        <div className="section-intro section-intro--compact">
          <h2 id="experience-title">Uma trajetória construída entre design, software, produto e negócio.</h2>
        </div>
        <ol className="experience-list">
          {experience.map((item, index) => (
            <li key={item.company}>
              <p className="experience-list__period">{item.period}</p>
              <div className="experience-list__role">
                <span>{String(index + 1).padStart(2, '0')}</span>
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
      <div className="shell">
        <SectionLabel number="06" light>Sobre</SectionLabel>
        <div className="about__grid">
          <div className="about__copy">
            <h2 id="about-title">Comecei pelo design. Fiquei pelo prazer de fazer sistemas funcionarem.</h2>
            <div className="about__body">
              <p>Comecei a trabalhar com design gráfico aos 16 anos, passei por edição de vídeo e cheguei ao desenvolvimento de software. Essa trajetória ainda aparece na forma como trabalho: eu não separo completamente interface, tecnologia e objetivo de negócio.</p>
              <p>Ao longo dos anos, construí produtos próprios, trabalhei em agência, desenvolvi soluções para clientes e organizei MVPs para outras equipes continuarem. Hoje concentro essa experiência em IA aplicada — especialmente produtos, agentes e automações que precisam sair da ideia e chegar a uma operação real.</p>
              <p>Minha base manual está em Python, SQL, APIs e system design. No desenvolvimento full stack, uso Codex e Claude Code de forma intensiva e responsável, revisando o que é gerado e mantendo a decisão arquitetural sob meu controle.</p>
              <p>Estou em Recife e busco oportunidades remotas, preferencialmente PJ. Aceito viagens e encontros ocasionais.</p>
            </div>
          </div>
          <figure className="portrait">
            <img
              src="/images/matheus-da-paz.webp"
              width="1024"
              height="1536"
              alt="Matheus da Paz sentado em uma sala de reunião, usando óculos e terno cinza"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Matheus da Paz · Recife, Brasil</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function ResumeSection() {
  return (
    <section className="section section--resume" aria-labelledby="resume-title">
      <div className="shell resume-callout">
        <div>
          <SectionLabel number="07">Currículo</SectionLabel>
          <h2 id="resume-title">Experiência, projetos e competências numa página feita para leitura e impressão.</h2>
        </div>
        <div className="resume-callout__action">
          <p>A versão curricular vive no próprio site, é acessível por link direto e pode ser impressa pelo navegador.</p>
          <a className="button button--dark" href="/curriculo/">Ver currículo completo <Arrow /></a>
        </div>
      </div>
    </section>
  );
}

function CopyEmailButton() {
  const [status, setStatus] = useState('');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus('Email copiado.');
    } catch {
      setStatus('Não foi possível copiar. Use o link de email.');
    }
  }

  return (
    <div className="copy-email">
      <button type="button" onClick={copyEmail}>Copiar email</button>
      <span className="sr-only" role="status" aria-live="polite">{status}</span>
    </div>
  );
}

function ContactSection() {
  return (
    <section className="contact" id="contato" aria-labelledby="contact-title">
      <div className="shell">
        <SectionLabel number="08" light>Contato</SectionLabel>
        <div className="contact__layout">
          <div>
            <h2 id="contact-title">Precisa de alguém que atravesse a distância entre ideia, MVP e engenharia?</h2>
            <p>Estou aberto a oportunidades remotas como AI Product &amp; Automation Engineer, especialmente em startups e empresas que precisam transformar processos em produtos, agentes e automações funcionais.</p>
          </div>
          <div className="contact__actions">
            <a className="contact-link" href={`mailto:${profile.email}`}>
              <span>Email</span>
              <strong>{profile.email}</strong>
              <Arrow />
            </a>
            <CopyEmailButton />
            <a className="contact-link" href={profile.github}>
              <span>GitHub</span>
              <strong>@nitroxinteligence</strong>
              <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <p>Matheus da Paz<br /><span>AI Product &amp; Automation Engineer</span></p>
        <p>Recife · Remoto · PJ</p>
        <a href="#top">Voltar ao início <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Pular para o conteúdo principal</a>
      <Hero />
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
