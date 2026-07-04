import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTA = () => {
  return (
    <section className="w-full py-32 mb-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-12 md:p-20 text-center overflow-hidden backdrop-blur-md shadow-2xl group hover:border-white/20 transition-colors duration-500"
      >
        {/* Abstract shapes behind CTA */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-violet-500/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
            <Sparkles className="w-8 h-8 text-cyan-400" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Ready to become a SQL expert?
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-10">
            Join thousands of developers learning faster and smarter with AI-guided practice. Start for free, upgrade when you need more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/login" className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Get Started for Free
            </Link>
            <button className="px-8 py-4 rounded-full bg-white/5 text-white font-medium hover:bg-white/10 transition-colors border border-white/10">
              View Pricing
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
