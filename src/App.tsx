import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { quotes } from './data/quotes';
import { SelectedWorks } from './components/SelectedWorks/SelectedWorks.tsx';
import { OpenSourceSection } from './components/OpenSource/OpenSourceSection.tsx';

/* ═══ DATA ═══ */

const ME = {
  name: 'Divyansh',
  email: 'div.pandey.tsx@gmail.com',
  github: 'https://github.com/div-pandey',
  linkedin: 'https://linkedin.com/in/div-kumar-cse',
  instagram: 'https://instagram.com/kumar__divyansh',
  resume: '/resume.pdf',
};


const JOURNEY = [
  {
    year: '2026',
    role: 'Building in Public',
    place: 'Independent',
    text: 'Shipping production apps with real users and real payments. Pushing creative frontend boundaries with advanced CSS engineering and interactive experiences.',
  },
  {
    year: '2025–26',
    role: 'Virtual Experience Programs',
    place: 'Walmart · Deloitte',
    text: 'Completed advanced software engineering simulations at Walmart Global Tech. Gained exposure to data analytics and cybersecurity workflows at Deloitte.',
  },
  {
    year: '2025',
    role: 'B.Tech Computer Science',
    place: 'AKTU University',
    text: 'Data structures, algorithms, system design. 300+ problems solved on LeetCode. Team lead for university tech projects.',
  },
  {
    year: '2024',
    role: 'Started Coding',
    place: 'Self-taught',
    text: 'Picked up HTML/CSS/JS from scratch. Built and deployed first web app within weeks. Fell in love with making things for the web.',
  },
];

const SKILLS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Vite',
  'Python', 'Supabase', 'PostgreSQL', 'Tailwind', 'Git',
  'REST APIs', 'CSS/SCSS', 'Linux', 'Vercel',
];




/* ═══ REVEAL HOOK ═══ */

