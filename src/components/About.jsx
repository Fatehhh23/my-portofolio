import React, { useState, useEffect, useRef } from 'react';
import aboutPhoto from '../assets/about-photo.jpg';
import techStackMain from '../assets/tech-stack-main.png';
import techTools from '../assets/tech-tools.png';
import techAi from '../assets/tech-ai.png';
import folderGlass from '../assets/folder-glass.png';
import projectTirta from '../assets/project-tirta.jpg';
import projectDrone from '../assets/project-drone.jpg';
import projectIot from '../assets/project-iot.jpg';
import certDicoding from '../assets/cert-dicoding.png';
import certBnsp from '../assets/cert-bnsp.jpg';
import certHubspot from '../assets/cert-hubspot.jpg';
import logoUnila from '../assets/logo-unila.png';

// ── Reusable Scroll-Reveal Component ──
function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkImmediate = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh - 40 && rect.bottom > 0) {
        setIsVisible(true);
      }
    };
    checkImmediate();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (entry.boundingClientRect.top > (window.innerHeight || document.documentElement.clientHeight)) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let transformHidden = 'translate-y-10';
  if (direction === 'left') transformHidden = '-translate-x-10';
  if (direction === 'right') transformHidden = 'translate-x-10';
  if (direction === 'down') transformHidden = '-translate-y-10';

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transform transition-all ${
        isVisible
          ? 'opacity-100 translate-y-0 translate-x-0 scale-100'
          : `opacity-0 ${transformHidden} scale-[0.98]`
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ── Flowchart Node Item (Titik, Garis, dan Kartu Menyala Begitu Masuk Area Layar Nyaman) ──
function FlowchartNodeItem({ item, index, totalItems, activeCard, toggleCard }) {
  const itemRef = useRef(null);
  const [isNodeLit, setIsNodeLit] = useState(index === 0);
  const [segProgress, setSegProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!itemRef.current) return;
      const rect = itemRef.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // ── Poin & Kartu ini menyala saat mencapai 76% layar (Tampak jelas di halaman About, JAUH sebelum Portfolio) ──
      const revealThreshold = index === 0 ? vh * 0.88 : vh * 0.76;

      if (rect.top <= revealThreshold) {
        setIsNodeLit(true);
      } else if (rect.top > vh * 0.94) {
        setIsNodeLit(false);
      }

      // ── Garis ke Poin Berikutnya & Titik Bergerak Mengisi saat Poin Ini Di-Scroll ke Atas ──
      if (index < totalItems - 1) {
        const startY = vh * 0.76;
        const endY = vh * 0.44;
        const p = Math.max(0, Math.min(1, (startY - rect.top) / (startY - endY)));
        setSegProgress(p);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [index, totalItems]);

  const isActive = activeCard === item.id;
  const isSegmentActive = segProgress > 0.04 && segProgress < 0.98;

  return (
    <div ref={itemRef} className="relative">
      <div className="relative flex items-start pl-12 sm:pl-16 group">

        {/* ── 1. Garis Vertikal HANYA DI ANTARA Poin (Mulai di bawah lingkaran, berhenti di atas lingkaran berikutnya) ── */}
        {index < totalItems - 1 && (
          <div className="absolute left-[18px] sm:left-[20px] top-[46px] bottom-[-24px] w-[2px] pointer-events-none z-10">
            {/* Track garis dasar tipis */}
            <div className="w-full h-full bg-white/10 rounded-full" />

            {/* Garis menyala hijau yang mengisi seiring di-scroll */}
            <div
              style={{ height: `${segProgress * 100}%` }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-emerald-400 to-teal-300 rounded-full shadow-[0_0_10px_#34d399] transition-all duration-75 ease-out"
            />

            {/* Titik Menyala (Glowing Traveler Bead) yang bergerak HANYA di jalur antara poin */}
            {isSegmentActive && (
              <div
                style={{
                  top: `${segProgress * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute left-1/2 w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-white shadow-[0_0_16px_#10b981,0_0_28px_#34d399] pointer-events-none flex items-center justify-center z-20"
              >
                <span className="w-1 h-1 rounded-full bg-white" />
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              </div>
            )}
          </div>
        )}

        {/* ── 2. Lingkaran Angka Node (Solid Opaque, Angka 100% Bersih & Menyala saat Titik Sampai) ── */}
        <div
          style={{ transitionDuration: '450ms' }}
          className={`absolute left-0 top-1 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm z-30 transition-all select-none bg-[#030712] ${
            isNodeLit
              ? 'border-2 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.8)] scale-105 opacity-100'
              : 'border border-white/15 text-white/20 opacity-35 scale-90'
          }`}
        >
          {item.num}
        </div>

        {/* ── 3. Garis Cabang Horizontal ke Kartu (Hanya muncul saat titik sampai di poin) ── */}
        <div
          style={{ transitionDuration: '400ms' }}
          className={`absolute left-[38px] sm:left-[42px] top-6 h-[1.5px] transition-all pointer-events-none z-20 ${
            isNodeLit
              ? 'w-3 sm:w-4 opacity-100 bg-gradient-to-r from-emerald-400 to-emerald-400/30 shadow-[0_0_8px_#34d399]'
              : 'w-0 opacity-0 bg-transparent'
          }`}
        />

        {/* ── 4. Kartu Konten iOS 18 Glass (HANYA MUNCUL KETIKA TITIK SUDAH SAMPAI DI POIN) ── */}
        <div
          onClick={() => isNodeLit && toggleCard(item.id)}
          style={{
            transitionDuration: '550ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className={`ios-glass-interactive rounded-2xl p-4 sm:p-5 flex-1 transition-all cursor-pointer transform ${
            isNodeLit
              ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto shadow-[0_0_25px_rgba(52,211,153,0.18)]'
              : 'opacity-0 translate-x-8 scale-[0.94] pointer-events-none'
          } ${
            isActive
              ? 'border-emerald-400/60 bg-white/[0.09] shadow-[0_0_25px_rgba(52,211,153,0.3)]'
              : ''
          }`}
        >
          <div className="flex flex-col gap-1.5">
            {/* Baris Atas: Tahun / Tanggal & Badge Tag */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono tracking-wide">
                {item.year || item.date}
              </span>
              {item.tag && (
                <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {item.tag}
                </span>
              )}
            </div>

            {/* Judul Posisi / Kursus */}
            <h4 className="text-sm sm:text-base font-bold text-cyan-200 leading-snug">
              {item.title}
            </h4>

            {/* Peran / Organisasi */}
            {(item.role || item.org) && (
              <p className="text-xs sm:text-sm font-semibold text-emerald-300/90 leading-tight">
                {item.role || item.org}
              </p>
            )}

            {/* Tempat / Keterangan Lembaga */}
            {(item.place || item.subOrg) && (
              <p className="text-[11px] sm:text-xs text-white/60">
                {item.place || item.subOrg}
              </p>
            )}

            {/* Tanggal Rinci (jika berbeda dari tahun utama) */}
            {item.year && item.date && item.year !== item.date && (
              <p className="text-[11px] text-white/45 font-mono">
                {item.date}
              </p>
            )}

            {/* Accordion Detail saat di-klik */}
            {isActive && item.detail && (
              <div className="mt-2.5 pt-2.5 border-t border-white/10 text-xs text-white/75 leading-relaxed animate-fadeIn">
                {item.detail}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Flowchart Timeline Track Container ──
function FlowchartTimeline({ items, activeCard, toggleCard }) {
  return (
    <div className="relative flex flex-col gap-6 py-2">
      {items.map((item, index) => (
        <FlowchartNodeItem
          key={item.id}
          item={item}
          index={index}
          totalItems={items.length}
          activeCard={activeCard}
          toggleCard={toggleCard}
        />
      ))}
    </div>
  );
}

// ── Interactive Glass Folder Card with Emerging Documents on Cursor Hover ──
function InteractiveFolderCard({
  type = 'projects', // 'projects' | 'certificates' | 'gallery'
  number,
  title,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer select-none transition-all duration-300 hover:scale-[1.02] active:scale-95 w-full pt-8 sm:pt-10"
    >
      {/* ── EMERGING DOCUMENTS / PAPERS (Tucked behind Front Glass) ── */}
      <div className="absolute inset-x-0 top-0 h-32 flex justify-center pointer-events-none z-10">
        
        {/* === 1. PROJECTS FOLDER PAPERS (ALL 3 VISIBLE & NEATLY BOUNDED) === */}
        {type === 'projects' && (
          <div className="relative w-full h-full flex justify-center">
            {/* Paper 1: Left - Drone Bee Tricopter AI */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform translate-y-10 opacity-0 group-hover:-translate-y-5 sm:group-hover:-translate-y-7 group-hover:opacity-100 z-10">
              <div className="w-24 sm:w-28 h-28 sm:h-34 rounded-xl bg-zinc-950 border border-emerald-400/50 shadow-xl overflow-hidden flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:-translate-x-7 sm:group-hover:-translate-x-9 group-hover:-rotate-8 group-hover:scale-95">
                <div className="w-full h-full overflow-hidden bg-zinc-900">
                  <img
                    src={projectDrone}
                    alt="Drone Bee Tricopter AI"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/85 to-transparent p-1 pt-2.5">
                  <p className="text-[7.5px] font-bold text-emerald-300 leading-tight truncate">
                    Drone AI Tricopter
                  </p>
                  <p className="text-[6.5px] text-white/70 truncate">
                    Few-Shot Learning
                  </p>
                </div>
              </div>
            </div>

            {/* Paper 2: Right - Sistem Monitoring Jantung IoT */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-75 transform translate-y-10 opacity-0 group-hover:-translate-y-5 sm:group-hover:-translate-y-7 group-hover:opacity-100 z-10">
              <div className="w-24 sm:w-28 h-28 sm:h-34 rounded-xl bg-zinc-950 border border-cyan-400/50 shadow-xl overflow-hidden flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:translate-x-7 sm:group-hover:translate-x-9 group-hover:rotate-8 group-hover:scale-95">
                <div className="w-full h-full overflow-hidden bg-zinc-900">
                  <img
                    src={projectIot}
                    alt="Sistem Monitoring Jantung & Oksigen IoT"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/85 to-transparent p-1 pt-2.5">
                  <p className="text-[7.5px] font-bold text-cyan-300 leading-tight truncate">
                    Monitoring Jantung IoT
                  </p>
                  <p className="text-[6.5px] text-white/70 truncate">
                    C++ & Web Server
                  </p>
                </div>
              </div>
            </div>

            {/* Paper 3: Center (Hero) - TIRTA Web Platform */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform translate-y-12 opacity-0 group-hover:-translate-y-8 sm:group-hover:-translate-y-11 group-hover:opacity-100 z-20">
              <div className="w-28 sm:w-34 h-32 sm:h-38 rounded-xl bg-zinc-950 border-2 border-emerald-400/70 shadow-[0_16px_36px_rgba(16,185,129,0.45)] overflow-hidden flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:scale-105">
                <div className="w-full h-full overflow-hidden bg-white">
                  <img
                    src={projectTirta}
                    alt="TIRTA Web Platform"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/85 to-transparent p-1.5 pt-3">
                  <p className="text-[8px] font-bold text-white leading-tight flex items-center justify-between">
                    <span className="text-emerald-300">TIRTA Web Platform</span>
                    <span className="text-[7px] text-white/80">Simulasi →</span>
                  </p>
                  <p className="text-[6.5px] text-white/70 truncate">
                    Tsunami Real-Time Assessment
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === 2. CERTIFICATES FOLDER PAPERS (ALL 3 VISIBLE & NEATLY BOUNDED) === */}
        {type === 'certificates' && (
          <div className="relative w-full h-full flex justify-center">
            {/* Paper 1: Left - Dicoding Belajar Dasar Pemrograman Web */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform translate-y-10 opacity-0 group-hover:-translate-y-5 sm:group-hover:-translate-y-7 group-hover:opacity-100 z-10">
              <div className="w-24 sm:w-28 h-28 sm:h-34 rounded-xl bg-zinc-950 border border-teal-400/50 shadow-xl overflow-hidden flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:-translate-x-7 sm:group-hover:-translate-x-9 group-hover:-rotate-8 group-hover:scale-95">
                <div className="w-full h-full overflow-hidden bg-white">
                  <img
                    src={certDicoding}
                    alt="Dicoding Belajar Dasar Pemrograman Web"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/85 to-transparent p-1 pt-2.5">
                  <p className="text-[7.5px] font-bold text-teal-300 leading-tight truncate">
                    Dicoding Indonesia
                  </p>
                  <p className="text-[6.5px] text-white/70 truncate">
                    Dasar Pemrograman Web
                  </p>
                </div>
              </div>
            </div>

            {/* Paper 2: Right - HubSpot Academy Service Hub */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-75 transform translate-y-10 opacity-0 group-hover:-translate-y-5 sm:group-hover:-translate-y-7 group-hover:opacity-100 z-10">
              <div className="w-24 sm:w-28 h-28 sm:h-34 rounded-xl bg-zinc-950 border border-orange-400/50 shadow-xl overflow-hidden flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:translate-x-7 sm:group-hover:translate-x-9 group-hover:rotate-8 group-hover:scale-95">
                <div className="w-full h-full overflow-hidden bg-white">
                  <img
                    src={certHubspot}
                    alt="HubSpot Academy Service Hub Certified"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/85 to-transparent p-1 pt-2.5">
                  <p className="text-[7.5px] font-bold text-orange-300 leading-tight truncate">
                    HubSpot Academy
                  </p>
                  <p className="text-[6.5px] text-white/70 truncate">
                    Service Hub Certified
                  </p>
                </div>
              </div>
            </div>

            {/* Paper 3: Center (Hero) - BNSP Radio Frequency Engineer */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform translate-y-12 opacity-0 group-hover:-translate-y-8 sm:group-hover:-translate-y-11 group-hover:opacity-100 z-20">
              <div className="w-28 sm:w-34 h-32 sm:h-38 rounded-xl bg-zinc-950 border-2 border-amber-400/70 shadow-[0_16px_36px_rgba(245,158,11,0.45)] overflow-hidden flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:scale-105">
                <div className="w-full h-full overflow-hidden bg-white">
                  <img
                    src={certBnsp}
                    alt="Sertifikat Kompetensi BNSP"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/85 to-transparent p-1.5 pt-3">
                  <p className="text-[8px] font-bold text-white leading-tight flex items-center justify-between">
                    <span className="text-amber-300">Sertifikat BNSP</span>
                    <span className="text-[7px] text-white/80">Valid →</span>
                  </p>
                  <p className="text-[6.5px] text-white/70 truncate">
                    RF Engineer · LSP UNILA
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === 3. GALLERY FOLDER PAPERS === */}
        {type === 'gallery' && (
          <div className="relative w-full h-full flex justify-center">
            {/* Paper 1: Left - Polaroid 1 */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform translate-y-10 opacity-0 group-hover:-translate-y-4 sm:group-hover:-translate-y-6 group-hover:opacity-100 z-10">
              <div className="w-22 sm:w-26 h-22 sm:h-26 rounded-lg bg-white/95 text-zinc-900 shadow-xl p-1.5 pb-2 flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:-translate-x-6 sm:group-hover:-translate-x-8 group-hover:-rotate-8 group-hover:scale-95">
                <div className="w-full h-14 sm:h-16 rounded bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center overflow-hidden">
                  <div className="w-5 h-5 rounded-full bg-white/20 blur-[2px]" />
                </div>
                <span className="text-[7px] font-mono text-zinc-800 font-bold text-center">BEM FT UNILA</span>
              </div>
            </div>

            {/* Paper 2: Right - Polaroid 2 */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-75 transform translate-y-10 opacity-0 group-hover:-translate-y-4 sm:group-hover:-translate-y-6 group-hover:opacity-100 z-10">
              <div className="w-22 sm:w-26 h-22 sm:h-26 rounded-lg bg-white/95 text-zinc-900 shadow-xl p-1.5 pb-2 flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:translate-x-6 sm:group-hover:translate-x-8 group-hover:rotate-8 group-hover:scale-95">
                <div className="w-full h-14 sm:h-16 rounded bg-gradient-to-br from-teal-900 to-emerald-800 flex items-center justify-center overflow-hidden">
                  <div className="w-5 h-5 rounded-full bg-white/20 blur-[2px]" />
                </div>
                <span className="text-[7px] font-mono text-zinc-800 font-bold text-center">HIMATRO 2024</span>
              </div>
            </div>

            {/* Paper 3: Center - Campus Activity */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform translate-y-12 opacity-0 group-hover:-translate-y-7 sm:group-hover:-translate-y-9 group-hover:opacity-100 z-20">
              <div className="w-26 sm:w-30 h-24 sm:h-28 rounded-lg bg-white/95 text-zinc-900 shadow-[0_12px_30px_rgba(168,85,247,0.3)] p-1.5 pb-2.5 flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:scale-105">
                <div className="w-full h-16 sm:h-18 rounded bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
                  <span className="text-white/80 text-[10px] font-mono">📸 Campus Activity</span>
                </div>
                <span className="text-[8px] font-mono text-zinc-800 font-bold text-center">Dokumentasi & Workshop</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── FRONT GLASS FOLDER (Covers Lower Half of Papers) ── */}
      <div className="relative rounded-2xl overflow-hidden backdrop-blur-md z-20">
        <img
          src={folderGlass}
          alt={title}
          className="w-full h-auto object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:drop-shadow-[0_18px_36px_rgba(52,211,153,0.3)]"
        />
        {/* Glossy specular reflection on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Folder Label Inside Transparent Pocket */}
        <div className="absolute bottom-2.5 sm:bottom-3.5 left-3 sm:left-4.5 flex flex-col leading-none pointer-events-none pr-2">
          {number && (
            <span
              className="text-2xl sm:text-3xl lg:text-4xl text-white font-anton tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              style={{ fontFamily: 'Anton, sans-serif' }}
            >
              {number}
            </span>
          )}
          <span
            className={`font-anton text-white/95 tracking-wide uppercase mt-0.5 leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] ${
              number ? (number === '14' ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm') : 'text-xs sm:text-sm'
            }`}
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function About({ onNavigate, onOpenPortfolio, lang = 'id' }) {
  const isId = lang === 'id';
  const fullLine1 = isId ? 'HALO, SAYA' : "HI, I'M";
  const fullLine2 = 'MUHAMAD FATIH RIZQI';

  const [displayed1, setDisplayed1] = useState('');
  const [displayed2, setDisplayed2] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setDisplayed1('');
    setDisplayed2('');
    setIsDeleting(false);
  }, [lang]);

  // Typewriter effect
  useEffect(() => {
    let timer;

    if (!isDeleting) {
      if (displayed1.length < fullLine1.length) {
        timer = setTimeout(() => {
          setDisplayed1(fullLine1.slice(0, displayed1.length + 1));
        }, 70);
      } else if (displayed2.length < fullLine2.length) {
        timer = setTimeout(() => {
          setDisplayed2(fullLine2.slice(0, displayed2.length + 1));
        }, 65);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2600);
      }
    } else {
      if (displayed2.length > 0) {
        timer = setTimeout(() => {
          setDisplayed2(fullLine2.slice(0, displayed2.length - 1));
        }, 30);
      } else if (displayed1.length > 0) {
        timer = setTimeout(() => {
          setDisplayed1(fullLine1.slice(0, displayed1.length - 1));
        }, 30);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
        }, 500);
      }
    }

    return () => clearTimeout(timer);
  }, [displayed1, displayed2, isDeleting, fullLine1, fullLine2]);

  // Draggable necklace-lanyard spring physics (tali kalung ngeleweran, bisa ditarik kemana-mana & memantul kembali)
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialPosRef = useRef({ x: 0, y: 0 });
  const springRef = useRef(null);
  const velRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(Date.now());

  const handlePointerDown = (e) => {
    if (springRef.current) cancelAnimationFrame(springRef.current);
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialPosRef.current = { x: pos.x, y: pos.y };
    lastPosRef.current = { x: pos.x, y: pos.y };
    lastTimeRef.current = Date.now();
    velRef.current = { x: 0, y: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const now = Date.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const nextX = Math.max(-180, Math.min(180, initialPosRef.current.x + dx));
    // Batasi tarikan ke atas agar kartu tidak menutupi tali kalung (tali selalu terlihat)
    const nextY = Math.max(-20, Math.min(180, initialPosRef.current.y + dy));

    velRef.current = {
      x: ((nextX - lastPosRef.current.x) / dt) * 16,
      y: ((nextY - lastPosRef.current.y) / dt) * 16,
    };
    lastPosRef.current = { x: nextX, y: nextY };
    lastTimeRef.current = now;

    setPos({ x: nextX, y: nextY });
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    if (springRef.current) cancelAnimationFrame(springRef.current);

    let currX = pos.x;
    let currY = pos.y;
    let vx = Math.max(-26, Math.min(26, velRef.current.x));
    let vy = Math.max(-26, Math.min(26, velRef.current.y));
    const k = 0.085;
    const damping = 0.84;

    const springStep = () => {
      const ax = -k * currX;
      const ay = -k * currY;
      vx = (vx + ax) * damping;
      vy = (vy + ay) * damping;
      currX += vx;
      currY += vy;

      setPos({ x: currX, y: currY });

      if (
        Math.abs(currX) > 0.3 ||
        Math.abs(currY) > 0.3 ||
        Math.abs(vx) > 0.3 ||
        Math.abs(vy) > 0.3
      ) {
        springRef.current = requestAnimationFrame(springStep);
      } else {
        setPos({ x: 0, y: 0 });
        springRef.current = null;
      }
    };

    springRef.current = requestAnimationFrame(springStep);
  };

  const defaultCardY = 92;
  const clipX = 200 + pos.x;
  const clipY = defaultCardY + pos.y;
  const tilt = Math.max(-22, Math.min(22, pos.x * 0.09));

  // State Interaktif untuk Kartu Experience & Organization
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (id) => {
    setActiveCard((prev) => (prev === id ? null : id));
  };

  // ══════════════════════════════════════════════════════════
  // DATA EXPERIENCE (URUT SESUAI TAHUN: 2023 -> 2026)
  // ══════════════════════════════════════════════════════════
  const experiences = [
    {
      id: 'exp-1',
      num: '1',
      year: 'April 2023',
      date: 'April 2023',
      title: 'Speaker – Electrical Go to School (EGOS)',
      role: 'Speaker & Volunteer',
      place: 'Bandar Lampung State Senior High School 15',
      tag: 'Volunteer',
      detail: 'Memberikan materi edukatif mengenai teknologi teknik elektro, revolusi AI, dan peluang karir software engineering kepada siswa SMA.',
    },
    {
      id: 'exp-2',
      num: '2',
      year: 'July – August 2023',
      date: 'July – August 2023',
      title: 'International Summer Course on Modern Optics and Its Applications',
      role: 'Participant',
      place: 'Institut Teknologi Bandung (ITB) · Bandung, Indonesia',
      tag: 'International',
      detail: 'Mempelajari kemajuan spektrometri, serat optik, fotonika kuantum, dan aplikasi laser dalam transmisi data telekomunikasi modern.',
    },
    {
      id: 'exp-3',
      num: '3',
      year: 'Jul 2024 – Des 2024',
      date: 'Jul 2024 – Des 2024',
      title: 'Staf Teknis – Stasiun Mikroklimat',
      role: 'Technical Specialist',
      place: 'Universitas Lampung · Bandar Lampung, Indonesia',
      tag: 'Technical',
      detail: 'Mengelola sensor mikroklimat cerdas, kalibrasi sistem telemetry cuaca, dan validasi data sensor lingkungan secara berkala.',
    },
    {
      id: 'exp-4',
      num: '4',
      year: 'February – June 2025',
      date: 'February – June 2025',
      title: 'Full Stack Web Developer Coding Camp powered by DBS Foundation',
      role: 'Internship Dicoding Indonesia',
      place: 'Remote, Indonesia',
      tag: 'Full Stack',
      detail: 'Membangun aplikasi web kelas industri berbasis React, Node.js, Express, PostgreSQL, dan deployment cloud dengan standar clean architecture.',
    },
    {
      id: 'exp-5',
      num: '5',
      year: 'April 2025 – July 2026',
      date: 'Contract · April 2025 – July 2026',
      title: 'Laboratory Assistant Telecommunications & Information Technology Laboratory',
      role: 'Universitas Lampung',
      place: 'Laboratorium Telekomunikasi & TI',
      tag: 'Lab Assistant',
      detail: 'Memandu mahasiswa dalam praktikum antena, perambatan gelombang radio, konfigurasi jaringan komputer, dan pemeliharaan alat lab.',
    },
  ];

  // ══════════════════════════════════════════════════════════
  // DATA ORGANIZATION (URUT SESUAI TAHUN: 2023 -> 2025)
  // ══════════════════════════════════════════════════════════
  const organizations = [
    {
      id: 'org-1',
      num: '1',
      year: 'May 2023 – Nov 2024',
      date: 'May 2023 – Nov 2024',
      title: 'Communication and Information Management Staff',
      org: 'BEM Faculty of Engineering',
      subOrg: 'University of Lampung (BEM FT UNILA)',
      tag: 'BEM FT',
      detail: 'Mengelola publikasi digital fakultas teknik, desain visual media informasi, serta dokumentasi kegiatan kampus.',
    },
    {
      id: 'org-2',
      num: '2',
      year: 'February 2023 – February 2025',
      date: 'February 2023 – February 2025',
      title: 'Engineering Development Staff',
      org: 'Himpunan Mahasiswa Teknik Elektro (HIMATRO) Universitas Lampung',
      tag: 'HIMATRO',
      detail: 'Divisi Pengembangan Teknik yang merancang kurikulum pelatihan teknis, workshop elektronika, dan kompetisi robotika mahasiswa.',
    },
    {
      id: 'org-3',
      num: '3',
      year: 'May 2024 – Nov 2024',
      date: 'May 2024 – Nov 2024',
      title: 'Chief Executive – HIMATRO Research Class (HRC)',
      org: 'Himpunan Mahasiswa Teknik Elektro (HIMATRO)',
      subOrg: 'Universitas Lampung',
      tag: 'Leadership',
      detail: 'Bertanggung jawab penuh memimpin program riset tahunan, mengoordinasi 100+ peserta pelatihan karya tulis ilmiah, dan mentoring IoT.',
    },
    {
      id: 'org-4',
      num: '4',
      year: 'July 2024 – August 2024',
      date: 'July 2024 – August 2024',
      title: 'Krakatoa Papermob PKKMB Committee',
      org: 'BEM University of Lampung',
      subOrg: 'Universitas Lampung (BEM UNILA)',
      tag: 'Committee',
      detail: 'Berkontribusi aktif dalam konseptualisasi dan koreografi papermob terbesar tingkat universitas untuk menyambut mahasiswa baru.',
    },
  ];

  return (
    <section
      id="about"
      className="relative z-20 bg-transparent min-h-screen flex flex-col justify-center pt-12 sm:pt-16 pb-48 sm:pb-64 px-4 sm:px-8 lg:px-12 w-full overflow-hidden"
    >
      {/* ── Seamless cosmic fog transition from Home Mountain to Space ── */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none z-10" />

      {/* Ambient background glow */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* ── 1. HEADER: ABOUT ME & MARQUEE CAPSULE (Scroll-Reveal) ── */}
      <ScrollReveal delay={50} direction="up" className="flex flex-col items-center text-center mb-8 sm:mb-10 max-w-6xl mx-auto w-full">
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl text-white leading-none tracking-tight select-none"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          ABOUT ME
        </h1>

        {/* Subtitle badge: iOS 18 Frosted Glass Capsule (Kaca Transparan) */}
        <div className="mt-4 w-full max-w-3xl sm:max-w-4xl ios-glass py-2.5 sm:py-3 rounded-2xl overflow-hidden border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_32px_rgba(0,0,0,0.5)] select-none backdrop-blur-2xl bg-white/[0.07]">
          <div className="animate-marquee flex items-center">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="font-black uppercase text-xs sm:text-sm tracking-[0.22em] px-8 whitespace-nowrap flex items-center gap-6 text-white/90 drop-shadow-sm"
              >
                <span>FULL-STACK DEVELOPER AND SOFTWARE ENGINEER</span>
                <span className="text-emerald-400/60 font-normal">/</span>
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ── 2. 2-COLUMN LAYOUT: BIO & DRAGGABLE NAMETAG (Scroll-Reveal) ── */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* Left Column – Text Content */}
        <ScrollReveal delay={150} direction="left" className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
          {/* Typewriter Block */}
          <div className="flex flex-col gap-1">
            {/* Baris 1: HI, I'M */}
            <div className="min-h-[1.3em] flex items-center">
              <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-wider leading-none">
                {displayed1}
              </p>
              {displayed1.length < fullLine1.length && (
                <span className="inline-block w-1 sm:w-1.5 h-5 sm:h-7 bg-white animate-pulse ml-2" />
              )}
            </div>

            {/* Baris 2: MUHAMAD FATIH RIZQI */}
            <div className="min-h-[1.25em] flex items-center flex-wrap">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-400 leading-tight tracking-tight">
                {displayed2}
              </h2>
              {displayed1.length === fullLine1.length && (
                <span className="inline-block w-1.5 sm:w-2 h-7 sm:h-10 bg-emerald-400 animate-pulse ml-2.5" />
              )}
            </div>
          </div>

          {/* Bio Deskripsi (Rata Kiri-Kanan / Justify) */}
          <p className="text-xs sm:text-sm lg:text-base text-white/85 font-medium leading-relaxed max-w-xl text-justify">
            {isId
              ? 'Saya Muhamad Fatih Rizqi, seorang Full-Stack Developer dan Software Engineer yang memiliki passion dalam menciptakan solusi digital. Berpengalaman mengembangkan aplikasi web, sistem backend, dan IoT menggunakan berbagai teknologi seperti React, Node.js, Python, dan PostgreSQL. Saya senang bereksperimen, mempelajari teknologi baru, serta mengubah ide menjadi inovasi yang bermanfaat.'
              : 'I am Muhamad Fatih Rizqi, a Full-Stack Developer and Software Engineer passionate about crafting impactful digital solutions. Experienced in building web applications, backend systems, and IoT solutions using technologies such as React, Node.js, Python, and PostgreSQL. I love experimenting, learning new technologies, and turning ideas into meaningful innovations.'}
          </p>

          {/* View CV Button */}
          <div className="pt-1">
            <a
              href="https://drive.google.com/file/d/1MARApIXOrqbSHQVDDujWbFx60ksi9-cU/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 rounded-lg border border-white/30 text-white font-bold text-xs sm:text-sm uppercase tracking-wider
                         bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
            >
              {isId ? 'Lihat CV' : 'View CV'}
            </a>
          </div>
        </ScrollReveal>

        {/* Right Column – Nametag Bertali Kalung (Ngeleweran) Bisa Ditarik & Kembali ke Tempat Semula */}
        <ScrollReveal delay={250} direction="right" className="lg:col-span-5 flex flex-col items-center justify-start relative min-h-[430px] sm:min-h-[450px] select-none pt-4">
          <div className="relative w-full flex flex-col items-center">

            {/* 1. Dua Titik Gantungan Kalung di Atas */}
            <div className="w-24 flex items-center justify-between z-30">
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-700 shadow-lg border border-neutral-400" />
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-700 shadow-lg border border-neutral-400" />
            </div>

            {/* 2. SVG Tali Kalung Lanyard Melengkung Elastis (Selalu Tergantung & Mengikuti Tarikan) */}
            <svg
              className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[400px] h-[550px] pointer-events-none overflow-visible z-10"
              style={{ transform: 'translateX(-200px)' }}
            >
              <defs>
                <linearGradient id="lanyardRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#09090b" />
                  <stop offset="35%" stopColor="#18181b" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="65%" stopColor="#18181b" />
                  <stop offset="100%" stopColor="#09090b" />
                </linearGradient>
                <linearGradient id="metalClipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f4f4f5" />
                  <stop offset="50%" stopColor="#a1a1aa" />
                  <stop offset="100%" stopColor="#52525b" />
                </linearGradient>
              </defs>

              {/* Tali Kalung Kiri (melengkung ke bawah saat ngeleweran) */}
              <path
                d={`M 158 0 Q ${(158 + clipX) / 2 - 14} ${clipY * 0.65} ${clipX - 3} ${clipY - 10}`}
                fill="none"
                stroke="#18181b"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d={`M 158 0 Q ${(158 + clipX) / 2 - 14} ${clipY * 0.65} ${clipX - 3} ${clipY - 10}`}
                fill="none"
                stroke="#34d399"
                strokeWidth="2"
                strokeDasharray="4 3"
                opacity="0.85"
              />

              {/* Tali Kalung Kanan (melengkung simetris ke bawah saat ngeleweran) */}
              <path
                d={`M 242 0 Q ${(242 + clipX) / 2 + 14} ${clipY * 0.65} ${clipX + 3} ${clipY - 10}`}
                fill="none"
                stroke="#18181b"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d={`M 242 0 Q ${(242 + clipX) / 2 + 14} ${clipY * 0.65} ${clipX + 3} ${clipY - 10}`}
                fill="none"
                stroke="#34d399"
                strokeWidth="2"
                strokeDasharray="4 3"
                opacity="0.85"
              />

              {/* Cincin Logam Swivel */}
              <circle
                cx={clipX}
                cy={clipY - 9}
                r="5.5"
                fill="none"
                stroke="url(#metalClipGrad)"
                strokeWidth="2.6"
              />

              {/* Klip Logam Penjepit Kartu */}
              <rect
                x={clipX - 7}
                y={clipY - 4}
                width="14"
                height="9"
                rx="2.5"
                fill="url(#metalClipGrad)"
                stroke="#71717a"
                strokeWidth="0.9"
              />
            </svg>

            {/* 3. Kartu Nametag yang Bisa Ditarik Kemana-Mana & Memantul Kembali */}
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{
                transform: `translate3d(${pos.x}px, ${defaultCardY + pos.y}px, 0) rotate(${tilt}deg)`,
                touchAction: 'none',
              }}
              className={`absolute top-0 flex flex-col items-center cursor-grab active:cursor-grabbing select-none z-20 ${
                !isDragging && pos.x === 0 && pos.y === 0 ? 'animate-nametag-sway' : ''
              }`}
            >
              <div className="relative group w-[185px] sm:w-[215px] md:w-[230px] rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.8)] border border-white/15 bg-black">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/10 rounded-2xl blur-lg pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300" />
                <img
                  src={aboutPhoto}
                  alt="Muhamad Fatih Rizqi – Nametag"
                  className="w-full h-auto object-cover select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ── 3. SECTION DIVIDER & TRANSITION (Scroll-Reveal) ── */}
      <ScrollReveal delay={80} direction="up" className="w-full max-w-6xl mx-auto mt-8 sm:mt-12 pt-6">
        <div className="relative flex items-center justify-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
          <div className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
        </div>
      </ScrollReveal>

      {/* ── 4. BAGIAN EDUCATION, ORGANIZATION & EXPERIENCE DENGAN FLOWCHART TIMELINE ── */}
      <div className="w-full max-w-6xl mx-auto mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

          {/* ═══════════ KOLOM KIRI: EDUCATION & ORGANIZATION ═══════════ */}
          <div className="flex flex-col gap-10">

            {/* ── 4A. EDUCATION ── */}
            <div className="flex flex-col gap-4">
              <ScrollReveal delay={50} direction="up">
                <h3 className="font-anton text-2xl sm:text-3xl text-white tracking-wide flex items-center gap-3">
                  <span>{isId ? 'PENDIDIKAN' : 'EDUCATION'}</span>
                  <span className="w-8 h-[2px] bg-gradient-to-r from-emerald-400 to-transparent" />
                </h3>
              </ScrollReveal>

              {/* Education Card (iOS 18 Glass) */}
              <ScrollReveal delay={120} direction="up">
                <div
                  onClick={() => toggleCard('edu')}
                  className={`ios-glass-interactive rounded-2xl p-4 sm:p-5 flex items-start gap-4 transition-all duration-300 cursor-pointer active:scale-[0.98] ${
                    activeCard === 'edu'
                      ? 'border-emerald-400/50 bg-white/[0.08] shadow-[0_0_30px_rgba(52,211,153,0.2)]'
                      : ''
                  }`}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full ios-glass-pill flex items-center justify-center font-bold text-sm sm:text-base text-white/90 shadow-md border border-white/20 shrink-0">
                    1
                  </div>

                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/95 border border-white/40 flex items-center justify-center p-1 shadow-sm overflow-hidden shrink-0">
                        <img
                          src={logoUnila}
                          alt="Logo Universitas Lampung"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-black text-emerald-400 font-mono">
                          2022 – 2026
                        </span>
                        <span className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                          {isId ? 'Lulusan Baru' : 'Freshgraduate'}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
                      Universitas Lampung
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-teal-300">
                      {isId ? 'S1 Teknik Elektro' : 'Bachelor of Electrical Engineering'}
                    </p>
                    <p className="text-xs text-white/60">
                      {isId ? 'Fakultas Teknik' : 'Faculty of Engineering'}
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs font-bold px-3 py-1 rounded-lg bg-white/10 text-emerald-300 border border-white/15">
                        {isId ? 'IPK 3.53 / 4.00' : 'GPA 3.53 / 4.00'}
                      </span>
                    </div>

                    {activeCard === 'edu' && (
                      <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/75 leading-relaxed animate-fadeIn">
                        {isId
                          ? 'Fokus pada sistem kontrol, telekomunikasi digital, perancangan sirkuit perangkat keras, serta rekayasa perangkat lunak modern.'
                          : 'Focused on control systems, digital telecommunications, hardware circuit design, and modern software engineering.'}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* ── 4B. ORGANIZATION (Flowcard Bergaris dengan Titik Menyala) ── */}
            <div className="flex flex-col gap-4">
              <ScrollReveal delay={50} direction="up">
                <div className="flex items-center justify-between">
                  <h3 className="font-anton text-2xl sm:text-3xl text-white tracking-wide flex items-center gap-3">
                    <span>{isId ? 'ORGANISASI' : 'ORGANIZATION'}</span>
                    <span className="w-8 h-[2px] bg-gradient-to-r from-emerald-400 to-transparent" />
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400/80 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                    2023 – 2025
                  </span>
                </div>
              </ScrollReveal>

              {/* Komponen Flowchart Organization */}
              <FlowchartTimeline
                items={organizations}
                activeCard={activeCard}
                toggleCard={toggleCard}
              />
            </div>

          </div>

          {/* ═══════════ KOLOM KANAN: EXPERIENCE ═══════════ */}
          <div className="flex flex-col gap-4">
            <ScrollReveal delay={50} direction="up">
              <div className="flex items-center justify-between">
                <h3 className="font-anton text-2xl sm:text-3xl text-white tracking-wide flex items-center gap-3">
                  <span>{isId ? 'PENGALAMAN' : 'EXPERIENCE'}</span>
                  <span className="w-8 h-[2px] bg-gradient-to-r from-teal-400 to-transparent" />
                </h3>
                <span className="text-[11px] font-mono text-cyan-400/80 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                  2023 – 2026
                </span>
              </div>
            </ScrollReveal>

            {/* Komponen Flowchart Experience */}
            <FlowchartTimeline
              items={experiences}
              activeCard={activeCard}
              toggleCard={toggleCard}
            />
          </div>

        </div>

        {/* ── 5. TECH STACK & FOLDERS SECTION (iOS 18 Liquid Glass & Scroll-Reveal) ── */}
        <div className="w-full max-w-6xl mx-auto mt-20 sm:mt-28">
          {/* Section Header */}
          <ScrollReveal delay={50} direction="up" className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3">
              <h3 className="font-anton text-3xl sm:text-4xl text-white tracking-wide flex items-center gap-3">
                <span>{isId ? 'TEKNOLOGI & TOOLS' : 'TECH STACK'}</span>
                <span className="w-12 sm:w-20 h-[2px] bg-gradient-to-r from-emerald-400 to-transparent" />
              </h3>
            </div>
          </ScrollReveal>

          {/* 2-Column Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* ── Left Column: Tech Stack Cards (7 cols) ── */}
            <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5">
              {/* 1. Main Tech Stack (Languages, Databases, Frameworks) */}
              <ScrollReveal delay={100} direction="up">
                <div className="group relative rounded-3xl p-4 sm:p-6 bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/[0.07] hover:shadow-[0_16px_40px_rgba(16,185,129,0.15)] flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
                  <img
                    src={techStackMain}
                    alt="Programming Languages, Frameworks, and Databases"
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </ScrollReveal>

              {/* 2. Sub-Row: Tools & AI (2 Cards side by side) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Tools Card */}
                <ScrollReveal delay={200} direction="up">
                  <div className="group relative rounded-3xl p-4 sm:p-5 bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/[0.07] hover:shadow-[0_16px_40px_rgba(6,182,212,0.15)] h-full flex items-center justify-center min-h-[140px] sm:min-h-[160px]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
                    <img
                      src={techTools}
                      alt="Developer Tools & Software"
                      className="w-full max-h-32 sm:max-h-36 h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </ScrollReveal>

                {/* AI Technologies Card */}
                <ScrollReveal delay={300} direction="up">
                  <div className="group relative rounded-3xl p-4 sm:p-5 bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-purple-400/40 hover:bg-white/[0.07] hover:shadow-[0_16px_40px_rgba(168,85,247,0.15)] h-full flex items-center justify-center min-h-[140px] sm:min-h-[160px]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
                    <img
                      src={techAi}
                      alt="Artificial Intelligence Models"
                      className="w-3/4 max-h-20 sm:max-h-24 h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* ── Right Column: 3 Interactive Glass Folder Cards (5 cols) ── */}
            <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8 justify-center">
              {/* Top Row: 4 PROJECTS & 14 LISENSI DAN SERTIFIKASI */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                
                {/* Card 1: 5 PROYEK */}
                <ScrollReveal delay={150} direction="up">
                  <InteractiveFolderCard
                    type="projects"
                    number="5"
                    title={isId ? 'PROYEK' : 'PROJECTS'}
                    onClick={() => {
                      if (onOpenPortfolio) onOpenPortfolio('projects');
                      else {
                        const el = document.getElementById('portfolio');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  />
                </ScrollReveal>

                {/* Card 2: 14 LISENSI DAN SERTIFIKASI */}
                <ScrollReveal delay={250} direction="up">
                  <InteractiveFolderCard
                    type="certificates"
                    number="14"
                    title={isId ? 'LISENSI DAN SERTIFIKASI' : 'LICENSES & CERTIFICATIONS'}
                    onClick={() => {
                      if (onOpenPortfolio) onOpenPortfolio('sertificate');
                      else {
                        const el = document.getElementById('portfolio');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  />
                </ScrollReveal>

              </div>

              {/* Bottom Row: GALERI AKTIVITAS (Centered with EXACT SAME SIZE as Card 1 & 2) */}
              <div className="flex justify-center">
                <ScrollReveal delay={350} direction="up" className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)]">
                  <InteractiveFolderCard
                    type="gallery"
                    title={isId ? 'GALERI AKTIVITAS' : 'ACTIVITY GALLERY'}
                    onClick={() => {
                      if (onOpenPortfolio) onOpenPortfolio('galery');
                      else {
                        const el = document.getElementById('portfolio');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  />
                </ScrollReveal>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
