import React, { useEffect, useRef } from 'react';

// Optimized: uses direct DOM style mutation instead of React state,
// so the component never re-renders — zero React overhead per frame.
export default function CustomCursor() {
  const auraRef = useRef(null);

  useEffect(() => {
    // Completely disable on touch / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = auraRef.current;
    if (!el) return;

    const targetPos = { x: -300, y: -300 };
    let currentX = -300;
    let currentY = -300;
    let visible = false;
    let animId;

    const lerp = (a, b, t) => a + (b - a) * t;

    const render = () => {
      currentX = lerp(currentX, targetPos.x, 0.18);
      currentY = lerp(currentY, targetPos.y, 0.18);
      // Direct DOM mutation — no React re-render
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      animId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e) => {
      targetPos.x = e.clientX;
      targetPos.y = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = '1';
        // Check hover state
      }
      const clickable = e.target.closest(
        'a, button, input, textarea, [role="button"], .cursor-pointer, .cursor-grab, .cursor-grabbing'
      );
      if (clickable) {
        el.style.width = '340px';
        el.style.height = '340px';
        el.style.background = 'radial-gradient(circle, rgba(52,211,153,0.35) 0%, rgba(6,182,212,0.22) 30%, rgba(99,102,241,0.10) 55%, transparent 75%)';
      } else {
        el.style.width = '260px';
        el.style.height = '260px';
        el.style.background = 'radial-gradient(circle, rgba(52,211,153,0.25) 0%, rgba(6,182,212,0.15) 30%, rgba(99,102,241,0.05) 55%, transparent 75%)';
      }
    };

    const handleMouseLeave = () => { visible = false; el.style.opacity = '0'; };
    const handleMouseEnter = () => { visible = true; el.style.opacity = '1'; };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={auraRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '260px',
        height: '260px',
        borderRadius: '50%',
        filter: 'blur(24px)',
        pointerEvents: 'none',
        zIndex: 40,
        opacity: 0,
        transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease',
        willChange: 'transform',
        background: 'radial-gradient(circle, rgba(52,211,153,0.25) 0%, rgba(6,182,212,0.15) 30%, rgba(99,102,241,0.05) 55%, transparent 75%)',
      }}
    />
  );
}
