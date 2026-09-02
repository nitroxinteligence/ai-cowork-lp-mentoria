import { profile, resume } from './content';
import './styles.css';
import './resume.css';

function PrintButton() {
  return (
    <button className="resume-print" type="button" onClick={() => window.print()}>
      Imprimir currículo <span aria-hidden="true">↗</span>
    </button>
  );
}

function ResumeHeader() {
  return (
    <header className="resume-header">
      <div>
        <p className="resume-kicker">Currículo · PT-BR · 2026</p>
        <h1>{profile.name}</h1>
        <p className="resume-role">{profile.role}</p>
      </div>
      <address>
        <span>{profile.location} · Remoto · PJ</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.github}>github.com/nitroxinteligence</a>
        <a href={profile.portfolio}>crl.falamateus.com.br</a>
      </address>
    </header>
  );
}

function ResumeExperience() {
  return (
    <section className="resume-section" aria-labelledby="resume-experience-title">
      <div className="resume-section__label">
        <span>02</span>
        <h2 id="resume-experience-title">Experiência</h2>
      </div>
      <div className="resume-section__content resume-timeline">
        {resume.experience.map((item) => (
          <article key={item.company}>
            <div className="resume-timeline__heading">
              <div>
                <h3>{item.company}</h3>
                <p>{item.role}</p>
              </div>
              <p>{item.location} · {item.period}</p>
            </div>
            <ul>
              {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function ResumeProjects() {
  return (
    <section className="resume-section" aria-labelledby="resume-projects-title">
      <div className="resume-section__label">
        <span>03</span>
        <h2 id="resume-projects-title">Projetos selecionados</h2>
      </div>
      <div className="resume-section__content resume-projects">
        {resume.projects.map((project) => (
          <article key={project.name}>
            <h3>{project.name}</h3>
            <p className="resume-projects__title">{project.title}</p>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ResumeSkills() {
  return (
    <section className="resume-section" aria-labelledby="resume-skills-title">
      <div className="resume-section__label">
        <span>04</span>
        <h2 id="resume-skills-title">Competências</h2>
      </div>
      <dl className="resume-section__content resume-skills">
        {resume.skills.map((skill) => (
          <div key={skill.label}>
            <dt>{skill.label}</dt>
            <dd>{skill.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ResumeEducation() {
  return (
    <section className="resume-section resume-section--compact" aria-labelledby="resume-education-title">
      <div className="resume-section__label">
        <span>05</span>
        <h2 id="resume-education-title">Formação</h2>
      </div>
      <div className="resume-section__content resume-education">
        <h3>{resume.education.course} — {resume.education.institution}</h3>
        <p>{resume.education.period} · {resume.education.note}</p>
      </div>
    </section>
  );
}

function ResumeLanguages() {
  return (
    <section className="resume-section resume-section--compact" aria-labelledby="resume-languages-title">
      <div className="resume-section__label">
        <span>06</span>
        <h2 id="resume-languages-title">Idiomas</h2>
      </div>
      <div className="resume-section__content resume-languages">
        {resume.languages.map((item) => (
          <p key={item.language}><strong>{item.language}:</strong> {item.level}</p>
        ))}
      </div>
    </section>
  );
}

export default function Resume() {
  return (
    <>
      <a className="skip-link" href="#resume-main">Pular para o currículo</a>
      <nav className="resume-nav" aria-label="Navegação do currículo">
        <a href="/" aria-label="Voltar ao portfólio de Matheus da Paz">← Portfólio</a>
        <span>Versão HTML acessível</span>
        <PrintButton />
      </nav>
      <main className="resume-page" id="resume-main" tabIndex="-1">
        <ResumeHeader />

        <section className="resume-section resume-section--summary" aria-labelledby="resume-summary-title">
          <div className="resume-section__label">
            <span>01</span>
            <h2 id="resume-summary-title">Resumo</h2>
          </div>
          <p className="resume-section__content resume-summary">{resume.summary}</p>
        </section>

        <ResumeExperience />
        <ResumeProjects />
        <ResumeSkills />

        <div className="resume-two-column">
          <ResumeEducation />
          <ResumeLanguages />
        </div>

        <footer className="resume-footer">
          <p>Disponível para oportunidades remotas em produto e automação com IA.</p>
          <a href={`mailto:${profile.email}`}>Falar sobre uma oportunidade <span aria-hidden="true">↗</span></a>
        </footer>
      </main>
    </>
  );
}
