
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import logo from "./asset/logo.png";
import { FaWhatsapp } from "react-icons/fa";


// Scroll-reveal hook 
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Counter animation hook ───────────────────────────────────────────────────
function useCountUp(target, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const num = parseInt(target.replace(/\D/g, ""));
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

// ── Data ────────────────────────────────────────────────────────────────────
const courses = [
  { icon: "🌐", title: "Full Stack Web Development",     duration: "6 months", level: "Beginner → Pro", tag: "Bestseller", students: "3,200+" , pdf: "/Syllabus/Full_Stack_Web_Developer (1).pdf"},
  { icon: "🤖", title: "AI & Machine Learning",  duration: "5 months", level: "Intermediate",   tag: "Hot",        students: "2,100+" },
  { icon: "📊", title: "Data Science",            duration: "4 months", level: "Beginner",       tag: "New",        students: "1,800+" },
  { icon: "⚛️", title: "React Full Stack Development",     duration: "3 months", level: "Intermediate",   tag: "",           students: "980+"  , pdf:"/Syllabus/React_Full_Stack_MERN_Developer.pdf" },
  { icon: "🪛", title: "Manual & Automation Testing",          duration: "4 months", level: "Intermediate",   tag: "",           students: "1,200+",pdf: "/Syllabus/Manual_Automation_Testing.pdf"},
  { icon: "🐍", title: "Python Full Stack Development",          duration: "5 months", level: "Advanced",       tag: "",           students: "760+", pdf:"/Syllabus/Python_Full_Stack_Developer.pdf" },
];

const stats = [
  { value: "12000", suffix: "+", label: "Students Trained" },
  { value: "95",    suffix: "%", label: "Placement Rate"   },
  { value: "200",   suffix: "+", label: "Hiring Partners"  },
  { value: "49",    suffix: "★", label: "Avg Rating", display: "4.9★" },
];

const features = [
  { icon: "🎓", text: "Live Mentorship" },
  { icon: "💼", text: "Job Guarantee"   },
  { icon: "🏗️", text: "Real Projects"  },
  { icon: "📜", text: "Certificates"    },
  { icon: "🔁", text: "Lifetime Access" },
  { icon: "🌍", text: "Global Network"  },
];

const testimonials = [
  { name: "Priya Sharma",  role: "SDE @ Google",         text: "LearnSkillX completely changed my career path. The projects were real-world and the mentors were world-class.", avatar: "PS", pkg: "24 LPA" },
  { name: "Arjun Mehta",   role: "Data Analyst @ Amazon", text: "I went from zero coding knowledge to landing a 12 LPA package in 7 months. Incredible support system.",     avatar: "AM", pkg: "12 LPA" },
  { name: "Sneha Patil",   role: "Frontend Dev @ Flipkart", text: "The placement team is phenomenal. I had 3 offers before even completing the course!",                     avatar: "SP", pkg: "18 LPA" },
];

const placementCompanies = ["Google","Amazon","Microsoft","Flipkart","Infosys","TCS","Wipro","Zomato","CRED","Swiggy","Razorpay","PhonePe","Ola","Meesho","Paytm"];

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar()  {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Home","Courses","Placements","About","Contact",];
  const openRegistration = () => {
  window.open(
    "https://docs.google.com/forms/d/e/1FAIpQLSfJ_G81G51gRSVXU0WgK8RdyJ9UxIJXvC6Ih-7vCmI3NRDnGw/viewform",
    "_blank"
  );
};
const go = (id, label) => {
  setActiveLink(label);

 


  document
    .getElementById(id.toLowerCase())
    ?.scrollIntoView({ behavior: "smooth" });
};
  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
<a className="navbar__brand" onClick={() => go("home","Home")}>
  <img src={logo} alt="LearnSkillX Logo" className="navbar__logo" />
  <span className="navbar__text">
    LearnSkill<span className="navbar__brand-x">X</span>
  </span>
</a>
        <ul className={`navbar__links ${menuOpen ? "open" : ""}`}>
          {links.map(l => (
            <li key={l}>
              <button className={`navbar__link ${activeLink===l ? "active":""}`} onClick={() => go(l,l)}>
                {l}
                <span className="navbar__link-bar"/>
              </button>
            </li>
          ))}
        </ul>

       <div className="navbar__right">
  <button
    className="btn btn--ghost-nav"
    onClick={() => go("contact","Contact")}
  >
    Login
  </button>

  <button
    className="btn btn--primary navbar__cta ripple"
    onClick={openRegistration}
  >
    Register
  </button>

  <button
    className="btn btn--primary navbar__cta ripple"
    onClick={() => go("contact","Contact")}
  >
    Apply Now ✦
  </button>
</div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          <span className={menuOpen?"rot45":""}/>
          <span className={menuOpen?"hide":""}/>
          <span className={menuOpen?"rot-45":""}/>
        </button>
      </div>
    </nav>
  );
}

