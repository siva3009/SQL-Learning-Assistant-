import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Play, Terminal, Sparkles, Code2, LineChart, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 min-h-[90vh]">
      
      {/* Left Text Content */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="flex-1 flex flex-col items-start text-left z-10 w-full"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-violet-300 mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Introducing SQL Tutor Bot 2.0</span>
          <div className="w-px h-3 bg-white/20 mx-1" />
          <span className="text-white/60 hover:text-white flex items-center gap-1">Read announcement <ArrowRight className="w-3 h-3"/></span>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="block"
          >
            Master MySQL
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 pb-2"
          >
            with AI.
          </motion.span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-lg md:text-xl text-white/50 mb-10 max-w-xl font-light leading-relaxed"
        >
          Your personal, AI-powered SQL learning assistant. Write queries, debug errors in real-time, and go from beginner to advanced database engineer effortlessly.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link to="/login" className="group w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Start Learning
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 text-white border border-white/10 font-medium flex items-center justify-center gap-2 hover:bg-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
            <Play className="w-4 h-4" />
            Watch Demo
          </button>
        </motion.div>
      </motion.div>

      {/* Right Visual */}
      <motion.div 
        style={{ y: y2 }}
        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 50, damping: 20 }}
        className="flex-1 w-full relative z-10 lg:pl-10 perspective-1000"
      >
        <div className="relative rounded-2xl bg-[#0F0F11]/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-2xl transform-gpu">
          {/* Mac-like Header */}
          <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            <div className="mx-auto text-xs text-white/30 font-mono flex items-center gap-2">
              <Database className="w-3 h-3" />
              sql-tutor.session
            </div>
          </div>
          
          {/* Chat Interface Mockup */}
          <div className="p-6 flex flex-col gap-6 font-mono text-sm h-[420px] overflow-hidden relative">
            {/* User Message */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex gap-3 justify-end"
            >
              <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tr-sm p-4 max-w-[85%] text-white/90 shadow-lg">
                How do I find the second highest salary from the employees table?
              </div>
            </motion.div>
            
            {/* AI Message */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="bg-transparent rounded-xl p-0 w-full text-white/70 space-y-4 pt-1">
                <p className="leading-relaxed">You can use the <span className="text-violet-300 bg-violet-500/10 px-1.5 py-0.5 rounded border border-violet-500/20">LIMIT</span> and <span className="text-violet-300 bg-violet-500/10 px-1.5 py-0.5 rounded border border-violet-500/20">OFFSET</span> clauses. Here's how:</p>
                
                {/* Code Block Mock */}
                <div className="bg-[#050505] rounded-xl border border-white/10 p-5 relative group shadow-inner">
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs text-white/40 hover:text-white bg-white/5 px-2 py-1 rounded">Copy</button>
                  </div>
                  <pre className="text-[13px] leading-loose overflow-x-auto font-medium">
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                      <span className="text-violet-400">SELECT</span> MAX(salary)
                    </motion.span>
                    <br/>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }}>
                      <span className="text-violet-400">FROM</span> employees
                    </motion.span>
                    <br/>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
                      <span className="text-violet-400">WHERE</span> salary &lt; (
                    </motion.span>
                    <br/>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }}>
                      &nbsp;&nbsp;<span className="text-violet-400">SELECT</span> MAX(salary)
                    </motion.span>
                    <br/>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>
                      &nbsp;&nbsp;<span className="text-violet-400">FROM</span> employees
                    </motion.span>
                    <br/>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                      );
                    </motion.span>
                  </pre>
                </div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                  className="text-sm text-white/40"
                >
                  This query finds the highest salary that is strictly less than the absolute highest salary.
                </motion.p>
              </div>
            </motion.div>
          </div>
          
          {/* Input Mock */}
          <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-[#0F0F11] via-[#0F0F11] to-transparent">
            <div className="bg-[#1A1A1C] border border-white/10 rounded-xl p-4 flex items-center gap-3 shadow-lg">
              <span className="text-white/30 text-sm flex-1">Ask anything about MySQL...</span>
              <div className="ml-auto w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <ArrowRight className="w-4 h-4 text-white/70" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating UI Cards */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotateZ: [0, 2, 0] }} 
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute -right-8 top-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-4 z-20"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
            <Terminal className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-sm text-white/90 font-medium">Query Debugger</div>
            <div className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active
            </div>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 15, 0], rotateZ: [0, -2, 0] }} 
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
          className="absolute -left-10 bottom-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-4 z-20"
        >
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
            <LineChart className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <div className="text-sm text-white/90 font-medium">Progress Tracker</div>
            <div className="text-xs text-white/50">Level 4 Scholar</div>
          </div>
        </motion.div>
        
        {/* Glow Effects */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-500/20 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-1000" />
      </motion.div>
    </section>
  );
};
