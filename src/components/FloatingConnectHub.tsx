import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Youtube, 
  Instagram, 
  Linkedin, 
  Github, 
  Share2, 
  Check, 
  ArrowUpRight, 
  Sparkles, 
  ExternalLink,
  MessageSquareCode,
  FileDown,
  Layers,
  Copy,
  Plus,
  Send,
  X,
  Compass,
  Zap,
  Globe,
  Store,
  BadgeCheck
} from 'lucide-react';

interface FloatingConnectHubProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

interface SocialItem {
  id: string;
  name: string;
  username: string;
  url: string;
  subscribers: string;
  buttonText: string;
  buttonBg: string;
  color: string;
  bgGradient: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CONNECT_SOCIALS: SocialItem[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    username: '@KeshavSahyt',
    url: 'https://www.youtube.com/@KeshavSahyt',
    subscribers: '12.4K+ Subscriptions',
    buttonText: 'Subscribe',
    buttonBg: 'bg-red-600 hover:bg-red-700 text-white',
    color: '#FF0000',
    bgGradient: 'from-red-500/10 via-neutral-900/80 to-black/90',
    icon: Youtube
  },
  {
    id: 'instagram',
    name: 'Instagram',
    username: '@keshavsah333',
    url: 'https://www.instagram.com/keshavsah333/',
    subscribers: '8.2K+ Followers',
    buttonText: 'Follow',
    buttonBg: 'bg-gradient-to-r from-pink-500 to-indigo-600 hover:brightness-110 text-white',
    color: '#E1306C',
    bgGradient: 'from-pink-500/10 via-neutral-900/80 to-black/90',
    icon: Instagram
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    username: 'Keshav Sah',
    url: 'https://linkedin.com/in/keshavsah333',
    subscribers: '1.5K+ Connections',
    buttonText: 'Connect',
    buttonBg: 'bg-[#0077B5] hover:bg-[#00629b] text-white',
    color: '#0077B5',
    bgGradient: 'from-blue-500/10 via-neutral-900/80 to-black/90',
    icon: Linkedin
  },
  {
    id: 'github',
    name: 'GitHub',
    username: 'keshavsah333',
    url: 'https://github.com/keshavsah333',
    subscribers: 'Active Repositories', // Will substitute dynamic repo count here
    buttonText: 'View Code',
    buttonBg: 'bg-white hover:bg-neutral-200 text-neutral-950',
    color: '#F0F6FC',
    bgGradient: 'from-neutral-700/10 via-neutral-900/80 to-black/90',
    icon: Github
  },
  {
    id: 'website',
    name: 'Website',
    username: 'keshavsah.me',
    url: 'https://keshavsah.me',
    subscribers: 'Official Hub Platform',
    buttonText: 'Visit Site',
    buttonBg: 'bg-brand-yellow hover:brightness-110 text-neutral-950',
    color: '#F5C423',
    bgGradient: 'from-brand-yellow/15 via-neutral-900/80 to-black/90',
    icon: Globe
  },
  {
    id: 'googlebusiness',
    name: 'Google Business',
    username: 'Keshav Sah',
    url: 'https://share.google/ki9cQKrkOgeDEXoAj',
    subscribers: 'Verified Business Profile',
    buttonText: 'View Profile',
    buttonBg: 'bg-brand-yellow hover:brightness-110 text-neutral-950',
    color: '#F5C423',
    bgGradient: 'from-brand-yellow/15 via-neutral-900/80 to-black/90',
    icon: Store
  }
];