// ── Hero Carousel ─────────────────────────────────────────────────────────────
const carouselSlides = [
  {
    bg: "linear-gradient(160deg,#0f2544 0%,#1a3a6e 100%)",
    emoji: "🎓",
    tag: "Study Abroad",
    headline: "Study in Top\nUniversities Abroad",
    sub: "Explore programs in USA, UK, Canada & more",
    cta: "Explore Programs →",
    accent: "#00c9ff",
  },
  {
    bg: "linear-gradient(160deg,#130f2e 0%,#2d1b6e 100%)",
    emoji: "🤖",
    tag: "Agentic AI",
    headline: "Master Agentic\nAI Development",
    sub: "Build autonomous AI systems with top mentors",
    cta: "Start Learning →",
    accent: "#7c5cfc",
  },
  {
    bg: "linear-gradient(160deg,#0a2410 0%,#0d4a1e 100%)",
    emoji: "💼",
    tag: "Placements",
    headline: "Get Placed at\nTop Tech Companies",
    sub: "Average package ₹12 LPA · 95% placement rate",
    cta: "View Success Stories →",
    accent: "#00ff88",
  },
  {
    bg: "linear-gradient(160deg,#1f1209 0%,#5c2a00 100%)",
    emoji: "📜",
    tag: "Certification",
    headline: "IIT / IIM\nCertified Programs",
    sub: "Globally recognised credentials from premier institutes",
    cta: "See Certifications →",
    accent: "#ffaa00",
  },
];

function HeroCarousel() {
  const [idx, setIdx]   = useState(0);
  const [anim, setAnim] = useState(true);
  const total = carouselSlides.length;

  const go = (next) => {
    setAnim(false);
    setTimeout(() => { setIdx((next + total) % total); setAnim(true); }, 250);
  };

  useEffect(() => {
    const t = setInterval(() => go(idx + 1), 3800);
    return () => clearInterval(t);
  }, [idx]);

  const s = carouselSlides[idx];

  return (
    <div className="hc">
      <div className={`hc__slide ${anim ? "hc__slide--in" : ""}`} style={{ background: s.bg }}>
        {/* Decorative circles */}
        <div className="hc__circle hc__circle--1" style={{ borderColor: s.accent }} />
        <div className="hc__circle hc__circle--2" style={{ borderColor: s.accent }} />

        <span className="hc__tag" style={{ background: `${s.accent}22`, color: s.accent, borderColor: `${s.accent}55` }}>
          {s.tag}
        </span>

        <div className="hc__emoji">{s.emoji}</div>

        <h2 className="hc__headline" style={{ "--accent": s.accent }}>
          {s.headline.split("\n").map((line, i) =>
            i === 1 ? <span key={i} style={{ color: s.accent }}>{line}</span>
                    : <span key={i}>{line}<br/></span>
          )}
        </h2>

        <p className="hc__sub">{s.sub}</p>

        <button className="hc__cta" style={{ color: s.accent, borderColor: `${s.accent}55` }}>
          {s.cta}
        </button>

        {/* Floating badge */}
        <div className="hc__badge">
          <span>🏅</span>
          <div>
            <strong>Placed at Google</strong>
            <span>₹24 LPA · Priya Sharma</span>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button className="hc__arrow hc__arrow--left"  onClick={() => go(idx - 1)}>‹</button>
      <button className="hc__arrow hc__arrow--right" onClick={() => go(idx + 1)}>›</button>

      {/* Dots */}
      <div className="hc__dots">
        {carouselSlides.map((_, i) => (
          <button key={i} className={`hc__dot ${i === idx ? "hc__dot--active" : ""}`} onClick={() => go(i)} />
        ))}
      </div>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const words = ["Web Development","AI & Machine Learning","Data Science","Software Engineering"];
  const [wIdx, setWIdx] = useState(0);
  const [show, setShow] = useState(true);
  const [statsRef, statsVisible] = useScrollReveal(0.1);

  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => { setWIdx(i => (i+1)%words.length); setShow(true); }, 380);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="hero">
      {/* Grid lines background */}
      <div className="hero__grid-bg" aria-hidden="true"/>

      {/* Glow orbs */}
      <div className="orb orb--blue"  aria-hidden="true"/>
      <div className="orb orb--purple" aria-hidden="true"/>

      <div className="hero__layout">
        {/* LEFT – text */}
        <div className="hero__text">
          <div className="hero__badge">
            <span className="hero__badge-dot"/>
            🚀 India's #1 Tech Learning Platform
          </div>

          <h1 className="hero__h1">
            Build Your<br/>
            <span className="hero__gradient-text">Tech Future</span>
          </h1>

          <p className="hero__sub">
            Industry-ready training in&nbsp;
            <span className={`hero__word ${show?"show":""}`}>{words[wIdx]}</span>
          </p>

          <div className="hero__actions">
            <button className="btn btn--primary btn--lg ripple" onClick={() => document.getElementById("courses").scrollIntoView({behavior:"smooth"})}>
              Explore Courses →
            </button>
            <button className="btn btn--outline-white btn--lg" onClick={() => document.getElementById("about").scrollIntoView({behavior:"smooth"})}>
              ▶ Watch Demo
            </button>
          </div>

          <div className="hero__trust">
            <div className="hero__avatars">
              {["A","B","C","D"].map((l,i) => <span key={i} className="hero__av" style={{"--n":i}}>{l}</span>)}
            </div>
            <p><strong>4,000+</strong> students enrolled this month</p>
          </div>
        </div>

        {/* RIGHT – image carousel */}
        <HeroCarousel />
      </div>

      {/* Stats bar */}
      <div className="hero__stats-bar" ref={statsRef}>
        {stats.map((s,i) => (
          <StatItem key={s.label} s={s} started={statsVisible} delay={i*120}/>
        ))}
      </div>

      {/* Features strip */}
      <div className="hero__features">
        {features.map(f => (
          <div className="hero__feature" key={f.text}>
            <span>{f.icon}</span>{f.text}
          </div>
        ))}
      </div>
    </section>
  );
}

