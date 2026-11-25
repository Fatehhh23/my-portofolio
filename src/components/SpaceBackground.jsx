import React, { useMemo, useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef(null);
  const isVisibleRef = useRef(true);

  // 1. Persebaran 480 Bintang (intensitas & palet warna disamakan dengan halaman Home)
  const stars = useMemo(() => {
    const starList = [];
    const colors = ['#ffffff', '#ffffff', '#bae6fd', '#fef3c7', '#fbcfe8'];

    for (let i = 0; i < 480; i++) {
      const top = ((i * 17.3 + (i * i) * 3.7) % 98.8 + 0.4).toFixed(2);
      const left = ((i * 29.1 + i * 11.3) % 98.8 + 0.4).toFixed(2);
      const bright = i % 16 === 0;
      const size = bright ? 2.8 : i % 4 === 0 ? 1.8 : 1.1;
      const opacity = bright
        ? (0.8 + ((i * 13) % 20) / 100).toFixed(2)
        : (0.28 + ((i * 19) % 62) / 100).toFixed(2);
      const duration = (2.4 + ((i * 7) % 30) / 10).toFixed(1);
      const delay = (((i * 13) % 45) / 10).toFixed(1);
      const color = colors[i % colors.length];

      starList.push({
        id: i,
        top: `${top}%`,
        left: `${left}%`,
        size,
        opacity,
        duration: `${duration}s`,
        delay: `${delay}s`,
        color,
        bright,
      });
    }
    return starList;
  }, []);

  // 2. Shooting Stars (Bintang Jatuh HD pada Canvas, gaya sama dengan Home)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Pause when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    let animId;
    // cap DPR at 1.5 to save GPU memory on mobile
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

    const meteors = [];
    let nextTimer = 1.0;

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
      ctx.clearRect(0, 0, width, height);

      nextTimer -= 0.016;
      if (nextTimer <= 0 && meteors.length < 3) {
        spawnMeteor();
        nextTimer = 1.8 + Math.random() * 2.8;
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

      {/* 3. Persebaran 480 Bintang dengan Animasi Twinkle */}
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            opacity: s.opacity,
            animation: `twinkle ${s.duration} ease-in-out infinite`,
            animationDelay: s.delay,
            boxShadow: s.bright
              ? `0 0 8px 1.5px ${s.color}`
              : s.size > 1.5
              ? `0 0 3px ${s.color}`
              : 'none',
          }}
          className="absolute rounded-full"
        />
      ))}

      {/* 4. Canvas Bintang Jatuh */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
