import React, { useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import './LogoCarousel.css';
import { 
  SiGit, 
  SiPython, 
  SiDatabricks, 
  SiReact, 
  SiTypescript, 
  SiPostgresql, 
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const logos = [
  { icon: SiGit, name: 'Git' },
  { icon: SiPython, name: 'Python' },
  { icon: SiDatabricks, name: 'Databricks' },
  { icon: SiReact, name: 'React' },
  { icon: FaAws, name: 'AWS' },
  { icon: SiTypescript, name: 'TypeScript' },
  { icon: SiPostgresql, name: 'PostgreSQL' },
];

// Renderizado 3 vezes para garantir a fluidez da rolagem infinita
const track = [...logos, ...logos, ...logos];

export default function LogoCarousel() {
  const ref = useRef(null);
  const inView = useInView(ref, { rootMargin: '100px 0px' });

  return (
    <div ref={ref} className="logo-carousel-container">
      <div className="logo-carousel-track" style={{ animationPlayState: inView ? 'running' : 'paused' }}>
        {track.map((logo, index) => {
          const IconComponent = logo.icon;
          return (
            <div key={index} className="logo-carousel-item" title={logo.name} aria-hidden={index >= logos.length || undefined}>
              <IconComponent size={56} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
