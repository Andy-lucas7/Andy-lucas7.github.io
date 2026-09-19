import React from 'react';
import { ArrowRight, Sparkles, PhoneCall, ChevronDown, Mouse } from 'lucide-react';
import DecryptedText from '../react-bits/DecryptedText';
import ShinyText from '../react-bits/ShinyText';
import FluidGlassButton from '../react-bits/FluidGlassButton';
import { portfolioData } from '../../data/portfolioData';

export default function HeroSection() {
  const { personal } = portfolioData;



  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '7rem', paddingBottom: '3rem', position: 'relative' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>

        {/* Pílula de Vidro Superior (Estilo Imagem 3: • Crafting Unique Brand Identities) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.45rem 1.25rem',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(16px) saturate(180%)',
              WebkitBackdropFilter: 'blur(16px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 8px 24px rgba(0, 0, 0, 0.6)',
              fontSize: '0.82rem',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
            <DecryptedText
              text={personal.role}
              speed={30}
              triggerOnHover={true}
            />
          </div>
        </div>

        {/* Título Principal */}
        <h1 style={{
          fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
          lineHeight: 1.06,
          marginBottom: '1.75rem',
          fontWeight: 800,
          letterSpacing: '-0.04em'
        }}>
          Construindo Sistemas <br />
          <ShinyText text="Modernos e Escaláveis" speed={9} />
        </h1>

        {/* Subtítulo Minimalista */}
        <p style={{
          fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
          maxWidth: '620px',
          margin: '0 auto 3rem auto',
          color: 'var(--text-secondary)',
          lineHeight: 1.6
        }}>
          {personal.bio}
        </p>

        {/* Botões Centrais */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center', alignItems: 'center', marginBottom: '2.5rem' }}>
          <a href="#contact" className="hero-contact-button">
            <span className="btn-text">Entrar em Contato</span>
            <PhoneCall size={20} className="btn-icon" />
          </a>

          <FluidGlassButton
            href="#projects"
            icon={ArrowRight}
          >
            Ver Projetos
          </FluidGlassButton>
        </div>

        {/* Indicador de Rolagem (Estilo Imagem 3: Scroll down to see projects) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          marginBottom: '3.5rem'
        }}>
          <span>Rolar para baixo</span>
          <div style={{
            width: '24px',
            height: '36px',
            borderRadius: '12px',
            border: '1.5px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '6px'
          }}>
            <div style={{
              width: '3px',
              height: '8px',
              borderRadius: '2px',
              background: '#ffffff',
              animation: 'scrollBob 1.8s infinite ease-in-out'
            }} />
          </div>
          <span>para ver projetos</span>
        </div>

        <style>{`
          @keyframes scrollBob {
            0%, 100% { transform: translateY(0); opacity: 0.9; }
            50% { transform: translateY(10px); opacity: 0.2; }
          }
        `}</style>



      </div>
    </section>
  );
}
