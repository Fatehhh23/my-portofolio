import React, { useState, useEffect, useRef } from 'react';

export default function PortfolioDoorPortal({ onEnterPortfolio }) {
  const [doorProgress, setDoorProgress] = useState(0); // 0 = closed, 1 = fully open
  const doorContainerRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  // ── Scroll Listener for Slow & Smooth 3D Door Opening ──
  useEffect(() => {
    const handleScroll = () => {
      if (!doorContainerRef.current) return;
      const rect = doorContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalScrollable = rect.height - windowHeight;
      const scrolledPastTop = -rect.top;

      if (scrolledPastTop <= 0) {
        setDoorProgress(0);
      } else if (scrolledPastTop >= totalScrollable) {
        setDoorProgress(1);
        // Once doors finish opening on scroll, transition to the dedicated New Portfolio Page!
        if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          onEnterPortfolio('projects');
        }
      } else {
        const progress = scrolledPastTop / totalScrollable;
        setDoorProgress(progress);

        // Trigger slightly before hitting the absolute bottom so transition feels seamless
        if (progress >= 0.95 && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          onEnterPortfolio('projects');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [onEnterPortfolio]);

  // Door calculations
  const leftDoorTranslate = doorProgress * 115; // moves left in vw
  const rightDoorTranslate = doorProgress * 115; // moves right in vw
  const doorRotate = doorProgress * 42; // 3D door swing in deg
  const doorOpacity = Math.max(0, 1 - doorProgress * 1.25);

  return (
    <section
      id="portfolio"
      ref={doorContainerRef}
      className="relative w-full h-[180vh] select-none z-20"
    >
      {/* ── Sticky Fullscreen Gate ── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Cosmic Atmosphere */}
        <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
          <div className="absolute w-[800px] h-[400px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/15 to-blue-500/10 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-cyan-300 blur-[0.5px] opacity-75 animate-ping" />
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-blue-200 blur-[0.5px] opacity-60 animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-white opacity-80" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-emerald-300 opacity-70" />
        </div>

        {/* 3D Door Portal: PORTO (Left Door) & FOLIO (Right Door) */}
        <div
          style={{ perspective: '1200px' }}
          className="absolute inset-0 flex items-center justify-center z-30 overflow-hidden"
        >
          {/* Left Door: "PORTO" */}
          <div
            style={{
              transform: `translateX(-${leftDoorTranslate}vw) rotateY(-${doorRotate}deg)`,
              opacity: doorOpacity,
              transformOrigin: 'left center',
            }}
            className="w-1/2 flex justify-end will-change-transform pr-0.5 sm:pr-1"
          >
            <h2
              className="font-anton text-7xl sm:text-9xl md:text-[12rem] lg:text-[15rem] xl:text-[17rem] tracking-tight leading-none uppercase bg-gradient-to-r from-[#c6f6d5] via-[#bae6fd] to-[#aee4fd] bg-clip-text text-transparent drop-shadow-[0_15px_35px_rgba(186,230,253,0.3)] select-none"
              style={{ fontFamily: 'Anton, sans-serif' }}
            >
              PORTO
            </h2>
          </div>

          {/* Right Door: "FOLIO" */}
          <div
            style={{
              transform: `translateX(${rightDoorTranslate}vw) rotateY(${doorRotate}deg)`,
              opacity: doorOpacity,
              transformOrigin: 'right center',
            }}
            className="w-1/2 flex justify-start will-change-transform pl-0.5 sm:pl-1"
          >
            <h2
              className="font-anton text-7xl sm:text-9xl md:text-[12rem] lg:text-[15rem] xl:text-[17rem] tracking-tight leading-none uppercase bg-gradient-to-r from-[#aee4fd] via-[#bae6fd] to-[#bfdbfe] bg-clip-text text-transparent drop-shadow-[0_15px_35px_rgba(186,230,253,0.3)] select-none"
              style={{ fontFamily: 'Anton, sans-serif' }}
            >
              FOLIO
            </h2>
          </div>

          {/* Radiant Starlight Beam in center as doors part (transitions cleanly to white light) */}
          <div
            style={{
              opacity: doorProgress > 0.75 ? (doorProgress - 0.75) * 4 : Math.sin(doorProgress * Math.PI) * 0.8,
              transform: `scale(${1 + doorProgress * 12})`,
            }}
            className="absolute w-32 h-32 rounded-full bg-white/80 blur-3xl pointer-events-none transition-transform duration-75"
          />
        </div>

      </div>
    </section>
  );
}
