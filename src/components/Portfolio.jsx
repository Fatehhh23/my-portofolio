import React, { useState } from 'react';
import { Layers, ArrowUpRight, ExternalLink, Sparkles, Eye } from 'lucide-react';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('Semua');

  const categories = ['Semua', 'Web Application', 'UI/UX Design', 'Creative Web'];

  const projects = [
    {
      id: 1,
      title: 'Rinjani Adventure Experience',
      category: 'Creative Web',
      desc: 'Website eksplorasi alam dengan multi-layer visual depth, transparansi background 65%, pepohonan 55%, dan scroll paralaks interaktif.',
      gradient: 'from-emerald-950/80 via-zinc-900/90 to-teal-950/80',
      accentColor: 'from-emerald-400 to-teal-300',
      tags: ['React.js', 'Tailwind CSS', 'Parallax Scroll', 'Anton Font'],
      stats: '60 FPS Motion',
    },
    {
      id: 2,
      title: 'iOS 18 Liquid Glass Dashboard',
      category: 'UI/UX Design',
      desc: 'Sistem dasbor analitik berbasis frosted glassmorphism dengan specular highlight, kartu bento interaktif, dan kontrol widget cerdas.',
      gradient: 'from-blue-950/80 via-zinc-900/90 to-indigo-950/80',
      accentColor: 'from-cyan-400 to-blue-300',
      tags: ['Figma UI/UX', 'Glassmorphism', 'Design System', 'iOS 18 HIG'],
      stats: 'Bento Grid',
    },
    {
      id: 3,
      title: 'Brutalist Creative Agency',
      category: 'Web Application',
      desc: 'Platform portfolio agensi dengan tipografi skala masif, tata letak grid asimetris, dan kontras monokrom tajam berenergi tinggi.',
      gradient: 'from-purple-950/80 via-zinc-900/90 to-zinc-900/90',
      accentColor: 'from-purple-400 to-pink-300',
      tags: ['React 18', 'Tailwind', 'Brutalism', 'Vite'],
      stats: 'High Contrast',
    },
    {
      id: 4,
      title: 'Lumina Smart Home Ecosystem',
      category: 'UI/UX Design',
      desc: 'Konsep antarmuka aplikasi mobile pengendali rumah pintar dengan efek kaca buram dinamis yang beradaptasi terhadap waktu dan pencahayaan.',
      gradient: 'from-amber-950/70 via-zinc-900/90 to-orange-950/70',
      accentColor: 'from-amber-400 to-orange-300',
      tags: ['Mobile UI', 'Prototyping', 'Fluid Motion', 'Figma'],
      stats: 'Dynamic Lighting',
    },
    {
      id: 5,
      title: 'Apex SaaS Analytics Suite',
      category: 'Web Application',
      desc: 'Aplikasi web manajemen finansial real-time dengan grafik interaktif, modal kaca transparan, dan filter metrik multi-dimensi.',
      gradient: 'from-teal-950/80 via-zinc-900/90 to-cyan-950/80',
      accentColor: 'from-teal-400 to-emerald-300',
      tags: ['React Hooks', 'Chart Integration', 'Tailwind CSS', 'Modular'],
      stats: 'Real-time Metrics',
    },
    {
      id: 6,
      title: 'Chronos Digital Watch Studio',
      category: 'Creative Web',
      desc: 'Katalog pameran arloji digital premium dengan interaksi 3D visual preview, micro-animations, dan tata letak minimalis kontemporer.',
      gradient: 'from-rose-950/70 via-zinc-900/90 to-zinc-900/90',
      accentColor: 'from-rose-400 to-red-300',
      tags: ['Creative Direction', 'React.js', 'Smooth Scroll', 'Modern Web'],
      stats: 'Interactive 3D',
    },
  ];

  const filteredProjects = activeFilter === 'Semua' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="relative z-20 bg-transparent py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Refraction Orbs */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ios-glass-pill mb-4">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-bold tracking-widest uppercase text-white/90">
            Karya Terpilih • Portfolio
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Eksplorasi Karya <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-400">Kaca Transparan</span>
        </h2>
        <p className="mt-4 text-white/60 max-w-2xl text-sm sm:text-base leading-relaxed">
          Koleksi proyek desain UI/UX, eksplorasi antarmuka digital, dan aplikasi web yang dirancang dengan presisi visual tingkat tinggi.
        </p>

        {/* iOS 18 Segmented Filter Controls */}
        <div className="mt-8 p-1.5 rounded-full ios-glass-pill inline-flex items-center gap-1 max-w-full overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${
                  isActive
                    ? 'ios-glass-pill-active text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of iOS 18 Glass Portfolio Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="ios-glass-interactive rounded-[2rem] overflow-hidden flex flex-col justify-between group"
          >
            {/* Project Preview Window with Glass Reflections */}
            <div className={`h-56 bg-gradient-to-br ${project.gradient} p-6 relative flex flex-col justify-between overflow-hidden border-b border-white/10`}>
              {/* Internal Glass Reflection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />

              {/* Top Row: Category Chip & Stat Pill */}
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 border border-white/20">
                  {project.category}
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-white/75 border border-white/15">
                  {project.stats}
                </span>
              </div>

              {/* Center Artistic Number / Decorative Element */}
              <div className="flex items-center justify-center my-auto relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                  <span className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br ${project.accentColor}`}>
                    0{project.id}
                  </span>
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="flex items-center justify-between relative z-10">
                <span className="text-xs text-white/40 font-mono">Muhamad Fatih Rizqi</span>
                <div className="w-2 h-2 rounded-full bg-emerald-400/80 animate-pulse" />
              </div>
            </div>

            {/* Project Details Content */}
            <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-white/65 leading-relaxed">
                  {project.desc}
                </p>

                {/* Tech Tags in Mini Glass Capsules */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/[0.04] text-white/80 border border-white/10 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-white/60 group-hover:text-white transition-colors">
                  Detail Proyek
                </span>
                <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-200 group-hover:scale-110">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
