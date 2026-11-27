import React from 'react';
import { Cpu, Code2, Palette, ShieldCheck } from 'lucide-react';
import SpotlightCard from '../react-bits/SpotlightCard';
import LogoCarousel from '../react-bits/LogoCarousel';
import SectionHeader from '../ui/SectionHeader';
import { portfolioData } from '../../data/portfolioData';

const CATEGORY_ICONS = [Code2, Palette, ShieldCheck];

export default function TechStack() {
  const { techCategories } = portfolioData;

  return (
    <section id="tech" className="tech-section">
      <div className="container">
        <SectionHeader
          icon={Cpu}
          eyebrow="Arsenal Tecnológico"
          title="Tecnologias & Ferramentas"
          description="Ferramentas modernas para engenharia de dados, desenvolvimento full stack e sistemas de alta performance."
          accent="var(--accent-purple)"
        />

        <LogoCarousel />

        <div className="tech-grid">
          {techCategories.map((category, idx) => {
            const Icon = CATEGORY_ICONS[idx] ?? ShieldCheck;

            return (
              <SpotlightCard
                key={category.name}
                spotlightColor="rgba(109, 56, 159, 0.07)"
                borderColor="rgba(168, 85, 247, 0.5)"
                reveal
                revealDelay={idx * 90}
              >
                <div className="tech-card-heading">
                  <div className="tech-card-icon">
                    <Icon size={20} />
                  </div>
                  <h3>{category.name}</h3>
                </div>

                <ul className="skill-list">
                  {category.skills.map((skill) => (
                    <li key={skill} className="skill-chip">
                      {skill}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
