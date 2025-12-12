'use client';

import React, { useState } from 'react';
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
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Alex Kociubinski
          </h1>
          <div className="flex gap-6">
            <button
              onClick={() => setCurrentPage('home')}
              className={`hover:text-blue-400 transition ${currentPage === 'home' ? 'text-blue-400' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('projects')}
              className={`hover:text-blue-400 transition ${currentPage === 'projects' ? 'text-blue-400' : ''}`}
            >
              Projects
            </button>
            <button
              onClick={() => setCurrentPage('trading')}
              className={`hover:text-blue-400 transition ${currentPage === 'trading' ? 'text-blue-400' : ''}`}
            >
              Trading
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mx-auto mb-6 flex items-center justify-center">
            <User size={80} className="text-white" />
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Alex Kociubinski</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Computer Science & Mathematics Dual Major | University of Missouri
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4 justify-center">
              <a href="https://github.com/alexkociubinski" target="_blank" rel="noopener noreferrer"
                className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-full transition">
                <GithubIcon size={24} />
              </a>
              <a href="https://linkedin.com/in/alex-kociubinski" target="_blank" rel="noopener noreferrer"
                className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-full transition">
                <LinkedinIcon size={24} />
              </a>
              <a href="mailto:ak44z@umsystem.edu"
                className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-full transition">
                <Mail size={24} />
              </a>
            </div>
            <button
              onClick={downloadResume}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition font-semibold"
            >
              <Download size={20} />
              Download Resume
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-slate-800 rounded-2xl p-8 mb-12 shadow-xl">
          <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <User className="text-blue-400" />
            About Me
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            I'm a developer and student interested in quantitative finance and algorithmic trading, click Trading to view how my strategies are doing.
            I like working on projects that mix data and strategy, and help people.
            At Mizzou, I am part of the TigerQuant and Mizzou Computing Association (MCA) student organizations.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Outside of coding, I spend my time working out, running with the Mizzou Club Running Team, doing marathons, and watching sports, especially football and soccer.
            I am a Seattle Seahawks and an Arsenal Fan, unfortunatly.
          </p>
        </div>

        {/* Skills Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition">
            <Code className="text-blue-400 mb-4" size={32} />
            <h4 className="text-xl font-bold text-white mb-3">Development</h4>
            <p className="text-gray-400">Python, C, Flutter, Java, Next.js</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition">
            <TrendingUp className="text-green-400 mb-4" size={32} />
            <h4 className="text-xl font-bold text-white mb-3">Trading</h4>
            <p className="text-gray-400">Quantitative Analysis, Algorithm Development, Risk Management</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition">
            <Briefcase className="text-purple-400 mb-4" size={32} />
            <h4 className="text-xl font-bold text-white mb-3">Experience</h4>
            <p className="text-gray-400">Full-Stack Projects, Data Science, Financial Modeling</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Explore More</h3>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('projects')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              View Projects
            </button>
            <button
              onClick={() => setCurrentPage('trading')}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Trading Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">My Projects</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Project 1 */}
          <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition">
            <div className="h-48 relative">
              <Image
                src="/arsenal.png"
                alt="Space Ship Battle"
                fill
                className="object-cover object-[70%_60%]"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-3">Garmin Controled Arsenal LED Sign</h3>
              <p className="text-gray-400 mb-4">
                An integraded smart home system that allows the control of an Arsenal LED Sign with a Garmin Fenix 5 watch using virtual machines and Home Assistant.
              </p>
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">Nabu Casa</span>
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">UTM Virtual Machine</span>
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">Home Assistant Webhooks</span>
              </div>
              <div className="flex gap-3">
                <Link href="/projects/arsenal-led" className="text-blue-400 hover:text-blue-300 transition">Explore Project →</Link>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition">
            <div className="h-48 relative">
              <Image
                src="/spaceShipBattle.png"
                alt="Space Ship Battle"
                fill
                className="object-cover object-[70%_50%]"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-3">Space Ship Battle</h3>
              <p className="text-gray-400 mb-4">
                A command line space ship battle game written in C, using pointer arithmetic,
                inspired by the board game Battleship. Players take turns playing against
                a computer with a targeted shooting strategy.
              </p>

              <div className="flex gap-2 flex-wrap mb-4">
                <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">C</span>
              </div>

              <div className="flex gap-3">
                <Link href="/projects/spaceship-battle" className="text-blue-400 hover:text-blue-300 transition">Live Demo →</Link>
                <a href="https://github.com/alexkociubinski/TigerHacks-Fall-2025-Space-Ship-Battle-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-300 transition">GitHub →</a>
              </div>
            </div>
          </div>


          {/* Project 3 */}
          <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition">
            <div className="h-48 relative">
              <Image
                src="/arsenal.png"
                alt="Space Ship Battle"
                fill
                className="object-cover object-[70%_60%]"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-3">Monte Carlo Superconductivity Undergraduate Research</h3>
              <p className="text-gray-400 mb-4">
                An integraded smart home system that allows the control of an Arsenal LED Sign with a Garmin Fenix 5 watch using virtual machines and Home Assistant.
              </p>
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">Nabu Casa</span>
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">UTM Virtual Machine</span>
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">Home Assistant Webhooks</span>
              </div>
              <div className="flex gap-3">
                <Link href="/projects/superconductivity" className="text-blue-400 hover:text-blue-300 transition">Explore Project →</Link>
              </div>
            </div>
          </div>
        </div>



        {/* Video Project Example */}
        <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition md:col-span-2">
          <div className="aspect-video bg-black">
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              {/* Replace with: <video controls className="w-full h-full"><source src="/demo.mp4" type="video/mp4" /></video> */}
              <p>Video Demo Placeholder (Add video file to public folder)</p>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-3">Video Demo Project</h3>
            <p className="text-gray-400">
              A project with a video demonstration showing the application in action.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const TradingPage = () => (
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
  );

  return (
    <div className="min-h-screen bg-slate-900">
      <NavBar />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'projects' && <ProjectsPage />}
      {currentPage === 'trading' && <TradingPage />}
    </div>
  );
};

export default Portfolio;