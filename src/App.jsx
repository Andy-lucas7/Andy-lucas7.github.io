import React, { useEffect, useState } from 'react';
import PixelSea from './components/react-bits/PixelSea';
import DockNav from './components/react-bits/DockNav';
import ProfileLauncher from './components/sections/ProfileLauncher';
import HeroSection from './components/sections/HeroSection';
import ProjectsBento from './components/sections/ProjectsBento';
import TechStack from './components/sections/TechStack';
import ContactFooter from './components/sections/ContactFooter';

const ENTRANCE_MS = 900;

export default function App() {
  const [showEntranceOverlay, setShowEntranceOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowEntranceOverlay(false), ENTRANCE_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="portfolio-app">
      {/* Fade / blur de entrada (desmontado após o término para liberar a camada da GPU) */}
      {showEntranceOverlay && <div className="entrance-fade-overlay" aria-hidden="true" />}

      {/* Mar de Pixels em Ondas (baseado na arquitetura da classe Pixel do React Bits) */}
      <PixelSea gap={20} colors="#ffffff,#00f0ff,#a855f7,#7dd3fc" />

      <ProfileLauncher />
      <DockNav />

      <main className="portfolio-main">
        <HeroSection />
        <ProjectsBento />
        <TechStack />
        <ContactFooter />
      </main>
    </div>
  );
}
