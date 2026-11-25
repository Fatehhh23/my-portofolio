import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import PortfolioSection from './components/PortfolioSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SpaceBackground from './components/SpaceBackground';

export default function App() {
  const [portfolioTab, setPortfolioTab] = useState('projects');
  const [activeSection, setActiveSection] = useState('home');
  const [lang, setLang] = useState('id'); // Default Bahasa Indonesia

  // Open portfolio with a specific tab (triggered by About folder cards)
  const handleOpenPortfolio = (tab = 'projects') => {
    setPortfolioTab(tab);
    const el = document.getElementById('portfolio');
    if (el) {
      const navOffset = 60;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = sectionId === 'portfolio' ? 60 : 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  // Auto-detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection('home');
        return;
      }

      const sections = ['contact', 'portfolio', 'portfolio-portal', 'about', 'home'];
      const triggerY = window.innerHeight * 0.35;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY && rect.bottom > triggerY) {
            setActiveSection(id === 'portfolio-portal' ? 'portfolio' : id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-clip">
      {/* Animated Glowing Interactive Custom Cursor */}
      <CustomCursor />

      {/* Floating iOS 18 Dynamic Glass Island Navbar (Constant across all sections) */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        lang={lang}
        onLangChange={setLang}
      />

      {/* Hero Section (Home) */}
      <Hero onNavigate={handleNavigate} lang={lang} />

      {/* Space & Starfield Ambient Container */}
      <div className="relative z-10 bg-gradient-to-b from-[#02040a] via-[#05081b] to-[#010206] overflow-x-clip">
        <SpaceBackground />

        {/* About Section (with 3 clickable folder cards) */}
        <About
          onNavigate={handleNavigate}
          onOpenPortfolio={handleOpenPortfolio}
          lang={lang}
        />

        {/* Atmosphere Portal + Cloud Portfolio Page */}
        <PortfolioSection
          activeTab={portfolioTab}
          onTabChange={setPortfolioTab}
          lang={lang}
        />

        {/* Contact Section (Mount Rinjani BG) */}
        <Contact lang={lang} />

        {/* Glass Footer */}
        <Footer onNavigate={handleNavigate} lang={lang} />
      </div>
    </div>
  );
}
