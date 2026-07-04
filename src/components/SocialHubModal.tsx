import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Youtube, 
  Instagram, 
  Linkedin, 
  Github, 
  Mail, 
  Globe, 
  BadgeCheck, 
  X, 
  Copy, 
  Check, 
  Share2, 
  ArrowUpRight, 
  Sparkles,
  Store,
  Star
} from 'lucide-react';

interface SocialHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SocialProfile {
  id: string;
  name: string;
  username: string;
  url: string;
  ctaText: string;
  followerLabel: string;
  followersCount: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glowColor: string;
  borderColor: string;
  bgGradient: string;
  tags: string[];
}

const MODAL_SOCIALS: SocialProfile[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    username: '@KeshavSahyt',
    url: 'https://www.youtube.com/@KeshavSahyt',
    ctaText: 'Subscribe',
    followerLabel: 'Subscribers',
    followersCount: 12400,
    icon: Youtube,
    color: '#FF0000',
    glowColor: 'rgba(255, 0, 0, 0.4)',
    borderColor: 'border-red-500/20 hover:border-red-500/50',
    bgGradient: 'from-red-500/10 via-neutral-900/60 to-neutral-900/90',
    tags: ['Coding', 'AI Content']
  },
  {
    id: 'instagram',
    name: 'Instagram',
    username: '@keshavsah333',
    url: 'https://www.instagram.com/keshavsah333/',
    ctaText: 'Follow',
    followerLabel: 'Followers',
    followersCount: 8250,
    icon: Instagram,
    color: '#E1306C',
    glowColor: 'rgba(225, 48, 108, 0.4)',
    borderColor: 'border-pink-500/20 hover:border-pink-500/50',
    bgGradient: 'from-pink-500/10 via-neutral-900/60 to-neutral-900/90',
    tags: ['AI Trends', 'Life']
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    username: 'Keshav Sah',
    url: 'https://linkedin.com/in/keshavsah333',
    ctaText: 'Connect',
    followerLabel: 'Connections',
    followersCount: 1530,
    icon: Linkedin,
    color: '#0077B5',
    glowColor: 'rgba(0, 119, 181, 0.4)',
    borderColor: 'border-blue-500/20 hover:border-blue-500/50',
    bgGradient: 'from-blue-500/10 via-neutral-900/60 to-neutral-900/90',
    tags: ['Professional', 'Updates']
  },
  {
    id: 'github',
    name: 'GitHub',
    username: 'keshavsah333',
    url: 'https://github.com/keshavsah333',
    ctaText: 'View Code',
    followerLabel: 'Stars & Followers',
    followersCount: 450,
    icon: Github,
    color: '#F0F6FC',
    glowColor: 'rgba(240, 246, 252, 0.2)',
    borderColor: 'border-neutral-500/20 hover:border-neutral-500/50',
    bgGradient: 'from-neutral-700/10 via-neutral-900/60 to-neutral-900/90',
    tags: ['Repositories', 'Projects']
  },
  {
    id: 'email',
    name: 'Email',
    username: 'keshavsah333@gmail.com',
    url: 'mailto:keshavsah333@gmail.com',
    ctaText: 'Send Email',
    followerLabel: 'Quick Communication',
    followersCount: 1350,
    icon: Mail,
    color: '#EA4335',
    glowColor: 'rgba(234, 67, 53, 0.4)',
    borderColor: 'border-red-500/20 hover:border-red-500/50',
    bgGradient: 'from-red-500/5 via-neutral-900/60 to-neutral-900/90',
    tags: ['Direct', 'Partner Collab']
  },
  {
    id: 'website',
    name: 'Website',
    username: 'keshavsah.me',
    url: 'https://keshavsah.me',
    ctaText: 'Visit Live',
    followerLabel: 'Official Domain',
    followersCount: 5200,
    icon: Globe,
    color: '#F5C423',
    glowColor: 'rgba(245, 196, 35, 0.5)',
    borderColor: 'border-brand-yellow/30 hover:border-brand-yellow/60',
    bgGradient: 'from-brand-yellow/10 via-neutral-900/60 to-neutral-900/90',
    tags: ['Custom Design', 'Fast']
  },
  {
    id: 'googlebusiness',
    name: 'Google Business Profile',
    username: 'Keshav Sah',
    url: 'https://share.google/ki9cQKrkOgeDEXoAj',
    ctaText: 'View Business Profile',
    followerLabel: 'Engineer / AI Enthusiast',
    followersCount: 5,
    icon: Store,
    color: '#F5C423',
    glowColor: 'rgba(245, 196, 35, 0.5)',
    borderColor: 'border-brand-yellow/30 hover:border-brand-yellow/60',
    bgGradient: 'from-brand-yellow/10 via-neutral-900/60 to-neutral-900/90',
    tags: ['Verified', 'Google Maps']
  }
];

