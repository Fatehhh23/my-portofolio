import React, { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const [auraPos, setAuraPos] = useState({ x: -300, y: -300 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const targetPos = useRef({ x: -300, y: -300 });
  const animFrame = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (target) {
        const clickable = target.closest(
          'a, button, input, textarea, [role="button"], .cursor-pointer, .cursor-grab, .cursor-grabbing'
        );
        setIsHovered(!!clickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth lerp loop untuk pergerakan cahaya halus mengikuti kursor
    const lerp = (start, end, factor) => start + (end - start) * factor;
    let currentX = -300;
    let currentY = -300;

    const render = () => {
      currentX = lerp(currentX, targetPos.current.x, 0.18);
      currentY = lerp(currentY, targetPos.current.y, 0.18);
      setAuraPos({ x: currentX, y: currentY });
      animFrame.current = requestAnimationFrame(render);
    };

    animFrame.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none">
      {/* Cahaya Gradasi yang Bergerak Mengikuti Kursor Biasa */}
      <div
        style={{
          transform: `translate3d(${auraPos.x}px, ${auraPos.y}px, 0) translate(-50%, -50%)`,
          background: isHovered
            ? 'radial-gradient(circle, rgba(52, 211, 153, 0.35) 0%, rgba(6, 182, 212, 0.22) 30%, rgba(99, 102, 241, 0.10) 55%, transparent 75%)'
            : 'radial-gradient(circle, rgba(52, 211, 153, 0.25) 0%, rgba(6, 182, 212, 0.15) 30%, rgba(99, 102, 241, 0.05) 55%, transparent 75%)',
          width: isHovered ? '340px' : '260px',
          height: isHovered ? '340px' : '260px',
          transition: 'width 0.3s ease, height 0.3s ease',
        }}
        className="fixed top-0 left-0 rounded-full blur-2xl pointer-events-none"
      />
    </div>
  );
}
