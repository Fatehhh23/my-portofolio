import React, { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef(null);
  const isVisibleRef = useRef(true);

  // 1. Rich HD Starfield (1.400 Bintang + Diffraction Spikes + Shooting Stars) dirender langsung di Canvas agar padat & ringan
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    let animId;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
    let height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight * 3;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 1.400 Stars distributed across the space container (matching Home's star palette & bright diffraction spikes)
    const starColors = ['#ffffff', '#ffffff', '#bae6fd', '#fef3c7', '#fbcfe8'];
    const stars = Array.from({ length: 1400 }, () => {
      const bright = Math.random() > 0.935;
      return {
        x: Math.random(),
        y: Math.random(),
        r: bright ? 1.5 + Math.random() * 1.4 : 0.4 + Math.random() * 1.25,
        alpha: bright ? 0.78 + Math.random() * 0.22 : 0.25 + Math.random() * 0.7,
        twinkleSpeed: 0.8 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
        bright,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      };
    });

    const meteors = [];
    let nextTimer = 0.8;
    let time = 0;

    const spawnMeteor = () => {
      const fromLeft = Math.random() > 0.4;
      const startX = fromLeft ? Math.random() * width * 0.7 : width * (0.3 + Math.random() * 0.7);
      const startY = Math.random() * height * 0.65;
      const angle = (fromLeft ? 0.45 : Math.PI - 0.45) + (Math.random() - 0.5) * 0.2;
      const speed = 13 + Math.random() * 10;
      meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 100 + Math.random() * 120,
        life: 0,
        maxLife: 40 + Math.random() * 24,
      });
    };

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Draw all 1.400 twinkling stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const sx = s.x * width;
        const sy = s.y * height;
        const twinkle = 0.55 + 0.45 * Math.sin(time * s.twinkleSpeed + s.phase);
        const a = s.alpha * twinkle;

        ctx.globalAlpha = a;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Diffraction spikes + soft halo on bright stars (matches Home starfield)
        if (s.bright) {
          const spikeLen = s.r * 4.2;
          ctx.globalAlpha = a * 0.45;
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(sx - spikeLen, sy);
          ctx.lineTo(sx + spikeLen, sy);
          ctx.moveTo(sx, sy - spikeLen);
          ctx.lineTo(sx, sy + spikeLen);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      nextTimer -= 0.016;
      if (nextTimer <= 0 && meteors.length < 3) {
        spawnMeteor();
        nextTimer = 1.6 + Math.random() * 2.4;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life += 1;

        const progress = m.life / m.maxLife;
        const fade = Math.sin(progress * Math.PI);
        const norm = Math.sqrt(m.vx * m.vx + m.vy * m.vy) || 1;
        const tailX = m.x - (m.vx / norm) * m.len;
        const tailY = m.y - (m.vy / norm) * m.len;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${fade})`);
        grad.addColorStop(0.25, `rgba(186, 230, 253, ${fade * 0.75})`);
        grad.addColorStop(1, 'rgba(186, 230, 253, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${fade})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
        ctx.fill();

        if (m.life >= m.maxLife) {
          meteors.splice(i, 1);
        }
      }

      if (isVisibleRef.current) {
        animId = requestAnimationFrame(render);
      } else {
        animId = setTimeout(() => { animId = requestAnimationFrame(render); }, 150);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animId);
      clearTimeout(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
      {/* 1. Deep Space Gradient (Menyatu mulus dengan akhir halaman Home #02040a) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#060b22] to-[#02040a]" />

      {/* 2. Ambient Cosmic Nebulae (Biru, Indigo & Violet halus menyatu dengan Home) */}
      <div className="absolute top-[6%] left-[15%] w-[750px] h-[550px] bg-blue-600/12 rounded-full blur-[180px]" />
      <div className="absolute top-[32%] -right-[10%] w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[190px]" />
      <div className="absolute top-[55%] -left-[10%] w-[650px] h-[650px] bg-violet-600/12 rounded-full blur-[180px]" />
      <div className="absolute bottom-[8%] right-[15%] w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[170px]" />

      {/* 3. Canvas 1.400 Bintang & Bintang Jatuh */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