function FloatingParticlesInside() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      duration: Math.random() * 8 + 6,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
         <motion.div
           key={p.id}
           className="absolute rounded-full bg-brand-yellow/20"
           style={{
             left: `${p.x}%`,
             top: `${p.y}%`,
             width: p.size,
             height: p.size,
           }}
           animate={{
             y: [-10, -50, -10],
             x: [0, Math.sin(p.id) * 20, 0],
             opacity: [0.1, 0.5, 0.1],
           }}
           transition={{
             duration: p.duration,
             repeat: Infinity,
             delay: p.delay,
             ease: 'easeInOut',
           }}
         />
      ))}
    </div>
  );
}

function GridSocialCard({ profile }: { profile: SocialProfile; key?: React.Key }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState<'copy' | 'share' | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate interactive 3D tilt values
    const tiltX = -((mouseY / height) - 0.5) * 15;
    const tiltY = ((mouseX / width) - 0.5) * 15;

    // Direct Sheen coordinates (reflection glow)
    const sheenX = (mouseX / width) * 100;
    const sheenY = (mouseY / height) * 100;

    setTilt({ x: tiltX, y: tiltY });
    setSheen({ x: sheenX, y: sheenY });
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(profile.url).then(() => {
      setCopied(true);
      setShowTooltip('copy');
      setTimeout(() => {
        setCopied(false);
        setShowTooltip(null);
      }, 1800);
    });
  };

  const handleShareLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `${profile.name} - Keshav Sah`,
        text: `Connect with Keshav Sah on ${profile.name}!`,
        url: profile.url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(profile.url).then(() => {
        setShowTooltip('share');
        setTimeout(() => setShowTooltip(null), 1800);
      });
    }
  };

  const handleOpenProfile = () => {
    window.open(profile.url, '_blank', 'noopener,noreferrer');
  };

  const IconComponent = profile.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      onClick={handleOpenProfile}
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative rounded-2xl overflow-hidden border p-5 flex flex-col justify-between min-h-[220px] select-none cursor-pointer duration-300 shadow-lg bg-gradient-to-br ${profile.bgGradient} ${profile.borderColor}`}
    >
      {/* Glossy sheen reflection */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-overlay z-10"
        style={{
          background: `radial-gradient(circle 120px at ${sheen.x}% ${sheen.y}%, rgba(255, 255, 255, 0.3), transparent)`,
          opacity: isHovered ? 0.4 : 0
        }}
      />

      {/* Brand light glow source */}
      <div 
        className="absolute w-20 h-20 rounded-full filter blur-xl opacity-20 pointer-events-none z-0"
        style={{
          top: '15%',
          left: '15%',
          background: profile.color,
          transform: isHovered ? `translate(${tilt.y * 1.2}px, ${tilt.x * -1.2}px)` : 'none',
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Card Header Content */}
      <div className="flex items-center justify-between z-10" style={{ transform: 'translateZ(20px)' }}>
        <div className="relative">
          <div 
            className="absolute -inset-1 rounded-xl blur-md opacity-40 group-hover:opacity-100 transition"
            style={{ backgroundColor: profile.color }}
          />
          <div className="relative p-2.5 rounded-xl bg-black/50 border border-white/10 text-white flex items-center justify-center">
            <IconComponent className="w-5 h-5" style={{ color: profile.color }} />
          </div>
        </div>

        {/* Mini Sharing Tools */}
        <div className="flex items-center gap-1.5 opacity-90">
          <button 
            onClick={handleCopyLink}
            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-black border border-white/10 text-neutral-400 hover:text-white transition-all scale-90"
            title="Copy URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button 
            onClick={handleShareLink}
            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-black border border-white/10 text-neutral-400 hover:text-white transition-all scale-90"
            title="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Middle Text Details */}
      <div className="mt-4 z-10 space-y-1" style={{ transform: 'translateZ(15px)' }}>
        <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
          {profile.name}
        </p>
        <h4 className="text-md sm:text-lg font-bold text-white tracking-tight flex items-center gap-1 leading-tight">
          <span className="truncate max-w-[150px]">{profile.username}</span>
          <BadgeCheck className="w-4.5 h-4.5 text-blue-400 fill-blue-400/5 shrink-0" title="Verified Handle" />
        </h4>
        <p className="text-[10px] font-mono text-neutral-400 font-medium flex items-center gap-1">
          {profile.id === 'googlebusiness' ? (
            <span className="flex items-center gap-0.5 text-brand-yellow">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 fill-brand-yellow shrink-0" />
              ))}
              <span className="text-[10px] font-bold text-white ml-1">5.0 • {profile.followerLabel}</span>
            </span>
          ) : (
            profile.followerLabel
          )}
        </p>
      </div>

      {/* Action CTA Panel */}
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between z-10" style={{ transform: 'translateZ(10px)' }}>
        <div className="flex gap-1">
          {profile.tags.map((tag, i) => (
            <span key={i} className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 border border-white/5 font-mono text-neutral-400 uppercase">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-black bg-brand-yellow px-2.5 py-1 rounded-lg shadow-sm hover:brightness-110 active:scale-95 transition-all">
          <span>{profile.ctaText}</span>
          <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
        </div>
      </div>
    </motion.div>
  );
}

export default function SocialHubModal({ isOpen, onClose }: SocialHubModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div id="socials-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
            id="socials-backdrop-overlay"
          />

          {/* Modal Card Layout Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', damping: 22, stiffness: 200 }}
            id="socials-modal-card"
            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-neutral-900/90 text-white rounded-3xl shadow-2xl border border-white/10 flex flex-col z-10 p-6 sm:p-8"
          >
            {/* Background Ambient Effects */}
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-brand-yellow/10 rounded-full filter blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-yellow-500/5 rounded-full filter blur-[110px] pointer-events-none" />
            <FloatingParticlesInside />

            {/* Modal Header */}
            <div className="relative flex justify-between items-start pb-5 border-b border-white/5 z-10 shrink-0">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-brand-yellow tracking-wider font-mono uppercase mb-2">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  <span>Interactive Social Grid</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                  Floating Connectivity Panel
                </h3>
                <p className="text-xs text-neutral-400">
                  Beautiful glassmorphic, 3D active profiles verified portfolio. Let's work on modern AI-driven solutions!
                </p>
              </div>

              <button
                id="close-socials-modal-btn"
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Orbiting Ring Visual System Container */}
            <div className="relative my-4 flex items-center justify-center pointer-events-none shrink-0 h-4 overflow-hidden">
              <div className="absolute w-[95%] h-[1px] bg-gradient-to-r from-transparent via-brand-yellow/30 to-transparent" />
              <div className="absolute w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
            </div>

            {/* Social Grid Content */}
            <div className="flex-1 overflow-y-auto pr-1 py-2 z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MODAL_SOCIALS.map((profile) => (
                  <GridSocialCard key={profile.id} profile={profile} />
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="relative border-t border-white/5 pt-5 mt-4 text-center text-[11px] font-mono text-neutral-500 flex flex-col sm:flex-row justify-between items-center gap-2 z-10 shrink-0">
              <span>Verified Identity • © 2026 Keshav Sah</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Active Collaborator • New Delhi, India
              </span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
