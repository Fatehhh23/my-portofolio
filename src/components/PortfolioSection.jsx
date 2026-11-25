import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, X } from 'lucide-react';

// Import Assets
import projectTirta from '../assets/project-tirta.jpg';
import projectAgriedge from '../assets/project-agriedge.jpg';
import projectDrone from '../assets/project-drone.jpg';
import projectIot from '../assets/project-iot.jpg';
import projectEdly from '../assets/project-edly.png';
import certBnsp from '../assets/cert-bnsp.jpg';
import certEdukasa from '../assets/cert-edukasa.jpg';
import certPzn from '../assets/cert-pzn.png';
import certHubspot from '../assets/cert-hubspot.jpg';
import certCodingcamp from '../assets/cert-codingcamp.jpg';
import certDicodingWebInt from '../assets/cert-dicoding-web-int.jpg';
import certDicodingFeFund from '../assets/cert-dicoding-fe-fund.jpg';
import certDicodingBe from '../assets/cert-dicoding-be.jpg';
import certDicodingFePemula from '../assets/cert-dicoding-fe-pemula.jpg';
import certDicodingJs from '../assets/cert-dicoding-js.jpg';
import certDicodingWebDasar from '../assets/cert-dicoding-web-dasar.jpg';
import certDicodingSoftware from '../assets/cert-dicoding-software.jpg';
import certDicodingLogic from '../assets/cert-dicoding-logic.jpg';
import certDicodingFinlit from '../assets/cert-dicoding-finlit.jpg';
import galeryScomoa from '../assets/galery-scomoa.jpg';
import galeryCodingcamp from '../assets/galery-codingcamp.jpg';
import galeryBem from '../assets/galery-bem.jpg';
import galeryAslab from '../assets/galery-aslab.jpg';
import galeryHimatro from '../assets/galery-himatro.jpg';
import galeryHrc from '../assets/galery-hrc.jpg';
import galeryEea from '../assets/galery-eea.jpg';
import galeryEgos from '../assets/galery-egos.jpg';

