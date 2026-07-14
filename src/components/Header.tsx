import React, { useState, useEffect } from 'react';
import { Sun, Moon, Download, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentSection: string;
  onSectionSelect: (section: string) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenSocials: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.5"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

export default function Header({
  currentSection,
  onSectionSelect,
  onOpenResume,
  onOpenContact,
  onOpenSocials,
  theme,
  onToggleTheme,
}: HeaderProps) {
  const [logoSrc, setLogoSrc] = useState('https://res.cloudinary.com/dze78gcxs/image/upload/v1782129342/AAFuTC_kRuA_1740402086503_h75dwt.jpg');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { name: 'Home', action: () => onSectionSelect('Home') },
    { name: 'About', action: () => onOpenResume() },
    { name: 'Skills', action: () => onOpenResume() },
    { name: 'Projects', action: () => onOpenResume() },
    { name: 'Documents', action: () => onSectionSelect('Documents') },
    { name: 'Socials', action: () => onOpenSocials() },
    { name: 'Contact', action: () => onOpenContact() },
  ];

  // Prevent background scrolling while the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setIsMenuOpen(false); onSectionSelect('Home'); }}>
          <div className="flex items-center text-xl font-bold tracking-tight">
            <img
              src={logoSrc}
              alt="Keshav Sah Logo"
              referrerPolicy="no-referrer"
              onError={() => {
                if (logoSrc.startsWith('https://res.cloudinary.com')) {
                  setLogoSrc('/profile.png');
                } else if (logoSrc === '/profile.png') {
                  setLogoSrc('/assets/profile.png');
                } else if (logoSrc === '/assets/profile.png') {
                  setLogoSrc('/src/assets/profile.png');
                }
              }}
              className="w-10 h-10 rounded-full object-cover object-center border-2 border-brand-yellow/80 hover:border-brand-yellow transition-all group-hover:scale-105 duration-300 shadow-md"
            />
            <span className="ml-2.5 font-display text-neutral-900 dark:text-white font-bold text-lg hidden sm:inline-block">
              Keshav Sah
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentSection === link.name || (link.name === 'Socials' && currentSection === 'SOCIALS');
            return (
              <button
                key={link.name}
                onClick={link.action}
                className={`relative py-1 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-all cursor-pointer font-medium uppercase tracking-wide text-xs font-mono ${
                  isActive ? 'text-neutral-950 dark:text-white font-bold' : ''
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-yellow rounded-full shadow-sm shadow-brand-yellow/80" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions Button Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => { setIsMenuOpen(false); onOpenResume(); }}
            id="header-resume-download-btn"
            className="px-3.5 sm:px-4.5 py-2 sm:py-2.5 rounded-full bg-brand-yellow hover:bg-brand-yellow-hover text-neutral-900 font-bold text-xs flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-colors shadow-sm shadow-brand-yellow/10"
          >
            <Download size={13} className="stroke-[2.5px]" />
            <span className="hidden xs:inline">Resume</span>
            <span className="inline xs:hidden">CV</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            id="theme-toggler"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/50 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer shadow-inner"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/50 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer shadow-inner"
            aria-label="Toggle mobile menu"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" className="stroke-current">
              <Path
                variants={{
                  closed: { d: "M 3 5 L 17 5" },
                  open: { d: "M 4.5 15.5 L 15.5 4.5" }
                }}
                animate={isMenuOpen ? "open" : "closed"}
                transition={{ duration: 0.2 }}
              />
              <Path
                variants={{
                  closed: { d: "M 3 10 L 17 10", opacity: 1 },
                  open: { d: "M 3 10 L 17 10", opacity: 0 }
                }}
                animate={isMenuOpen ? "open" : "closed"}
                transition={{ duration: 0.15 }}
              />
              <Path
                variants={{
                  closed: { d: "M 3 15 L 17 15" },
                  open: { d: "M 4.5 4.5 L 15.5 15.5" }
                }}
                animate={isMenuOpen ? "open" : "closed"}
                transition={{ duration: 0.2 }}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 4.5rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
            className="absolute top-18 left-0 right-0 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-y-auto md:hidden flex flex-col justify-between"
            style={{ height: 'calc(100vh - 4.5rem)' }}
          >
            <div className="px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link, idx) => {
                const isActive = currentSection === link.name || (link.name === 'Socials' && currentSection === 'SOCIALS');
                return (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: idx * 0.04, type: 'spring', stiffness: 260, damping: 25 }}
                    onClick={() => {
                      setIsMenuOpen(false);
                      link.action();
                    }}
                    className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-bold font-mono transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-brand-yellow text-neutral-950 shadow-md shadow-brand-yellow/15'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-neutral-950 shadow-sm' : 'bg-transparent'}`} />
                  </motion.button>
                );
              })}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="px-6 py-5 bg-neutral-50/50 dark:bg-neutral-900/20 border-t border-neutral-200/40 dark:border-neutral-800/40 flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500"
            >
              <span>© {new Date().getFullYear()} Keshav Sah</span>
              <div className="flex gap-1.5 items-center font-bold uppercase tracking-wider text-brand-yellow">
                <span>PORTFOLIO NODE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