function StatItem({s, started, delay}) {
  const [go, setGo] = useState(false);
  useEffect(() => { if(started) setTimeout(()=>setGo(true), delay); }, [started]);
  const n = useCountUp(s.value, 1600, go);
  const display = s.display
    ? s.display
    : `${s.value==="95"&&go ? n : s.value==="12000"&&go ? n.toLocaleString() : go?n:0}${s.suffix}`;

  return (
    <div className="hero__stat">
      <strong className="hero__stat-num">
        {s.display ? (go ? s.display : "–") : `${go ? (s.value==="12000" ? n.toLocaleString() : n) : 0}${s.suffix}`}
      </strong>
      <span>{s.label}</span>
    </div>
  );
}

// ── About ────────────────────────────────────────────────────────────────────
function About() {
  const [ref, vis] = useScrollReveal();
  return (
    <section id="about" className="section about" ref={ref}>
      <div className={`about__grid reveal ${vis?"in":""}`}>
        {[
          {icon:"🎯", title:"Our Vision",  color:"blue",   text:"To become a trusted learning platform that bridges the gap between education and industry requirements by offering innovative and career-oriented training programs. "},
          {icon:"🏆", title:"Our Mission", color:"cyan",   text:"To provide quality, affordable, and industry-relevant education that empowers students and professionals to achieve their career goals through practical learning and skill development. "},
          {icon:"💡", title:"Our Values",  color:"purple", text:"We value quality education, hands-on experience, and continuous learning. Our goal is to help students develop job-ready skills through expert guidance and real-world training."},
        ].map(c => (
          <div className={`about-card about-card--${c.color}`} key={c.title}>
            <div className="about-card__icon">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Courses ──────────────────────────────────────────────────────────────────
function Courses() {
  const [ref, vis] = useScrollReveal();
  const [hov, setHov] = useState(null);
  return (
    <section id="courses" className="section courses">
      <div className="section__header">
        <span className="eyebrow">What we offer</span>
        <h2 className="section__title">Our Courses</h2>
        <p className="section__sub">Handcrafted curricula built with real companies to get you job-ready fast.</p>
      </div>
      <div className={`courses__grid reveal ${vis?"in":""}`} ref={ref}>
        {courses.map((c,i) => (
          <div
            key={c.title}
            className={`ccard ${hov===i?"hov":""}`}
            style={{"--d":`${i*0.06}s`}}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
          >
            {c.tag && <span className="ccard__tag">{c.tag}</span>}
            <div className="ccard__icon">{c.icon}</div>
            <h3 className="ccard__title">{c.title}</h3>
            <div className="ccard__meta">
              <span>⏱ {c.duration}</span>
              <span>📶 {c.level}</span>
            </div>
            <div className="ccard__students">👥 {c.students} enrolled</div>
           <button
  className="ccard__cta"
  onClick={() => window.open(c.pdf, "_blank")}
>
  View Details →
</button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Placements ───────────────────────────────────────────────────────────────
function Placements() {
  const [ref, vis] = useScrollReveal();
  return (
    <section id="placements" className="placements-section">
      <div className="section__header">
        <span className="eyebrow">Our track record</span>
        <h2 className="section__title">Placement Partners</h2>
        <p className="section__sub">Our graduates work at India's and the world's best tech companies.</p>
      </div>
      <div className={`reveal ${vis?"in":""}`} ref={ref}>
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...placementCompanies,...placementCompanies].map((c,i) => (
              <span className="ticker-chip" key={i}>{c}</span>
            ))}
          </div>
        </div>
        <div className="placement-stats">
          {[{n:"₹12 LPA",l:"Average Package"},{n:"45 Days",l:"Time to Placement"},{n:"200+",l:"Partner Companies"},{n:"95%",l:"Placement Rate"}].map(s => (
            <div className="p-stat" key={s.l}>
              <strong>{s.n}</strong><span>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const [ref, vis] = useScrollReveal();
  return (
    <section className="section testimonials">
      <div className="section__header">
        <span className="eyebrow">Student stories</span>
        <h2 className="section__title">What our graduates say</h2>
      </div>
      <div className={`tgrid reveal ${vis?"in":""}`} ref={ref}>
        {testimonials.map((t,i) => (
          <div className="tcard" key={t.name} style={{"--d":`${i*0.1}s`}}>
            <div className="tcard__stars">★★★★★</div>
            <p className="tcard__text">"{t.text}"</p>
            <div className="tcard__footer">
              <div className="tcard__av">{t.avatar}</div>
              <div className="tcard__info">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
              <span className="tcard__pkg">{t.pkg}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, vis] = useScrollReveal();
  const [form, setForm] = useState({name:"",email:"",phone:"",course:"",message:""});
  const [sent, setSent] = useState(false);
  const h = e => setForm({...form,[e.target.name]:e.target.value});

  return (
    <section id="contact" className="section contact">
      <div className="section__header">
        <span className="eyebrow">Get in touch</span>
        <h2 className="section__title">Start your journey today</h2>
        <p className="section__sub">Our counsellors will reach out within 24 hours.</p>
      </div>
      <div className={`contact__layout reveal ${vis?"in":""}`} ref={ref}>
        <div className="contact__info">
          <h3>Why choose LearnSkillX?</h3>
          {["✅ Job guarantee or full refund","✅ Learn from ex-FAANG mentors","✅ Live doubt-solving sessions","✅ Resume & interview prep","✅ Lifetime community access"].map(t => (
            <p key={t} className="contact__bullet">{t}</p>
          ))}
          <div className="contact__hotline">
            <span>📞</span>
            <div><strong>+91 7083398545</strong><span>Mon–Sat, 9am – 8pm</span></div>
          </div>
        </div>
        <div className="contact__form-wrap">
          {sent ? (
            <div className="contact__success">
              <span>🎉</span>
              <h3>Application received!</h3>
              <p>We'll call you back within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={e=>{e.preventDefault();setSent(true);}}>
              <div className="frow">
                <div className="fg"><label>Full Name</label><input name="name" placeholder="Riya Gupta" value={form.name} onChange={h} required/></div>
                <div className="fg"><label>Phone</label><input name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={h} required/></div>
              </div>
              <div className="fg"><label>Email</label><input name="email" type="email" placeholder="riya@gmail.com" value={form.email} onChange={h} required/></div>
              <div className="fg">
                <label>Course interested in</label>
                <select name="course" value={form.course} onChange={h} required>
                  <option value="">Select a course…</option>
                  {courses.map(c => <option key={c.title} value={c.title}>{c.title}</option>)}
                </select>
              </div>
              <div className="fg"><label>Message (optional)</label><textarea name="message" placeholder="Tell us about your background…" rows={3} value={form.message} onChange={h}/></div>
              <button type="submit" className="btn btn--primary btn--lg btn--full ripple">Apply Now 🚀</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col footer__brand">
          <span className="footer__logo">LearnSkill<span>X</span></span>
          <p>Empowering India's next generation of tech talent through world-class, practical education.</p>
        
        </div>
        
        <div className="footer__col">
          <h4>Company</h4>
          {["About Us","Placements","Blog","Careers","Press"].map(l => <a key={l} href="#">{l}</a>)}
        </div>
        <div className="footer__col">
          <h4>Contact</h4>
          <p>📧  hr@learnskillx.info</p>
          <p>📞 +91 7083398545</p>
          <p><a href="https://maps.app.goo.gl/bzZCSQbP3nWzjJA1A">📍 Pune, Maharashtra</a></p>
          <p>🕐 Mon–Sat, 9am–8pm</p>
          <p>
  <a
    href="https://wa.me/917083398545"
    target="_blank"
    rel="noopener noreferrer"
    style={{ display: "flex", alignItems: "center", gap: "8px" }}
  >
    <FaWhatsapp color="#25D366" size={20} />
    +91 7083398545
  </a>
</p>

        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2025 LearnSkillX · All rights reserved</p>
        <div className="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <Navbar />

      <Hero />
      <About />
      <Courses />
      <Placements />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}