// ── Animated Atmosphere Canvas (Stage 1: Ruang Angkasa -> Menembus Atmosfer Bumi) ──
function AtmosphereCanvas({ progress }) {
  const canvasRef = useRef(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupSize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setupSize();
    window.addEventListener('resize', setupSize);

    // High-altitude stars visible in upper exosphere (fade out as we descend into atmosphere)
    const upperStars = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.85,
      r: 0.5 + Math.random() * 1.4,
      alpha: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
    }));

    // Atmospheric wind/ion streams & mist particles
    const streams = Array.from({ length: 55 }, () => ({
      x: Math.random(),
      y: Math.random(),
      len: 80 + Math.random() * 160,
      speed: 0.0015 + Math.random() * 0.003,
      alpha: 0.08 + Math.random() * 0.18,
      thickness: 1 + Math.random() * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.016;
      const p = progressRef.current; // 0 = top (outer atmosphere), 1 = entered clouds

      ctx.clearRect(0, 0, width, height);

      // 1. Dynamic Sky/Atmosphere Gradient transitioning smoothly from Space (#02040a) -> Deep Twilight (#0c1d38) -> Atmospheric Dusk (#1e3b62) -> Soft Sky
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (p < 0.5) {
        const t = p / 0.5;
        bgGrad.addColorStop(0, `rgba(2, 4, 10, ${1 - t * 0.25})`);
        bgGrad.addColorStop(0.5, `rgba(${Math.round(4 + t * 14)}, ${Math.round(10 + t * 24)}, ${Math.round(26 + t * 38)}, 1)`);
        bgGrad.addColorStop(1, `rgba(${Math.round(12 + t * 20)}, ${Math.round(30 + t * 32)}, ${Math.round(62 + t * 45)}, 1)`);
      } else {
        const t = (p - 0.5) / 0.5;
        bgGrad.addColorStop(0, `rgba(${Math.round(18 + t * 10)}, ${Math.round(34 + t * 19)}, ${Math.round(64 + t * 24)}, 1)`);
        bgGrad.addColorStop(0.55, `rgba(${Math.round(32 + t * 40)}, ${Math.round(62 + t * 53)}, ${Math.round(107 + t * 52)}, 1)`);
        bgGrad.addColorStop(1, `rgba(${Math.round(72 + t * 133)}, ${Math.round(115 + t * 111)}, ${Math.round(159 + t * 86)}, 1)`);
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Upper Exosphere Stars (fade out as we enter bright atmosphere)
      const starVis = Math.max(0, 1 - p * 1.65);
      if (starVis > 0.01) {
        for (const s of upperStars) {
          const twinkle = 0.6 + 0.4 * Math.sin(time * 2.2 + s.phase);
          ctx.globalAlpha = s.alpha * twinkle * starVis;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // 3. Curved Glowing Earth Atmosphere Horizon (rises and expands as you descend)
      const curveCenterY = height * (1.58 - p * 0.52);
      const curveRadius = Math.max(width, height) * (0.95 + p * 0.45);

      const atmoGlow = ctx.createRadialGradient(
        width * 0.5,
        curveCenterY,
        curveRadius * 0.88,
        width * 0.5,
        curveCenterY,
        curveRadius * 1.18
      );
      const glowStrength = Math.sin(Math.min(1, p * 1.15) * Math.PI * 0.75) * 0.9 + 0.25;
      atmoGlow.addColorStop(0, 'rgba(224, 242, 254, 0)');
      atmoGlow.addColorStop(0.35, `rgba(56, 189, 248, ${0.42 * glowStrength})`);
      atmoGlow.addColorStop(0.58, `rgba(125, 211, 252, ${0.72 * glowStrength})`);
      atmoGlow.addColorStop(0.75, `rgba(14, 165, 233, ${0.35 * glowStrength})`);
      atmoGlow.addColorStop(1, 'rgba(2, 4, 10, 0)');

      ctx.fillStyle = atmoGlow;
      ctx.beginPath();
      ctx.arc(width * 0.5, curveCenterY, curveRadius * 1.18, 0, Math.PI * 2);
      ctx.fill();

      // 4. Moving Atmospheric Wind / Aurora Ribbons
      for (const st of streams) {
        st.x += st.speed * (1 + p * 1.5);
        if (st.x > 1.2) st.x = -0.2;

        const sx = st.x * width;
        const sy = st.y * height + Math.sin(time * 0.8 + st.x * 6) * 14;
        const grad = ctx.createLinearGradient(sx - st.len, sy, sx + st.len, sy);
        grad.addColorStop(0, 'rgba(186, 230, 253, 0)');
        grad.addColorStop(0.5, `rgba(224, 242, 254, ${st.alpha * (0.4 + p * 0.6)})`);
        grad.addColorStop(1, 'rgba(186, 230, 253, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = st.thickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(sx - st.len, sy);
        ctx.lineTo(sx + st.len, sy);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setupSize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// ── CSS GPU Cloud Background (Balanced atmospheric sky) ──
function AnimatedCloudsCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {/* Balanced atmospheric sky backdrop (Harmonis, tidak terlalu silau/kontras tajam) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c3558] via-[#48739f] via-50% to-[#cde2f5]" />
      {/* Soft warm sunlight glow */}
      <div className="absolute top-0 right-[15%] w-[60%] h-[40%] rounded-full bg-cyan-100/30 blur-[90px]" />
      {/* CSS animated clouds - GPU-accelerated transform only */}
      <style>{`
        @keyframes cloudDrift1 { from { transform: translate3d(-120px,0,0); } to { transform: translate3d(calc(100vw + 240px),0,0); } }
        @keyframes cloudDrift2 { from { transform: translate3d(-200px,0,0); } to { transform: translate3d(calc(100vw + 300px),0,0); } }
        @keyframes cloudDrift3 { from { transform: translate3d(-160px,0,0); } to { transform: translate3d(calc(100vw + 260px),0,0); } }
        @keyframes cloudBob    { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      `}</style>
      {[
        { top:'4%',  dur:'38s', delay:'0s',   scale:1.1,  anim:'cloudDrift1', opacity:0.65 },
        { top:'12%', dur:'52s', delay:'-14s', scale:0.85, anim:'cloudDrift2', opacity:0.50 },
        { top:'22%', dur:'44s', delay:'-8s',  scale:1.3,  anim:'cloudDrift1', opacity:0.58 },
        { top:'34%', dur:'60s', delay:'-22s', scale:0.9,  anim:'cloudDrift3', opacity:0.45 },
        { top:'46%', dur:'41s', delay:'-5s',  scale:1.2,  anim:'cloudDrift2', opacity:0.55 },
        { top:'58%', dur:'55s', delay:'-18s', scale:0.78, anim:'cloudDrift1', opacity:0.48 },
        { top:'70%', dur:'47s', delay:'-30s', scale:1.0,  anim:'cloudDrift3', opacity:0.62 },
        { top:'82%', dur:'63s', delay:'-10s', scale:1.15, anim:'cloudDrift2', opacity:0.52 },
      ].map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: c.top,
            left: 0,
            animation: `${c.anim} ${c.dur} linear ${c.delay} infinite`,
            willChange: 'transform',
          }}
        >
          <div style={{ animation: `cloudBob ${4 + i * 0.4}s ease-in-out ${c.delay} infinite`, willChange: 'transform' }}>
            <svg
              viewBox="0 0 320 90"
              width={260 * c.scale}
              height={80 * c.scale}
              style={{ opacity: c.opacity, display: 'block' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="160" cy="65" rx="140" ry="22" fill="rgba(255,255,255,0.9)" />
              <ellipse cx="100" cy="52" rx="70"  ry="32" fill="rgba(255,255,255,0.88)" />
              <ellipse cx="170" cy="44" rx="80"  ry="38" fill="rgba(255,255,255,0.92)" />
              <ellipse cx="230" cy="54" rx="65"  ry="28" fill="rgba(255,255,255,0.86)" />
              <ellipse cx="140" cy="38" rx="55"  ry="28" fill="rgba(248,250,252,0.80)" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PortfolioSection({ activeTab = 'projects', onTabChange, lang = 'id' }) {
  const isId = lang === 'id';
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [doorProgress, setDoorProgress] = useState(0); // 0 = closed, 1 = fully open
  const [portfolioVisible, setPortfolioVisible] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);

  const doorContainerRef = useRef(null);
  const portfolioSectionRef = useRef(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  useEffect(() => {
    const el = portfolioSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPortfolioVisible(true);
        } else if (entry.boundingClientRect.top > window.innerHeight * 0.9) {
          setPortfolioVisible(false);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
      setCurrentIndex(0);
    }
  }, [activeTab]);

  // ── Smooth Scroll Listener for 3D Door Opening & Closing + Dark-to-White Fade ──
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
      } else {
        setDoorProgress(scrolledPastTop / totalScrollable);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Data Projects (Urutan: TIRTA -> AgriEdge -> Bee-Tricopter -> Vitalsense -> Edly Station) ──
  const projectsData = [
    {
      id: 'p-1',
      title: 'TIRTA – Real-Time Earthquake Monitoring & AI-Based Tsunami Prediction',
      subtitle: 'WebGIS & AI Tsunami Prediction',
      category: 'WebGIS & AI Simulation',
      year: '2025',
      image: projectTirta,
      description: 'Mengembangkan aplikasi WebGIS full-stack untuk pemantauan gempa bumi secara real-time dan prediksi tsunami menggunakan AI berbasis CNN, dengan integrasi data BMKG dan USGS serta visualisasi geospasial interaktif.',
      tech: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'PostGIS', 'REST API', 'CNN'],
      features: [
        'Pemantauan gempa bumi real-time terintegrasi data BMKG dan USGS',
        'Prediksi tsunami menggunakan model AI berbasis Convolutional Neural Network (CNN)',
        'Visualisasi peta geospasial interaktif berbasis PostgreSQL & PostGIS'
      ],
    },
    {
      id: 'p-2',
      title: 'AgriEdge – Offline Smart Farming & Edge AI Monitoring System',
      subtitle: 'Edge AI & Encrypted Offline Ledger',
      category: 'Edge AI & Smart Farming',
      year: '2026',
      image: projectAgriedge,
      description: 'Mengembangkan sistem smart farming berbasis Edge AI yang menganalisis data sensor tanah secara lokal menggunakan Meta-Learning tanpa koneksi internet. Sistem menghasilkan rekomendasi pertanian dan menyimpan data ke dalam ledger QR terenkripsi.',
      tech: ['Raspberry Pi', 'Linux', 'Edge AI', 'Meta-Learning', 'Python', 'AES-256 GCM', 'PBKDF2'],
      features: [
        'Inferensi AI lokal (< 0.5 detik) menggunakan Meta-Learning tanpa internet',
        'Autentikasi lokal aman terhadap hash PBKDF2 di Raspberry Pi',
        'Penyimpanan rekomendasi ke ledger QR terenkripsi AES-256 GCM'
      ],
    },
    {
      id: 'p-3',
      title: 'Bee-Tricopter – IoT-Based Drone Monitoring Dashboard',
      subtitle: 'Live Video Streaming & IoT Telemetry',
      category: 'IoT & Drone Monitoring',
      year: '2025',
      image: projectDrone,
      description: 'Membangun dashboard monitoring drone berbasis web dengan fitur live video streaming dan integrasi data telemetri IoT melalui ESP32 untuk pemantauan perangkat secara real-time.',
      tech: ['React', 'Python', 'FastAPI', 'ESP32', 'IoT', 'REST API'],
      features: [
        'Live video streaming pemantauan drone langsung melalui dashboard web',
        'Integrasi data telemetri IoT real-time menggunakan mikrokontroler ESP32',
        'Backend FastAPI & REST API responsif untuk pemantauan status perangkat'
      ],
    },
    {
      id: 'p-4',
      title: 'Vitalsense – IoT-Based Health Monitoring System',
      subtitle: 'Real-time Vital Signs Web Server',
      category: 'IoT & Health Monitoring',
      year: '2024',
      image: projectIot,
      description: 'Mengembangkan sistem pemantauan tanda vital berbasis IoT menggunakan ESP8266 dan sensor kesehatan yang terintegrasi dengan web server serta aplikasi web responsif untuk menampilkan data secara real-time.',
      tech: ['ESP8266', 'IoT', 'Sensors', 'Web Server', 'HTML', 'CSS', 'JavaScript'],
      features: [
        'Pemantauan denyut jantung & saturasi oksigen (SpO2) secara real-time',
        'Integrasi langsung mikrokontroler ESP8266 dengan web server lokal',
        'Antarmuka web responsif untuk visualisasi data pasien'
      ],
    },
    {
      id: 'p-5',
      title: 'Edly Station – Internship Capstone Web Application',
      subtitle: 'Coding Camp x DBS Foundation / Dicoding',
      category: 'Full-Stack Web Application',
      year: '2025',
      image: projectEdly,
      description: 'Mengembangkan aplikasi web sebagai proyek akhir program Coding Camp x DBS Foundation / Dicoding dengan menerapkan pengembangan frontend, backend, RESTful API, dan integrasi database menggunakan pendekatan Software Development Life Cycle (SDLC).',
      tech: ['JavaScript', 'Node.js', 'Express.js', 'REST API', 'MySQL/PostgreSQL'],
      features: [
        'Arsitektur full-stack frontend, backend Express.js, dan RESTful API',
        'Integrasi basis data relasional MySQL/PostgreSQL',
        'Dikembangkan dengan metodologi Software Development Life Cycle (SDLC)'
      ],
    },
  ];

  // ── Data Sertifikat (Urutan: BNSP -> Edukasa -> Programmer Zaman Now -> HubSpot -> Coding Camp -> Dicoding) ──
  const certificatesData = [
    {
      id: 'c-1',
      title: 'Sertifikat Kompetensi BNSP – Perekayasa Radio Frekuensi',
      subtitle: 'Badan Nasional Sertifikasi Profesi · LSP UNILA',
      issuer: 'Badan Nasional Sertifikasi Profesi · LSP UNILA',
      year: '2025 – 2028',
      image: certBnsp,
      description: 'Sertifikasi kompetensi resmi tingkat nasional dari BNSP untuk bidang Perekayasaan dan Perencanaan Jaringan Seluler dengan kualifikasi Perekayasa Radio Frekuensi (RF Engineer).',
      skills: ['Perencanaan Frekuensi Seluler', 'Pengukuran Propagasi Sinyal', 'Analisis Link Budget RF', 'Optimasi Cakupan Jaringan'],
      credentialId: '61921 6201 0000113 2025',
    },
    {
      id: 'c-2',
      title: 'Edukasa.id – Pelatihan Nasional Terampil Bekerja dengan AI',
      subtitle: 'PT Sumber Belajar Bersama · Nilai Akhir 100 (Sangat Baik · 40 JP)',
      issuer: 'Edukasa.id · PT Sumber Belajar Bersama',
      year: 'Oktober 2026',
      image: certEdukasa,
      description: 'Pelatihan Nasional Terampil Bekerja dengan AI: Praktik Mengelola Dokumen, Data, dan Presentasi (40 JP) dengan hasil evaluasi akhir Nilai 100 (Sangat Baik).',
      skills: ['AI Document Management', 'AI Data Analysis', 'AI Presentation & Storytelling', 'Prompt Productivity'],
      credentialId: '13.003/ED-NSTI/X/2026/VIBG62626',
    },
    {
      id: 'c-3',
      title: 'Programmer Zaman Now – Software Architecture Patterns',
      subtitle: 'Programmer Zaman Now · Penyelesaian 100%',
      issuer: 'Programmer Zaman Now',
      year: '1 Oktober 2026',
      image: certPzn,
      description: 'Sertifikat kelulusan kelas Software Architecture Patterns dengan tingkat penyelesaian 100%, mencakup desain arsitektur perangkat lunak yang skalabel, modular, dan maintainable.',
      skills: ['Software Architecture', 'Clean Architecture', 'Design Patterns', 'Scalable System Design'],
      credentialId: 'PZN-course-software-architecture-patterns-21450-1790811368',
    },
    {
      id: 'c-4',
      title: 'HubSpot Academy – Service Hub Software Certified',
      subtitle: 'HubSpot Academy Global',
      issuer: 'HubSpot Academy Global',
      year: 'Oct 2026 – Oct 2027',
      image: certHubspot,
      description: 'Sertifikasi profesional global dalam manajemen layanan pelanggan digital, otomatisasi tiket bantuan (help desk), knowledge base, dan optimasi kepuasan pengguna (CSAT).',
      skills: ['Customer Experience Strategy', 'Help Desk & Ticket Automation', 'SLA Management', 'Customer Feedback Analytics'],
      credentialId: 'a054491f084a4784947c50e6816a7fda',
    },
    {
      id: 'c-5',
      title: 'Coding Camp Powered by DBS Foundation – Full Stack Web Developer',
      subtitle: 'Dicoding & DBS Foundation · Students Full Graduate',
      issuer: 'Dicoding Indonesia & PT Bank DBS Indonesia',
      year: 'Feb – Jul 2025',
      image: certCodingcamp,
      description: 'Lulusan penuh program seleksi ketat Coding Camp powered by DBS Foundation spesialisasi Front-End dan Back-End Developer (10 Februari – 16 Juli 2025).',
      skills: ['Front-End Development', 'Back-End Development', 'Capstone Project', 'English & Soft Skills'],
      credentialId: 'CC25/GRAD/XXV-07/FC248D5Y2134',
    },
    {
      id: 'c-6',
      title: 'Dicoding – Belajar Pengembangan Web Intermediate',
      subtitle: 'Dicoding Academy Indonesia',
      issuer: 'Dicoding Academy',
      year: 'Juni 2025 – 2028',
      image: certDicodingWebInt,
      description: 'Sertifikat kompetensi kelulusan kelas Belajar Pengembangan Web Intermediate dari Dicoding Indonesia mencakup aksesibilitas web, animasi, SPA, dan Progressive Web App.',
      skills: ['Progressive Web Apps', 'Web Accessibility', 'Single Page Application', 'RESTful Integration'],
      credentialId: 'KEXL7OQYWXG2',
    },
    {
      id: 'c-7',
      title: 'Dicoding – Belajar Fundamental Front-End Web Development',
      subtitle: 'Dicoding Academy Indonesia',
      issuer: 'Dicoding Academy',
      year: 'April 2025 – 2028',
      image: certDicodingFeFund,
      description: 'Sertifikat kompetensi kelulusan kelas Belajar Fundamental Front-End Web Development meliputi ES6, Web Components, Webpack module bundler, dan Asynchronous Fetch API.',
      skills: ['JavaScript ES6', 'Web Components', 'Webpack', 'Asynchronous REST API'],
      credentialId: 'JLX19QRYNP72',
    },
    {
      id: 'c-8',
      title: 'Dicoding – Belajar Back-End Pemula dengan JavaScript',
      subtitle: 'Dicoding Academy Indonesia',
      issuer: 'Dicoding Academy',
      year: 'Juni 2025 – 2028',
      image: certDicodingBe,
      description: 'Sertifikat kompetensi kelulusan membangun RESTful API dan layanan Back-End menggunakan Node.js serta framework Hapi.js beserta pengujian otomatis dengan Postman.',
      skills: ['Node.js', 'Hapi.js', 'RESTful API Design', 'API Testing'],
      credentialId: '1RXYE5YMKZVM',
    },
    {
      id: 'c-9',
      title: 'Dicoding – Belajar Membuat Front-End Web untuk Pemula',
      subtitle: 'Dicoding Academy Indonesia',
      issuer: 'Dicoding Academy',
      year: 'Maret 2025 – 2028',
      image: certDicodingFePemula,
      description: 'Sertifikat kompetensi kelulusan manipulasi DOM, event handling interaktif, serta penyimpanan data sisi klien menggunakan Web Storage (localStorage & sessionStorage).',
      skills: ['DOM Manipulation', 'Interactive Web Events', 'Browser Object Model', 'Web Storage'],
      credentialId: '1OP82M68LPQK',
    },
    {
      id: 'c-10',
      title: 'Dicoding – Belajar Dasar Pemrograman JavaScript',
      subtitle: 'Dicoding Academy Indonesia',
      issuer: 'Dicoding Academy',
      year: 'Maret 2025 – 2028',
      image: certDicodingJs,
      description: 'Sertifikat kompetensi kelulusan dasar pemrograman JavaScript modern meliputi struktur data, OOP, functional programming, asynchronous process, dan modularisasi.',
      skills: ['JavaScript Syntax', 'OOP & Functional JS', 'Async/Await & Promises', 'Automated Testing'],
      credentialId: 'L4PQEWY4VP01',
    },
    {
      id: 'c-11',
      title: 'Dicoding – Belajar Dasar Pemrograman Web',
      subtitle: 'Dicoding Academy Indonesia',
      issuer: 'Dicoding Academy',
      year: 'Februari 2025 – 2028',
      image: certDicodingWebDasar,
      description: 'Sertifikasi kelulusan kurikulum resmi pemrograman web modern dari Dicoding Indonesia, mencakup standar HTML5 semantik, CSS3 responsif, flexbox, dan layouting.',
      skills: ['HTML5 Semantic Structure', 'CSS3 Layouting & Flexbox', 'Responsive Web Design', 'Cross-browser Compatibility'],
      credentialId: '07Z637RWRZQR',
    },
    {
      id: 'c-12',
      title: 'Dicoding – Memulai Dasar Pemrograman untuk Menjadi Pengembang Software',
      subtitle: 'Dicoding Academy Indonesia',
      issuer: 'Dicoding Academy',
      year: 'Februari 2025 – 2028',
      image: certDicodingSoftware,
      description: 'Sertifikat kelulusan pengenalan metodologi pengembangan perangkat lunak, alur kerja programmer, Git dasar, serta pemodelan kebutuhan aplikasi.',
      skills: ['Software Development Lifecycle', 'Algorithmic Thinking', 'Requirement Analysis', 'Developer Workflow'],
      credentialId: 'GRX53213KZ0M',
    },
    {
      id: 'c-13',
      title: 'Dicoding – Pengenalan ke Logika Pemrograman (Programming Logic 101)',
      subtitle: 'Dicoding Academy Indonesia',
      issuer: 'Dicoding Academy',
      year: 'Februari 2025 – 2028',
      image: certDicodingLogic,
      description: 'Sertifikat kompetensi kelulusan logika pemrograman dasar, gerbang logika, algoritma percabangan, perulangan, dan pemecahan masalah terstruktur.',
      skills: ['Programming Logic', 'Boolean Algebra', 'Flowchart & Pseudocode', 'Problem Solving'],
      credentialId: '07Z638NNYZQR',
    },
    {
      id: 'c-14',
      title: 'Dicoding – Financial Literacy 101',
      subtitle: 'Dicoding Academy Indonesia',
      issuer: 'Dicoding Academy',
      year: 'April 2025 – 2028',
      image: certDicodingFinlit,
      description: 'Sertifikat kelulusan literasi keuangan pribadi dan perencanaan finansial profesional sebagai bagian dari kurikulum Coding Camp DBS Foundation.',
      skills: ['Financial Planning', 'Budget Management', 'Risk Awareness', 'Investment Basics'],
      credentialId: 'MEPJQ0DO4X3V',
    },
  ];

  // ── Data Galeri (8 Dokumentasi Pengalaman 16:9) ──
  const galleryData = [
    {
      id: 'g-1',
      title: 'International Summer Course on Modern Optics & Its Applications (SCoMOA)',
      subtitle: 'Summer Course · Institut Teknologi Bandung (ITB)',
      category: 'Summer Course · ITB Bandung',
      year: 'July – August 2023',
      image: galeryScomoa,
      description: 'Partisipan dalam program International Summer Course on Modern Optics and Its Applications (SCoMOA) di Institut Teknologi Bandung (ITB) bersama peserta nasional dan internasional.',
      tags: ['Modern Optics', 'ITB Bandung', 'Summer Course', 'UNESCO'],
    },
    {
      id: 'g-2',
      title: 'Full Stack Web Developer Coding Camp – Powered by DBS Foundation',
      subtitle: 'Internship · Dicoding Indonesia',
      category: 'Internship · Dicoding Indonesia',
      year: 'February – June 2025',
      image: galeryCodingcamp,
      description: 'Menyelesaikan program Coding Camp powered by DBS Foundation spesialisasi Front-End dan Back-End Developer serta membangun platform real-time carbon monitoring (Eddy Station).',
      tags: ['Full Stack Web', 'DBS Foundation', 'Dicoding', 'Capstone Project'],
    },
    {
      id: 'g-3',
      title: 'BEM FT UNILA & Krakatoa Papermob PKKMB Committee',
      subtitle: 'Organizational · University of Lampung',
      category: 'Organizational · BEM UNILA',
      year: '2023 – 2024',
      image: galeryBem,
      description: 'Staf Dinas Komunikasi dan Informasi BEM Fakultas Teknik Universitas Lampung (2023–2024) serta Panitia Krakatoa Papermob PKKMB Universitas Lampung.',
      tags: ['BEM FT UNILA', 'Kominfo', 'PKKMB Committee', 'Leadership'],
    },
    {
      id: 'g-4',
      title: 'Laboratory Assistant – Telecommunications & Information Technology Lab',
      subtitle: 'Work Experience · Universitas Lampung',
      category: 'Work Experience · Unila Lab',
      year: 'April 2025 – July 2026',
      image: galeryAslab,
      description: 'Asisten Laboratorium Telekomunikasi & Teknologi Informasi Universitas Lampung yang membimbing praktikum mahasiswa, pengujian rangkaian elektronika, dan sistem jaringan.',
      tags: ['Telecommunications Lab', 'Teaching Assistant', 'Hardware Lab'],
    },
    {
      id: 'g-5',
      title: 'Engineering Development Staff – HIMATRO University of Lampung',
      subtitle: 'Organization · Teknik Elektro',
      category: 'Organization · HIMATRO',
      year: 'February 2023 – February 2025',
      image: galeryHimatro,
      description: 'Anggota Divisi Penelitian dan Pengembangan (Bangtek) Himpunan Mahasiswa Teknik Elektro (HIMATRO) Universitas Lampung dengan predikat Grade A.',
      tags: ['HIMATRO', 'Research & Development', 'Teknik Elektro'],
    },
    {
      id: 'g-6',
      title: 'Chief Executive – HIMATRO Research Class (HRC) 2024',
      subtitle: 'Organizational Leadership · HIMATRO',
      category: 'Organizational Leadership',
      year: 'May – November 2024',
      image: galeryHrc,
      description: 'Ketua Pelaksana Seminar & Pelatihan HIMATRO Research Class (HRC) yang diselenggarakan oleh Himpunan Mahasiswa Teknik Elektro Universitas Lampung.',
      tags: ['Chief Executive', 'Event Leadership', 'Research Class'],
    },
    {
      id: 'g-7',
      title: 'Committee Member – Electrical Engineering in Action (EEA) 2024',
      subtitle: 'Organizational & Committee Experience',
      category: 'Committee · EEA 2024',
      year: 'June – October 2024',
      image: galeryEea,
      description: 'Panitia pelaksana kegiatan akbar tahunan Electrical Engineering in Action (EEA) 2024 Teknik Elektro Universitas Lampung.',
      tags: ['EEA 2024', 'Event Committee', 'Teamwork'],
    },
    {
      id: 'g-8',
      title: 'Speaker – Electrical Go To School (EGOS) at SMAN 15 Bandar Lampung',
      subtitle: 'Volunteer · Community Outreach',
      category: 'Volunteer · Speaker',
      year: 'April 2023',
      image: galeryEgos,
      description: 'Pemateri dalam kegiatan pengabdian masyarakat Electrical Go To School (EGOS) HIMATRO Unila di SMA Negeri 15 Bandar Lampung.',
      tags: ['Public Speaking', 'Volunteer', 'Community Outreach'],
    },
  ];

  const getActiveList = () => {
    if (currentTab === 'projects') return projectsData;
    if (currentTab === 'sertificate') return certificatesData;
    return galleryData;
  };

  const currentList = getActiveList();

  const handleTabSelect = (tab) => {
    setCurrentTab(tab);
    setCurrentIndex(0);
    if (onTabChange) onTabChange(tab);
  };

  const maxIndex = Math.max(0, currentList.length - cardsPerView);
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // ── 3D Fly-Through Zoom (Tulisan Maju ke Layar) ──
  const zoomScale = 1 + Math.pow(doorProgress, 1.7) * 8.2;
  const textOpacity = Math.max(0, 1 - Math.pow(doorProgress, 1.3) * 1.3);
  const textBlur = Math.max(0, (doorProgress - 0.22) * 12);
  const skyOverlayOpacity = Math.min(1, Math.max(0, (doorProgress - 0.15) / 0.70));

  return (
    <div className="relative w-full">
      {/* ════════════════════════════════════════════════════════════════════════
          STAGE 1: FLY-THROUGH ZOOM TRANSITION (TULISAN MAJU KE LAYAR)
         ════════════════════════════════════════════════════════════════════════ */}
      <div
        id="portfolio-portal"
        ref={doorContainerRef}
        className="relative w-full h-[55vh] select-none z-20"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

          {/* Animated Atmosphere Background Canvas (Space -> Earth Atmosphere) */}
          <div className="absolute inset-0 pointer-events-none -z-20">
            <AtmosphereCanvas progress={doorProgress} />
            {/* Top feathering so About space blends seamlessly into Atmosphere */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#02040a] to-transparent" />
          </div>

          {/* Sky Overlay: atmospheric dark navy -> sky blue (not harsh white) */}
          <div
            style={{ opacity: skyOverlayOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-[#182e4e] via-[#48739f] via-60% to-[#cde2f5] pointer-events-none -z-10"
          />

          {/* Fly-Through Zoom Text — tulisan "maju" melewati layar */}
          <div
            style={{
              transform: `scale(${zoomScale})`,
              opacity: textOpacity,
              filter: textBlur > 0 ? `blur(${textBlur}px)` : 'none',
              willChange: 'transform, opacity, filter',
            }}
            className="relative flex items-center justify-center z-30 pointer-events-none"
          >
            <h1
              style={{ fontFamily: 'Anton, sans-serif' }}
              className="text-7xl sm:text-9xl md:text-[12rem] lg:text-[15rem] xl:text-[17rem] leading-none uppercase bg-gradient-to-b from-[#cde2f5] via-[#8bbfd9] to-[#48739f] bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(136,191,217,0.6)] select-none"
            >
              PORTOFOLIO
            </h1>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          STAGE 2: HALAMAN BARU PORTOFOLIO (ANIMASI AWAN-AWAN LEMBUT BERGERAK)
          - Bisa di-scroll ke atas untuk menutup pintu & kembali ke About
          - Bisa di-scroll ke bawah untuk lanjut ke Contact
          - Menu Projects, Sertificate, Galery bertema iOS 18 Liquid Glass
         ════════════════════════════════════════════════════════════════════════ */}
      <section
        id="portfolio"
        ref={portfolioSectionRef}
        className="relative min-h-screen w-full text-slate-900 flex flex-col justify-center items-center pt-6 sm:pt-8 pb-24 px-3 sm:px-6 lg:px-10 select-none z-20 overflow-hidden"
      >
        {/* Top Smooth Gradient Feathering from Atmosphere Portal */}
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#182e4e] via-[#325882]/40 to-transparent pointer-events-none z-10" />

        {/* Animated Moving Clouds Canvas */}
        <AnimatedCloudsCanvas />

        {/* ── iOS 18 LIQUID GLASS CAPSULE TAB BAR (Proyek | Sertifikat | Galeri) ── */}
        <div
          style={{
            transitionDuration: '800ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className={`relative z-20 flex justify-center mb-6 sm:mb-8 shrink-0 transform transition-all ${
            portfolioVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-10 scale-95'
          }`}
        >
          <div className="inline-flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-white/45 backdrop-blur-2xl border border-white/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.95),0_12px_35px_rgba(15,23,42,0.1)] transition-all duration-300">

            <button
              onClick={() => handleTabSelect('projects')}
              className={`px-4 sm:px-8 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer select-none ${currentTab === 'projects'
                ? 'bg-gradient-to-b from-[#7cd4e6]/95 to-[#56b2c6]/95 backdrop-blur-md text-slate-950 border border-white/80 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.9),0_4px_15px_rgba(86,178,198,0.35)]'
                : 'text-slate-800/80 hover:text-slate-950 hover:bg-white/60'
                }`}
            >
              {isId ? 'Proyek' : 'Projects'}
            </button>

            <button
              onClick={() => handleTabSelect('sertificate')}
              className={`px-4 sm:px-8 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer select-none ${currentTab === 'sertificate'
                ? 'bg-gradient-to-b from-[#7cd4e6]/95 to-[#56b2c6]/95 backdrop-blur-md text-slate-950 border border-white/80 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.9),0_4px_15px_rgba(86,178,198,0.35)]'
                : 'text-slate-800/80 hover:text-slate-950 hover:bg-white/60'
                }`}
            >
              {isId ? 'Sertifikat' : 'Certificates'}
            </button>

            <button
              onClick={() => handleTabSelect('galery')}
              className={`px-4 sm:px-8 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer select-none ${currentTab === 'galery'
                ? 'bg-gradient-to-b from-[#7cd4e6]/95 to-[#56b2c6]/95 backdrop-blur-md text-slate-950 border border-white/80 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.9),0_4px_15px_rgba(86,178,198,0.35)]'
                : 'text-slate-800/80 hover:text-slate-950 hover:bg-white/60'
                }`}
            >
              {isId ? 'Galeri' : 'Gallery'}
            </button>

          </div>
        </div>

        {/* ── 3-CARD CAROUSEL WITH LEFT & RIGHT iOS GLASS ARROWS ── */}
        <div
          style={{
            transitionDelay: '150ms',
            transitionDuration: '900ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className={`relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-5 my-auto transform transition-all ${
            portfolioVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-12 scale-[0.98]'
          }`}
        >

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous Cards"
            className="shrink-0 w-9 sm:w-12 h-9 sm:h-12 rounded-full bg-white/70 hover:bg-slate-900 text-slate-900 hover:text-white border border-slate-300/80 hover:border-slate-900 backdrop-blur-xl flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90 hover:scale-105 shadow-[0_8px_20px_rgba(15,23,42,0.1)] z-20"
          >
            <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>

          {/* Cards Window */}
          <div className="w-full overflow-hidden py-3">
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] gap-4 sm:gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {currentList.map((item) => (
                <div
                  key={item.id}
                  className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] shrink-0 flex flex-col"
                >
                  {/* Slate-Blue-Gray Card Matching Screenshot */}
                  <div className="group relative rounded-2xl bg-[#c5d0da]/90 hover:bg-[#bcc8d4] backdrop-blur-md border border-white/60 shadow-[0_12px_30px_rgba(15,23,42,0.1)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.16)] overflow-hidden flex flex-col h-[400px] sm:h-[430px] transition-all duration-300 hover:-translate-y-1.5">

                    {/* Top Image Frame inside Card (full-fit object-contain so Projects, Sertificate & Galery show clearly) */}
                    <div className="p-3.5 sm:p-4 pb-0 shrink-0">
                      <div
                        className={`relative w-full rounded-xl overflow-hidden shadow-inner flex items-center justify-center ${
                          currentTab === 'galery'
                            ? 'aspect-video bg-slate-950'
                            : currentTab === 'sertificate'
                            ? 'h-52 sm:h-56 bg-white p-1.5'
                            : 'h-52 sm:h-56 bg-slate-950/90 p-1'
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* Card Content: Centered Bold Title + Bottom-Left Detail Button */}
                    <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                      <div className="flex-1 flex items-center justify-center px-1">
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 text-center leading-snug line-clamp-3">
                          {item.title}
                        </h4>
                      </div>

                      {/* Bottom Left "Detail" Button */}
                      <div className="pt-2 flex items-center justify-start">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="px-5 py-1.5 rounded-lg bg-[#444444] hover:bg-slate-900 text-white text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-sm"
                        >
                          {isId ? 'Detail' : 'Details'}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next Cards"
            className="shrink-0 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/70 hover:bg-slate-900 text-slate-900 hover:text-white border border-slate-300/80 hover:border-slate-900 backdrop-blur-xl flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90 hover:scale-105 shadow-[0_8px_20px_rgba(15,23,42,0.1)] z-20"
          >
            <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>

        </div>

        {/* Dots Indicator */}
        <div className="relative z-20 flex justify-center items-center gap-2 mt-6">
          {currentList.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(Math.min(i, maxIndex))}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === i ? 'w-8 bg-[#56b2c6]' : 'w-2 bg-slate-400/60 hover:bg-slate-600'
                }`}
            />
          ))}
        </div>

        {/* Bottom Silky Transition Gradient: Blends Cloud Sky (#f8fafc) seamlessly into Rinjani Dawn Sky (#ebe2da) */}
        <div className="absolute bottom-0 inset-x-0 h-36 sm:h-48 bg-gradient-to-b from-transparent via-[#ede6df]/65 to-[#ebe2da] pointer-events-none z-10" />
      </section>

      {/* ── DETAIL MODAL POPUP ── */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full rounded-3xl bg-white border border-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col max-h-[92vh] text-slate-900 ${
              selectedItem.id?.startsWith('g-') ? 'max-w-4xl' : 'max-w-3xl'
            }`}
          >
            {selectedItem.id?.startsWith('g-') ? (
              <div className="relative w-full aspect-video bg-slate-950 shrink-0 overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center transition cursor-pointer shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="relative w-full max-h-[58vh] bg-slate-100 shrink-0 overflow-hidden flex items-center justify-center p-3 sm:p-5 border-b border-slate-200">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="max-h-[52vh] w-auto max-w-full object-contain rounded-lg shadow-md"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-slate-900 flex items-center justify-center transition cursor-pointer shadow-md border border-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700 leading-relaxed">
              <div>
                <span className="text-xs font-mono font-bold text-[#0891b2] uppercase tracking-wider">
                  {selectedItem.category || selectedItem.issuer} · {selectedItem.year}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 mt-1">
                  {selectedItem.title}
                </h3>
              </div>
              <p>{selectedItem.description}</p>
              {(selectedItem.tech || selectedItem.skills || selectedItem.tags) && (
                <div>
                  <h5 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold mb-2">
                    {selectedItem.tech
                      ? isId ? 'Teknologi & Tools' : 'Tech Stack & Tools'
                      : selectedItem.skills
                      ? isId ? 'Keahlian Teruji' : 'Verified Skills'
                      : isId ? 'Topik' : 'Topics'}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {(selectedItem.tech || selectedItem.skills || selectedItem.tags).map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-[#6bb3c4]/20 text-slate-800 border border-[#6bb3c4]/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedItem.features && (
                <div>
                  <h5 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold mb-2">
                    {isId ? 'Fitur & Arsitektur Utama' : 'Key Features & Architecture'}
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {selectedItem.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.credentialId && (
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs font-mono gap-2 flex-wrap">
                  <span className="text-slate-500">{isId ? 'Nomor Sertifikat:' : 'Credential ID:'}</span>
                  <span className="text-slate-900 font-bold break-all">{selectedItem.credentialId}</span>
                </div>
              )}
            </div>

            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition cursor-pointer"
              >
                {isId ? 'Tutup' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
