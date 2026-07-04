import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Youtube, 
  Instagram, 
  Linkedin, 
  Github, 
  Mail,
  Globe,
  Copy, 
  Share2, 
  Check, 
  ArrowUpRight, 
  Sparkles, 
  ExternalLink,
  Users,
  Eye,
  GithubIcon,
  Rss,
  Store,
  BadgeCheck,
  Star
} from 'lucide-react';

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

const SOCIALS: SocialProfile[] = [
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
    borderColor: 'border-red-500/30 hover:border-red-500/60',
    bgGradient: 'from-red-500/10 via-neutral-950/40 to-neutral-950/80',
    tags: ['Tech Guides', 'Coding', 'Vlogs']
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
    borderColor: 'border-pink-500/30 hover:border-pink-500/60',
    bgGradient: 'from-pink-500/10 via-neutral-950/40 to-neutral-950/80',
    tags: ['AI Trends', 'Life', 'Stories']
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
    borderColor: 'border-blue-500/30 hover:border-blue-500/60',
    bgGradient: 'from-blue-500/10 via-neutral-950/40 to-neutral-950/80',
    tags: ['Professional', 'Networking', 'Updates']
  },
  {
    id: 'github',
    name: 'GitHub',
    username: 'keshavsah333',
    url: 'https://github.com/keshavsah333',
    ctaText: 'View Profile',
    followerLabel: 'Stars & Followers',
    followersCount: 450,
    icon: Github,
    color: '#F0F6FC',
    glowColor: 'rgba(240, 246, 252, 0.2)',
    borderColor: 'border-neutral-500/20 hover:border-neutral-500/40',
    bgGradient: 'from-neutral-700/10 via-neutral-950/40 to-neutral-950/80',
    tags: ['Repositories', 'Projects', 'Contributions']
  },
  {
    id: 'email',
    name: 'Email',
    username: 'keshavsah333@gmail.com',
    url: 'mailto:keshavsah333@gmail.com',
    ctaText: 'Send Email',
    followerLabel: 'Inquiries & Updates',
    followersCount: 1200,
    icon: Mail,
    color: '#EA4335',
    glowColor: 'rgba(234, 67, 53, 0.4)',
    borderColor: 'border-red-500/20 hover:border-red-500/40',
    bgGradient: 'from-red-500/5 via-neutral-950/40 to-neutral-950/80',
    tags: ['Quick Query', 'Collaborate']
  },
  {
    id: 'website',
    name: 'Website',
    username: 'keshavsah.me',
    url: 'https://keshavsah.me',
    ctaText: 'Visit Site',
    followerLabel: 'Monthly Visitors',
    followersCount: 5000,
    icon: Globe,
    color: '#F5C423',
    glowColor: 'rgba(245, 196, 35, 0.5)',
    borderColor: 'border-brand-yellow/40 hover:border-brand-yellow/80',
    bgGradient: 'from-brand-yellow/15 via-neutral-950/40 to-neutral-950/80',
    tags: ['Live', 'Portfolio']
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
    borderColor: 'border-brand-yellow/40 hover:border-brand-yellow/80',
    bgGradient: 'from-brand-yellow/15 via-neutral-950/40 to-neutral-950/80',
    tags: ['Verified', 'Google Maps']
  }
];

// Helper Component for Animated Followers Numbers
function AnimatedCounter({ value, duration = 1800 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing out quadratic
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * value));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  // Format numbers nicely, say 12400 -> 12.4K
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toString();
  };

  return <span className="font-mono text-2xl font-extrabold tracking-tight">{formatNumber(count)}</span>;
}

