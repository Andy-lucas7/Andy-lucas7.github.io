import React, { useEffect, useState } from 'react';
import { Home, Briefcase, Cpu, Mail } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import GlassSurface from './GlassSurface';
import { sections } from '../../data/portfolioData';
import { useActiveSection } from '../../hooks/useActiveSection';

const SECTION_ICONS = { hero: Home, projects: Briefcase, tech: Cpu, contact: Mail };
const SECTION_IDS = sections.map((s) => s.id);
const SHOW_AFTER_PX = 300;

const NAV_ITEMS = [
  ...sections.map((s) => ({ id: s.id, label: s.label, icon: SECTION_ICONS[s.id], href: `#${s.id}` })),
  { id: 'github', label: 'GitHub', icon: GithubIcon, href: 'https://github.com/Andy-lucas7', external: true }
];

function scrollToHash(e, href) {
  const target = document.querySelector(href);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth' });
}

/**
 * DockNav - Barra de Navegação Inferior utilizando estritamente o componente <GlassSurface /> do React Bits.
 * A seção ativa vem de um IntersectionObserver e a visibilidade de um listener de
 * scroll passivo agrupado por frame: nenhum dos dois força layout.
 */
export default function DockNav() {
  const activeSection = useActiveSection(SECTION_IDS);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setIsVisible(window.scrollY > SHOW_AFTER_PX);
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav className={`dock-container ${isVisible ? 'is-visible' : ''}`} aria-label="Navegação Principal">
      <GlassSurface width="auto" height={54} borderRadius={50} style={{ padding: '0 0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {NAV_ITEMS.map(({ id, label, icon: Icon, href, external }) => (
            <a
              key={id}
              href={href}
              onClick={external ? undefined : (e) => scrollToHash(e, href)}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className={`dock-item ${activeSection === id ? 'active' : ''}`}
              aria-label={label}
              aria-current={activeSection === id ? 'true' : undefined}
            >
              <Icon size={18} />
              <span className="dock-tooltip">{label}</span>
            </a>
          ))}
        </div>
      </GlassSurface>
    </nav>
  );
}
