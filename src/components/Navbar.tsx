"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/cv";
import { ArrowRight } from "./Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll-spy: highlight the section currently in the middle of the viewport
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["home", ...navLinks.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <nav className="container nav-inner" aria-label="Primary">
          <a href="#home" className="logo" id="nav-logo" onClick={() => setOpen(false)}>
            <span className="logo-mark">{profile.initials}</span>
            <span>
              {profile.shortName}
              <span className="logo-dot">.</span>
            </span>
          </a>

          <ul className="nav-links">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a id={`nav-${l.id}`} href={`#${l.id}`} className={active === l.id ? "active" : ""}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" id="nav-cta" className="btn btn-primary nav-cta">
            Hire me <ArrowRight />
          </a>

          <button
            id="menu-toggle"
            className={`menu-toggle ${open ? "open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
        <ul>
          {navLinks.map((l, i) => (
            <li key={l.id}>
              <a
                id={`mobile-nav-${l.id}`}
                href={`#${l.id}`}
                className={active === l.id ? "active" : ""}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
              >
                <small>0{i + 1}</small>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
