import React from 'react';
import { Database } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-[#050505] pt-16 pb-8 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-sm">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <Database className="w-3 h-3 text-white" />
              </div>
              <span className="font-semibold text-white/90">SQL Tutor</span>
            </div>
            <p className="text-white/40 mb-6">
              The smartest way to learn database engineering.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-white/90 mb-4">Product</h4>
            <ul className="space-y-3 text-white/40">
              <li><span className="hover:text-white transition-colors cursor-pointer">Features</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Pricing</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Changelog</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Documentation</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-white/90 mb-4">Company</h4>
            <ul className="space-y-3 text-white/40">
              <li><span className="hover:text-white transition-colors cursor-pointer">About</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Blog</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Careers</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Contact</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-white/90 mb-4">Legal</h4>
            <ul className="space-y-3 text-white/40">
              <li><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
          <p>© {new Date().getFullYear()} SQL Tutor Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-white transition-colors cursor-pointer">Twitter</span>
            <span className="hover:text-white transition-colors cursor-pointer">GitHub</span>
            <span className="hover:text-white transition-colors cursor-pointer">Discord</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
