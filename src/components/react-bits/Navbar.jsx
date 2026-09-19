import React from 'react';
import GlassSurface from './GlassSurface';
import FluidGlassButton from './FluidGlassButton';

/**
 * Navbar - Barra superior utilizando estritamente o componente <GlassSurface /> do React Bits
 */
export default function Navbar() {
  const navLinks = [
    { label: 'Início', href: '#hero' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Tecnologias', href: '#tech' },

    { label: 'Contato', href: '#contact' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: '1.25rem',
        left: 0,
        width: '100%',
        zIndex: 1000,
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pointerEvents: 'none'
      }}
    >
      {/* Logo com GlassSurface */}
      <div style={{ pointerEvents: 'auto' }}>
        <a href="#hero" style={{ textDecoration: 'none' }}>
          <GlassSurface width="auto" height={44} borderRadius={50} style={{ padding: '0 1rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: '#ffffff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.92rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00f0ff' }} />
              <span>Lucas Andrey</span>
            </span>
          </GlassSurface>
        </a>
      </div>

      {/* Menu Central Desktop com GlassSurface */}
      <div className="desktop-navbar" style={{ pointerEvents: 'auto', display: 'none' }}>
        <style>{`
          @media (min-width: 768px) {
            .desktop-navbar { display: block !important; }
          }
        `}</style>
        <GlassSurface width="auto" height={44} borderRadius={50} style={{ padding: '0 0.5rem' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  color: 'rgba(255, 255, 255, 0.75)',
                  textDecoration: 'none'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </GlassSurface>
      </div>

      {/* Ações da Direita com GlassSurface */}
      <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <FluidGlassButton href="#contact">
          Contato
        </FluidGlassButton>
      </div>
    </header>
  );
}
