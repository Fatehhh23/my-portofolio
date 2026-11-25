import React, { useState, useEffect, useRef } from 'react';
import { Code2, User, Globe } from 'lucide-react';

// ── Realistic HiDPI HD Space Canvas: Rotating Galaxy, Sun, Large Detailed Planets, Asteroid Belt & Shooting Stars ──
function RealSpaceCanvas({ scrollProgress }) {
  const canvasRef = useRef(null);
  const scrollRef = useRef(scrollProgress);
  const isVisibleRef = useRef(true);
  const animIdRef = useRef(null);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    let animId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    // cap DPR at 1.5 on mobile to save GPU memory significantly
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const setupSize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setupSize();
    window.addEventListener('resize', setupSize);

    // 1. Deep HD Starfield (480 stars with diffraction spikes on bright stars)
    const stars = Array.from({ length: 480 }, () => {
      const bright = Math.random() > 0.94;
      return {
        x: Math.random(),
        y: Math.random(),
        r: bright ? 1.6 + Math.random() * 1.4 : 0.35 + Math.random() * 1.25,
        alpha: bright ? 0.8 + Math.random() * 0.2 : 0.2 + Math.random() * 0.75,
        twinkleSpeed: 0.008 + Math.random() * 0.025,
        phase: Math.random() * Math.PI * 2,
        bright,
        color:
          Math.random() > 0.82
            ? '#bae6fd'
            : Math.random() > 0.68
            ? '#fef3c7'
            : Math.random() > 0.9
            ? '#fbcfe8'
            : '#ffffff',
      };
    });

    // 2. Rotating Spiral Galaxy (950 particles + soft nebula clouds)
    const galaxyParticles = Array.from({ length: 950 }, (_, i) => {
      const arm = i % 3;
      const dist = Math.pow(Math.random(), 0.72);
      const spread = (Math.random() - 0.5) * (0.45 + dist * 0.55);
      const baseAngle = arm * ((Math.PI * 2) / 3) + dist * 4.6 + spread;
      return {
        dist,
        angle: baseAngle,
        size: 0.6 + (1 - dist) * 2.1 + Math.random() * 1.1,
        alpha: (1 - dist * 0.72) * (0.22 + Math.random() * 0.58),
        color:
          dist < 0.18
            ? '#fef08a'
            : dist < 0.42
            ? '#93c5fd'
            : dist < 0.72
            ? '#818cf8'
            : '#c084fc',
      };
    });

    // 3. Asteroid Belt between Mars and Jupiter (140 rocky particles)
    const asteroids = Array.from({ length: 140 }, () => ({
      orbitR: 0.315 + (Math.random() - 0.5) * 0.032,
      angle: Math.random() * Math.PI * 2,
      speed: 0.12 + Math.random() * 0.04,
      size: 0.8 + Math.random() * 1.5,
      alpha: 0.35 + Math.random() * 0.45,
    }));

    // 4. Larger, Detailed Planets Orbiting the Sun
    const planets = [
      { name: 'Mercury', orbitR: 0.12, speed: 0.38, angle: 0.6, size: 7.5,  light: '#e7e5e4', mid: '#a8a29e', dark: '#1c1917', type: 'rocky' },
      { name: 'Venus',   orbitR: 0.17, speed: 0.27, angle: 2.3, size: 12.0, light: '#fef08a', mid: '#d97706', dark: '#451a03', type: 'cloud', glow: 'rgba(253, 224, 71, 0.22)' },
      { name: 'Earth',   orbitR: 0.23, speed: 0.20, angle: 4.1, size: 14.5, light: '#38bdf8', mid: '#0284c7', dark: '#081426', type: 'earth', glow: 'rgba(56, 189, 248, 0.35)', hasMoon: true },
      { name: 'Mars',    orbitR: 0.29, speed: 0.15, angle: 1.2, size: 10.5, light: '#fb923c', mid: '#dc2626', dark: '#3b0712', type: 'mars',  glow: 'rgba(249, 115, 22, 0.22)' },
      { name: 'Jupiter', orbitR: 0.39, speed: 0.09, angle: 3.3, size: 28.0, light: '#fed7aa', mid: '#c2410c', dark: '#2e1005', type: 'jupiter', glow: 'rgba(251, 146, 60, 0.2)' },
      { name: 'Saturn',  orbitR: 0.49, speed: 0.062, angle: 5.4, size: 23.0, light: '#fef08a', mid: '#ca8a04', dark: '#2b1803', type: 'saturn', hasRing: true, glow: 'rgba(250, 204, 21, 0.2)' },
      { name: 'Uranus',  orbitR: 0.57, speed: 0.042, angle: 2.7, size: 16.5, light: '#a5f3fc', mid: '#06b6d4', dark: '#042530', type: 'ice', glow: 'rgba(34, 211, 238, 0.25)' },
      { name: 'Neptune', orbitR: 0.65, speed: 0.030, angle: 0.3, size: 16.0, light: '#93c5fd', mid: '#2563eb', dark: '#0d193d', type: 'ice', glow: 'rgba(59, 130, 246, 0.3)' },
    ];

    // 5. Shooting Stars / Meteors
    const shootingStars = [];
    let nextMeteorTimer = 0.8;

    const spawnShootingStar = () => {
      const fromLeft = Math.random() > 0.35;
      const startX = fromLeft ? Math.random() * width * 0.7 : width * (0.3 + Math.random() * 0.7);
      const startY = Math.random() * height * 0.45;
      const angle = (fromLeft ? 0.42 : Math.PI - 0.42) + (Math.random() - 0.5) * 0.25;
      const speed = 13 + Math.random() * 11;
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 90 + Math.random() * 110,
        life: 0,
        maxLife: 38 + Math.random() * 24,
        color: Math.random() > 0.4 ? '#e0f2fe' : '#fef3c7',
      });
    };

    let time = 0;

    const render = () => {
      time += 0.016;
      const sp = scrollRef.current;

      // Deep space background
      ctx.fillStyle = '#02040a';
      ctx.fillRect(0, 0, width, height);

      // Multi-layered Cosmic Nebula Wash
      const neb1 = ctx.createRadialGradient(width * 0.5, height * 0.5, 0, width * 0.5, height * 0.5, Math.max(width, height) * 0.85);
      neb1.addColorStop(0, 'rgba(30, 41, 88, 0.48)');
      neb1.addColorStop(0.45, 'rgba(17, 24, 56, 0.32)');
      neb1.addColorStop(1, 'rgba(2, 4, 10, 0)');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, width, height);

      const neb2 = ctx.createRadialGradient(width * 0.28, height * 0.35, 0, width * 0.28, height * 0.35, Math.max(width, height) * 0.5);
      neb2.addColorStop(0, 'rgba(91, 33, 182, 0.14)');
      neb2.addColorStop(1, 'rgba(2, 4, 10, 0)');
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, width, height);

      // 1. Twinkling Stars + Diffraction Spikes on Bright Stars
      for (const s of stars) {
        const twinkle = 0.55 + 0.45 * Math.sin(time * s.twinkleSpeed * 60 + s.phase);
        const alpha = s.alpha * twinkle * (1 - sp * 0.35);
        const sx = s.x * width;
        const sy = s.y * height;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (s.bright) {
          ctx.globalAlpha = alpha * 0.55;
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.7;
          const spike = s.r * 3.8;
          ctx.beginPath();
          ctx.moveTo(sx - spike, sy);
          ctx.lineTo(sx + spike, sy);
          ctx.moveTo(sx, sy - spike);
          ctx.lineTo(sx, sy + spike);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // 2. Shooting Stars (Meteors)
      nextMeteorTimer -= 0.016;
      if (nextMeteorTimer <= 0) {
        spawnShootingStar();
        nextMeteorTimer = 1.6 + Math.random() * 2.8;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const m = shootingStars[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life += 1;

        const progress = m.life / m.maxLife;
        const fade = Math.sin(progress * Math.PI) * (1 - sp * 0.5);
        const norm = Math.sqrt(m.vx * m.vx + m.vy * m.vy) || 1;
        const tailX = m.x - (m.vx / norm) * m.len;
        const tailY = m.y - (m.vy / norm) * m.len;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${fade})`);
        grad.addColorStop(0.25, `rgba(186, 230, 253, ${fade * 0.7})`);
        grad.addColorStop(1, 'rgba(186, 230, 253, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Bright meteor head
        ctx.fillStyle = `rgba(255, 255, 255, ${fade})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.2, 0, Math.PI * 2);
        ctx.fill();

        if (m.life >= m.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      // 3. Large Rotating Spiral Galaxy (Enlarged)
      const galCx = width * 0.5;
      const galCy = height * 0.5;
      const galRadius = Math.max(width, height) * 0.65;
      const galRot = time * 0.035;

      ctx.save();
      ctx.translate(galCx, galCy);
      ctx.rotate(-0.22);
      ctx.scale(1, 0.45);

      const coreGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, galRadius * 0.42);
      coreGlow.addColorStop(0, 'rgba(254, 243, 199, 0.25)');
      coreGlow.addColorStop(0.35, 'rgba(147, 197, 253, 0.11)');
      coreGlow.addColorStop(0.7, 'rgba(139, 92, 246, 0.05)');
      coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(0, 0, galRadius * 0.42, 0, Math.PI * 2);
      ctx.fill();

      for (const p of galaxyParticles) {
        const a = p.angle + galRot * (1.25 - p.dist * 0.5);
        const r = p.dist * galRadius;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        ctx.globalAlpha = p.alpha * (1 - sp * 0.45);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      ctx.globalAlpha = 1;

      // 4. Enlarged Solar System (Sun + Orbiting Planets + Asteroid Belt)
      const sunX = width * 0.5;
      const sunY = height * 0.52;
      const maxOrbit = Math.max(width, height) * 0.68;
      const tiltY = 0.42;
      const orbitTilt = -0.08;
      const cosT = Math.cos(orbitTilt);
      const sinT = Math.sin(orbitTilt);

      // Draw subtle orbital paths
      for (const pl of planets) {
        const rx = pl.orbitR * maxOrbit;
        const ry = rx * tiltY;
        ctx.beginPath();
        ctx.ellipse(sunX, sunY, rx, ry, orbitTilt, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw Asteroid Belt
      for (const ast of asteroids) {
        const a = ast.angle + time * ast.speed;
        const rx = ast.orbitR * maxOrbit;
        const ry = rx * tiltY;
        const lx = Math.cos(a) * rx;
        const ly = Math.sin(a) * ry;
        const ax = sunX + lx * cosT - ly * sinT;
        const ay = sunY + lx * sinT + ly * cosT;
        ctx.globalAlpha = ast.alpha * (1 - sp * 0.5);
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.arc(ax, ay, ast.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Compute Planet 3D Positions
      const planetStates = planets.map((pl) => {
        const currentAngle = pl.angle + time * pl.speed;
        const rx = pl.orbitR * maxOrbit;
        const ry = rx * tiltY;
        const lx = Math.cos(currentAngle) * rx;
        const ly = Math.sin(currentAngle) * ry;
        const px = sunX + lx * cosT - ly * sinT;
        const py = sunY + lx * sinT + ly * cosT;
        const depthScale = 0.82 + 0.36 * ((Math.sin(currentAngle) + 1) / 2);
        return { ...pl, px, py, currentAngle, depthScale };
      });

      const behindSun = planetStates.filter((p) => p.py < sunY).sort((a, b) => a.py - b.py);
      const inFrontOfSun = planetStates.filter((p) => p.py >= sunY).sort((a, b) => a.py - b.py);

      const drawPlanet = (p) => {
        const r = p.size * p.depthScale;

        // Atmospheric Outer Halo
        if (p.glow) {
          const halo = ctx.createRadialGradient(p.px, p.py, r * 0.85, p.px, p.py, r * 1.45);
          halo.addColorStop(0, p.glow);
          halo.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(p.px, p.py, r * 1.45, 0, Math.PI * 2);
          ctx.fill();
        }

        // Saturn Back Rings (multi-band)
        if (p.hasRing) {
          ctx.save();
          ctx.translate(p.px, p.py);
          ctx.rotate(-0.22);
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 2.25, r * 0.58, 0, Math.PI, Math.PI * 2);
          ctx.strokeStyle = 'rgba(253, 230, 138, 0.52)';
          ctx.lineWidth = Math.max(2.5, r * 0.24);
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 1.78, r * 0.45, 0, Math.PI, Math.PI * 2);
          ctx.strokeStyle = 'rgba(217, 179, 108, 0.42)';
          ctx.lineWidth = Math.max(1.5, r * 0.14);
          ctx.stroke();
          ctx.restore();
        }

        // Planet Sphere Base with Directional Sunlight
        const dx = sunX - p.px;
        const dy = sunY - p.py;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const lx = p.px + (dx / dist) * (r * 0.48);
        const ly = p.py + (dy / dist) * (r * 0.48);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.clip();

        const grad = ctx.createRadialGradient(lx, ly, r * 0.08, p.px, p.py, r * 1.18);
        grad.addColorStop(0, p.light);
        grad.addColorStop(0.55, p.mid);
        grad.addColorStop(1, p.dark);
        ctx.fillStyle = grad;
        ctx.fillRect(p.px - r, p.py - r, r * 2, r * 2);

        // Surface Details for Realism
        if (p.type === 'jupiter' || p.type === 'saturn') {
          ctx.globalAlpha = 0.24;
          ctx.fillStyle = p.type === 'jupiter' ? '#7c2d12' : '#92400e';
          ctx.fillRect(p.px - r, p.py - r * 0.45, r * 2, r * 0.18);
          ctx.fillRect(p.px - r, p.py + r * 0.12, r * 2, r * 0.2);
          ctx.fillStyle = '#fffbeb';
          ctx.fillRect(p.px - r, p.py - r * 0.15, r * 2, r * 0.12);
          ctx.globalAlpha = 1;
        } else if (p.type === 'earth') {
          // Subtle green continents & white cloud wisps
          ctx.globalAlpha = 0.45;
          ctx.fillStyle = '#4ade80';
          ctx.beginPath();
          ctx.arc(p.px - r * 0.25, p.py - r * 0.15, r * 0.34, 0, Math.PI * 2);
          ctx.arc(p.px + r * 0.2, p.py + r * 0.25, r * 0.26, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 0.35;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.ellipse(p.px, p.py - r * 0.35, r * 0.55, r * 0.14, 0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Shadow Terminator Overlay (deepens night side)
        const shadowGrad = ctx.createRadialGradient(lx, ly, r * 0.3, p.px - (dx / dist) * r * 0.5, p.py - (dy / dist) * r * 0.5, r * 1.4);
        shadowGrad.addColorStop(0, 'rgba(0,0,0,0)');
        shadowGrad.addColorStop(0.65, 'rgba(2,4,10,0.45)');
        shadowGrad.addColorStop(1, 'rgba(2,4,10,0.92)');
        ctx.fillStyle = shadowGrad;
        ctx.fillRect(p.px - r, p.py - r, r * 2, r * 2);

        ctx.restore();

        // Crisp atmospheric rim
        ctx.beginPath();
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Saturn Front Rings
        if (p.hasRing) {
          ctx.save();
          ctx.translate(p.px, p.py);
          ctx.rotate(-0.22);
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 2.25, r * 0.58, 0, 0, Math.PI);
          ctx.strokeStyle = 'rgba(254, 240, 138, 0.78)';
          ctx.lineWidth = Math.max(2.5, r * 0.24);
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 1.78, r * 0.45, 0, 0, Math.PI);
          ctx.strokeStyle = 'rgba(217, 179, 108, 0.58)';
          ctx.lineWidth = Math.max(1.5, r * 0.14);
          ctx.stroke();
          ctx.restore();
        }

        // Earth's Moon
        if (p.hasMoon) {
          const moonA = time * 1.7;
          const mx = p.px + Math.cos(moonA) * (r * 1.85);
          const my = p.py + Math.sin(moonA) * (r * 0.82);
          ctx.beginPath();
          ctx.arc(mx, my, Math.max(2.2, r * 0.25), 0, Math.PI * 2);
          ctx.fillStyle = '#e2e8f0';
          ctx.fill();
        }
      };

      behindSun.forEach(drawPlanet);

      // Draw Enlarged Realistic Glowing Sun with Corona & Flare
      const sunRadius = Math.min(width, height) * 0.058;
      const pulse = 1 + Math.sin(time * 1.8) * 0.03;

      const outerCorona = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.4, sunX, sunY, sunRadius * 5.0 * pulse);
      outerCorona.addColorStop(0, 'rgba(255, 253, 240, 0.95)');
      outerCorona.addColorStop(0.16, 'rgba(253, 224, 71, 0.65)');
      outerCorona.addColorStop(0.42, 'rgba(249, 115, 22, 0.24)');
      outerCorona.addColorStop(0.72, 'rgba(234, 88, 12, 0.07)');
      outerCorona.addColorStop(1, 'rgba(234, 88, 12, 0)');
      ctx.fillStyle = outerCorona;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius * 5.0 * pulse, 0, Math.PI * 2);
      ctx.fill();

      const sunBody = ctx.createRadialGradient(sunX - sunRadius * 0.15, sunY - sunRadius * 0.15, 0, sunX, sunY, sunRadius);
      sunBody.addColorStop(0, '#ffffff');
      sunBody.addColorStop(0.55, '#fef08a');
      sunBody.addColorStop(0.88, '#f59e0b');
      sunBody.addColorStop(1, '#ea580c');
      ctx.fillStyle = sunBody;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      inFrontOfSun.forEach(drawPlanet);

      if (isVisibleRef.current) {
        animId = requestAnimationFrame(render);
      } else {
        animId = setTimeout(() => { animId = requestAnimationFrame(render); }, 100);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', setupSize);
      observer.disconnect();
      cancelAnimationFrame(animId);
      clearTimeout(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

export default function Hero({ onNavigate, lang = 'id' }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const totalScrollable = rect.height - window.innerHeight;
            if (totalScrollable > 0) {
              const scrolledPast = -rect.top;
              const p = Math.max(0, Math.min(1, scrolledPast / totalScrollable));
              setScrollProgress(p);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // ── Welcome Card Scroll Animation ──
  let cardOpacity = 0;
  let cardScale = 0.9;
  let cardTransY = 36;
  let cardBlur = 6;

  if (scrollProgress < 0.04) {
    cardOpacity = 0;
    cardScale = 0.9;
    cardTransY = 36;
    cardBlur = 6;
  } else if (scrollProgress <= 0.36) {
    const t = easeOutCubic((scrollProgress - 0.04) / 0.32);
    cardOpacity = t;
    cardScale = 0.9 + t * 0.1;
    cardTransY = 36 * (1 - t);
    cardBlur = 6 * (1 - t);
  } else if (scrollProgress <= 0.68) {
    cardOpacity = 1;
    cardScale = 1.0;
    cardTransY = 0;
    cardBlur = 0;
  } else {
    const t = easeInOutCubic(Math.min(1, (scrollProgress - 0.68) / 0.28));
    cardOpacity = Math.max(0, 1 - t);
    cardScale = 1.0 + t * 0.08;
    cardTransY = -t * 28;
    cardBlur = t * 5;
  }

  const darkOverlay = easeInOutCubic(Math.min(1, Math.max(0, (scrollProgress - 0.55) / 0.45)));
  const indicatorOpacity = Math.max(0, 1 - scrollProgress / 0.12);

  return (
    <>
      <style>{`
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 0.9; }
          50%      { transform: translateY(8px); opacity: 0.35; }
        }
      `}</style>

      <section
        id="home"
        ref={containerRef}
        className="relative z-20 w-full h-[130vh] bg-[#02040a] select-none"
      >
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#02040a]">

          {/* Layer 0: HiDPI HD Rotating Galaxy, Enlarged Solar System & Shooting Stars */}
          <div className="absolute inset-0 z-0">
            <RealSpaceCanvas scrollProgress={scrollProgress} />
          </div>

          {/* Layer 1: Glassmorphism "WELCOME TO MY PORTFOLIO WEBSITE" Card (appears on scroll) */}
          <div
            style={{
              opacity: cardOpacity,
              transform: `translate3d(0, ${cardTransY}px, 0) scale(${cardScale})`,
              filter: cardBlur > 0.2 ? `blur(${cardBlur}px)` : 'none',
              willChange: 'opacity, transform, filter',
            }}
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center px-4"
          >
            <div
              style={{
                background: 'rgba(180, 195, 215, 0.20)',
                backdropFilter: 'blur(18px) saturate(1.4)',
                WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
                border: '1.5px solid rgba(255, 255, 255, 0.32)',
                boxShadow: '0 16px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
              }}
              className="flex flex-col items-center gap-4 text-center rounded-3xl px-8 py-7 sm:px-14 sm:py-9 max-w-2xl w-full"
            >
              {/* Icons Row */}
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-full bg-slate-900/55 border border-white/25 shadow-inner">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <div className="p-2.5 rounded-full bg-slate-900/55 border border-white/25 shadow-inner">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="p-2.5 rounded-full bg-slate-900/55 border border-white/25 shadow-inner">
                  <Globe className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Main Typography */}
              <div className="space-y-1">
                <h1
                  style={{ fontFamily: 'Anton, sans-serif' }}
                  className="text-white text-2xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[0.1em] sm:tracking-[0.12em] uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)] select-none"
                >
                  {lang === 'id' ? 'SELAMAT DATANG DI' : 'WELCOME TO MY'}
                </h1>
                <h2
                  style={{ fontFamily: 'Anton, sans-serif' }}
                  className="text-white text-2xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[0.1em] sm:tracking-[0.12em] uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)] select-none"
                >
                  {lang === 'id' ? 'WEBSITE PORTOFOLIO SAYA' : 'PORTFOLIO WEBSITE'}
                </h2>
              </div>
            </div>
          </div>

          {/* Layer 2: Seamless Darkening Transition into About (#02040a) */}
          <div
            style={{ opacity: darkOverlay, willChange: 'opacity' }}
            className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-b from-[#02040a]/40 via-[#02040a]/85 to-[#02040a]"
          />

          {/* Layer 3: Scroll Indicator */}
          {indicatorOpacity > 0 && (
            <div
              style={{ opacity: indicatorOpacity }}
              onClick={() => onNavigate && onNavigate('about')}
              className="absolute bottom-7 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 cursor-pointer"
            >
              <span className="text-white/70 text-[11px] tracking-[0.25em] uppercase font-semibold">
                {lang === 'id' ? 'Gulir' : 'Scroll'}
              </span>
              <div className="w-5 h-8 rounded-full border-2 border-white/35 flex items-start justify-center pt-1.5 backdrop-blur-sm bg-white/5">
                <div
                  style={{ animation: 'scrollDot 1.5s ease-in-out infinite' }}
                  className="w-1.5 h-1.5 rounded-full bg-white/85"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
