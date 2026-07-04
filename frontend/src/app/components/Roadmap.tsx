import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Compass, Zap, Flame } from 'lucide-react';

const stages = [
  {
    title: 'Beginner',
    subtitle: 'The Fundamentals',
    icon: <Compass className="w-6 h-6 text-cyan-400" />,
    color: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
    skills: ['SELECT & WHERE', 'Filtering Data', 'Sorting & Limits', 'Basic Aggregations']
  },
  {
    title: 'Intermediate',
    subtitle: 'Relational Thinking',
    icon: <Zap className="w-6 h-6 text-violet-400" />,
    color: 'border-violet-500/30',
    bgColor: 'bg-violet-500/10',
    skills: ['INNER & OUTER JOINs', 'GROUP BY & HAVING', 'Subqueries', 'String & Date Functions']
  },
  {
    title: 'Advanced',
    subtitle: 'Database Mastery',
    icon: <Flame className="w-6 h-6 text-fuchsia-400" />,
    color: 'border-fuchsia-500/30',
    bgColor: 'bg-fuchsia-500/10',
    skills: ['Window Functions', 'CTEs (WITH)', 'Query Optimization', 'Indexes & Schema Design']
  }
];

export const Roadmap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="w-full py-32 relative" ref={containerRef}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="text-center mb-24"
      >
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
          A clear path to expertise.
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto text-lg">
          Structured curriculum that adapts as you level up your SQL skills.
        </p>
      </motion.div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Connecting Line Background */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 hidden md:block -translate-y-1/2 z-0 rounded-full overflow-hidden">
          {/* Animated Connecting Line Foreground */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 origin-left"
            style={{ scaleX }}
          />
        </div>

        {/* Vertical line for mobile */}
        <div className="absolute top-0 left-8 bottom-0 w-[2px] bg-white/5 md:hidden z-0 rounded-full overflow-hidden">
           <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500 via-violet-500 to-fuchsia-500 origin-top"
            style={{ scaleY: scaleX }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10 pl-12 md:pl-0">
          {stages.map((stage, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`bg-[#111111]/90 backdrop-blur-xl rounded-3xl p-8 border ${stage.color} relative overflow-hidden group shadow-2xl hover:shadow-[0_0_40px_rgba(139,92,246,0.1)] transition-shadow duration-500`}
            >
              {/* Glow Behind */}
              <div className={`absolute -top-10 -right-10 w-40 h-40 ${stage.bgColor} rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />

              {/* Mobile Timeline Dot */}
              <div className="md:hidden absolute top-1/2 -left-12 -translate-y-1/2 w-4 h-4 rounded-full bg-[#111111] border-2 border-white/20 z-20 flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-white/50" />
              </div>

              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`w-14 h-14 rounded-2xl ${stage.bgColor} border ${stage.color} flex items-center justify-center mb-8 relative z-10`}
              >
                {stage.icon}
              </motion.div>

              <div className="mb-8 relative z-10">
                <h3 className="text-2xl font-semibold text-white mb-2">{stage.title}</h3>
                <p className="text-sm text-white/50 font-medium">{stage.subtitle}</p>
              </div>

              <ul className="space-y-4 relative z-10">
                {stage.skills.map((skill, sIdx) => (
                  <motion.li 
                    key={sIdx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (idx * 0.2) + (sIdx * 0.1) }}
                    className="flex items-center text-sm text-white/70 group-hover:text-white/90 transition-colors"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full bg-current mr-4 opacity-50`} />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
