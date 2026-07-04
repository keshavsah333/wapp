import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Brain, Sparkles, Terminal, Code, Bot } from 'lucide-react';

interface HeroCenterProps {
  onOpenResume: () => void;
}

export default function HeroCenter({ onOpenResume }: HeroCenterProps) {
  const [imgSrc, setImgSrc] = React.useState('https://res.cloudinary.com/dze78gcxs/image/upload/v1782129342/AAFuTC_kRuA_1740402086503_h75dwt.jpg');
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [sheen, setSheen] = React.useState({ x: 50, y: 50 });

  // 3D idle breathing/swaying loop when not hovered
  React.useEffect(() => {
    if (isHovered) return;

    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      // Gentle infinite orbital 3D sway (looks very organic and alive)
      const swayX = Math.sin(elapsed * 0.0016) * 6;
      const swayY = Math.cos(elapsed * 0.0014) * 8;
      
      setTilt({ x: swayX, y: swayY });
      setSheen({
        x: 50 + Math.sin(elapsed * 0.0016) * 20,
        y: 50 + Math.cos(elapsed * 0.0014) * 20
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max 22 degrees of tilt for brilliant depth
    const tiltX = ((y - centerY) / centerY) * -22;
    const tiltY = ((x - centerX) / centerX) * 22;
    
    setTilt({ x: tiltX, y: tiltY });
    setIsHovered(true);

    // Track cursor location for specular highlight sheen position
    const sheenX = (x / rect.width) * 100;
    const sheenY = (y / rect.height) * 100;
    setSheen({ x: sheenX, y: sheenY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-[460px] select-none">
      {/* 1. Backdrop Grid Vector Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
        {/* Bezier Pen Curve Tracing from Left side of page and leading under the profile */}
        <motion.path
          d="M -120,380 C -20,400 40,280 160,330 C 220,350 240,410 320,390"
          fill="none"
          stroke="#000"
          className="dark:stroke-neutral-500"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 12 }}
        />
        {/* Anchor nodes of Bezier */}
        <rect x="-122" y="378" width="5" height="5" fill="#f5c423" stroke="#000" strokeWidth="1" />
        <rect x="158" y="328" width="5" height="5" fill="#f5c423" stroke="#000" strokeWidth="1" />
        <rect x="318" y="388" width="5" height="5" fill="#f5c423" stroke="#000" strokeWidth="1" />
      </svg>

      {/* 2. Premium 3D Circular Avatar Container */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center cursor-pointer select-none"
        style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
      >
        {/* Soft Golden Glow Backdrop - Behind Everything */}
        <motion.div
          className="absolute inset-[10%] rounded-full bg-gradient-to-tr from-brand-yellow/25 via-amber-500/15 to-blue-500/10 filter blur-3xl pointer-events-none z-0"
          style={{
            transform: `rotateX(${tilt.x * 0.4}deg) rotateY(${tilt.y * 0.4}deg) translateX(${tilt.y * -3}px) translateY(${tilt.x * 3}px) translateZ(-60px)`,
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'none' : 'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          animate={{
            opacity: [0.6, 0.9, 0.6],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Ambient Ring Glow Path Shadow Plate (Beneath Avatar) */}
        <div 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-6 bg-black/45 rounded-full filter blur-md pointer-events-none z-0"
          style={{
            transform: 'rotateX(80deg) translateZ(-80px)',
            opacity: isHovered ? 0.8 : 0.5,
            transition: 'opacity 0.4s ease, transform 0.4s ease'
          }}
        />

        {/* Floating Particles in Background around Avatar */}
        {Array.from({ length: 12 }).map((_, i) => {
          const size = (i % 3 === 0) ? 6 : (i % 2 === 0) ? 4 : 2;
          const delay = i * 0.4;
          const duration = 10 + (i % 4) * 3;
          const leftPositions = ['15%', '25%', '40%', '60%', '75%', '85%', '10%', '30%', '50%', '70%', '80%', '90%'];
          const topPositions = ['20%', '35%', '15%', '25%', '42%', '55%', '65%', '70%', '80%', '60%', '75%', '85%'];
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-brand-yellow/30 pointer-events-none mix-blend-screen z-0"
              style={{
                width: size,
                height: size,
                top: topPositions[i % topPositions.length],
                left: leftPositions[i % leftPositions.length],
                filter: 'blur(1px)',
              }}
              animate={{
                y: [0, -35, 0],
                x: [0, (i % 2 === 0 ? 15 : -15), 0],
                opacity: [0.15, 0.65, 0.15],
                scale: [0.9, 1.25, 0.9],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Outer Rotating Dashed Ring */}
        <motion.div 
          className="absolute w-[98%] h-[98%] rounded-full border border-dashed border-brand-yellow/15 pointer-events-none z-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />

        {/* Inner Counter-Rotating Orbit Ring with tech dots */}
        <motion.div 
          className="absolute w-[92%] h-[92%] rounded-full border border-dotted border-amber-500/30 pointer-events-none z-0"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        {/* Glassmorphism Card Backdrop */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="absolute inset-[4%] bg-gradient-to-b from-neutral-900/60 to-black/80 backdrop-blur-xl rounded-full shadow-[0_0_40px_rgba(245,196,35,0.15)] border border-white/10 z-10"
          style={{
            transform: `rotateX(${tilt.x * 0.6}deg) rotateY(${tilt.y * 0.6}deg) translateX(${tilt.y * -2.5}px) translateY(${tilt.x * 2.5}px) translateZ(-40px)`,
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'none' : 'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Subtle inside geometric ring */}
          <div className="absolute inset-3 border border-white/5 rounded-full" />
        </motion.div>

        {/* Circular Face Container with Springy breathing and 3D filter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
          className="relative z-20 w-[84%] h-[84%] rounded-full overflow-hidden group flex items-center justify-center border-2 border-white/10 hover:border-brand-yellow/30 transition-colors duration-500 shadow-2xl"
          title="Keshav Sah (BCA Hons. Student)"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateX(${tilt.y * 1.5}px) translateY(${tilt.x * -1.5}px) translateZ(40px)`,
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'none' : 'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Internal gradient shadow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent pointer-events-none z-10 opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
          
          {/* Shiny sheen reflection layer */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-20 group-hover:opacity-40 transition-opacity z-20"
            style={{
              background: `radial-gradient(circle at ${sheen.x}% ${sheen.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`,
              transition: isHovered ? 'none' : 'background 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* Actual responsive profile image with grayscale focus overlay */}
          <img
            src={imgSrc}
            alt="Keshav Sah Portrait"
            referrerPolicy="no-referrer"
            onError={() => {
              if (imgSrc.startsWith('https://res.cloudinary.com')) {
                setImgSrc('/profile.png');
              } else if (imgSrc === '/profile.png') {
                setImgSrc('/assets/profile.png');
              } else if (imgSrc === '/assets/profile.png') {
                setImgSrc('/src/assets/profile.png');
              }
            }}
            className="w-full h-full object-cover object-center scale-[1.08] hover:scale-115 transition-all duration-700 ease-out origin-center pointer-events-none"
            style={{
              transform: `translateX(${tilt.y * 2}px) translateY(${tilt.x * -2}px) rotateY(${tilt.y * 0.3}deg)`,
              transformStyle: 'preserve-3d',
              transition: isHovered ? 'none' : 'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* Quick Hover verification indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0">
            <span className="bg-neutral-950/90 backdrop-blur-md text-white rounded-full px-4 py-1 text-[10px] font-bold border border-brand-yellow/30 shadow-lg tracking-wider whitespace-nowrap flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-ping" />
              KESHAV SAH
            </span>
          </div>
        </motion.div>

        {/* 3. Floating Interactive AI Tech Nodes */}
        
        {/* A. CPU Node (Neural Processor) */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="absolute top-[-5%] left-[25%] z-30 cursor-grab active:cursor-grabbing p-2.5 bg-neutral-900/90 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(245,196,35,0.15)] border border-white/10 hover:border-brand-yellow transition-all flex flex-col items-center group/node"
          style={{
            transform: `translateX(${tilt.y * 1.1}px) translateY(${tilt.x * -1.1}px) translateZ(80px)`,
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'none' : 'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          title="Neural Processor"
        >
          <Cpu className="w-4 h-4 text-brand-yellow group-hover/node:scale-110 transition-transform duration-300" />
          <div className="absolute top-11 bg-neutral-950 text-white border border-neutral-800 text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-wider font-mono">
            Neural CPU
          </div>
        </motion.div>

        {/* B. Brain Node (Cognitive Intelligence) */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
          className="absolute top-[20%] right-[-6%] z-30 cursor-grab active:cursor-grabbing p-2.5 bg-neutral-900/90 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(245,196,35,0.15)] border border-white/10 hover:border-brand-yellow transition-all flex flex-col items-center group/node"
          style={{
            transform: `translateX(${tilt.y * 1.5}px) translateY(${tilt.x * -1.5}px) translateZ(110px)`,
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'none' : 'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          title="Cognitive Intelligence"
        >
          <Brain className="w-4 h-4 text-brand-yellow group-hover/node:scale-110 transition-transform duration-300" />
          <div className="absolute top-11 bg-neutral-950 text-white border border-neutral-800 text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-wider font-mono">
            Cognitive
          </div>
        </motion.div>

        {/* C. Bot Node (Automation Systems) */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
          className="absolute bottom-[15%] right-[-4%] z-30 cursor-grab active:cursor-grabbing p-2.5 bg-neutral-900/90 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(245,196,35,0.15)] border border-white/10 hover:border-brand-yellow transition-all flex flex-col items-center group/node"
          style={{
            transform: `translateX(${tilt.y * 1.3}px) translateY(${tilt.x * -1.3}px) translateZ(90px)`,
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'none' : 'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          title="Automation Systems"
        >
          <Bot className="w-4 h-4 text-brand-yellow group-hover/node:scale-110 transition-transform duration-300" />
          <div className="absolute top-11 bg-neutral-950 text-white border border-neutral-800 text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-wider font-mono">
            Automation
          </div>
        </motion.div>

        {/* D. Code Node (Engineering Quality) */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          className="absolute bottom-[-5%] right-[25%] z-30 cursor-grab active:cursor-grabbing p-2.5 bg-neutral-900/90 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(245,196,35,0.15)] border border-white/10 hover:border-brand-yellow transition-all flex flex-col items-center group/node"
          style={{
            transform: `translateX(${tilt.y * 1.7}px) translateY(${tilt.x * -1.7}px) translateZ(120px)`,
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'none' : 'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          title="Full Stack Code"
        >
          <Code className="w-4 h-4 text-brand-yellow group-hover/node:scale-110 transition-transform duration-300" />
          <div className="absolute top-11 bg-neutral-950 text-white border border-neutral-800 text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-wider font-mono">
            Fullstack
          </div>
        </motion.div>

        {/* E. Terminal Node (Command Line Automation) */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ repeat: Infinity, duration: 4.0, ease: 'easeInOut' }}
          className="absolute bottom-[15%] left-[-4%] z-30 cursor-grab active:cursor-grabbing p-2.5 bg-neutral-900/90 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(245,196,35,0.15)] border border-white/10 hover:border-brand-yellow transition-all flex flex-col items-center group/node"
          style={{
            transform: `translateX(${tilt.y * 1.4}px) translateY(${tilt.x * -1.4}px) translateZ(105px)`,
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'none' : 'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          title="Power Terminal"
        >
          <Terminal className="w-4 h-4 text-brand-yellow group-hover/node:scale-110 transition-transform duration-300" />
          <div className="absolute top-11 bg-neutral-950 text-white border border-neutral-800 text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-wider font-mono">
            Terminal
          </div>
        </motion.div>

        {/* F. Sparkles Node (User-Centric UX Design) */}
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
          className="absolute top-[20%] left-[-6%] z-30 cursor-grab active:cursor-grabbing p-2.5 bg-neutral-900/90 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(245,196,35,0.15)] border border-white/10 hover:border-brand-yellow transition-all flex flex-col items-center group/node"
          style={{
            transform: `translateX(${tilt.y * 1.2}px) translateY(${tilt.x * -1.2}px) translateZ(85px)`,
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'none' : 'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          title="Interactive UX"
        >
          <Sparkles className="w-4 h-4 text-brand-yellow group-hover/node:scale-110 transition-transform duration-300" />
          <div className="absolute top-11 bg-neutral-950 text-white border border-neutral-800 text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-wider font-mono">
            UX Magic
          </div>
        </motion.div>
      </div>

      {/* 3. Floating Wireframe Sketches (Positioned absolutely around the dome) */}
      
      {/* A. Floating Lightbulb (Top Left) */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
        className="absolute top-8 left-4 sm:left-8 z-20 cursor-grab active:cursor-grabbing p-2.5 bg-white dark:bg-neutral-800 rounded-2xl shadow-md border border-neutral-100 dark:border-neutral-700 hover:border-brand-yellow dark:hover:border-brand-yellow transition-all flex flex-col items-center"
        style={{
          transform: `translateX(${tilt.y * 1.2}px) translateY(${tilt.x * -1.2}px) translateZ(100px)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'none' : 'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-900 dark:text-white">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M12 2v2" />
          <path d="m4.9 4.9 1.4 1.4" />
          <path d="m17.7 6.3 1.4-1.4" />
        </svg>
        <span className="text-[8px] font-bold text-neural-400 mt-1 dark:text-neutral-400">IDEATE</span>
      </motion.div>

      {/* B. Floating Gear (Bottom Left) */}
      <motion.div
        animate={{ y: [0, 6, 0], rotate: [0, 8, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
        className="absolute bottom-[20%] left-2 sm:left-4 z-20 cursor-grab active:cursor-grabbing p-2.5 bg-white dark:bg-neutral-800 rounded-2xl shadow-md border border-neutral-100 dark:border-neutral-700 hover:border-brand-yellow dark:hover:border-brand-yellow transition-all flex flex-col items-center"
        style={{
          transform: `translateX(${tilt.y * 1.6}px) translateY(${tilt.x * -1.6}px) translateZ(120px)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'none' : 'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-900 dark:text-white">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        <span className="text-[8px] font-bold text-neural-400 mt-1 dark:text-neutral-400">AUTOMATE</span>
      </motion.div>

      {/* C. Floating Bullseye / Target (Top Right) */}
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [0, -4, 4, 0] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
        className="absolute top-4 right-2 sm:right-6 z-20 cursor-grab active:cursor-grabbing p-2.5 bg-white dark:bg-neutral-800 rounded-2xl shadow-md border border-neutral-100 dark:border-neutral-700 hover:border-brand-yellow dark:hover:border-brand-yellow transition-all flex flex-col items-center"
        style={{
          transform: `translateX(${tilt.y * 1.4}px) translateY(${tilt.x * -1.4}px) translateZ(110px)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'none' : 'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-900 dark:text-white animate-pulse">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
        </svg>
        <span className="text-[8px] font-bold text-neural-400 mt-1 dark:text-neutral-400">FOCUS</span>
      </motion.div>

      {/* D. Floating Notepad / Design spec (Bottom Right) */}
      <motion.div
        animate={{ y: [0, 8, 0], x: [0, 2, -2, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        className="absolute bottom-[24%] right-4 sm:right-8 z-20 cursor-grab active:cursor-grabbing p-2.5 bg-white dark:bg-neutral-800 rounded-2xl shadow-md border border-neutral-100 dark:border-neutral-700 hover:border-brand-yellow dark:hover:border-brand-yellow transition-all flex flex-col items-center"
        style={{
          transform: `translateX(${tilt.y * 1.8}px) translateY(${tilt.x * -1.8}px) translateZ(130px)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'none' : 'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-900 dark:text-white">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
        <span className="text-[8px] font-bold text-neural-400 mt-1 dark:text-neutral-400">PLAN</span>
      </motion.div>

      {/* Decorative curvy lines on the right side */}
      <div className="absolute right-[12%] top-[35%] z-0 text-brand-yellow opacity-40 font-bold select-none font-sans text-xl rotate-12 pointer-events-none">
        ~ ~ ~
      </div>
    </div>
  );
}
