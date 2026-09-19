import React from 'react';
import { Home, Briefcase, Cpu, Sliders, Mail } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import GlassSurface from './GlassSurface';

/**
 * DockNav - Barra de Navegação Inferior utilizando estritamente o componente <GlassSurface /> do React Bits
 */
export default function DockNav({ activeSection = 'hero' }) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show navbar if scrolled past the hero screen (around 300px)
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Início', icon: Home, href: '#hero' },
    { id: 'projects', label: 'Projetos', icon: Briefcase, href: '#projects' },
    { id: 'tech', label: 'Tecnologias', icon: Cpu, href: '#tech' },

    { id: 'contact', label: 'Contato', icon: Mail, href: '#contact' },
    { id: 'github', label: 'GitHub', icon: GithubIcon, href: 'https://github.com/Andy-lucas7', external: true }
  ];

  const handleItemClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className="dock-container"
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: isVisible ? 'translate(-50%, 0)' : 'translate(-50%, 100px)',
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 9999,
        userSelect: 'none'
      }}
      aria-label="Navegação Principal"
    >
      <GlassSurface
        width="auto"
        height={54}
        borderRadius={50}
        style={{ padding: '0 0.5rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => !item.external && handleItemClick(e, item.href)}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className={`dock-item ${isActive ? 'active' : ''}`}
                aria-label={item.label}
              >
                <Icon size={18} />
                <span className="dock-tooltip">{item.label}</span>
              </a>
            );
          })}
        </div>
      </GlassSurface>
    </nav>
  );
}
