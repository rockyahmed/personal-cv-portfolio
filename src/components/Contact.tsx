"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/cv";
import { GitHub, LinkedIn, Mail, MapPin, Phone, Send, WhatsApp } from "./Icons";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const update = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // No backend required: opens a pre-filled WhatsApp chat (or email if configured).
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = `Hi ${profile.shortName}, I'm ${form.name} (${form.email}).\n\n${
      form.subject ? `Subject: ${form.subject}\n\n` : ""
    }${form.message}`;

    const url = profile.email
      ? `mailto:${profile.email}?subject=${encodeURIComponent(form.subject || "Portfolio enquiry")}&body=${encodeURIComponent(body)}`
      : `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(body)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <div className="card contact-wrap reveal">
          <div>
            <span className="eyebrow">06 · Contact</span>
            <h2 className="contact-title" id="contact-title">
              Let&apos;s build something <span className="gradient-text">great together.</span>
            </h2>
            <p className="contact-copy">
              Have a project in mind, a role to fill, or just want to say hi? My inbox is always
              open — I&apos;ll get back to you as soon as possible.
            </p>

            <ul className="info-list">
              {profile.email && (
                <li>
                  <span className="info-icon">
                    <Mail />
                  </span>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </li>
              )}
              {profile.phones.map((p) => (
                <li key={p}>
                  <span className="info-icon">
                    <Phone />
                  </span>
                  <a href={`tel:${p.replace(/\s/g, "")}`}>{p}</a>
                </li>
              ))}
              <li>
                <span className="info-icon">
                  <MapPin />
                </span>
                {profile.location}
              </li>
            </ul>

            <div className="contact-socials">
              <a id="contact-linkedin" className="icon-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedIn />
              </a>
              <a id="contact-github" className="icon-btn" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHub />
              </a>
              <a id="contact-whatsapp" className="icon-btn" href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsApp />
              </a>
            </div>
          </div>

          <form className="form" onSubmit={onSubmit} id="contact-form">
            <div className="form-row">
              <div className="field">
                <input id="contact-name" required placeholder=" " value={form.name} onChange={update("name")} autoComplete="name" />
                <label htmlFor="contact-name">Your name</label>
              </div>
              <div className="field">
                <input id="contact-email" type="email" required placeholder=" " value={form.email} onChange={update("email")} autoComplete="email" />
                <label htmlFor="contact-email">Email address</label>
              </div>
            </div>
            <div className="field">
              <input id="contact-subject" placeholder=" " value={form.subject} onChange={update("subject")} />
              <label htmlFor="contact-subject">Subject</label>
            </div>
            <div className="field">
              <textarea id="contact-message" required placeholder=" " value={form.message} onChange={update("message")} />
              <label htmlFor="contact-message">Tell me about your project</label>
            </div>
            <button type="submit" id="contact-submit" className="btn btn-primary">
              Send message <Send />
            </button>
            <p className="form-note">
              {profile.email
                ? "Opens your email client with the message pre-filled."
                : "Opens WhatsApp with your message pre-filled — no sign-up needed."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
