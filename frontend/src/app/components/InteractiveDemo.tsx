import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Database, MessageSquare, CheckCircle2 } from 'lucide-react';

export const InteractiveDemo = () => {
  return (
    <section className="w-full py-24">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex flex-col items-center mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-300 mb-6">
          <MessageSquare className="w-3 h-3" />
          <span>Interactive Experience</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Chat. Code. Learn.
        </h2>
        <p className="text-white/50 max-w-2xl text-lg">
          Experience a frictionless learning environment where theory meets immediate practice.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="w-full rounded-3xl bg-[#0A0A0A] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[500px]"
      >
        {/* Left Sidebar - Database Schema */}
        <div className="w-full lg:w-64 bg-[#111111] border-b lg:border-b-0 lg:border-r border-white/5 p-4 flex flex-col">
          <div className="flex items-center gap-2 text-white/70 text-sm font-medium mb-6 px-2">
            <Database className="w-4 h-4 text-violet-400" />
            Schema Explorer
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-white/40 mb-2 px-2 uppercase tracking-wider">Tables</div>
              <div className="bg-white/5 rounded-lg p-2 text-sm text-white/80 flex items-center gap-2 border border-white/5">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                users
              </div>
              <div className="ml-6 mt-2 space-y-1">
                <div className="text-xs text-white/40 flex justify-between"><span>id</span> <span className="text-violet-300/50">int pk</span></div>
                <div className="text-xs text-white/40 flex justify-between"><span>name</span> <span className="text-violet-300/50">varchar</span></div>
                <div className="text-xs text-white/40 flex justify-between"><span>created_at</span> <span className="text-violet-300/50">timestamp</span></div>
              </div>
            </div>
            <div>
              <div className="bg-white/5 rounded-lg p-2 text-sm text-white/80 flex items-center gap-2 border border-transparent hover:border-white/5 cursor-pointer transition-colors">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                orders
              </div>
            </div>
          </div>
        </div>

        {/* Center - Interactive Area */}
        <div className="flex-1 flex flex-col relative bg-[#0F0F11]">
          {/* Top Bar */}
          <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4 bg-[#111111]">
            <div className="flex gap-2">
              <span className="text-sm text-white/60 font-medium px-3 py-1 rounded bg-white/5">Query 1</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded flex items-center gap-2 transition-colors">
                <Terminal className="w-3 h-3" /> Run Query
              </button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="p-4 flex-1 font-mono text-sm border-b border-white/5 bg-[#0A0A0A]">
            <div className="flex">
              <div className="text-white/20 select-none pr-4 text-right">
                1<br/>2<br/>3
              </div>
              <div className="text-white/80">
                <span className="text-violet-400">SELECT</span> name, created_at<br/>
                <span className="text-violet-400">FROM</span> users<br/>
                <span className="text-violet-400">ORDER BY</span> created_at <span className="text-violet-400">DESC</span>;
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="h-48 bg-[#111111] p-4 overflow-hidden relative">
            <div className="text-xs text-white/40 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Success (0.02ms)
            </div>
            <table className="w-full text-left text-sm text-white/70">
              <thead className="text-xs text-white/40 uppercase bg-white/5">
                <tr>
                  <th className="px-3 py-2 rounded-tl">name</th>
                  <th className="px-3 py-2 rounded-tr">created_at</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="px-3 py-2">Alice Smith</td>
                  <td className="px-3 py-2">2023-10-24 14:20:00</td>
                </tr>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <td className="px-3 py-2">Bob Jones</td>
                  <td className="px-3 py-2">2023-10-23 09:15:00</td>
                </tr>
              </tbody>
            </table>
            
            {/* Overlay Gradient for visual effect */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#111111] to-transparent" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
