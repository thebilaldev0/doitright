import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, ChevronRight, Cpu, Layers3, Menu, Network, ShieldCheck, Sparkles, X, Zap } from "lucide-react";
import "./App.css";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const services = [
  { icon: Cpu, label: "Digital & Tech", title: "Build your unfair advantage.", text: "Websites, products and digital systems that make your next move obvious." },
  { icon: Sparkles, label: "Growth Studio", title: "Turn attention into momentum.", text: "Brand, content and performance campaigns designed around outcomes—not noise." },
  { icon: Network, label: "Operations", title: "Make complexity feel simple.", text: "The people, process and infrastructure to keep your business moving forward." },
];

const steps = [
  ["01", "Tell us what you seek", "Share the ambition, the roadblock, or the opportunity. No jargon required."],
  ["02", "We shape the right team", "We match your brief with the exact mix of strategy, creative and technology."],
  ["03", "Make it real", "You get a focused plan, visible progress and a partner who stays close."],
  ["04", "Grow from there", "As your needs evolve, Rightwing evolves with you—without the overhead."],
];

type FormState = { name: string; email: string; phone: string; service: string; timeline: string; message: string };
const initialForm: FormState = { name: "", email: "", phone: "", service: "", timeline: "", message: "" };

function App() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch(`${API}/requirements`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!response.ok) throw new Error("Unable to submit");
      setStatus("success");
      setForm(initialForm);
    } catch { setStatus("error"); }
  };

  return <main className="site-shell" data-testid="rightwing-landing-page">
    <nav className="nav container" data-testid="main-navigation">
      <a className="brand" href="#top" data-testid="brand-link"><span className="brand-mark">R</span><span>rightwing<span className="brand-dot">.</span></span></a>
      <div className="nav-links" data-testid="desktop-navigation-links"><a href="#services" data-testid="services-nav-link">Services</a><a href="#method" data-testid="method-nav-link">Our method</a><a href="#voices" data-testid="voices-nav-link">Why us</a></div>
      <button className="button button-small button-outline" onClick={() => setOpen(true)} data-testid="nav-requirement-button">Start a conversation <ArrowUpRight size={15} /></button>
      <button className="mobile-menu" aria-label="Open menu" data-testid="mobile-menu-button"><Menu size={20} /></button>
    </nav>

    <section className="hero container" id="top" data-testid="hero-section">
      <div className="hero-copy reveal"><div className="eyebrow"><span className="pulse-dot" /> THE ALL-IN-ONE ADVANTAGE</div><h1>Find what you seek.<br /><em>Make it right.</em></h1><p className="hero-subtitle">Rightwing brings strategy, technology and growth under one roof—so ambitious businesses can move from <span>“what if?”</span> to “what’s next?”</p><div className="hero-actions"><button className="button button-primary" onClick={() => setOpen(true)} data-testid="hero-requirement-button">Tell us what you seek <ArrowUpRight size={17} /></button><a className="text-link" href="#services" data-testid="hero-services-link">Explore the ecosystem <ChevronRight size={16} /></a></div></div>
      <div className="hero-visual reveal-delay" data-testid="hero-visual"><div className="orb orb-one" /><div className="orb orb-two" /><div className="hero-card main-card"><div className="card-top"><span className="mini-label">RIGHTWING / 001</span><span className="status-chip"><span /> IN MOTION</span></div><div className="card-quote">“The right<br /><span>people,</span> at the<br />right moment.”</div><div className="card-footer"><span>strategy × tech × growth</span><ArrowUpRight size={18} /></div></div><div className="floating-note note-one"><Zap size={14} /> Built for momentum</div><div className="floating-note note-two"><span className="mini-bars"><i /><i /><i /></span> 24/7 capability</div></div>
      <div className="hero-meta" data-testid="hero-metrics"><div><strong>01</strong><span>Unified<br />partner</span></div><div><strong>03</strong><span>Core<br />disciplines</span></div><div><strong>∞</strong><span>Ways to<br />move forward</span></div></div>
    </section>

    <section className="marquee" aria-label="Rightwing disciplines" data-testid="discipline-marquee"><div>STRATEGY <i>✦</i> TECHNOLOGY <i>✦</i> GROWTH <i>✦</i> OPERATIONS <i>✦</i> STRATEGY <i>✦</i> TECHNOLOGY <i>✦</i></div></section>

    <section className="section container" id="services" data-testid="services-section"><div className="section-heading"><div><div className="eyebrow">WHAT WE DO</div><h2>One partner.<br /><em>Every possibility.</em></h2></div><p>Most businesses don’t need more vendors. They need one sharp team that sees the whole picture—and knows how to make every part work together.</p></div><div className="service-grid">{services.map(({ icon: Icon, label, title, text }, index) => <article className="service-card" key={label} data-testid={`service-card-${index + 1}`}><div className="service-icon"><Icon size={21} /></div><div className="service-index">0{index + 1}</div><div className="service-label">{label}</div><h3>{title}</h3><p>{text}</p><a href="#method" data-testid={`service-learn-more-${index + 1}`}>See how we help <ArrowUpRight size={15} /></a></article>)}</div></section>

    <section className="dark-section" id="method" data-testid="method-section"><div className="container"><div className="section-heading method-heading"><div><div className="eyebrow">THE RIGHTWAY, EVERY TIME</div><h2>From first thought<br />to <em>forward motion.</em></h2></div><p>No bloated decks. No handoffs into the void. Just a clear, considered path from where you are to where you want to be.</p></div><div className="steps-grid">{steps.map(([number, title, text]) => <div className="step" key={number} data-testid={`method-step-${number}`}><span className="step-number">{number}</span><div className="step-line" /><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

    <section className="proof-section container" id="voices" data-testid="proof-section"><div className="proof-intro"><div className="eyebrow">WHY RIGHTWING</div><h2>Less friction.<br /><em>More traction.</em></h2><p>We’re not here to add another tab to your browser. We’re here to help you close the distance between your ambition and your reality.</p><button className="text-link button-reset" onClick={() => setOpen(true)} data-testid="proof-requirement-button">Bring us a challenge <ArrowUpRight size={16} /></button></div><div className="proof-quote"><div className="quote-mark">“</div><blockquote>Rightwing made the complicated feel possible. They brought clarity where we had noise—and momentum where we had a pause.</blockquote><div className="quote-person"><div className="avatar">AK</div><div><strong>Arjun Kapoor</strong><span>Founder, Northstar Labs</span></div></div></div></section>

    <section className="closing container" data-testid="closing-cta"><div><div className="eyebrow">YOUR NEXT MOVE</div><h2>Something worth<br /><em>doing right?</em></h2></div><button className="button button-primary button-large" onClick={() => setOpen(true)} data-testid="closing-requirement-button">Start a conversation <ArrowUpRight size={18} /></button></section>
    <footer className="footer container" data-testid="site-footer"><a className="brand" href="#top" data-testid="footer-brand-link"><span className="brand-mark">R</span><span>rightwing<span className="brand-dot">.</span></span></a><span>Ideas are easy. Execution is everything.</span><span>© 2024 Rightwing. All rights reserved.</span></footer>

    {open && <div className="modal-backdrop" role="presentation" data-testid="requirement-modal-backdrop"><div className="modal" role="dialog" aria-modal="true" aria-labelledby="requirement-title" data-testid="requirement-modal"><button className="modal-close" onClick={() => { setOpen(false); setStatus("idle"); }} aria-label="Close requirement form" data-testid="requirement-modal-close"><X size={20} /></button>{status === "success" ? <div className="success-state" data-testid="requirement-success"><div className="success-icon"><Check size={28} /></div><div className="eyebrow">MESSAGE RECEIVED</div><h2>We’ll be in touch.</h2><p>Your requirement is on its way to the Rightwing team. We’ll get back to you shortly.</p><button className="button button-primary" onClick={() => setOpen(false)} data-testid="success-close-button">Back to site</button></div> : <><div className="eyebrow">LET’S MAKE IT RIGHT</div><h2 id="requirement-title">Tell us what you seek.</h2><p className="modal-intro">Give us the headline. We’ll take care of the detail.</p><form onSubmit={submit} data-testid="requirement-form"><div className="form-grid"><label>Name<input required minLength={2} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" data-testid="requirement-name-input" /></label><label>Email<input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.com" data-testid="requirement-email-input" /></label><label>Phone<input required minLength={7} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 00000 00000" data-testid="requirement-phone-input" /></label><label>What do you need?<select required value={form.service} onChange={(e) => update("service", e.target.value)} data-testid="requirement-service-select"><option value="">Select a service</option><option>Digital & Tech</option><option>Growth Studio</option><option>Operations</option><option>Not sure yet</option></select></label></div><label>Preferred timeline<select required value={form.timeline} onChange={(e) => update("timeline", e.target.value)} data-testid="requirement-timeline-select"><option value="">When do you want to start?</option><option>As soon as possible</option><option>Within 1–3 months</option><option>Just exploring</option></select></label><label>Tell us a little more<textarea required minLength={10} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="What are you trying to make happen?" rows={3} data-testid="requirement-message-input" /></label>{status === "error" && <div className="form-error" role="alert" data-testid="requirement-form-error">We couldn’t save this yet. Supabase may not be configured—please try again later.</div>}<button className="button button-primary submit-button" type="submit" disabled={status === "sending"} data-testid="requirement-submit-button">{status === "sending" ? "Sending…" : "Send requirement"}<ArrowUpRight size={17} /></button></form></>}</div></div>}
  </main>;
}

export default App;