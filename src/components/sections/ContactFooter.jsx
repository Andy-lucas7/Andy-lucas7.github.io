import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/SocialIcons';
import GhostFibers from '../react-bits/GhostFibers';
import FluidGlassButton from '../react-bits/FluidGlassButton';
import ShinyText from '../react-bits/ShinyText';
import { portfolioData } from '../../data/portfolioData';

export default function ContactFooter() {
  const { personal, socialLinks } = portfolioData;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Github': return GithubIcon;
      case 'Linkedin': return LinkedinIcon;
      case 'Twitter': return TwitterIcon;
      default: return Mail;
    }
  };

  return (
    <footer id="contact" style={{ padding: '6rem 0 7rem 0', position: 'relative' }}>
      <div className="container">

        {/* Card Principal de Contato */}
        <div style={{
          position: 'relative',
          textAlign: 'center',
          padding: '4rem 1.5rem',
          marginBottom: '4rem',
          borderRadius: '32px',
          background: '#030305',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          overflow: 'hidden'
        }}>
          {/* Efeito GhostFibers no Background */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <GhostFibers />
          </div>
          {/* Blur de gelo leve sobre os GhostFibers */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.03)' }} />

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '650px', margin: '0 auto' }}>
            <span style={{
              display: 'inline-block',
              fontSize: '0.82rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--accent-cyan)',
              fontWeight: 600,
              marginBottom: '1rem',
              textShadow: '0 0 10px rgba(0, 240, 255, 0.5)'
            }}>
              Pronto para o Próximo Nível
            </span>

            <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', color: '#fff', marginBottom: '1.25rem'}}>
              <ShinyText text="Vamos Criar Algo Extraordinário?" speed={9} />
            </h2>

            <p style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '2.5rem', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
              Seja para um novo projeto de engenharia de dados, desenvolvimento full stack ou sistemas de alta performance, estou à disposição para colaborar.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <FluidGlassButton
                href={socialLinks.find(l => l.name === 'Email')?.url || "#"}
                variant="primary"
                icon={Mail}
              >
                Iniciar Conversa por E-mail
              </FluidGlassButton>

              <FluidGlassButton
                href={socialLinks.find(l => l.name === 'GitHub')?.url || "#"}
                variant="secondary"
                icon={ArrowUpRight}
              >
                Explorar Código no GitHub
              </FluidGlassButton>
            </div>
          </div>
        </div>

        {/* Rodapé e Links Sociais */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '2.5rem'
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>
              {personal.name} <span style={{ color: 'var(--accent-cyan)' }}>/</span> Portfolio
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              © {new Date().getFullYear()} • Portfólio de {personal.name}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {socialLinks.map((link, idx) => {
              const Icon = getIcon(link.icon);
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.09)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00f0ff';
                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </footer>
  );
}
