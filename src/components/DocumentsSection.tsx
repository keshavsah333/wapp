import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Award, 
  GraduationCap, 
  FolderOpen, 
  Image, 
  Search, 
  ArrowUpRight, 
  Download, 
  Eye, 
  Check, 
  Sparkles, 
  Filter,
  Lock
} from 'lucide-react';

interface DocumentItem {
  id: string;
  name: string;
  category: 'Academic' | 'Professional' | 'Creative';
  description: string;
  fileType: string;
  fileSize: string;
  icon: React.ComponentType<any>;
  url: string;
  ctaText: string;
  tags: string[];
}

interface DocumentsSectionProps {
  onOpenResume: () => void;
}

const DOCUMENTS_DATA: DocumentItem[] = [
  {
    id: 'resume',
    name: 'Curriculum Vitae (CV)',
    category: 'Professional',
    description: 'Complete professional resume highlighting BCA (Hons.) coursework, full-stack React projects, system automations, and creative graphic design layouts.',
    fileType: 'PDF Document',
    fileSize: '1.2 MB',
    icon: FileText,
    url: '#resume',
    ctaText: 'Open Interactive Resume',
    tags: ['CV', 'Full-Stack', 'Interactive']
  },
  {
    id: 'ch-1-notes',
    name: 'Ch-1 Notes',
    category: 'Academic',
    description: 'Official comprehensive study notes, course references, and learning materials for Chapter 1 of the BCA (Hons.) curriculum.',
    fileType: 'Google Drive Doc',
    fileSize: 'Cloud Access',
    icon: FolderOpen,
    url: 'https://drive.google.com/file/d/10Bb7oUglUqpP4g94fWv9Fg0TlFFGVLpG/view?usp=drive_link',
    ctaText: 'Open Notes',
    tags: ['Ch-1', 'Drive', 'BCA Hons']
  },
  {
    id: 'bca-transcript',
    name: 'BCA (Hons.) Academic Verification',
    category: 'Academic',
    description: 'Official academic transcript verifying honors courses, modules completed in software engineering, object-oriented systems, and creative design platforms.',
    fileType: 'Transcript PDF',
    fileSize: '2.4 MB',
    icon: GraduationCap,
    url: 'https://share.google/ki9cQKrkOgeDEXoAj',
    ctaText: 'Verify Credential',
    tags: ['Academic', 'Degree', 'BCA Hons']
  },
  {
    id: 'isp-certificate',
    name: 'ISP Leadership Certificate',
    category: 'Professional',
    description: 'Certificate of excellence awarded for technical student webinars, digital outreach, and leadership during the Internshala Student Partner program.',
    fileType: 'Verified PDF',
    fileSize: '950 KB',
    icon: Award,
    url: 'https://share.google/ki9cQKrkOgeDEXoAj',
    ctaText: 'View Certificate',
    tags: ['Leadership', 'Internshala', 'Award']
  },
  {
    id: 'design-assets',
    name: 'Graphic Design Brand Assets',
    category: 'Creative',
    description: 'A curated collection of vector SVGs, custom branding typography, logo mockups, and layout templates designed with high-contrast UI sensibilities.',
    fileType: 'ZIP Archive',
    fileSize: '14.8 MB',
    icon: Image,
    url: 'https://keshavsah.me',
    ctaText: 'Download Pack',
    tags: ['Vector SVGs', 'Typography', 'Figma']
  },
  {
    id: 'technical-ledger',
    name: 'Full-Stack Technical Ledger',
    category: 'Creative',
    description: 'A detailed architecture manual mapping system components, API routes, scraping scripts, and offline-first storage patterns.',
    fileType: 'Markdown Book',
    fileSize: '410 KB',
    icon: FolderOpen,
    url: 'https://github.com',
    ctaText: 'Open Ledger',
    tags: ['Architecture', 'API', 'Markdown']
  }
];