function useReveal(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ═══ TYPEWRITER HOOK ═══ */
function Typewriter({ text, speed = 20, delay = 0, as: Component = 'span', className = '' }: any) {
  const { ref, visible } = useReveal();
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let timer: any;
    const t = setTimeout(() => {
      timer = setInterval(() => {
        setCharIndex((prev) => {
          if (prev >= text.length) {
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, delay);
    return () => { clearTimeout(t); clearInterval(timer); };
  }, [visible, text, speed, delay]);

  const displayedText = text.substring(0, charIndex);
  const isTyping = visible && charIndex < text.length;

  return (
    <Component ref={ref} className={className}>
      {displayedText}
      {isTyping && <span style={{ display: 'inline-block', width: '0.5em', height: '1em', backgroundColor: 'var(--accent)', verticalAlign: 'middle', marginLeft: '4px', animation: 'blink 0.75s step-end infinite' }}></span>}
    </Component>
  );
}

/* ═══ LOOPING TYPEWRITER HOOK ═══ */
function LoopingTypewriter({ words, typeSpeed = 120, deleteSpeed = 80, delay = 2500, initialDelay = 2400, as: Component = 'span', className = '' }: any) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHasStarted(true), initialDelay);
    return () => clearTimeout(t);
  }, [initialDelay]);

  useEffect(() => {
    if (!hasStarted) return;
    const currentWord = words[wordIndex];
    let timer: any;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        if (text.length <= 1) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, deleteSpeed);
    } else {
      timer = setTimeout(() => {
        setText((prev) => currentWord.slice(0, prev.length + 1));
        if (text.length === currentWord.length) {
          timer = setTimeout(() => setIsDeleting(true), delay);
        }
      }, typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, delay, hasStarted]);

  return (
    <Component className={className}>
      {text}
      <span style={{ display: 'inline-block', width: '0.12em', height: '0.85em', backgroundColor: 'var(--accent)', verticalAlign: 'baseline', marginLeft: '4px', animation: 'blink 0.75s step-end infinite' }}></span>
    </Component>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [toast, setToast] = useState<React.ReactNode>("You're already exploring this section, buddy! ✨");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Initialize Global Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  const triggerToast = (msg: React.ReactNode, duration: number = 3000) => {
    setToast(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), duration);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetId = hash.replace('#', '');
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

      if (Math.abs(rect.top) < 200 || (hash === '#contact' && isAtBottom)) {
        triggerToast(
          <span>
            <span style={{ color: 'var(--text-dim)' }}>You're already exploring </span>
            <span style={{ color: 'var(--accent)' }}>this section</span>
            <span style={{ color: 'var(--text-dim)' }}>, buddy! ✨</span>
          </span>
        );
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (hash === '#home') {
      if (window.scrollY < 200) {
        triggerToast(
          <span>
            <span style={{ color: 'var(--text-dim)' }}>You're already at the </span>
            <span style={{ color: 'var(--accent)' }}>top</span>
            <span style={{ color: 'var(--text-dim)' }}>, buddy! ✨</span>
          </span>
        );
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleNameClick = () => {
    if (window.scrollY > window.innerHeight * 0.5) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      triggerToast(
        <span>
          <span style={{ color: 'var(--text-dim)', marginRight: '8px' }}>Wanna hear a quote?</span>
          <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>"{randomQuote}"</span>
        </span>,
        6000
      );
    }
  };


  useEffect(() => {
    let frame: number;
    const start = Date.now();
    const dur = 2000;

    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setCount(Math.floor(p * 100));
      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      {/* Preloader */}
      <div className={`preloader ${!loading ? 'done' : ''}`}>
        <span className="preloader-counter">{String(count).padStart(3, '0')}</span>
      </div>

      {/* Toast Notification */}
      <div className={`nav-toast ${showToast ? 'visible' : ''}`}>
        {toast}
      </div>

      {/* Nav */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <span
          className="nav-name"
          onClick={handleNameClick}
          style={{ cursor: 'pointer' }}
        >
          {ME.name}
        </span>
        <div className="nav-right">
          <div className="nav-links-wrapper">
            <div className="nav-links">
              <a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, '#home')}>Home</a>
              <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, '#about')}>About</a>
              <a href="#capabilities" className="nav-link" onClick={(e) => handleNavClick(e, '#capabilities')}>Capabilities</a>
              <a href="#credentials" className="nav-link" onClick={(e) => handleNavClick(e, '#credentials')}>Credentials</a>
              <a href="#work" className="nav-link" onClick={(e) => handleNavClick(e, '#work')}>Work</a>
              <a href="#opensource" className="nav-link" onClick={(e) => handleNavClick(e, '#opensource')}>Open Source</a>
              <a href="#journey" className="nav-link" onClick={(e) => handleNavClick(e, '#journey')}>Journey</a>
              <a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
            </div>
          </div>
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="hamburger-box">
              <div className="hamburger-inner"></div>
            </div>
          </button>
          <a href={ME.resume} target="_blank" rel="noopener noreferrer" className="nav-btn">Resume</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-label">
              <span className="hero-dot" />
              Available for opportunities.
            </div>

            <h1 className="hero-title">
              I build things<br />
              for the <LoopingTypewriter as="em" words={['web', 'future', 'people', 'world', 'startups', 'creatives', 'impact']} />
            </h1>

            <div className="hero-actions">
              <a href="#work" className="btn-primary">View Work</a>
              <a href={ME.resume} target="_blank" rel="noopener noreferrer" className="btn-secondary">Download CV</a>
            </div>

            <div className="hero-bottom">
              <Typewriter
                as="p"
                className="hero-intro"
                text="Full-stack developer and CS student at AKTU. I ship production ready web apps with real users, real payments, and real impact — not tutorial clones."
                delay={500}
              />
              <div className="hero-scroll">
                <div className="scroll-bar">
                  <div className="scroll-bar-fill" />
                </div>
                <span>Scroll</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <MarqueeSection />

      {/* About */}
      <AboutSection />

      {/* Capabilities */}
      <CapabilitiesSection />

      {/* Credentials */}
      <CertificatesSection />

      {/* Projects */}
      <SelectedWorks />

      {/* Open Source / npm */}
      <OpenSourceSection />

      {/* Journey */}
      <JourneySection />

      {/* Philosophy */}
      <PhilosophySection />

      <DividerSection />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <footer className="footer">
        <span>© 2026 Divyansh</span>
        <span>React · Vite · TypeScript · CSS</span>
      </footer>
    </>
  );
}

/* ═══ SECTIONS ═══ */

function AboutSection() {
  const { ref, visible } = useReveal();
  return (
    <section className="section" id="about">
      <div ref={ref} className={`reveal-blur ${visible ? 'visible' : ''}`}>
        <div className="section-header">
          <h2 className="section-title">About</h2>
          <span className="section-num">01</span>
        </div>
        <div className="about-grid">
          <Typewriter
            as="p"
            className="about-text"
            text="I engineer digital experiences that bridge the gap between heavy computational logic and flawless user interfaces. As a Computer Science student, I bypass standard tutorials to architect actual production systems—spanning fintech-integrated food ordering platforms, local-first LLM tooling, and highly optimized game AI. I am deeply obsessed with clean architecture, strict type safety, and sub-second performance. For me, engineering isn't just about making things work; it's about writing scalable, maintainable code that solves real problems and building interfaces that command attention."
          />
          <div className="about-details">
            <div className="about-detail">
              <span className="about-detail-label">Location</span>
              <span className="about-detail-value">New Delhi, India</span>
            </div>
            <div className="about-detail">
              <span className="about-detail-label">Education</span>
              <span className="about-detail-value">B.Tech CSE — AKTU</span>
            </div>
            <div className="about-detail">
              <span className="about-detail-label">Focus</span>
              <span className="about-detail-value">Full-Stack Development</span>
            </div>
            <div className="about-detail">
              <span className="about-detail-label">Technologies</span>
              <div className="about-tags reveal-stagger visible">
                {SKILLS.map((s) => (
                  <span key={s} className="about-tag">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





function JourneySection() {
  const { ref, visible } = useReveal();
  return (
    <section className="section" id="journey">
      <div ref={ref} className={`reveal-blur ${visible ? 'visible' : ''}`}>
        <div className="section-header">
          <h2 className="section-title">Journey</h2>
          <span className="section-num">06</span>
        </div>
        <div className="timeline">
          {JOURNEY.map((j, i) => (
            <div key={i} className="tl-row">
              <span className="tl-year">{j.year}</span>
              <div className="tl-connector">
                <div className="tl-dot" />
                {i !== JOURNEY.length - 1 && <div className="tl-line" />}
              </div>
              <div className="tl-content">
                <h3 className="tl-role">{j.role}</h3>
                <span className="tl-place">{j.place}</span>
                <Typewriter as="p" className="tl-text" text={j.text} speed={15} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { ref, visible } = useReveal();
  return (
    <section className="section contact" id="contact">
      <div ref={ref} className={`reveal-scale ${visible ? 'visible' : ''}`}>
        <h2 className="contact-heading">
          Let's <em>talk</em>.
        </h2>
        <Typewriter
          as="p"
          className="contact-sub"
          text="Currently looking for internship opportunities. Always open to interesting conversations and collaborations."
          speed={25}
        />
        <div className="contact-actions">
          <a href="https://wa.me/917303598548?text=Hi%20Divyansh!%0A%0AI%20just%20went%20through%20your%20portfolio%20and%20I%20was%20absolutely%20blown%20away%20by%20the%20level%20of%20craft%20and%20engineering%20you%27ve%20put%20into%20your%20work.%20Your%20projects%20demonstrate%20a%20really%20impressive%20grasp%20of%20full-stack%20development%2C%20and%20the%20attention%20to%20detail%20in%20your%20UI%2FUX%20is%20top-tier.%0A%0AI%20would%20love%20to%20connect%20and%20discuss%20some%20potential%20opportunities%20with%20you!%0A%0AHere%20are%20my%20details%3A%0A-%20Name%3A%20%5BWrite%20your%20name%20here%5D%0A-%20Role%2FCompany%3A%20%5BWrite%20your%20role%20or%20company%20here%5D%0A-%20Email%3A%20%5BWrite%20your%20email%20here%5D%0A-%20Reason%20for%20reaching%20out%3A%20%5BInternship%20%2F%20Job%20offer%20%2F%20Collaboration%20%2F%20Just%20saying%20hi%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you!" target="_blank" rel="noopener noreferrer" className="contact-btn">
            Get in touch →
          </a>
          <button
            className="contact-btn-copy"
            onClick={() => {
              navigator.clipboard.writeText(ME.email);
              const btn = document.getElementById('copy-btn');
              if (btn) {
                const old = btn.innerText;
                btn.innerText = 'Copied!';
                setTimeout(() => btn.innerText = old, 2000);
              }
            }}
            id="copy-btn"
          >
            Copy Email
          </button>
        </div>
        <div className="contact-socials">
          <a href={ME.github} target="_blank" rel="noopener noreferrer" className="contact-social" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a href={ME.linkedin} target="_blank" rel="noopener noreferrer" className="contact-social" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a href={`mailto:${ME.email}`} className="contact-social" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
          <a href={ME.instagram} target="_blank" rel="noopener noreferrer" className="contact-social" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const stack = ['NEXT.JS', 'TYPESCRIPT', 'REACT', 'PYTHON', 'SUPABASE', 'OLLAMA', 'NODE.JS', 'TAILWIND', 'VITE', 'GIT'];
  // Duplicate array for seamless infinite scroll
  const items = [...stack, ...stack, ...stack];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((item, i) => (
          <div key={i} className="marquee-item">
            {item} <span className="marquee-separator">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CapabilitiesSection() {
  const { ref, visible } = useReveal();
  const caps = [
    { num: '01', title: 'Full-Stack Development', desc: 'Building production-grade web apps using Next.js, React, and TypeScript. Experienced in integrating complex features like Razorpay payment gateways and real-time order systems.' },
    { num: '02', title: 'Backend & Architecture', desc: 'Architecting secure backend systems, real-time databases, and auth flows using Supabase and PostgreSQL. Designed for reliability, scalability, and clean data models.' },
    { num: '03', title: 'AI & Algorithms', desc: 'Developing privacy-focused, local LLM tools with Python and Ollama. Writing highly optimized algorithms like Minimax with alpha-beta pruning for intelligent decision-making.' },
    { num: '04', title: 'Creative Frontend', desc: 'Crafting premium interfaces with advanced CSS, glassmorphism, micro-animations, and responsive design systems. Obsessed with the details that make interfaces feel alive.' }
  ];

  return (
    <section className="section capabilities" id="capabilities">
      <div ref={ref} className={`reveal-scale ${visible ? 'visible' : ''}`}>
        <div className="section-header">
          <h2 className="section-title">Capabilities</h2>
          <span className="section-num">02</span>
        </div>
        <div className="cap-grid">
          {caps.map((c, i) => (
            <div key={i} className="cap-item">
              <span className="cap-num">{c.num}</span>
              <h3 className="cap-title">{c.title}</h3>
              <p className="cap-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificatesSection() {
  const { ref, visible } = useReveal();

  const certs = [
    {
      name: 'Advanced Software Engineering',
      org: 'Walmart Global Tech',
      type: 'Virtual Experience',
      year: '2026',
      link: '/certificates/walmart-swe.pdf',
      icon: 'W',
      color: '#0071CE',
    },
    {
      name: 'Data Analytics',
      org: 'Deloitte',
      type: 'Virtual Experience',
      year: '2026',
      link: '/certificates/deloitte-data-analytics.pdf',
      icon: 'D',
      color: '#86BC25',
    },
    {
      name: 'Cyber Security',
      org: 'Deloitte',
      type: 'Virtual Experience',
      year: '2026',
      link: '/certificates/deloitte-cyber-security.pdf',
      icon: 'D',
      color: '#86BC25',
    },
    {
      name: 'Technology Program',
      org: 'Deloitte',
      type: 'Virtual Experience',
      year: '2026',
      link: '/certificates/deloitte-technology.pdf',
      icon: 'D',
      color: '#86BC25',
    },
    {
      name: 'Git Version Control',
      org: 'GUVI · IIT Madras / HCL',
      type: 'Certified',
      year: '2026',
      link: '/certificates/guvi-git.jpg',
      icon: 'G',
      color: '#8B5CF6',
    },
  ];

  return (
    <section className="section certificates" id="credentials">
      <div ref={ref} className={`reveal-blur ${visible ? 'visible' : ''}`}>
        <div className="section-header">
          <h2 className="section-title">Credentials</h2>
          <span className="section-num">03</span>
        </div>

        <div className="certs-stat-bar">
          <div className="certs-stat">
            <span className="certs-stat-num">5</span>
            <span className="certs-stat-label">Certificates</span>
          </div>
          <div className="certs-stat-divider" />
          <div className="certs-stat">
            <span className="certs-stat-num">3</span>
            <span className="certs-stat-label">Issuers</span>
          </div>
          <div className="certs-stat-divider" />
          <div className="certs-stat">
            <span className="certs-stat-num">2026</span>
            <span className="certs-stat-label">Cohort</span>
          </div>
        </div>

        <div className="certs-grid">
          {certs.map((c, i) => (
            <a
              key={i}
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card"
              style={{ '--cert-color': c.color } as React.CSSProperties}
            >
              <div className="cert-shimmer" />

              <div className="cert-badge" style={{ background: c.color + '18', border: `1px solid ${c.color}40` }}>
                <span className="cert-badge-letter" style={{ color: c.color }}>{c.icon}</span>
              </div>

              <div className="cert-info">
                <div className="cert-meta-row">
                  <span className="cert-type">{c.type}</span>
                  <span className="cert-year">{c.year}</span>
                </div>
                <h3 className="cert-name">{c.name}</h3>
                <span className="cert-org">{c.org}</span>
              </div>

              <div className="cert-arrow">↗</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const { ref, visible } = useReveal();
  return (
    <section className="section philosophy">
      <div ref={ref} className={`reveal-blur ${visible ? 'visible' : ''}`}>
        <Typewriter
          as="h2"
          className="philosophy-quote"
          text="Good engineering is invisible. Great engineering feels like magic."
          speed={40}
        />
      </div>
    </section>
  );
}

function DividerSection() {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`divider-section reveal-blur ${visible ? 'visible' : ''}`}>
      <div className="divider-line" />
      <div className="divider-dot" />
      <div className="divider-line" />
    </div>
  );
}
