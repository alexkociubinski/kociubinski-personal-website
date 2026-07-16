'use client';

import { useEffect, useState } from 'react';
import { Download, Mail, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { GithubIcon, LinkedinIcon } from './components/icons';
import SocialLink from './components/SocialLink';
import SectionHeading from './components/SectionHeading';
import ProjectCard from './components/ProjectCard';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
] as const;

const SKILLS = [
  { group: 'Languages', items: ['Python', 'C', 'TypeScript', 'Java', 'Dart'] },
  { group: 'Trading', items: ['Quantitative analysis', 'Algorithm development', 'Risk management'] },
  { group: 'Tools', items: ['Next.js', 'React', 'Flutter', 'pandas', 'Git'] },
] as const;

const PROJECTS = [
  {
    href: '/projects/superconductivity',
    image: '/metropolisalg.png',
    imageAlt: 'Metropolis algorithm visualization',
    imagePosition: 'object-[70%_60%]',
    title: 'Monte Carlo Superconductivity Research',
    year: '2025',
    description:
      'Undergraduate research modeling superconductivity with Python and Monte Carlo simulations — using the Metropolis algorithm to study energy states and phase transitions.',
    tags: ['Python', 'Monte Carlo', 'Data analysis'],
    ctaLabel: 'Explore',
  },
  {
    href: '/projects/arsenal-led',
    image: '/arsenal.png',
    imageAlt: 'Arsenal LED sign',
    imagePosition: 'object-[70%_60%]',
    title: 'Garmin-Controlled Arsenal LED Sign',
    year: '2024',
    description:
      'A smart-home system that controls an Arsenal LED sign from a Garmin Fenix 5 watch, via a virtual machine and Home Assistant webhooks.',
    tags: ['Nabu Casa', 'UTM VM', 'Home Assistant'],
    ctaLabel: 'Explore',
  },
  {
    href: '/projects/spaceship-battle',
    image: '/spaceShipBattle.png',
    imageAlt: 'Space Ship Battle',
    imagePosition: 'object-[70%_50%]',
    title: 'Space Ship Battle',
    year: '2025',
    description:
      'A command-line space battle game in C using pointer arithmetic, inspired by Battleship. Play against a computer with a targeted shooting strategy — playable in the browser.',
    tags: ['C'],
    ctaLabel: 'Live demo',
    extraLinks: (
      <a
        href="https://github.com/alexkociubinski/TigerHacks-Fall-2025-Space-Ship-Battle-"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted hover:text-accent transition-colors"
      >
        GitHub →
      </a>
    ),
  },
] as const;

function NavBar() {
  const [active, setActive] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'border-b border-border bg-bg/80 backdrop-blur'
          : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-4xl mx-auto pl-6 pr-16 md:px-6 py-4 flex items-center justify-between">
        <Link href="#top" className="flex items-center gap-2 font-bold text-text">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
          Alex Kociubinski
        </Link>
        <div className="flex gap-6 text-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap transition-colors hover:text-accent ${
                active === link.href ? 'text-accent' : 'text-muted'
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
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Alex_Kociubinski_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="top" className="max-w-4xl mx-auto px-6 pt-24 pb-20">
      <div className="flex items-center gap-5 mb-10 animate-fade-up">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border shrink-0">
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

      <h1 className="text-[clamp(2.5rem,5vw+0.5rem,4rem)] font-bold leading-[1.05] tracking-tight text-text mb-6 animate-fade-up">
        Hi, I’m Alex Kociubinski
      </h1>
      <p className="text-lg text-muted max-w-2xl leading-relaxed mb-8 animate-fade-up">
        Computer Science &amp; Mathematics dual major at the University of
        Missouri. Interested in quantitative finance, algorithmic trading, and
        building things that mix data and strategy.
      </p>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 animate-fade-up">
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
          className="inline-flex items-center gap-1.5 whitespace-nowrap text-muted hover:text-accent transition-colors"
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
    <section className="max-w-4xl mx-auto px-6">
      <SectionHeading id="about">About</SectionHeading>
      <div className="space-y-4 text-lg leading-relaxed text-muted max-w-2xl">
        <p>
          I’m a developer and student interested in{' '}
          <span className="text-text">quantitative finance</span> and{' '}
          <span className="text-text">algorithmic trading</span>. I like working
          on projects that mix data and strategy, and help people. At Mizzou, I’m
          part of <span className="text-text">TigerQuant</span> and the{' '}
          <span className="text-text">Mizzou Computing Association</span>.
        </p>
        <p>
          Outside of coding, I spend my time working out, running with the Mizzou
          Club Running Team, doing marathons, and watching sports — especially
          football and soccer. I’m a Seattle Seahawks and an Arsenal fan,
          unfortunately.
        </p>
      </div>

      {/* Skills — monospace, grouped, real separators (not concatenated) */}
      <div className="mt-10 space-y-2.5 max-w-2xl">
        {SKILLS.map((row) => (
          <div
            key={row.group}
            className="flex flex-col sm:flex-row sm:gap-4 sm:items-baseline"
          >
            <span className="nums font-mono text-sm text-text w-28 shrink-0">
              {row.group}
            </span>
            <span className="font-mono text-sm text-muted">
              {row.items.join(' · ')}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="max-w-4xl mx-auto px-6">
      <SectionHeading id="projects">Projects</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.href} {...project} />
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Alex_Kociubinski_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 mb-24">
      <SectionHeading id="contact">Contact</SectionHeading>
      <p className="text-lg text-muted max-w-2xl mb-6 leading-relaxed">
        Feel free to reach out — about a project, an opportunity, or just to
        chat.
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
          className="inline-flex items-center gap-1.5 whitespace-nowrap text-muted hover:text-accent transition-colors"
        >
          <span>résumé</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <footer className="mt-16 pt-6 border-t border-border font-mono text-sm text-muted nums">
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