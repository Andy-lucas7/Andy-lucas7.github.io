import React from 'react';
import { ExternalLink, Layers, Sparkles } from 'lucide-react';
import PixelCard from '../react-bits/PixelCard';
import FluidGlassButton from '../react-bits/FluidGlassButton';
import SectionHeader from '../ui/SectionHeader';
import { portfolioData } from '../../data/portfolioData';

// Cor do selo "Destaque" alinhada à paleta de cada variante do PixelCard
const BADGE_COLORS = {
  prism: '#ffffff',
  cyan: '#00f0ff',
  purple: '#c084fc',
  green: '#22c55e',
  blue: '#38bdf8',
  indigo: '#818cf8',
  default: '#00f0ff'
};

function ProjectCard({ project, index }) {
  const badgeColor = BADGE_COLORS[project.variant] ?? BADGE_COLORS.default;

  return (
    <PixelCard
      variant={project.variant}
      speed={45}
      gap={7}
      reveal
      revealDelay={(index % 3) * 90}
      className={[project.flagship && 'is-flagship', project.variant === 'prism' && 'is-prism'].filter(Boolean).join(' ')}
    >
      <div>
        <div className="project-meta">
          <span className="project-metric">{project.metrics}</span>
          <span className="project-badges">
            {project.family && <span className="project-family">{project.family}</span>}
            {project.featured && (
              <span className="project-badge" style={{ color: badgeColor }}>
                <Sparkles size={12} /> Destaque
              </span>
            )}
          </span>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <div className="project-subtitle">{project.subtitle}</div>
        <p className="project-description">{project.description}</p>

        <ul className="tag-list" aria-label="Tecnologias">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <FluidGlassButton
        href={project.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        icon={ExternalLink}
        className="project-cta"
        aria-label={`Explorar ${project.title} no GitHub`}
      >
        Explorar Projeto
      </FluidGlassButton>
    </PixelCard>
  );
}

export default function ProjectsBento() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <SectionHeader
          icon={Layers}
          eyebrow="Projetos & Componentes"
          title="Meus Projetos"
          description="Aqui estão alguns dos principais projetos em que trabalhei."
        />

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
