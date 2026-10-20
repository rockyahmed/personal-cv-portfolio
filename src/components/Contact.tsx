"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/cv";
import { GitHub, LinkedIn, Mail, MapPin, Phone, Send, WhatsApp } from "./Icons";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message.");
    }
  };

  const isSending = status === "sending";

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
                <input
                  id="contact-name"
                  required
                  placeholder=" "
                  value={form.name}
                  onChange={update("name")}
                  autoComplete="name"
                  disabled={isSending}
                />
                <label htmlFor="contact-name">Your name</label>
              </div>
              <div className="field">
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder=" "
                  value={form.email}
                  onChange={update("email")}
                  autoComplete="email"
                  disabled={isSending}
                />
                <label htmlFor="contact-email">Email address</label>
              </div>
            </div>
            <div className="field">
              <input
                id="contact-subject"
                placeholder=" "
                value={form.subject}
                onChange={update("subject")}
                disabled={isSending}
              />
              <label htmlFor="contact-subject">Subject</label>
            </div>
            <div className="field">
              <textarea
                id="contact-message"
                required
                placeholder=" "
                value={form.message}
                onChange={update("message")}
                disabled={isSending}
              />
              <label htmlFor="contact-message">Tell me about your project</label>
            </div>

            {/* Status messages */}
            {status === "success" && (
              <p className="form-status form-status--success" role="status">
                ✅ Message sent! I&apos;ll get back to you soon. Check your inbox for a confirmation.
              </p>
            )}
            {status === "error" && (
              <p className="form-status form-status--error" role="alert">
                ❌ {errorMsg}
              </p>
            )}

            <button
              type="submit"
              id="contact-submit"
              className="btn btn-primary"
              disabled={isSending}
              aria-busy={isSending}
            >
              {isSending ? "Sending…" : <>Send message <Send /></>}
            </button>
            <p className="form-note">
              Message goes directly to my inbox — I&apos;ll reply as soon as possible.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
