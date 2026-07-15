'use client';

import { useEffect, useState } from 'react';
import { Download, Mail, ArrowRight } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { GithubIcon, LinkedinIcon } from './components/icons';
import SocialLink from './components/SocialLink';
import SectionHeading from './components/SectionHeading';
import ProjectCard from './components/ProjectCard';

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

const SKILLS = [
  { group: "Languages", items: ["Python", "C", "TypeScript", "Java", "Dart"] },
  { group: "Trading", items: ["Quantitative Analysis", "Algorithm Development", "Risk Management"] },
  { group: "Tools", items: ["Next.js", "React", "Flutter", "pandas", "Git"] },
] as const;

const PROJECTS = [
  {
    href: "/projects/superconductivity",
    image: "/metropolisalg.png",
    imageAlt: "Metropolis Algorithm visualization",
    imagePosition: "object-[70%_60%]",
    title: "Monte Carlo Superconductivity Research",
    year: "2025",
    description:
      "Undergraduate research modeling superconductivity with Python and Monte Carlo simulations — using the Metropolis algorithm to study energy states and phase transitions.",
    tags: ["Python", "Monte Carlo", "Data Analysis"],
    ctaLabel: "Explore Project",
  },
  {
    href: "/projects/arsenal-led",
    image: "/arsenal.png",
    imageAlt: "Arsenal LED Sign",
    imagePosition: "object-[70%_60%]",
    title: "Garmin-Controlled Arsenal LED Sign",
    year: "2024",
    description:
      "A smart-home system that controls an Arsenal LED sign from a Garmin Fenix 5 watch via a virtual machine and Home Assistant webhooks.",
    tags: ["Nabu Casa", "UTM VM", "Home Assistant"],
    ctaLabel: "Explore Project",
  },
  {
    href: "/projects/spaceship-battle",
    image: "/spaceShipBattle.png",
    imageAlt: "Space Ship Battle",
    imagePosition: "object-[70%_50%]",
    title: "Space Ship Battle",
    year: "2025",
    description:
      "A command-line space battle game written in C using pointer arithmetic, inspired by Battleship. Play against a computer with a targeted shooting strategy — playable in the browser.",
    tags: ["C"],
    ctaLabel: "Live Demo",
    extraLinks: (
      <a
        href="https://github.com/alexkociubinski/TigerHacks-Fall-2025-Space-Ship-Battle-"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted hover:text-accent transition-colors hover:underline underline-offset-4"
      >
        GitHub →
      </a>
    ),
  },
] as const;

function NavBar() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-border bg-bg/80 backdrop-blur"
          : "border-transparent bg-bg/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#top" className="flex items-center gap-2 font-bold text-text">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Alex Kociubinski
        </Link>
        <div className="flex gap-6 text-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-accent ${
                active === link.href ? "text-accent" : "text-muted"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Alex_Kociubinski_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="top" className="max-w-4xl mx-auto px-6 pt-24 pb-20">
      <div className="flex items-center gap-5 mb-8 animate-fade-in">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border border-border shrink-0">
          <Image
            src="/headshot.jpeg"
            alt="Alex Kociubinski"
            fill
            className="object-cover"
            priority
          />
        </div>
        <span className="font-mono text-sm text-muted">Columbia, MO</span>
      </div>

      <h1 className="text-5xl font-bold text-text mb-4 animate-slide-up">
        Hi, I&apos;m Alex Kociubinski
      </h1>
      <p className="text-xl text-muted mb-8 max-w-2xl animate-slide-up-delay-1">
        Computer Science &amp; Mathematics dual major at the University of Missouri.
        Interested in quantitative finance, algorithmic trading, and building things
        that mix data and strategy.
      </p>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 animate-slide-up-delay-2">
        <SocialLink
          href="https://github.com/alexkociubinski"
          label="github"
          icon={<GithubIcon size={18} />}
        />
        <SocialLink
          href="https://linkedin.com/in/alex-kociubinski"
          label="linkedin"
          icon={<LinkedinIcon size={18} />}
        />
        <SocialLink
          href="mailto:ak44z@umsystem.edu"
          label="email"
          icon={<Mail size={18} />}
        />
        <button
          onClick={downloadResume}
          className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors"
        >
          <Download size={18} />
          <span>résumé</span>
        </button>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="max-w-4xl mx-auto px-6 animate-slide-up">
      <SectionHeading id="about">About</SectionHeading>
      <div className="space-y-4 text-lg leading-relaxed text-muted">
        <p>
          I&apos;m a developer and student interested in{" "}
          <span className="text-text">quantitative finance</span> and{" "}
          <span className="text-text">algorithmic trading</span>. I like working on
          projects that mix data and strategy, and help people. At Mizzou, I&apos;m
          part of <span className="text-text">TigerQuant</span> and the{" "}
          <span className="text-text">Mizzou Computing Association</span>.
        </p>
        <p>
          Outside of coding, I spend my time working out, running with the Mizzou Club
          Running Team, doing marathons, and watching sports — especially football and
          soccer. I&apos;m a Seattle Seahawks and an Arsenal fan, unfortunately.
        </p>
      </div>

      {/* Skills — inline tag list grouped by category */}
      <div className="mt-10 space-y-3">
        {SKILLS.map((row) => (
          <div
            key={row.group}
            className="flex flex-col sm:flex-row sm:gap-4 sm:items-baseline"
          >
            <span className="font-mono text-sm text-text w-28 shrink-0">
              {row.group}
            </span>
            <span className="font-mono text-sm text-muted">
              {row.items.join("  ·  ")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="max-w-4xl mx-auto px-6 mt-20">
      <SectionHeading id="projects">Projects</SectionHeading>
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.href} {...project} />
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Alex_Kociubinski_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 mt-20 mb-24">
      <SectionHeading id="contact">Contact</SectionHeading>
      <p className="text-lg text-muted mb-6 max-w-2xl">
        Feel free to reach out — whether it&apos;s about a project, an opportunity, or
        just to chat.
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <SocialLink
          href="mailto:ak44z@umsystem.edu"
          label="ak44z@umsystem.edu"
          icon={<Mail size={18} />}
        />
        <SocialLink
          href="https://github.com/alexkociubinski"
          label="github"
          icon={<GithubIcon size={18} />}
        />
        <SocialLink
          href="https://linkedin.com/in/alex-kociubinski"
          label="linkedin"
          icon={<LinkedinIcon size={18} />}
        />
        <button
          onClick={downloadResume}
          className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors"
        >
          <span>résumé</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <footer className="mt-16 pt-6 border-t border-border font-mono text-sm text-muted">
        © {new Date().getFullYear()} Alex Kociubinski
      </footer>
    </section>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <NavBar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}