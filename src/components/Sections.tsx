import Image from "next/image";
import {
  clientPlatforms,
  education,
  experience,
  languages,
  profile,
  projects,
  skillGroups,
  softSkills,
} from "@/data/cv";
import { cssVar, delay } from "@/lib/style";
import { TiltCard } from "./Interactive";
import {
  ArrowUpRight,
  Briefcase,
  Calendar,
  Globe,
  GradCap,
  Heart,
  MapPin,
  Phone,
  Star,
  User,
  skillIcons,
} from "./Icons";

type HeadProps = { id: string; eyebrow: string; title: string; accent: string; sub?: string };

function SectionHead({ id, eyebrow, title, accent, sub }: HeadProps) {
  return (
    <div className="section-head reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title" id={id}>
        {title} <span className="gradient-text">{accent}</span>
      </h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  );
}

/** Wraps the highlighted phrase of an achievement in <mark>. */
function Highlight({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const [before, ...rest] = text.split(highlight);
  return (
    <>
      {before}
      <mark>{highlight}</mark>
      {rest.join(highlight)}
    </>
  );
}

/* -------------------------------------------------------------------------- */

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHead
          id="about-title"
          eyebrow="01 · About me"
          title="Building interfaces that"
          accent="people love to use."
          sub="A quick snapshot of who I am, how I work, and how to reach me."
        />

        <div className="bento">
          <div className="card spotlight b-intro reveal">
            <h3 className="card-title">
              <User /> Who I am
            </h3>
            <p>
              I&apos;m <strong>{profile.name}</strong>, a <strong>Front-End Developer</strong> with{" "}
              <strong>7+ years</strong> of experience crafting responsive, high-performance web
              applications with Angular, React, Next.js and modern JavaScript.
            </p>
            <p>
              At <strong>{experience.company}</strong> I serve as the sole front-end engineer on a
              6-member team — owning UI design, front-end architecture, feature development and API
              integration end-to-end. I care deeply about clean code, performance, and shipping fast
              with AI-assisted workflows without compromising quality.
            </p>
          </div>

          <div className="card spotlight b-monogram reveal" style={delay(100)}>
            <span className="monogram-ring" aria-hidden />
            <span className="monogram" aria-hidden>
              {profile.initials}
            </span>
            <div className="monogram-meta">
              <b>{profile.title}</b>
              7+ years · Angular · React · Next.js
            </div>
          </div>

          <div className="card spotlight b-contact reveal" style={delay(0)}>
            <h3 className="card-title">
              <MapPin /> Contact info
            </h3>
            <ul className="info-list">
              <li>
                <span className="info-icon">
                  <MapPin />
                </span>
                {profile.location}
              </li>
              {profile.phones.map((p) => (
                <li key={p}>
                  <span className="info-icon">
                    <Phone />
                  </span>
                  <a href={`tel:${p.replace(/\s/g, "")}`}>{p}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="card spotlight b-soft reveal" style={delay(100)}>
            <h3 className="card-title">
              <Heart /> Soft skills
            </h3>
            <div className="chips">
              {softSkills.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="card spotlight b-lang reveal" style={delay(200)}>
            <h3 className="card-title">
              <Globe /> Languages
            </h3>
            {languages.map((l) => (
              <div key={l.name} className="lang">
                <div className="lang-top">
                  {l.name}
                  <span>{l.level}</span>
                </div>
                <div className="bar">
                  <i style={cssVar("--w", `${l.value}%`)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHead
          id="experience-title"
          eyebrow="02 · Experience"
          title="Where I've been"
          accent="making an impact."
          sub="Measurable results across enterprise ERP, OMS and client web projects."
        />

        <div className="card spotlight company-card reveal">
          <div className="company-logo" aria-hidden>
            ESS
          </div>
          <div>
            <h3>
              {experience.company}
              <span className="badge">{experience.type}</span>
            </h3>
            <p>{experience.description}</p>
          </div>
        </div>

        <ol className="timeline">
          {experience.roles.map((role, i) => (
            <li key={role.period} className="tl-item reveal" style={delay(i * 80)}>
              <span className="tl-dot" aria-hidden />
              <article className="card spotlight tl-card">
                <div className="tl-head">
                  <h4>{role.title}</h4>
                  <span className="period">
                    <Calendar /> {role.period}
                  </span>
                </div>
                {role.description && <p className="tl-desc">{role.description}</p>}
                <p className="ach-label">Key achievements</p>
                <ul className="ach-list">
                  {role.achievements.map((a) => (
                    <li key={a.text}>
                      <Highlight {...a} />
                    </li>
                  ))}
                </ul>
                <div className="chips">
                  {role.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead
          id="skills-title"
          eyebrow="03 · Skills"
          title="My toolkit for"
          accent="building the web."
          sub="Frameworks, libraries and platforms I use daily to ship production-grade products."
        />

        <div className="skills-grid">
          {skillGroups.map((g, i) => {
            const Icon = skillIcons[g.icon];
            return (
              <div key={g.title} className="card spotlight skill-card reveal" style={delay((i % 3) * 90)}>
                <div className="skill-icon">
                  <Icon />
                </div>
                <h3>{g.title}</h3>
                <div className="chips">
                  {g.items.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="card spotlight platforms reveal">
          <h3>
            <Star /> Client platforms I&apos;ve worked on
          </h3>
          <div className="chips">
            {clientPlatforms.map((p) => (
              <span key={p} className="chip">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead
          id="projects-title"
          eyebrow="04 · Featured work"
          title="Selected"
          accent="projects."
          sub="A few highlights from my key skills & experience."
        />

        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={p.title} className="reveal" style={delay(i * 120)}>
              <TiltCard className="card spotlight project">
                <div className="project-media r">
                  <Image
                    src={p.image}
                    alt={`${p.title} preview`}
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                  <span className="project-cat">{p.category}</span>
                </div>
                <div className="project-body">
                  <h3>
                    {p.title} <ArrowUpRight />
                  </h3>
                  <p>{p.description}</p>
                  <div className="chips">
                    {p.tags.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <SectionHead
          id="education-title"
          eyebrow="05 · Education"
          title="Academic"
          accent="background."
          sub="Business education paired with years of hands-on engineering."
        />

        <div className="edu-grid">
          {education.map((e, i) => (
            <article key={e.degree} className="card spotlight edu-card reveal" style={delay((i % 2) * 100)}>
              <div className="edu-icon">{i === 0 ? <Briefcase /> : <GradCap />}</div>
              <div>
                <h3>{e.degree}</h3>
                <p className="edu-school">{e.school}</p>
                <div className="edu-meta">
                  <span className={`period ${e.period === "Running" ? "running" : ""}`}>
                    <Calendar /> {e.period}
                  </span>
                  <span className="chip">{e.detail}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
