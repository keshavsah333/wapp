import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Brain, Cpu, CreativeCommons, PenTool, Bot, Lightbulb, ArrowRight } from 'lucide-react';

interface HeroLeftProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export default function HeroLeft({ onOpenContact, onOpenResume }: HeroLeftProps) {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  const tags = [
    { name: 'Graphic Design', icon: <PenTool size={14} />, desc: 'Brand assets, typography & Vector SVGs' },
    { name: 'Dev & Automation', icon: <Bot size={14} />, desc: 'Backend systems, Web Scraping & Python tools' },
    { name: 'Creative', icon: <Lightbulb size={14} />, desc: 'Bespoke UI designs, UX journeys & animations' },
  ];

  return (
    <div className="space-y-6 flex flex-col justify-center max-w-xl">
      {/* 1. Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center self-start px-4 py-1.5 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-brand-yellow mr-2.5 animate-pulse" />
        <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 tracking-wide font-mono">
          BCA (Hons.) Student | AI Enthusiast | Designer
        </span>
      </motion.div>

      {/* 2. Main Large Headline */}
      <div className="space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="text-6xl sm:text-[80px] font-display font-extrabold text-neutral-950 dark:text-white tracking-tight leading-[0.95]"
        >
          Keshav Sah
        </motion.h1>

        {/* Subtitle with custom gold formatting and inline AI block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2 text-2xl sm:text-3xl font-display font-bold text-neutral-800 dark:text-neutral-200 tracking-tight"
        >
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Building the Future with</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 mt-1">
            <span className="text-brand-yellow font-extrabold flex items-center gap-1.5 relative drop-shadow-[0_1px_4px_rgba(245,196,35,0.15)]">
              Digital
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                <Sparkles size={20} className="text-brand-yellow animate-pulse" />
              </motion.span>
            </span>
            <span className="text-neutral-900 dark:text-white font-extrabold">Experiences</span>
            
            {/* Custom DEV badge matching the mockup */}
            <span className="inline-flex items-center justify-center font-mono text-xs font-bold px-1.5 py-0.5 rounded-md border-2 border-neutral-950 dark:border-white bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-sm ml-1">
              DEV
            </span>
          </div>
        </motion.div>
      </div>

      {/* 3. Description Paragraph */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans font-medium"
      >
        I create digital experiences that blend creativity, design, and full-stack development to solve real-world problems.
      </motion.p>

      {/* 4. Quick Skills Category Pill Tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-2.5 pt-2"
      >
        {tags.map((tag) => (
          <div key={tag.name} className="relative">
            <button
              onMouseEnter={() => setHoveredBadge(tag.name)}
              onMouseLeave={() => setHoveredBadge(null)}
              onClick={onOpenResume}
              className="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white hover:bg-neutral-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all hover:scale-103 shadow-xs"
            >
              <span className="text-brand-yellow font-bold">{tag.icon}</span>
              {tag.name}
            </button>
            
            {/* Tooltip info */}
            {hoveredBadge === tag.name && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 bottom-10 z-10 w-48 p-2 rounded-xl bg-neutral-950 text-white text-[10px] leading-normal font-mono rounded-bl-sm pointer-events-none shadow-lg border border-neutral-800"
              >
                {tag.desc}
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>

      {/* 5. Main Buttons CTA block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: 'spring' }}
        className="flex flex-wrap gap-4 pt-4"
      >
        {/* View My Work */}
        <button
          onClick={onOpenResume}
          id="hero-view-work-btn"
          className="group px-6 py-3 rounded-full bg-brand-yellow hover:bg-brand-yellow-hover text-neutral-950 font-bold text-sm flex items-center gap-3 transition-all cursor-pointer shadow-md shadow-brand-yellow/10"
        >
          View My Work
          <span className="w-6 h-6 rounded-full bg-neutral-950 text-brand-yellow flex items-center justify-center transition-transform group-hover:translate-x-1">
            <ArrowRight size={12} className="stroke-[3px]" />
          </span>
        </button>

        {/* Contact Me */}
        <button
          onClick={onOpenContact}
          id="hero-contact-me-btn"
          className="group px-6 py-3 rounded-full border border-neutral-950 dark:border-white bg-white hover:bg-neutral-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-950 dark:text-white font-bold text-sm flex items-center gap-3 transition-all cursor-pointer shadow-xs"
        >
          Contact Me
          <span className="w-6 h-6 rounded-full bg-transparent border border-neutral-950 dark:border-white text-neutral-950 dark:text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
            <ArrowRight size={12} className="stroke-[2.5px]" />
          </span>
        </button>
      </motion.div>
    </div>
  );
}
