import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';

export default function Footer({ lang = 'id' }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 py-10 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 text-center select-none">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
        {/* Left Side: Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs text-white">
            FR
          </div>
          <div className="text-left">
            <span className="text-xs font-bold text-white block">MUHAMAD FATIH RIZQI</span>
            <span className="text-[10px] text-white/50 block">
            </span>
          </div>
        </div>
        
        {/* Right Side: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full ios-glass hover:bg-white/15 text-white/80 hover:text-white transition-all cursor-pointer group active:scale-90"
          title={lang === 'id' ? 'Kembali ke Atas' : 'Back to Top'}
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
