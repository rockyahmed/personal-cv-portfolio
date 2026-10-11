import { profile, stats, techMarquee } from "@/data/cv";
import { delay } from "@/lib/style";
import { CountUp, Typewriter } from "./Interactive";
import { ArrowRight, Download, GitHub, LinkedIn, WhatsApp } from "./Icons";

export default function Hero() {
  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="container">
        <div className="hero-grid">
          <div>
            {profile.available && (
              <div className="status-pill reveal">
                <span className="pulse" />
                Available for new projects
              </div>
            )}
            <p className="hero-greet reveal" style={delay(80)}>
              Hello, I&apos;m 👋
            </p>
            <h1 className="hero-name reveal" style={delay(140)}>
              <span className="gradient-text">{profile.name}</span>
            </h1>
            <p className="hero-role reveal" style={delay(200)}>
              <Typewriter words={profile.roles} />
            </p>
            <p className="hero-summary reveal" style={delay(260)}>
              {profile.summary}
            </p>

            <div className="hero-actions reveal" style={delay(320)}>
              <a href="#projects" id="hero-cta-work" className="btn btn-primary">
                View my work <ArrowRight />
              </a>
              <a href={profile.cvFile} id="hero-cta-cv" className="btn btn-ghost" download>
                <Download /> Download CV
              </a>
            </div>

            <div className="hero-socials reveal" style={delay(380)}>
              <span className="divider" />
              <span className="label">Find me on</span>
              <a
                id="hero-linkedin"
                className="icon-btn"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedIn />
              </a>
              <a
                id="hero-github"
                className="icon-btn"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GitHub />
              </a>
              <a
                id="hero-whatsapp"
                className="icon-btn"
                href={`https://wa.me/${profile.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <WhatsApp />
              </a>
            </div>
          </div>

          <div className="hero-visual reveal" style={delay(300)} aria-hidden>
            <div className="orbit">
              <span className="orbit-dot" />
            </div>
            <div className="orbit orbit-2">
              <span className="orbit-dot" />
            </div>

            <div className="code-card">
              <div className="code-head">
                <i />
                <i />
                <i />
                <span>developer.ts</span>
              </div>
              <div className="code-body">
                <span className="tk-c">{"// crafting interfaces since 2019"}</span>
                {"\n"}
                <span className="tk-k">const</span> <span className="tk-v">developer</span> = {"{"}
                {"\n  "}name: <span className="tk-s">&quot;{profile.name}&quot;</span>,
                {"\n  "}role: <span className="tk-s">&quot;{profile.title}&quot;</span>,
                {"\n  "}experience: <span className="tk-p">&quot;7+ years&quot;</span>,
                {"\n  "}stack: [<span className="tk-s">&quot;Angular&quot;</span>,{" "}
                <span className="tk-s">&quot;React&quot;</span>,
                {"\n          "}
                <span className="tk-s">&quot;Next.js&quot;</span>, <span className="tk-s">&quot;NestJS&quot;</span>],
                {"\n  "}based: <span className="tk-s">&quot;Dhaka, BD&quot;</span>,
                {"\n  "}
                <span className="tk-v">ship</span>: () =&gt; <span className="tk-k">true</span>,
                {"\n"}
                {"};"}
              </div>
            </div>

            <div className="float-badge fb-1">
              <b>Ng</b>
              <div>
                Angular
                <small>Primary framework</small>
              </div>
            </div>
            <div className="float-badge fb-2">
              <b>Re</b>
              <div>
                React / Next
                <small>Modern SPA &amp; SSR</small>
              </div>
            </div>
            <div className="float-badge fb-3">
              <b>Ns</b>
              <div>
                NestJS
                <small>Backend APIs</small>
              </div>
            </div>
            <div className="float-badge fb-4">
              <b>Wp</b>
              <div>
                WordPress
                <small>Themes &amp; plugins</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#stats" className="scroll-hint" aria-label="Scroll down">
        <span className="mouse" />
        Scroll
      </a>
    </section>
  );
}

export function StatsStrip() {
  const items = [...techMarquee, ...techMarquee];
  return (
    <section id="stats" aria-label="Highlights">
      <div className="container">
        <div className="stats">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="card spotlight stat reveal"
              style={delay(i * 90)}
            >
              <div className="stat-value gradient-text">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="marquee" aria-label="Technologies">
        <div className="marquee-track">
          {items.map((t, i) => (
            <span key={`${t}-${i}`} className="marquee-item" aria-hidden={i >= techMarquee.length}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
