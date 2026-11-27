import React from 'react';
import Reveal from './Reveal';

/** Cabeçalho padrão das seções: rótulo com ícone, título e descrição. */
export default function SectionHeader({ icon: Icon, eyebrow, title, description, accent = 'var(--accent-cyan)' }) {
  return (
    <Reveal className="section-header">
      <div className="section-eyebrow" style={{ color: accent }}>
        {Icon && <Icon size={16} />} {eyebrow}
      </div>
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </Reveal>
  );
}
