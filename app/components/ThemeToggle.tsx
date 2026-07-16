'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  // Render a subtle placeholder during SSR and initial hydration to prevent mismatch
  if (!mounted) {
    return (
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-[100] w-10 h-10 rounded-full border border-border bg-surface shrink-0" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 md:top-6 md:right-6 z-[100] w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center text-text hover:text-accent hover:border-accent/50 hover:bg-bg transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md focus:outline-none"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon size={18} className="animate-fade-up text-text" />
      ) : (
        <Sun size={18} className="animate-fade-up text-text" />
      )}
    </button>
  );
}
