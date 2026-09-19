import React from 'react';
import { ExternalLink, Layers, Sparkles } from 'lucide-react';
import PixelCard from '../react-bits/PixelCard';
import FluidGlassButton from '../react-bits/FluidGlassButton';
import { portfolioData } from '../../data/portfolioData';

export default function ProjectsBento() {
  const { projects } = portfolioData;

  const getVariantData = (idx) => {
    switch (idx) {
      case 0: return { variant: 'green', badgeColor: '#22c55e' };
      case 1: return { variant: 'blue', badgeColor: '#38bdf8' };
      case 2: return { variant: 'indigo', badgeColor: '#818cf8' };
      default: return { variant: 'default', badgeColor: '#00f0ff' };
    }
  };

  return (
    <section id="projects" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Cabeçalho da Seção */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            <Layers size={16} /> Projetos & Componentes
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '1rem' }}>
            Meus Projetos
          </h2>
          <p style={{ maxWidth: '580px', margin: '0 auto', color: 'var(--text-secondary)' }}>
            Aqui estão alguns dos principais projetos em que trabalhei.
          </p>
        </div>

        {/* Grid de Projetos com PixelCard do React Bits */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {projects.map((project, idx) => {
            const { variant, badgeColor } = getVariantData(idx);

            return (
              <PixelCard
                key={project.id}
                variant={variant}
                speed={45}
                gap={7}
                style={{
                  minHeight: '380px',
                  borderRadius: '24px'
                }}
              >
                {/* Linha superior: Métrica e Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontFamily: 'var(--font-mono)', 
                    padding: '0.25rem 0.6rem', 
                    borderRadius: '6px', 
                    background: 'rgba(255, 255, 255, 0.06)', 
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff' 
                  }}>
                    {project.metrics}
                  </span>
                  {project.featured && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: badgeColor, fontWeight: 600 }}>
                      <Sparkles size={12} /> Destaque
                    </span>
                  )}
                </div>

                {/* Título & Subtítulo */}
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.35rem' }}>
                  {project.title}
                </h3>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.75)', fontWeight: 500, marginBottom: '1rem' }}>
                  {project.subtitle}
                </div>

                {/* Descrição */}
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                  {project.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx}
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Botão de ação com Liquid Glass */}
                <FluidGlassButton
                  href={project.repoUrl || "#"}
                  variant={idx === 0 ? 'primary' : 'secondary'}
                  icon={ExternalLink}
                  style={{ width: '100%' }}
                >
                  Explorar Projeto
                </FluidGlassButton>

              </PixelCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