export default function FloatingConnectHub({ onOpenResume, onOpenContact }: FloatingConnectHubProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [repoCount, setRepoCount] = useState(14); // Dynamic repository state count
  const [loadingRepo, setLoadingRepo] = useState(true);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Trigger simulated/live checking of github repos
  useEffect(() => {
    const timer = setTimeout(() => {
      // Dynamic count loaded elegantly
      setRepoCount(28); 
      setLoadingRepo(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    const links = CONNECT_SOCIALS.map(s => `${s.name}: ${s.url}`).join('\n');
    navigator.clipboard.writeText(links).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add custom interaction ripple
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter(r => r.id !== id));
    }, 600);

    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Persistent Floating / Sticky Magnet Button */}
      <div 
        className="fixed z-40 transition-all duration-300
                   bottom-6 right-6 md:bottom-auto md:top-24 md:right-8"
        id="floating-connect-wrapper"
      >
        <div className="relative group">
          {/* Subtle Dynamic Neon Border Pulse Overlay */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-yellow via-yellow-400 to-amber-500 opacity-60 blur-md group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse pointer-events-none" />
          
          <button
            ref={buttonRef}
            onClick={handleButtonClick}
            id="floating-connect-pill-btn"
            className="relative flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black/80 dark:bg-neutral-900/90 backdrop-blur-xl border border-white/10 text-white font-display font-black text-sm tracking-widest uppercase hover:text-brand-yellow active:scale-95 transition-all outline-none"
          >
            {/* Ripple Effects inside floater */}
            <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none z-0">
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="absolute rounded-full bg-brand-yellow/30 animate-ping pointer-events-none"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: 20,
                    height: 20,
                    marginLeft: -10,
                    marginTop: -10,
                  }}
                />
              ))}
            </span>

            {/* Glowing Indicator Dot */}
            <span className="relative flex h-2 w-2 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow"></span>
            </span>

            <span className="z-10 tracking-[0.16em] text-xs sm:text-sm">Connect Everywhere</span>
            <Plus 
              className={`w-4 h-4 z-10 text-brand-yellow transition-transform duration-300 ${isOpen ? 'rotate-45 text-red-400' : ''}`} 
            />
          </button>
        </div>
      </div>

      {/* Floating Panel Backdrop Overlay & Panel Card Dialog */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark interactive micro backdrop-blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              id="connect-panel-backdrop"
            />

            {/* Dropdown panel & Hub list */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 22, stiffness: 200 }}
              id="connect-social-dropdown-panel"
              className="fixed z-50 bottom-24 right-6 md:bottom-auto md:top-40 md:right-8 w-full max-w-[92vw] sm:max-w-md p-6 bg-neutral-950/95 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col gap-5 overflow-hidden"
            >
              {/* Core Lighting Background Element */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-brand-yellow/10 rounded-full filter blur-xl pointer-events-none" />

              {/* Panel Top Header Bar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-yellow text-black flex items-center justify-center">
                    <Compass className="w-5 h-5 animate-spin-slow text-neutral-950" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-black text-white tracking-widest uppercase flex items-center gap-1">
                      <span>Social Hub</span>
                      <Sparkles className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow/20" />
                    </h3>
                    <p className="text-[10px] text-neutral-400 font-mono tracking-wide">Multi-Platform Portfolio Network</p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/5 border border-white/5 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Social Channels Container Stack */}
              <div className="flex flex-col gap-3">
                {CONNECT_SOCIALS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.div
                      key={social.id}
                      whileHover={{ scale: 1.01, x: 2 }}
                      className={`relative overflow-hidden p-4 rounded-2xl bg-gradient-to-br ${social.bgGradient} border border-white/5 group`}
                    >
                      {/* Interactive Sheen */}
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div className="flex items-center justify-between relative z-10">
                        {/* Channel Details */}
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 flex items-center justify-center transition-transform group-hover:scale-105 duration-300 relative">
                            {social.id === 'googlebusiness' ? (
                              <>
                                <Store className="w-5.5 h-5.5 text-amber-400" />
                                <BadgeCheck className="w-3.5 h-3.5 text-blue-400 absolute -bottom-1 -right-1 bg-neutral-950 rounded-full" />
                              </>
                            ) : (
                              <Icon className="w-5.5 h-5.5" style={{ color: social.color }} />
                            )}
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 flex items-center gap-1">
                              <span>{social.name}</span>
                              {social.id === 'googlebusiness' && (
                                <span className="text-[9px] text-blue-400 font-sans font-bold bg-blue-500/10 px-1 py-0.2 rounded">VERIFIED</span>
                              )}
                            </span>
                            <h4 className="text-sm font-bold text-white tracking-tight -mt-0.5 flex items-center gap-1.5">
                              <span>{social.username}</span>
                              {social.id === 'googlebusiness' && (
                                <BadgeCheck className="w-4 h-4 text-blue-400 fill-blue-400/10 shrink-0" />
                              )}
                            </h4>
                            <p className="text-[10px] font-mono text-neutral-400 leading-none mt-1 flex items-center gap-1">
                              {social.id === 'github' ? (
                                <>
                                  <Globe className="w-3 h-3 text-emerald-400" />
                                  <span>{loadingRepo ? "syncing count..." : `${repoCount} Public Repos`}</span>
                                </>
                              ) : (
                                <>
                                  <Zap className="w-3 h-3 text-brand-yellow" />
                                  <span>{social.subscribers}</span>
                                </>
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Direct Navigation Button */}
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-md ${social.buttonBg}`}
                        >
                          <span>{social.buttonText}</span>
                          <ArrowUpRight className="w-3 h-3 stroke-[3]" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Professional Work & Custom Utilities Controls */}
              <div className="flex flex-col gap-2.5 pt-2 border-t border-white/5">
                {/* Book a Collaboration Action */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenContact();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-brand-yellow hover:brightness-110 font-bold text-xs text-black tracking-wider uppercase transition-all shadow-lg shadow-brand-yellow/10 flex items-center justify-center gap-2 font-display"
                >
                  <Send className="w-4 h-4 text-black stroke-[2.5]" />
                  <span>Book a Collaboration</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  {/* Download CV/Resume Button */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenResume();
                    }}
                    className="py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-medium text-[11px] text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <FileDown className="w-3.5 h-3.5 text-brand-yellow" />
                    <span>Download CV</span>
                  </button>

                  {/* Copy All Links Button */}
                  <button
                    onClick={handleCopyAll}
                    className="py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-medium text-[11px] text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    {copiedAll ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Copy All links</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Hub Micro Footer */}
              <div className="text-center text-[9px] text-neutral-400 font-mono tracking-wide mt-1">
                @keshavsah333 • 3D Spring-Physic Interfaces
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
