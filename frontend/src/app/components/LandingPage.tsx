import React from 'react';
import { Background } from './Background';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Features } from './Features';
import { InteractiveDemo } from './InteractiveDemo';
import { Roadmap } from './Roadmap';
import { CTA } from './CTA';
import { Footer } from './Footer';

export const LandingPage = () => {
  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <div className="relative min-h-screen bg-[#0A0A0A] text-white font-['Inter',sans-serif] selection:bg-violet-500/30 overflow-hidden">
      <Background />
      <div className="relative z-10 flex flex-col items-center">
        <Navbar />
        <main className="flex flex-col items-center w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Hero />
          <Features />
          <InteractiveDemo />
          <Roadmap />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
    </>
  );
};
