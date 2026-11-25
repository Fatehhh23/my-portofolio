import React from 'react';

export default function Navbar({ activeSection, onNavigate, lang = 'id', onLangChange }) {
  const navItems = [
    { id: 'home',      label: lang === 'id' ? 'Beranda'    : 'Home'      },
    { id: 'about',     label: lang === 'id' ? 'Tentang'    : 'About'     },
    { id: 'portfolio', label: lang === 'id' ? 'Portofolio' : 'Portfolio' },
    { id: 'contact',   label: lang === 'id' ? 'Kontak'     : 'Contact'   },
  ];

  return (
    <nav className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[96vw]">
      {/* Single pill: nav items + divider + lang toggle */}
      <div className="flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 rounded-full bg-slate-900/55 backdrop-blur-2xl border border-white/25 shadow-[0_12px_32px_rgba(15,23,42,0.28),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-300">

        {/* Nav links */}
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative px-2 sm:px-4 py-1.5 rounded-full text-[10.5px] sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
                isActive
                  ? 'bg-white/25 text-white border border-white/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]'
                  : 'text-white/85 hover:text-white hover:bg-white/15'
              }`}
            >
              {item.label}
            </button>
          );
        })}

        {/* Divider */}
        <div className="w-px h-3.5 sm:h-4 bg-white/20 mx-0.5 sm:mx-1 flex-shrink-0" />

        {/* Language toggle */}
        <div className="flex items-center gap-0.5">
          {['id', 'en'].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => onLangChange && onLangChange(l)}
              className={`px-1.5 sm:px-2.5 py-1 rounded-full text-[9.5px] sm:text-xs font-bold tracking-wider transition-all cursor-pointer select-none ${
                lang === l
                  ? 'bg-white/25 text-white border border-white/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