export default function DocumentsSection({ onOpenResume }: DocumentsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Academic' | 'Professional' | 'Creative'>('All');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);

  const filteredDocs = DOCUMENTS_DATA.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAction = (doc: DocumentItem) => {
    if (doc.id === 'resume') {
      onOpenResume();
      return;
    }
    
    setViewingId(doc.id);
    setTimeout(() => {
      setViewingId(null);
      window.open(doc.url, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  const handleDownload = (e: React.MouseEvent, doc: DocumentItem) => {
    e.stopPropagation();
    setDownloadingId(doc.id);
    setTimeout(() => {
      setDownloadingId(null);
      if (doc.id === 'resume') {
        onOpenResume();
      } else {
        window.open(doc.url, '_blank', 'noopener,noreferrer');
      }
    }, 1200);
  };

  return (
    <section 
      id="Documents" 
      className="relative w-full py-24 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-7xl mx-auto"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-brand-yellow/10 rounded-full filter blur-[130px] opacity-10 dark:opacity-5 pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-brand-yellow/15 rounded-full filter blur-[150px] opacity-10 dark:opacity-5 pointer-events-none" />

      {/* Header Info Block */}
      <div className="relative text-center max-w-3xl mx-auto mb-16 z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-bold text-brand-yellow dark:text-brand-yellow tracking-wide font-mono uppercase mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 fill-brand-yellow/20 animate-pulse" />
          <span>Credential Ledger</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-neutral-900 dark:text-white mb-4"
        >
          Documents & Verification
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base leading-relaxed tracking-wide"
        >
          Explore official transcripts, professional credentials, leadership certificates, and design archives certifying my background in technology and creation.
        </motion.p>
      </div>

      {/* Interactive Controls Bar: Search & Filter Categories */}
      <div className="relative z-10 max-w-5xl mx-auto mb-12 flex flex-col md:flex-row items-center gap-4 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-4 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50">
        {/* Search Field */}
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
          <input
            type="text"
            placeholder="Search documents, tags, credentials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-neutral-100 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-brand-yellow/80 transition-colors"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0 justify-center">
          {(['All', 'Academic', 'Professional', 'Creative'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-brand-yellow text-neutral-950 shadow-md shadow-brand-yellow/15 font-extrabold'
                  : 'bg-neutral-100 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid container with glass responsive cards */}
      <AnimatePresence mode="popLayout">
        {filteredDocs.length > 0 ? (
          <motion.div 
            layout
            className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10 max-w-6xl mx-auto"
          >
            {filteredDocs.map((doc, index) => (
              <DocumentCard 
                key={doc.id} 
                doc={doc} 
                index={index}
                downloading={downloadingId === doc.id}
                viewing={viewingId === doc.id}
                onAction={() => handleAction(doc)}
                onDownload={(e) => handleDownload(e, doc)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative z-10 text-center py-20 max-w-md mx-auto"
          >
            <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-neutral-200/50 dark:border-neutral-800/80">
              <Lock className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
            </div>
            <h4 className="text-md font-bold text-neutral-900 dark:text-white mb-1">No Matching Credentials</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Try adjusting your search filters or category toggles to locate relevant items.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Sub-Component for Dynamic Interactive Card
interface DocumentCardProps {
  key?: string;
  doc: DocumentItem;
  index: number;
  downloading: boolean;
  viewing: boolean;
  onAction: () => void;
  onDownload: (e: React.MouseEvent) => void;
}

function DocumentCard({ doc, index, downloading, viewing, onAction, onDownload }: DocumentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const tiltX = -((mouseY / height) - 0.5) * 10;
    const tiltY = ((mouseX / width) - 0.5) * 10;

    const sheenX = (mouseX / width) * 100;
    const sheenY = (mouseY / height) * 100;

    setTilt({ x: tiltX, y: tiltY });
    setSheen({ x: sheenX, y: sheenY });
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('.action-btn')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipples((prev) => [...prev, { id: Date.now(), x, y }]);
    onAction();
  };

  const Icon = doc.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      onClick={handleCardClick}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transformStyle: 'preserve-3d',
      }}
      className="relative rounded-3xl overflow-hidden p-6 flex flex-col justify-between min-h-[290px] select-none cursor-pointer duration-300 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-800/50 hover:border-brand-yellow/60 dark:hover:border-brand-yellow/40 hover:shadow-2xl hover:shadow-brand-yellow/5"
    >
      {/* Glow Refraction */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 hover:opacity-100 mix-blend-overlay z-10"
        style={{
          background: `radial-gradient(circle 160px at ${sheen.x}% ${sheen.y}%, rgba(245, 196, 35, 0.25), transparent)`,
        }}
      />

      {/* Ripples */}
      {ripples.map((rip) => (
        <span
          key={rip.id}
          className="absolute rounded-full bg-brand-yellow/15 pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-[ping_0.6s_ease-out_forwards]"
          style={{
            left: rip.x,
            top: rip.y,
            width: 80,
            height: 80,
          }}
        />
      ))}

      {/* Card Header Info */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/25">
              {doc.category}
            </span>
            <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
              {doc.fileSize}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800/80 text-brand-yellow flex items-center justify-center shadow-inner">
            <Icon className="w-5 h-5 shrink-0" />
          </div>
        </div>

        <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-white leading-tight tracking-tight mb-2 group-hover:text-brand-yellow transition-colors">
          {doc.name}
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans line-clamp-3">
          {doc.description}
        </p>
      </div>

      {/* Card Actions Footer */}
      <div className="flex items-center justify-between border-t border-neutral-200/30 dark:border-neutral-800/30 pt-4 mt-6">
        <div className="flex flex-wrap gap-1 max-w-[55%]">
          {doc.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-950 text-[9px] text-neutral-500 dark:text-neutral-400 font-mono font-medium border border-neutral-200/30 dark:border-neutral-800/30">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Download icon action */}
          <button
            onClick={onDownload}
            className="action-btn p-2 rounded-xl bg-neutral-100 dark:bg-neutral-950 hover:bg-brand-yellow/15 text-neutral-600 dark:text-neutral-400 hover:text-brand-yellow border border-neutral-200/50 dark:border-neutral-800/80 transition-all shadow-sm shrink-0"
            title={`Download ${doc.fileType}`}
          >
            {downloading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-4 h-4 border-2 border-brand-yellow border-t-transparent rounded-full block"
              />
            ) : (
              <Download className="w-4 h-4 stroke-[2.2]" />
            )}
          </button>

          {/* Core Action Button */}
          <button
            onClick={onAction}
            className="action-btn px-3.5 py-2 rounded-xl text-xs font-bold font-mono text-neutral-950 bg-brand-yellow shadow-md hover:shadow-brand-yellow/20 hover:brightness-105 active:scale-95 transition-all flex items-center gap-1 shrink-0"
          >
            <span>{viewing ? 'Opening...' : doc.ctaText.replace('Open ', '').replace('View ', '')}</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
