import React from 'react';

export const Background = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Subtle Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83v58.34h-58.34v-.83l56.68-56.68h.83z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.05]" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="absolute top-[20%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-cyan-600/10 blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-violet-900/20 blur-[150px]" />
      
      {/* Vignette mask to darken edges */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 0%, #0A0A0A 100%)' }} />
    </div>
  );
};
