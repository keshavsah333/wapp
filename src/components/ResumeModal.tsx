import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Award, BookOpen, Briefcase, Code, GraduationCap, Printer, CloudDownload, Download } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const handlePrint = () => {
    window.print();
  };

  const skills = [
    { name: 'JavaScript & React', category: 'Development', rating: 92 },
    { name: 'Node.js & Express', category: 'Development', rating: 85 },
    { name: 'Python (AI/ML)', category: 'AI', rating: 88 },
    { name: 'FastAPI & APIs', category: 'AI', rating: 80 },
    { name: 'Prompt Engineering', category: 'AI', rating: 95 },
    { name: 'Figma & UI Dev', category: 'Design', rating: 90 },
    { name: 'Tailwind CSS', category: 'Design', rating: 95 },
    { name: 'Git & Command Line', category: 'Other', rating: 85 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="resume-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md"
            id="resume-backdrop-overlay"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', duration: 0.5 }}
            id="resume-modal-card"
            className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-100 dark:border-neutral-800 flex flex-col"
          >
            {/* Header / Actions toolbar */}
            <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-900/80 sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-yellow text-neutral-950 flex items-center justify-center font-bold text-sm">
                  KS
                </div>
                <div>
                  <h3 className="text-md font-display font-bold text-neutral-900 dark:text-white">Keshav Sah Resume</h3>
                  <p className="text-[10px] text-neutral-400">Interactive Curriculum Vitae</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="print-resume-btn"
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Print Resume / Save as PDF"
                >
                  <Printer size={13} />
                  Print / PDF
                </button>
                <button
                  id="close-resume-modal-btn"
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 transition-colors z-20"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Resume Content Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white dark:bg-neutral-900 print:p-0">
              {/* Profile Header Block */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-neutral-100 dark:border-neutral-800 gap-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-white tracking-tight">
                    Keshav Sah
                  </h1>
                  <p className="text-sm font-semibold text-brand-yellow uppercase tracking-wider flex items-center gap-2">
                    BCA (Hons.) Student
                    <span className="text-neutral-300">|</span>
                    AI Enthusiast
                    <span className="text-neutral-300">|</span>
                    Creative Designer
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-mono">
                    <span className="flex items-center gap-1"><MapPin size={12} /> New Delhi, India</span>
                    <span>•</span>
                    <a href="mailto:keshavsah333@gmail.com" className="hover:underline">keshavsah333@gmail.com</a>
                    <span>•</span>
                    <a href="tel:+918920149248" className="hover:underline">+91 8920149248</a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/50 max-w-xs">
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Professional Focus</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Building robust full-stack software and integrating modern Generative AI frameworks to deliver fast, delightful user experiences.
                  </p>
                </div>
              </div>

              {/* Two Column Layout Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1 & 2: Experience / Education */}
                <div className="md:col-span-2 space-y-6">
                  {/* Experience */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                      <Briefcase size={16} className="text-brand-yellow" />
                      Experience & Contributions
                    </h3>

                    <div className="border-l-2 border-neutral-100 dark:border-neutral-800 pl-4 ml-2 space-y-5">
                      <div className="relative space-y-1.5">
                        <div className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-yellow border border-white dark:border-neutral-900" />
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                            Internshala Student Partner (ISP)
                          </h4>
                          <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-300 px-2 py-0.5 rounded font-mono font-medium">
                            Current
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                          Campus Ambassador
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                          Acting as a primary point of contact for Internshala on campus. Leading student engagement workshops, facilitating internship guidelines, and helping peers transition into corporate careers with relevant skillsets.
                        </p>
                      </div>

                      <div className="relative space-y-1.5">
                        <div className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-yellow border border-white dark:border-neutral-900" />
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                            Independent Software Developer & Designer
                          </h4>
                          <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-300 px-2 py-0.5 rounded font-mono font-medium">
                            2024 - Present
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                          Freelancer / Creator
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                          Designing custom websites and automations utilizing React, Tailwind CSS, Python, and high-performance APIs. Completed 10+ custom client templates, graphic designs, and digital workflows focused on branding.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                      <GraduationCap size={16} className="text-brand-yellow" />
                      Education
                    </h3>

                    <div className="border-l-2 border-neutral-100 dark:border-neutral-800 pl-4 ml-2 space-y-4">
                      <div className="relative space-y-1">
                        <div className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-yellow border border-white dark:border-neutral-900" />
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                            Bachelor of Computer Applications (BCA Hons.) — 4-Year Program
                          </h4>
                          <span className="text-[10px] bg-brand-yellow/10 dark:bg-brand-yellow/20 text-brand-yellow px-2 py-0.5 rounded font-mono font-bold">
                            Current
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 font-semibold">
                          Guru Gobind Singh Indraprastha University (GGSIPU), New Delhi
                        </p>
                        <p className="text-[11px] text-teal-600 dark:text-teal-400 font-medium flex items-center gap-1">
                          🏆 Delhi's Top #1 University for BCA in India
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 italic">
                          Specializing in Data Structures, Web Technology, Software Engineering, Python Programming, Database Management Systems, and Artificial Intelligence core principles.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: Skill bars & Certifications */}
                <div className="space-y-6">
                  {/* Skills Grid */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                      <Code size={16} className="text-brand-yellow" />
                      Skill Capabilities
                    </h3>

                    <div className="space-y-2">
                      {skills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                            <span>{skill.name}</span>
                            <span className="font-mono text-neutral-400">{skill.rating}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand-yellow rounded-full transition-all duration-500"
                              style={{ width: `${skill.rating}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications Block */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                      <Award size={16} className="text-brand-yellow" />
                      Key Accolades
                    </h3>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/30 flex items-start gap-2">
                        <div className="p-1 rounded bg-brand-yellow/10 text-brand-yellow font-extrabold mt-0.5">★</div>
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-white">15+ Professional Certifications</p>
                          <p className="text-[10px] text-neutral-400">Issued by Google Cloud, Coursera, IBM, and Internshala</p>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/30 flex items-start gap-2">
                        <div className="p-1 rounded bg-teal-500/10 text-teal-500 font-extrabold mt-0.5">✓</div>
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-white">10+ Full Stack Projects Completed</p>
                          <p className="text-[10px] text-neutral-400">Focused on API Engineering, visual dashboards, and state machines.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
