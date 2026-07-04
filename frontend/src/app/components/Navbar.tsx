import React, { useState, useEffect } from 'react';
import { Database, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-[#0A0A0A]/70 backdrop-blur-md border-white/10 py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <Database className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white/90">SQL Tutor</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6 text-sm text-white/60 font-medium">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm text-white/60 hover:text-white font-medium transition-colors">
              Log in
            </Link>
            <Link to="/login" className="relative group overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-[#0A0A0A] px-5 py-2 rounded-full text-sm font-medium text-white transition-all group-hover:bg-opacity-0 group-hover:bg-transparent">
                Get Started
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white/70">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 p-4 flex flex-col gap-4 shadow-2xl"
        >
          <a href="#features" className="text-white/70 hover:text-white py-2">Features</a>
          <div className="h-px w-full bg-white/10 my-2" />
          <Link to="/login" className="text-left text-white/70 hover:text-white py-2 block">Log in</Link>
          <Link to="/login" className="bg-white text-black font-medium rounded-lg py-2 mt-2 text-center block">Get Started</Link>
        </motion.div>
      )}
    </motion.nav>
  );
};
