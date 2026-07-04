import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Bot, Bug, BookOpen, Target } from 'lucide-react';

const features = [
  {
    title: 'AI-Powered Teaching',
    description: 'Context-aware explanations that adapt to your skill level. Learn concepts faster than reading docs.',
    icon: <Bot className="w-5 h-5 text-violet-400" />,
    gradient: 'from-violet-500/20 to-transparent'
  },
  {
    title: 'Real-Time SQL Debugging',
    description: 'Paste your broken queries and get exact explanations of syntax errors and logical flaws.',
    icon: <Bug className="w-5 h-5 text-cyan-400" />,
    gradient: 'from-cyan-500/20 to-transparent'
  },
  {
    title: 'Interactive Practice Mode',
    description: 'Test your skills in a sandbox database environment. Complete challenges to earn points.',
    icon: <BookOpen className="w-5 h-5 text-emerald-400" />,
    gradient: 'from-emerald-500/20 to-transparent'
  },
  {
    title: 'Personalized Roadmap',
    description: 'A dynamic curriculum that tracks your progress from SELECT statements to complex JOINs.',
    icon: <Target className="w-5 h-5 text-fuchsia-400" />,
    gradient: 'from-fuchsia-500/20 to-transparent'
  }
];

const FeatureCard = ({ feature, idx }: { feature: typeof features[0], idx: number }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full bg-[#111111]/80 backdrop-blur-sm border border-white/5 rounded-3xl p-8 overflow-hidden transition-colors duration-500 hover:border-white/10"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 rounded-3xl"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.06), transparent 40%)`,
        }}
      />
      
      {/* Subtle background gradient */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-bl ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full blur-3xl`} />
      
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner relative z-10 group-hover:scale-110 transition-transform duration-500 ease-out">
        {feature.icon}
      </div>
      
      <h3 className="text-xl font-medium text-white mb-3 relative z-10 transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-white/40 leading-relaxed text-sm relative z-10 group-hover:text-white/60 transition-colors duration-300">
        {feature.description}
      </p>
    </motion.div>
  );
};

export const Features = () => {
  return (
    <section id="features" className="w-full py-32 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="text-center mb-20"
      >
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
          Everything you need to master SQL.
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto text-lg">
          Built with cutting-edge AI to provide a premium, uninterrupted learning experience.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} feature={feature} idx={idx} />
        ))}
      </div>
    </section>
  );
};
