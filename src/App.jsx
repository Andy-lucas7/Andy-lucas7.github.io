import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelSea from './components/react-bits/PixelSea';

import DockNav from './components/react-bits/DockNav';
import GlassSurface from './components/react-bits/GlassSurface';
import ProfileCard from './components/react-bits/ProfileCard';

import HeroSection from './components/sections/HeroSection';
import ProjectsBento from './components/sections/ProjectsBento';
import TechStack from './components/sections/TechStack';

import ContactFooter from './components/sections/ContactFooter';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'tech', 'playground', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="portfolio-app" style={{ minHeight: '100vh', position: 'relative', backgroundColor: '#030305' }}>
      {/* Efeito de Fade / Fade Blur de Entrada Suave (sem interferir nos componentes filhos) */}
      <div className="entrance-fade-overlay" aria-hidden="true" />

      {/* Mar de Pixels em Ondas (Baseado na arquitetura da classe Pixel do React Bits) */}
      <PixelSea 
        gap={20}
        speed={0.0014}
        colors="#ffffff,#00f0ff,#a855f7,#7dd3fc"
      />

      {/* Nome no Canto Superior Esquerdo */}
      <div style={{ position: 'fixed', top: '1.5rem', left: '1.5rem', zIndex: 1000 }}>
        <AnimatePresence>
          {!showProfile && (
            <motion.div
              layoutId="profile-widget"
              onClick={() => setShowProfile(true)}
              style={{ cursor: 'pointer', borderRadius: '50px', overflow: 'hidden' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <GlassSurface width="auto" height={44} borderRadius={50} style={{ padding: '0 1rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: '#ffffff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.92rem' }}>
                  <img src="/avatar.jpg" alt="Lucas Andrey" style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(255, 255, 255, 0.2)' }} />
                  <span>Lucas Andrey</span>
                </span>
              </GlassSurface>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal ProfileCard */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setShowProfile(false)}
          >
            <motion.div 
              layoutId="profile-widget"
              onClick={(e) => e.stopPropagation()} 
              style={{ position: 'relative', borderRadius: '24px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowProfile(false)}
                style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '0',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                &times;
              </motion.button>
              <ProfileCard
                name="Lucas Andrey"
                title="Full Stack / Data Eng."
                handle="Andy-lucas7"
                status="Trabalhando na Natura"
                contactText="Falar Comigo"
                avatarUrl="/avatar.jpg"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={true}
                onContactClick={() => {
                  setShowProfile(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barra de Navegação Dock Flutuante Inferior */}
      <DockNav activeSection={activeSection} />

      {/* Conteúdo Principal do Portfólio */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection />
        <ProjectsBento />
        <TechStack />

        <ContactFooter />
      </main>
    </div>
  );
}