// Custom 3D Card Component
function SocialCard({ profile }: { profile: SocialProfile }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState<'copy' | 'share' | null>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isBurst, setIsBurst] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate realistic tilt (-10deg to 10deg)
    const tiltX = -((mouseY / height) - 0.5) * 12;
    const tiltY = ((mouseX / width) - 0.5) * 12;

    // Direct Sheen coordinates (percentage of card area)
    const sheenX = (mouseX / width) * 100;
    const sheenY = (mouseY / height) * 100;

    setTilt({ x: tiltX, y: tiltY });
    setSheen({ x: sheenX, y: sheenY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Exclude button clicks
    const target = e.target as HTMLElement;
    if (target.closest('.utility-btn')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Trigger local ripple
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);

    // Glow burst feedback
    setIsBurst(true);
    setTimeout(() => setIsBurst(false), 500);

    // Open profile in new tab with slight lag for dynamic visual feedback
    setTimeout(() => {
      window.open(profile.url, '_blank', 'noopener,noreferrer');
    }, 280);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(profile.url).then(() => {
      setCopied(true);
      setShowTooltip('copy');
      setTimeout(() => {
        setCopied(false);
        setShowTooltip(null);
      }, 2000);
    });
  };

  const handleShareLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `${profile.name} - Keshav Sah`,
        text: `Check out Keshav Sah on ${profile.name}!`,
        url: profile.url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(profile.url).then(() => {
        setShowTooltip('share');
        setTimeout(() => setShowTooltip(null), 2000);
      });
    }
  };

  const IconComponent = profile.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative rounded-3xl overflow-hidden border p-6 flex flex-col justify-between min-h-[340px] select-none cursor-pointer duration-300 transition-shadow ${
        isBurst ? 'scale-105 shadow-[0_0_50px_rgba(250,204,21,0.5)] border-brand-yellow/80' : 'shadow-xl'
      } bg-gradient-to-br ${profile.bgGradient} border-neutral-200/20 dark:border-white/5`}
    >
      {/* 1. Dynamic Sheen/Reflection Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 mix-blend-overlay z-10"
        style={{
          background: `radial-gradient(circle 180px at ${sheen.x}% ${sheen.y}%, rgba(255, 255, 255, 0.4), transparent)`,
          opacity: isHovered ? 0.35 : 0
        }}
      />

      {/* 2. Soft Ambient Brand Glow Behind */}
      <div 
        className="absolute w-24 h-24 rounded-full filter blur-xl opacity-20 pointer-events-none z-0"
        style={{
          top: '25%',
          left: '20%',
          background: profile.color,
          transform: isHovered ? `translate(${tilt.y * 1.5}px, ${tilt.x * -1.5}px)` : 'none',
          transition: 'transform 0.2s ease-out'
        }}
      />

      {/* 3. Ripple Elements Container */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none z-10">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{ scale: 6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute rounded-full bg-white/20 pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 24,
                height: 24,
                marginLeft: -12,
                marginTop: -12,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* 4. Top Header of Card */}
      <div className="flex items-center justify-between z-10" style={{ transform: 'translateZ(30px)' }}>
        {/* Brand Icon & Glow */}
        <div className="relative group/logo">
          <div 
            className="absolute -inset-2 rounded-2xl blur-lg transition duration-500 opacity-60 group-hover/logo:opacity-100 animate-pulse"
            style={{ backgroundColor: profile.color, filter: 'blur(10px)' }}
          />
          <div className="relative p-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center">
            <IconComponent className="w-8 h-8" style={{ color: profile.color }} />
          </div>
        </div>

        {/* Action/Utility Controls */}
        <div className="flex gap-2 relative">
          {/* Copy Button */}
          <div className="relative">
            <button 
              onClick={handleCopyLink}
              title={profile.id === 'googlebusiness' ? "Copy Google Business Link" : "Copy link"}
              className="utility-btn p-2.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white transition-all shadow-md active:scale-95"
            >
              {copied ? <Check className="w-4.5 h-4.5 text-green-400" /> : <Copy className="w-4.5 h-4.5" />}
            </button>
            <AnimatePresence>
              {showTooltip === 'copy' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -45, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="absolute left-1/2 -translate-x-1/2 bg-neutral-900 text-white border border-neutral-700 font-medium px-2.5 py-1 rounded text-[10px] whitespace-nowrap shadow-xl z-20"
                >
                  Link Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Share Button */}
          <div className="relative">
            <button 
              onClick={handleShareLink}
              title={profile.id === 'googlebusiness' ? "Share Google Business Profile" : "Share profile"}
              className="utility-btn p-2.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white transition-all shadow-md active:scale-95"
            >
              <Share2 className="w-4.5 h-4.5" />
            </button>
            <AnimatePresence>
              {showTooltip === 'share' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -45, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="absolute left-1/2 -translate-x-1/2 bg-neutral-900 text-white border border-neutral-700 font-medium px-2.5 py-1 rounded text-[10px] whitespace-nowrap shadow-xl z-20"
                >
                  Link copied for share!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 5. Center Info Section */}
      <div className="my-5 flex flex-col gap-1 z-10" style={{ transform: 'translateZ(20px)' }}>
        <p className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-semibold">
          {profile.name}
        </p>
        <h3 className="text-2xl font-bold text-white tracking-tight leading-none group-hover:text-neutral-100 transition-colors flex items-center gap-1.5 flex-wrap">
          <span className="truncate max-w-[210px]">{profile.username}</span>
          <BadgeCheck className="w-5 h-5 text-blue-400 fill-blue-400/5 shrink-0" title="Verified Handle" />
        </h3>

        {/* Dynamic Follower Stats */}
        <div className="flex items-center gap-2 mt-4 text-white/90">
          <div className="flex items-center justify-center p-1.5 rounded-lg bg-white/5 border border-white/10">
            {profile.id === 'googlebusiness' ? (
              <BadgeCheck className="w-4 h-4 text-brand-yellow" />
            ) : (
              <Users className="w-4 h-4 text-brand-yellow/80" />
            )}
          </div>
          <div className="flex flex-col">
            {profile.id === 'googlebusiness' ? (
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 text-brand-yellow fill-brand-yellow shrink-0" />
                ))}
                <span className="text-xs font-bold font-mono ml-1.5 text-white">5.0</span>
              </div>
            ) : (
              <AnimatedCounter value={profile.followersCount} />
            )}
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 font-mono">
              {profile.followerLabel}
            </span>
          </div>
        </div>
      </div>

      {/* 6. Footer Call-to-Action */}
      <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2 z-10" style={{ transform: 'translateZ(15px)' }}>
        {/* Profile Tags */}
        <div className="flex gap-1 overflow-hidden max-w-[65%]">
          {profile.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] text-neutral-400 font-mono font-medium">
              #{tag}
            </span>
          ))}
        </div>

        {/* Micro Interaction Button */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-black bg-brand-yellow shadow-lg shadow-brand-yellow/20 hover:shadow-brand-yellow/35 hover:brightness-110 transition-all font-display"
          title={profile.id === 'googlebusiness' ? "View Google Business Profile" : ""}
        >
          <span>{profile.ctaText}</span>
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Particle Floating Effect background
function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 15 + 10,
    }));
    setParticles(items);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-yellow/20 dark:bg-brand-yellow/10"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [-25, -150, -25],
            x: [0, Math.sin(p.id) * 45, 0],
            opacity: [0.1, 0.6, 0.1],
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

export default function SocialHub() {
  return (
    <section 
      id="Socials" 
      className="relative w-full py-24 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-neutral-950 text-white rounded-[45px] border border-white/5 shadow-3xl my-20 sm:my-28 max-w-7xl mx-auto"
    >
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-yellow-500/5 rounded-full filter blur-[180px] pointer-events-none" />
      
      {/* Particles effect */}
      <FloatingParticles />

      {/* Header Info Block */}
      <div className="relative text-center max-w-2xl mx-auto mb-16 z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-brand-yellow/90 tracking-wide font-mono uppercase mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 fill-brand-yellow/20 animate-pulse" />
          <span>Multiverse Hub</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70"
        >
          Connect With Me
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neutral-400 text-sm sm:text-base leading-relaxed tracking-wide"
        >
          Let's connect, collaborate, and build something amazing together. Stay updated on modern technology trends, web portfolios, development hacks, and student stories.
        </motion.p>
      </div>

      {/* Grid container with glass responsive cards */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 z-10 max-w-7xl mx-auto">
        {SOCIALS.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: index * 0.12 }}
          >
            <SocialCard profile={profile} />
          </motion.div>
        ))}
      </div>

      {/* Micro Info Text Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-center mt-12 text-xs font-mono text-neutral-400 tracking-wider flex items-center justify-center gap-1.5"
      >
        <span>Designed with dynamic Apple & Tesla inspired layouts</span>
        <span>•</span>
        <span>Interactive 3D Perspective</span>
      </motion.div>
    </section>
  );
}
