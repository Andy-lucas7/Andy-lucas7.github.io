import React from 'react';
import { Cpu, Code2, Palette, ShieldCheck } from 'lucide-react';
import SpotlightCard from '../react-bits/SpotlightCard';
import LogoCarousel from '../react-bits/LogoCarousel';
import { portfolioData } from '../../data/portfolioData';

export default function TechStack() {
  const { techCategories } = portfolioData;

  const getCategoryIcon = (index) => {
    switch (index) {
      case 0: return Code2;
      case 1: return Palette;
      default: return ShieldCheck;
    }
  };

  return (
    <section id="tech" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">

        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            <Cpu size={16} /> Arsenal Tecnológico
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '1rem' }}>
            Tecnologias & Ferramentas
          </h2>
          <p style={{ maxWidth: '560px', margin: '0 auto', color: 'var(--text-secondary)' }}>
            Ferramentas modernas para engenharia de dados, desenvolvimento full stack e sistemas de alta performance.
          </p>
        </div>

        <LogoCarousel />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
          {techCategories.map((category, idx) => {
            const Icon = getCategoryIcon(idx);

            return (
              <SpotlightCard
                key={idx}
                spotlightColor="rgba(109, 56, 159, 0.07)"
                borderColor="rgba(168, 85, 247, 0.5)"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(82, 42, 119, 0.04)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-purple)'
                  }}>
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>{category.name}</h3>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        padding: '0.45rem 0.9rem',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.09)',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        fontWeight: 500,
                        transition: 'all 0.25s ease',
                        cursor: 'default'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.5)';
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.25)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
