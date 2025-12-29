'use client';

import React, { useState, useEffect } from 'react';
import { Download, Mail, TrendingUp, Code, Briefcase, User, Check } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';


// Custom icon components to replace deprecated lucide-react brand icons
const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Portfolio = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // Check URL parameters on mount to set initial page
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    /* if (view === 'projects' || view === 'trading') {
      setCurrentPage(view);
    } */
    if (view === 'projects') {
      setCurrentPage(view);
    }
  }, []);

  const downloadResume = () => {
    // In production, replace with your actual resume file
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Place your resume.pdf in the public folder
    link.download = 'Your_Name_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const NavBar = () => (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Alex Kociubinski
          </h1>
          <div className="flex gap-6">
            <button
              onClick={() => setCurrentPage('home')}
              className={`hover:text-yellow-400 transition ${currentPage === 'home' ? 'text-yellow-400' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('projects')}
              className={`hover:text-yellow-400 transition ${currentPage === 'projects' ? 'text-yellow-400' : ''}`}
            >
              Projects
            </button>
            {/* <button
              onClick={() => setCurrentPage('trading')}
              className={`hover:text-yellow-400 transition ${currentPage === 'trading' ? 'text-yellow-400' : ''}`}
            >
              Trading
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden shadow-2xl border-4 border-neutral-800 hover:scale-105 transition-transform duration-500 hover:border-yellow-500/50 hover:shadow-yellow-500/20 group">
            <Image
              src="/headshot.jpeg"
              alt="Alex Kociubinski"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              priority
            />
          </div>
          <h2 className="text-5xl font-bold text-white mb-4 animate-slide-up">
            Hi, I'm <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Alex Kociubinski</span>
          </h2>
          <p className="text-xl text-neutral-400 mb-8 animate-slide-up-delay-1">
            Computer Science & Mathematics Dual Major | University of Missouri
          </p>
          <div className="flex flex-col items-center gap-4 animate-slide-up-delay-2">
            <div className="flex gap-4 justify-center">
              <a href="https://github.com/alexkociubinski" target="_blank" rel="noopener noreferrer"
                className="bg-neutral-800 hover:bg-neutral-700 text-white p-3 rounded-full transition hover:scale-110 hover:text-yellow-400 border border-neutral-700">
                <GithubIcon size={24} />
              </a>
              <a href="https://linkedin.com/in/alex-kociubinski" target="_blank" rel="noopener noreferrer"
                className="bg-neutral-800 hover:bg-neutral-700 text-white p-3 rounded-full transition hover:scale-110 hover:text-yellow-400 border border-neutral-700">
                <LinkedinIcon size={24} />
              </a>
              <button
                onClick={() => window.location.href = 'mailto:ak44z@umsystem.edu'}
                className="bg-neutral-800 hover:bg-neutral-700 text-white p-3 rounded-full transition hover:scale-110 hover:text-yellow-400 border border-neutral-700"
                aria-label="Send email to ak44z@umsystem.edu"
              >
                <Mail size={24} />
              </button>
            </div>
            <button
              onClick={downloadResume}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg flex items-center gap-2 transition hover:scale-105 active:scale-95 font-bold shadow-lg shadow-yellow-500/20"
            >
              <Download size={20} />
              Download Resume
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-neutral-900 rounded-2xl p-8 mb-12 shadow-xl border border-neutral-800 animate-slide-up-delay-1">
          <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <User className="text-yellow-400" />
            About Me
          </h3>
          <p className="text-neutral-300 text-lg leading-relaxed mb-4">
            I'm a developer and student interested in quantitative finance and algorithmic trading.
            I like working on projects that mix data and strategy, and help people.
            At Mizzou, I am part of the TigerQuant and Mizzou Computing Association (MCA) student organizations.
          </p>
          <p className="text-neutral-300 text-lg leading-relaxed">
            Outside of coding, I spend my time working out, running with the Mizzou Club Running Team, doing marathons, and watching sports, especially football and soccer.
            I am a Seattle Seahawks and an Arsenal Fan, unfortunatly.
          </p>
        </div>

        {/* Skills Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up-delay-2">
          <div className="bg-neutral-900 rounded-xl p-6 shadow-xl transition-all duration-300 border border-neutral-800 group hover:border-yellow-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10">
            <Code className="text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-300" size={32} />
            <h4 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition">Development</h4>
            <p className="text-neutral-400">Python, C, Flutter, Java, Next.js</p>
          </div>
          <div className="bg-neutral-900 rounded-xl p-6 shadow-xl transition-all duration-300 border border-neutral-800 group hover:border-yellow-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10">
            <TrendingUp className="text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-300" size={32} />
            <h4 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition">Trading</h4>
            <p className="text-neutral-400">Quantitative Analysis, Algorithm Development, Risk Management</p>
          </div>
          <div className="bg-neutral-900 rounded-xl p-6 shadow-xl transition-all duration-300 border border-neutral-800 group hover:border-yellow-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10">
            <Briefcase className="text-amber-500 mb-4 group-hover:scale-110 transition-transform duration-300" size={32} />
            <h4 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition">Experience</h4>
            <p className="text-neutral-400">Full-Stack Projects, Data Science, Financial Modeling</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center animate-slide-up-delay-2">
          <h3 className="text-2xl font-bold text-white mb-6">Explore More</h3>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('projects')}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold transition hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/20"
            >
              View Projects
            </button>
            {/* <button
              onClick={() => setCurrentPage('trading')}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Trading Dashboard
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectsPage = () => (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">My Projects</h2>

        <div className="grid md:grid-cols-2 gap-8 animate-fade-in-delay">
          {/* Project 1 */}
          <div className="bg-neutral-900 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 border border-neutral-800 hover:border-yellow-500/50 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10">
            <div className="h-48 relative overflow-hidden">
              <Image
                src="/metropolisalg.png"
                alt="Metropolis Algorithm"
                fill
                className="object-cover object-[70%_60%] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition">Monte Carlo Superconductivity Undergraduate Research</h3>
              <p className="text-neutral-400 mb-4">
                Researched superconductivity through computational modeling using Python and Monte Carlo simulations. Used the Metropolis algorithm to study energy states and behaviors in nature.              </p>
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full text-sm border border-yellow-500/20">Python</span>
                <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-sm border border-amber-500/20">Monte Carlo Simulation</span>
                <span className="bg-neutral-700/50 text-neutral-300 px-3 py-1 rounded-full text-sm border border-neutral-700">Data Analysis</span>
              </div>
              <div className="flex gap-3">
                <Link href="/projects/superconductivity" className="text-yellow-400 hover:text-yellow-300 transition font-medium hover:underline underline-offset-4">Explore Project →</Link>
              </div>
            </div>
          </div>
          <div className="bg-neutral-900 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 border border-neutral-800 hover:border-yellow-500/50 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10">
            <div className="h-48 relative overflow-hidden">
              <Image
                src="/arsenal.png"
                alt="Space Ship Battle"
                fill
                className="object-cover object-[70%_60%] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition">Garmin Controled Arsenal LED Sign</h3>
              <p className="text-neutral-400 mb-4">
                An integraded smart home system that allows the control of an Arsenal LED Sign with a Garmin Fenix 5 watch using virtual machines and Home Assistant.
              </p>
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full text-sm border border-yellow-500/20">Nabu Casa</span>
                <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-sm border border-amber-500/20">UTM Virtual Machine</span>
                <span className="bg-neutral-700/50 text-neutral-300 px-3 py-1 rounded-full text-sm border border-neutral-700">Home Assistant Webhooks</span>
              </div>
              <div className="flex gap-3">
                <Link href="/projects/arsenal-led" className="text-yellow-400 hover:text-yellow-300 transition font-medium hover:underline underline-offset-4">Explore Project →</Link>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-neutral-900 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 border border-neutral-800 hover:border-yellow-500/50 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10">
            <div className="h-48 relative overflow-hidden">
              <Image
                src="/spaceShipBattle.png"
                alt="Space Ship Battle"
                fill
                className="object-cover object-[70%_50%] group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition">Space Ship Battle</h3>
              <p className="text-neutral-400 mb-4">
                A command line space ship battle game written in C, using pointer arithmetic,
                inspired by the board game Battleship. Players take turns playing against
                a computer with a targeted shooting strategy.
              </p>

              <div className="flex gap-2 flex-wrap mb-4">
                <span className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full text-sm border border-yellow-500/20">C</span>
              </div>

              <div className="flex gap-3">
                <Link href="/projects/spaceship-battle" className="text-yellow-400 hover:text-yellow-300 transition font-medium hover:underline underline-offset-4">Live Demo →</Link>
                <a href="https://github.com/alexkociubinski/TigerHacks-Fall-2025-Space-Ship-Battle-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition hover:underline underline-offset-4">GitHub →</a>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );

  /* const TradingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">Trading Strategies</h2>
        <p className="text-gray-400 text-center mb-12">Real-time performance metrics coming soon</p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4">Strategy 1: Momentum</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-300">
                <span>Total Return:</span>
                <span className="text-green-400 font-semibold">+24.5%</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Sharpe Ratio:</span>
                <span className="font-semibold">1.8</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Max Drawdown:</span>
                <span className="text-red-400 font-semibold">-12.3%</span>
              </div>
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Placeholder metrics. Connect to your trading API for live data.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4">Strategy 2: Mean Reversion</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-300">
                <span>Total Return:</span>
                <span className="text-green-400ls  font-semibold">+18.2%</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Sharpe Ratio:</span>
                <span className="font-semibold">1.5</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Max Drawdown:</span>
                <span className="text-red-400 font-semibold">-8.7%</span>
              </div>
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Placeholder metrics. Connect to your trading API for live data.
            </p>
          </div>
       </div>

  <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">
    <h3 className="text-2xl font-bold text-white mb-4">Performance Chart</h3>
    <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">
        Chart visualization area - integrate with recharts or your preferred charting library
      </p>
    </div>
    <p className="text-gray-400 mt-4">
      This section is ready for you to integrate real-time data from your trading platform.
      You can use WebSocket connections or API polling to update metrics live.
    </p>
  </div>
     </div>
  </div>
  ); */

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'projects' && <ProjectsPage />}
      {/* {currentPage === 'trading' && <TradingPage />} */}
    </div>
  );
};

export default Portfolio;