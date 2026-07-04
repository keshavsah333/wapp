import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Globe, ArrowRightLeft, ChevronsRight, MonitorPlay, Store } from 'lucide-react';

interface HeroRightProps {
  onOpenContact: () => void;
}

export default function HeroRight({ onOpenContact }: HeroRightProps) {
  const contactMethods = [
    {
      id: 'phone',
      label: 'Phone Number:',
      value: '+91 8920149248',
      href: 'tel:+918920149248',
      iconColor: 'bg-emerald-500 text-white',
      hoverColor: 'hover:border-emerald-500',
      icon: <Phone size={14} className="stroke-[2.5px]" />,
    },
    {
      id: 'email',
      label: 'Email Address:',
      value: 'keshavsah333@gmail.com',
      href: 'mailto:keshavsah333@gmail.com',
      iconColor: 'bg-red-500 text-white',
      hoverColor: 'hover:border-red-500',
      icon: <Mail size={14} className="stroke-[2.5px]" />,
    },
    {
      id: 'website',
      label: 'Website:',
      value: 'keshavsah.me',
      href: 'https://keshavsah.me',
      iconColor: 'bg-blue-500 text-white',
      hoverColor: 'hover:border-blue-500',
      icon: <Globe size={14} className="stroke-[2.5px]" />,
      external: true,
    },
    {
      id: 'googlebusiness',
      label: 'Google Business:',
      value: 'Keshav Sah (Verified)',
      href: 'https://share.google/ki9cQKrkOgeDEXoAj',
      iconColor: 'bg-amber-500 text-neutral-950 font-bold',
      hoverColor: 'hover:border-yellow-500',
      icon: <Store size={14} className="stroke-[2.5px]" />,
      external: true,
    }
  ];

  return (
    <div className="w-full md:max-w-[280px] space-y-6 flex flex-col justify-center">
      {/* 1. Playful "Something Viral" Prompt Section */}
      <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 space-y-3 shadow-xs">
        <h3 className="text-xl font-display font-medium text-neutral-800 dark:text-neutral-200 tracking-tight flex items-center justify-between">
          <span>Let's create something viral!</span>
        </h3>

        {/* Dynamic arrows design item */}
        <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/50 p-2.5 rounded-xl border border-neutral-100/50 dark:border-neutral-700">
          <div className="flex text-neutral-400 dark:text-neutral-600 font-bold tracking-tighter">
            <ChevronsRight size={22} className="animate-pulse" />
          </div>
          
          {/* Handdrawn look SVGs of AI monitor screen */}
          <svg width="40" height="34" viewBox="0 0 44 38" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-yellow">
            <rect x="2" y="2" width="40" height="26" rx="4" fill="none" />
            <path d="M12 36 h20" strokeWidth="2" />
            <path d="M22 28 v8" strokeWidth="2" />
            {/* Minimal AI system draw */}
            <circle cx="22" cy="15" r="4" fill="currentColor" className="animate-ping opacity-10" />
            <circle cx="22" cy="15" r="2" fill="currentColor" />
            <path d="M15 15 h4" />
            <path d="M25 15 h4" />
          </svg>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="h-[2px] bg-neutral-100 dark:bg-neutral-800/80 w-full" />

      {/* 2. Compact Contact Widget Deck */}
      <div className="space-y-4">
        {contactMethods.map((method) => (
          <motion.a
            key={method.id}
            href={method.href}
            target={method.external ? '_blank' : undefined}
            rel={method.external ? 'noreferrer' : undefined}
            whileHover={{ x: 4 }}
            className={`flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800/80 ${method.hoverColor} hover:shadow-xs transition-colors group`}
          >
            {/* Round Icon Badge */}
            <div className={`p-2.5 rounded-full flex items-center justify-center shrink-0 ${method.iconColor} shadow-inner transition-transform group-hover:scale-105`}>
              {method.icon}
            </div>

            {/* Label and details */}
            <div className="space-y-0.5 overflow-hidden">
              <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                {method.label}
              </span>
              <span className="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate group-hover:text-brand-yellow transition-colors font-mono">
                {method.value}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
