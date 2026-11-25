import React, { useState, useEffect, useRef } from 'react';

export default function PortfolioPortal({ onEnterPortfolio }) {
  const [isZooming, setIsZooming] = useState(false);
  const portalRef = useRef(null);
  const hasTriggeredRef = useRef(false);
  const lastScrollYRef = useRef(0);

  // Trigger zoom in animation then open the portfolio page
  const handleTriggerZoom = (targetTab = 'projects') => {
    if (isZooming || hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setIsZooming(true);

    setTimeout(() => {
      onEnterPortfolio(targetTab);
      setIsZooming(false);
      // Reset cooldown after a short moment so re-entering works later
      setTimeout(() => {
        hasTriggeredRef.current = false;
      }, 1200);
    }, 750);
  };

  // ── Scroll Detection: Automatically trigger zoom-in when scrolling from About into Portfolio ──
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      if (hasTriggeredRef.current || isZooming) return;
      if (!portalRef.current) return;

      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      const rect = portalRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When user scrolls down and the section enters the center of viewport
      if (isScrollingDown && rect.top <= windowHeight * 0.45 && rect.bottom >= windowHeight * 0.4) {
        handleTriggerZoom('projects');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isZooming]);

  return (
    <section
      id="portfolio"
      ref={portalRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden z-20 select-none py-20 px-4"
    >
      {/* ── Background Cosmic Stars & Deep Nebula ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="absolute w-[700px] h-[350px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/15 to-blue-500/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-cyan-300 blur-[0.5px] opacity-75 animate-ping" />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-blue-200 blur-[0.5px] opacity-60 animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-white opacity-80" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-emerald-300 opacity-70" />
      </div>

      {/* ── ZOOM IN & OPENING TEXT CONTAINER ── */}
      <div
        className={`relative flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isZooming
            ? 'scale-[18] sm:scale-[22] opacity-0 blur-2xl pointer-events-none'
            : 'scale-100 opacity-100 blur-0'
        }`}
      >
        {/* GIANT "PORTOFOLIO" TEXT (Matching Image 1: Clean, No Logo/Text Below) */}
        <h1
          className={`font-anton text-7xl sm:text-9xl md:text-[12rem] lg:text-[15rem] xl:text-[17rem] text-center leading-none uppercase bg-gradient-to-r from-[#c6f6d5] via-[#bae6fd] to-[#bfdbfe] bg-clip-text text-transparent drop-shadow-[0_15px_35px_rgba(186,230,253,0.25)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isZooming ? 'tracking-[0.35em]' : 'tracking-tight'
          }`}
          style={{
            fontFamily: 'Anton, sans-serif',
          }}
        >
          PORTOFOLIO
        </h1>

        {/* Ambient Glow behind text */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/15 via-cyan-400/20 to-blue-400/15 blur-3xl -z-10 rounded-full pointer-events-none" />
      </div>

      {/* ── Transition Flash Portal Overlay ── */}
      <div
        className={`fixed inset-0 bg-cyan-400/15 backdrop-blur-3xl pointer-events-none z-50 transition-opacity duration-700 ${
          isZooming ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </section>
  );
}
