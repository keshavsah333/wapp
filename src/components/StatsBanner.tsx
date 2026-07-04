import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Users, Rocket, Award } from 'lucide-react';

interface StatsBannerProps {
  onOpenResume: () => void;
}

export default function StatsBanner({ onOpenResume }: StatsBannerProps) {
  const stats = [
    {
      id: 1,
      title: 'BCA (Hons.) Student',
      subtitle: 'GGSIPU Delhi (#1 Uni)',
      icon: <GraduationCap size={18} className="text-neutral-950 dark:text-white stroke-[2.5px]" />,
    },
    {
      id: 2,
      title: 'Internshala Student Partner',
      subtitle: 'Campus Ambassador',
      icon: <Users size={18} className="text-neutral-950 dark:text-white stroke-[2.5px]" />,
    },
    {
      id: 3,
      title: '10+',
      subtitle: 'Projects Completed',
      icon: <Rocket size={18} className="text-neutral-950 dark:text-white stroke-[2.5px]" />,
    },
    {
      id: 4,
      title: '15+',
      subtitle: 'Certifications',
      icon: <Award size={18} className="text-neutral-950 dark:text-white stroke-[2.5px]" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75, type: 'spring' }}
      onClick={onOpenResume}
      className="w-full bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl p-6 shadow-md shadow-neutral-100/30 dark:shadow-none hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-neutral-100 dark:divide-neutral-800">
        {stats.map((stat, idx) => (
          <div
            key={stat.id}
            className={`flex items-center gap-4 ${
              idx > 0 ? 'pt-4 sm:pt-0 lg:pl-6' : ''
            } sm:p-2 lg:first:pl-0`}
          >
            {/* Round Icon */}
            <div className="w-12 h-12 rounded-2xl bg-brand-yellow/15 dark:bg-brand-yellow/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <div className="w-9 h-9 rounded-xl bg-brand-yellow flex items-center justify-center">
                {stat.icon}
              </div>
            </div>

            {/* Metric Labels */}
            <div className="space-y-0.5">
              <span className="block text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
                {stat.title}
              </span>
              <span className="block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {stat.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
