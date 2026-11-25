import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, CheckCircle2, X } from 'lucide-react';

// Import Assets
import projectTirta from '../assets/project-tirta.jpg';
import projectDrone from '../assets/project-drone.jpg';
import projectIot from '../assets/project-iot.jpg';
import certBnsp from '../assets/cert-bnsp.jpg';
import certDicoding from '../assets/cert-dicoding.png';
import certHubspot from '../assets/cert-hubspot.jpg';

// ── Animated Moving Dots Background Canvas (Black/Dark Dots on White Background) ──
function MovingDotsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track mouse for subtle interactive drift
    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create ~120 dots of varied sizes matching the polka/cosmic ink aesthetic
    const dotCount = Math.min(140, Math.floor((width * height) / 9000));
    const dots = Array.from({ length: dotCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.5 + Math.random() * 4.2,
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.65,
      opacity: 0.55 + Math.random() * 0.45,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const dot of dots) {
        // Gentle continuous drift
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Wrap smoothly around screen edges
        if (dot.x < -10) dot.x = width + 10;
        if (dot.x > width + 10) dot.x = -10;
        if (dot.y < -10) dot.y = height + 10;
        if (dot.y > height + 10) dot.y = -10;

        // Subtle mouse repulsion
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110 && dist > 0) {
          const force = (110 - dist) / 110;
          dot.x += (dx / dist) * force * 1.4;
          dot.y += (dy / dist) * force * 1.4;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 23, 42, ${dot.opacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

export default function PortfolioPage({ initialTab = 'projects', onBack }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'projects' | 'sertificate' | 'galery'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
      setCurrentIndex(0);
    }
  }, [initialTab]);

  // ── Data Projects ──
  const projectsData = [
    {
      id: 'p-1',
      title: 'TIRTA – Real-Time Earthquake Monitoring & AI-Based Tsunami Prediction',
      subtitle: 'Web Simulation & GIS Platform',
      category: 'Web Simulation & GIS',
      year: '2025',
      image: projectTirta,
      description: 'Platform sistem simulasi dan asesmen genangan tsunami secara real-time berbasis integrasi data spasial seismik BMKG, pemodelan run-up hidrodinamika, serta peta visualisasi bahaya pesisir interaktif.',
      tech: ['React.js', 'Leaflet / Mapbox', 'Python API', 'Tailwind CSS', 'Vite'],
      features: [
        'Simulasi spasial ketinggian gelombang & peta rendaman',
        'Integrasi data gempa real-time dengan peringatan dini',
        'Analisis multi-skenario mitigasi risiko pesisir wilayah'
      ],
    },
    {
      id: 'p-2',
      title: 'Drone Bee Tricopter AI – Few-Shot Learning Detection',
      subtitle: 'Artificial Intelligence & Robotics',
      category: 'Artificial Intelligence & Robotics',
      year: '2025',
      image: projectDrone,
      description: 'Purwarupa drone cerdas berbasis AI Tricopter dengan optimasi sedikit sampel (few-shot learning) untuk pemantauan perkebunan, deteksi hama daun otomatis, dan tracking kesehatan tanaman.',
      tech: ['Python', 'PyTorch / OpenCV', 'Embedded Linux', 'IoT Telemetry'],
      features: [
        'Deteksi dini penyakit daun & anomali hama tanaman',
        'Few-shot transfer learning dengan akurasi tinggi',
        'Navigasi otonom & transmisi telemetri nirkabel'
      ],
    },
    {
      id: 'p-3',
      title: 'Vitalsense – IoT-Based Health Monitoring System',
      subtitle: 'Real-time Heart Rate & SpO2 Web Server',
      category: 'IoT & Embedded Systems',
      year: '2024',
      image: projectIot,
      description: 'Perangkat medis portabel pemantau denyut jantung (BPM) dan saturasi oksigen (SpO2) menggunakan mikrokontroler C++, terhubung secara nirkabel ke dasbor web server lokal untuk visualisasi grafik pasien.',
      tech: ['C++', 'ESP32 / Arduino', 'WebSockets', 'HTML5 Canvas', 'Chart.js'],
      features: [
        'Streaming grafik BPM & SpO2 latency ultra-rendah (<100ms)',
        'Notifikasi peringatan ambang batas darurat otomatis',
        'Dasbor telemetri berbasis web browser responsif'
      ],
    },
    {
      id: 'p-4',
      title: 'Rinjani Adventure Experience',
      subtitle: 'Interactive Parallax Nature Exploration',
      category: 'Creative Web Design',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      description: 'Eksplorasi web interaktif dengan multi-layer visual depth, transparansi background, animasi scroll paralaks 60 FPS, dan tipografi ekspresif.',
      tech: ['React.js', 'Framer Motion', 'Tailwind CSS', 'WebGL Canvas'],
      features: [
        'Paralaks multi-bidang visual kedalaman lanskap',
        'Optimasi transisi 60 FPS tanpa lag',
        'Sistem tata suara atmosferik ambient'
      ],
    },
    {
      id: 'p-5',
      title: 'iOS 18 Liquid Glass Dashboard',
      subtitle: 'Next-Gen Frosted Analytics System',
      category: 'UI/UX & Design Systems',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      description: 'Sistem antarmuka analitik modern dengan pendekatan glassmorphism iOS 18, specular lighting, dynamic cards, dan interaksi widget modular.',
      tech: ['Figma UI/UX', 'Glassmorphism HIG', 'React Components'],
      features: [
        'Desain token warna & specular reflection adaptif',
        'Bento card modular dengan auto-layout dinamis',
        'Aksesibilitas kontras tinggi WCAG AAA'
      ],
    },
  ];

  // ── Data Sertifikat ──
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
      title: 'Dicoding Indonesia – Belajar Dasar Pemrograman Web',
      subtitle: 'Dicoding Academy Indonesia',
      issuer: 'Dicoding Academy',
      year: '2025 – 2028',
      image: certDicoding,
      description: 'Sertifikasi kelulusan kurikulum resmi pemrograman web modern dari Dicoding Indonesia, mencakup standar HTML5 semantik, CSS3 responsif, flexbox, grid, dan best practices web developer.',
      skills: ['HTML5 Semantic Structure', 'CSS3 Layouting & Flexbox', 'Responsive Web Design', 'Cross-browser Compatibility'],
      credentialId: '072637RWRZQR',
    },
    {
      id: 'c-3',
      title: 'HubSpot Academy – Service Hub Software Certified',
      subtitle: 'HubSpot Academy Global',
      issuer: 'HubSpot Academy Global',
      year: '2026 – 2027',
      image: certHubspot,
      description: 'Sertifikasi profesional global dalam manajemen layanan pelanggan digital, otomatisasi tiket bantuan (help desk), knowledge base, dan optimasi kepuasan pengguna (CSAT).',
      skills: ['Customer Experience Strategy', 'Help Desk & Ticket Automation', 'SLA Management', 'Customer Feedback Analytics'],
      credentialId: 'a054491f084a4784947c50e6816a7fda',
    },
  ];

  // ── Data Galeri ──
  const galleryData = [
    {
      id: 'g-1',
      title: 'BEM FT UNILA 2024 – Badan Eksekutif Mahasiswa Fakultas Teknik',
      subtitle: 'Organisasi & Kepemimpinan',
      category: 'Organisasi & Kepemimpinan',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80',
      description: 'Dokumentasi kegiatan dan rapat kerja Badan Eksekutif Mahasiswa Fakultas Teknik Universitas Lampung dalam perancangan program sinergi mahasiswa dan pengabdian masyarakat.',
      tags: ['Leadership', 'Event Organizing', 'Team Coordination'],
    },
    {
      id: 'g-2',
      title: 'HIMATRO 2024 – Himpunan Mahasiswa Teknik Elektro',
      subtitle: 'Himpunan Jurusan',
      category: 'Himpunan Jurusan',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
      description: 'Dokumentasi workshop teknologi, riset sirkuit elektronika, serta pembinaan mahasiswa baru di lingkungan Himpunan Mahasiswa Teknik Elektro.',
      tags: ['Electronics Workshop', 'Technical Mentoring', 'Innovation Project'],
    },
    {
      id: 'g-3',
      title: 'Hands-On Robotics & Lab IoT – Uji Coba Lapangan',
      subtitle: 'Riset & Praktikum',
      category: 'Riset & Praktikum',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      description: 'Pengujian perangkat keras sensor mikrokontroler, kalibrasi motor drone tricopter, dan transmisi nirkabel telemetri secara langsung di lapangan.',
      tags: ['Hardware Testing', 'Field Trial', 'Circuit Soldering'],
    },
  ];

  const getActiveList = () => {
    if (activeTab === 'projects') return projectsData;
    if (activeTab === 'sertificate') return certificatesData;
    return galleryData;
  };

  const currentList = getActiveList();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const maxIndex = Math.max(0, currentList.length - 3);
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 relative flex flex-col justify-between pt-20 pb-12 px-4 sm:px-6 lg:px-10 selection:bg-cyan-500/30 overflow-x-hidden animate-fadeInZoom">
      
      {/* ── Animated Moving Dots Canvas Background ── */}
      <MovingDotsBackground />

      {/* ── Top Back Navigation Bar ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between mb-4 sm:mb-6">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/10 hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-900/15 text-xs sm:text-sm font-bold backdrop-blur-md transition-all duration-300 cursor-pointer select-none active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500 bg-white/70 px-3 py-1.5 rounded-full border border-slate-200 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span>Halaman Portofolio</span>
        </div>
      </div>

      {/* ── CAPSULE TAB BAR (Matching User Image: Cool Slate Capsule + Teal/Cyan Active Pill) ── */}
      <div className="relative z-10 flex justify-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 sm:gap-3 p-1.5 sm:p-2 rounded-full bg-[#cbd5e1]/90 backdrop-blur-xl shadow-[0_8px_25px_rgba(15,23,42,0.08)] border border-slate-300/60">
          
          <button
            onClick={() => handleTabChange('projects')}
            className={`px-5 sm:px-8 py-2 sm:py-2.5 rounded-full text-xs sm:text-base font-bold tracking-tight transition-all duration-300 cursor-pointer select-none ${
              activeTab === 'projects'
                ? 'bg-[#6bb3c4] text-slate-950 shadow-sm'
                : 'text-slate-900 hover:bg-white/50'
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => handleTabChange('sertificate')}
            className={`px-5 sm:px-8 py-2 sm:py-2.5 rounded-full text-xs sm:text-base font-bold tracking-tight transition-all duration-300 cursor-pointer select-none ${
              activeTab === 'sertificate'
                ? 'bg-[#6bb3c4] text-slate-950 shadow-sm'
                : 'text-slate-900 hover:bg-white/50'
            }`}
          >
            Sertificate
          </button>

          <button
            onClick={() => handleTabChange('galery')}
            className={`px-5 sm:px-8 py-2 sm:py-2.5 rounded-full text-xs sm:text-base font-bold tracking-tight transition-all duration-300 cursor-pointer select-none ${
              activeTab === 'galery'
                ? 'bg-[#6bb3c4] text-slate-950 shadow-sm'
                : 'text-slate-900 hover:bg-white/50'
            }`}
          >
            Galery
          </button>

        </div>
      </div>

      {/* ── 3-CARD CAROUSEL WITH LEFT & RIGHT ARROWS (Matching User Image Layout) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-5 my-auto">
        
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Cards"
          className="shrink-0 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/95 hover:bg-slate-900 text-slate-900 hover:text-white border-2 border-slate-700 flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90 hover:scale-105 shadow-md z-20"
        >
          <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
        </button>

        {/* Carousel Window */}
        <div className="w-full overflow-hidden py-2">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] gap-4 sm:gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / (window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3))}%)`,
            }}
          >
            {currentList.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] shrink-0 flex flex-col"
              >
                {/* Slate-Blue-Gray Card Matching Screenshot */}
                <div className="group relative bg-[#c5d0da] hover:bg-[#bcc8d4] border border-slate-300/80 shadow-[0_10px_25px_rgba(15,23,42,0.1)] hover:shadow-[0_16px_35px_rgba(15,23,42,0.16)] overflow-hidden flex flex-col h-[400px] sm:h-[440px] transition-all duration-300 hover:-translate-y-1.5">
                  
                  {/* Top Image Frame inside Card */}
                  <div className="p-3.5 sm:p-4 pb-0 shrink-0">
                    <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-white shadow-inner">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
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

                    {/* Bottom Left "Detail" Button (Matching Charcoal Rounded Button in Image) */}
                    <div className="pt-2 flex items-center justify-start">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="px-5 py-1.5 rounded-lg bg-[#444444] hover:bg-slate-900 text-white text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-sm"
                      >
                        Detail
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next Cards"
          className="shrink-0 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/95 hover:bg-slate-900 text-slate-900 hover:text-white border-2 border-slate-700 flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90 hover:scale-105 shadow-md z-20"
        >
          <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
        </button>

      </div>

      {/* ── Pagination Dots ── */}
      <div className="relative z-10 flex justify-center items-center gap-2 mt-6">
        {currentList.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(Math.min(i, maxIndex))}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === i ? 'w-8 bg-[#6bb3c4]' : 'w-2 bg-slate-400/60 hover:bg-slate-600'
            }`}
          />
        ))}
      </div>

      {/* ── DETAIL MODAL POPUP ── */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col max-h-[90vh] text-slate-900"
          >
            {/* Modal Header Image */}
            <div className="relative w-full h-56 sm:h-72 overflow-hidden bg-slate-100 shrink-0">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center transition cursor-pointer shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-mono font-bold text-[#6bb3c4] uppercase tracking-wider">
                  {selectedItem.category || selectedItem.issuer}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1">
                  {selectedItem.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700 leading-relaxed">
              <p>{selectedItem.description}</p>

              {(selectedItem.tech || selectedItem.skills || selectedItem.tags) && (
                <div>
                  <h5 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold mb-2">
                    {selectedItem.tech ? 'Teknologi & Tools' : selectedItem.skills ? 'Keahlian Teruji' : 'Topik'}
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
                    Fitur & Arsitektur Utama
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
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Nomor Sertifikat:</span>
                  <span className="text-slate-900 font-bold">{selectedItem.credentialId}</span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
