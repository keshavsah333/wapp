import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Header from './components/Header';
import HeroLeft from './components/HeroLeft';
import HeroCenter from './components/HeroCenter';
import HeroRight from './components/HeroRight';
import StatsBanner from './components/StatsBanner';
import ContactFormModal from './components/ContactFormModal';
import ResumeModal from './components/ResumeModal';
import SocialHub from './components/SocialHub';
import DocumentsSection from './components/DocumentsSection';
import FloatingConnectHub from './components/FloatingConnectHub';
import SocialHubModal from './components/SocialHubModal';

export default function App() {
  const [currentSection, setCurrentSection] = useState('Home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);

  // Load and apply theme on mount
  useEffect(() => {
    // Theme loading
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // System preference fallback
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const handleToggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSectionSelect = (section: string) => {
    setCurrentSection(section);
    if (section === 'Socials') {
      const el = document.getElementById('Socials');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (section === 'Documents') {
      const el = document.getElementById('Documents');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (section === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-neutral-950 text-neutral-50' : 'bg-neutral-50 text-neutral-900'} transition-all duration-300 relative`}>
      {/* 1. Static Graph Paper Overlay Background */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 ${
        theme === 'dark' ? 'dark-grid-pattern opacity-80' : 'grid-pattern opacity-90'
      }`} />

      {/* Ambient gradient glows */}
      <div className="absolute top-24 left-10 w-96 h-96 bg-brand-yellow rounded-full filter blur-[140px] opacity-10 dark:opacity-5 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-brand-yellow rounded-full filter blur-[180px] opacity-10 dark:opacity-5 pointer-events-none" />

      {/* 2. Top Navigation Bar */}
      <Header
        currentSection={currentSection}
        onSectionSelect={handleSectionSelect}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenSocials={() => setIsSocialsOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* 3. Main Hero Landing Area Container */}
      <main className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between min-h-[calc(100vh-2rem)]">
        {/* Dynamic responsive grid columns for Left, Center and Right elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 items-center flex-1 my-auto pt-6 lg:pt-0">
          {/* Column A: Information Deck */}
          <section className="flex justify-center md:justify-start order-2 md:order-1 lg:col-span-1">
            <HeroLeft
              onOpenContact={() => setIsContactOpen(true)}
              onOpenResume={() => setIsResumeOpen(true)}
            />
          </section>

          {/* Column B: Illustrated Portrait Dome */}
          <section className="flex justify-center order-1 md:order-2 lg:col-span-1 py-4 sm:py-0">
            <HeroCenter 
              onOpenResume={() => setIsResumeOpen(true)} 
            />
          </section>

          {/* Column C: Action Contacts Column */}
          <section className="flex justify-center md:justify-end order-3 lg:col-span-1 md:col-span-2 lg:col-span-1">
            <HeroRight onOpenContact={() => setIsContactOpen(true)} />
          </section>
        </div>

        {/* 4. Scroll-down Indicator */}
        <div 
          onClick={() => handleSectionSelect('Socials')}
          className="flex flex-col items-center justify-center gap-2 mt-4 -mb-4 lg:my-0 select-none cursor-pointer hover:opacity-100 transition-opacity"
        >
          <motion.span 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 0.65, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-[10px] tracking-[0.25em] font-mono text-neutral-400 dark:text-neutral-500 uppercase font-semibold text-center"
          >
            Scroll Down
          </motion.span>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="w-5 h-8 border-2 border-neutral-300 dark:border-neutral-700/80 rounded-full flex justify-center p-1"
          >
            <motion.div 
              animate={{
                y: [0, 8, 0]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1.5 h-2 bg-brand-yellow rounded-full"
            />
          </motion.div>
        </div>

        {/* 5. Bottom Horizontal Stats deck */}
        <footer className="w-full mt-10 md:mt-12 order-5 z-20 space-y-8">
          <StatsBanner onOpenResume={() => setIsResumeOpen(true)} />
          
          <div className="w-full border-t border-neutral-300/30 dark:border-neutral-800/50 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left select-none">
            <div className="space-y-1.5">
              <h4 className="text-sm font-display font-extrabold tracking-normal text-neutral-900 dark:text-white">
                © 2026 Keshav Sah
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium whitespace-pre-line">
                All Rights Reserved.
              </p>
              <p className="text-xs text-brand-yellow font-semibold">
                AI Enthusiast • Web Developer • Graphic Designer
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs font-mono">
              <a 
                href="https://keshavsah.me" 
                target="_blank" 
                rel="noreferrer" 
                className="text-neutral-500 dark:text-neutral-400 hover:text-brand-yellow transition-colors font-semibold"
              >
                Website: <span className="underline decoration-brand-yellow/50">https://keshavsah.me</span>
              </a>
              <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">|</span>
              <a 
                href="mailto:keshavsah333@gmail.com" 
                className="text-neutral-500 dark:text-neutral-400 hover:text-brand-yellow transition-colors font-semibold"
              >
                Email: <span className="underline decoration-brand-yellow/50">keshavsah333@gmail.com</span>
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* Modern Premium Social Media Hub */}
      <SocialHub />

      {/* Credential & Verification Documents Section */}
      <DocumentsSection onOpenResume={() => setIsResumeOpen(true)} />

      {/* Floating Connectivity/Menu Button */}
      <FloatingConnectHub 
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Overlay Components */}
      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      <SocialHubModal isOpen={isSocialsOpen} onClose={() => setIsSocialsOpen(false)} />
    </div>
  );
}
